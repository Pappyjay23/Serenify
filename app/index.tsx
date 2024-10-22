import { Text, View, ImageBackground, Image, StatusBar } from "react-native";
import HomeBackground from "@/assets/images/meditation-nature.png";
import { SafeAreaView } from "react-native-safe-area-context";
import MeditationPose from "@/assets/images/meditation-pose.png";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";

export default function HomeScreen() {
	const router = useRouter();
	return (
		<View className='flex-1'>
			<ImageBackground
				source={HomeBackground}
				resizeMode='cover'
				className='flex-1'>
				<SafeAreaView className='p-4 relative h-screen z-10'>
					<View className="pt-[100px]">
						<Text className='text-4xl text-center font-pbold text-white'>Serenify</Text>
						
						<Text className='font-pregular text-white mt-4 text-center w-[80%] mx-auto text-sm'>
							Explore the app, Find some peace of mind to prepare for
							meditation.
						</Text>
					</View>
					<Image source={MeditationPose} resizeMode="contain" className='mt-[100px] w-[300px] h-[300px] mx-auto' />
					<View className="mt-[50px]">
						<CustomButton title="Get Started" onPress={() => router.push('/meditate-category')} />
					</View>
				</SafeAreaView>
			</ImageBackground>
			<View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}></View>
			{/* <StatusBar barStyle="dark-content" /> */}
		</View>
	);
}
