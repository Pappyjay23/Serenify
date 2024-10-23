
import { meditateCategory } from "@/constants/MeditationData";
import { useRouter } from "expo-router";
import {
	Image,
	Pressable,
	ScrollView,
	Text,
	View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MeditateCategoryScreen() {

	const router = useRouter()

	return (
		<View className='flex-1 bg-[#0E4351]'>
			<SafeAreaView className='p-4 relative h-screen z-10'>
				<View className='pt-[10px]'>
					<Text className='text-3xl font-hlight text-white'>
						Welcome to
						{/* <Text className='text-3xl font-hmedium text-white'> Serenify</Text> */}
					</Text>
					<Text className='text-3xl font-hmedium text-white'>Serenify</Text>

					<Text className='font-hlight text-white my-4 text-sm'>
						Choose a category to aid your meditation.
					</Text>
				</View>

				<ScrollView
					showsVerticalScrollIndicator={false}
					className='flex-1 my-2'>
					<View className='gap-3 flex-row justify-center flex-wrap'>
						{meditateCategory.map((item) => (
							<Pressable key={item.id} onPress={() => router.push(`/meditate/${item.id}`)}
							style={{ backgroundColor: item.colorTheme }}
								className={`rounded-lg p-4 w-[150px] flex flex-col items-center space-y-1`}>
								<Image
									resizeMode='contain'
									source={item.image}
									className='w-[100px] h-[100px] mb-1'
								/>
								<Text className='text-white text-center font-hbold text-[16px]'>
									{item.name}
								</Text>
							</Pressable>
						))}
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
