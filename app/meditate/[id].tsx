import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { meditateCategory } from "@/constants/MeditationData";

const Meditate = () => {
	const router = useRouter();
	const { id } = useLocalSearchParams();

	const meditate = meditateCategory[Number(id) - 1];
	return (
		<View style={{ backgroundColor: meditate.colorTheme }} className={`flex-1`}>
			{/* <View className='flex-1 bg-[#0E4351]'> */}
			<SafeAreaView className='p-4 relative h-screen z-10'>
				<Pressable className='mb-4' onPress={() => router.back()}>
					<Ionicons name='arrow-back-circle' size={40} color='#f1f5f9' />
				</Pressable>
				{/* <Text className='text-3xl text-center font-hmedium text-white'>{meditate.name}</Text> */}
				<View
					className={` bg-slate-100 rounded-full w-[200px] h-[200px] p-8 mx-auto flex flex-col justify-center items-center`}>
					<Image
						resizeMode='contain'
						source={meditate.image}
						className='w-[100px] h-[100px] mb-1'
					/>
					<Text
						style={{ color: meditate.colorTheme }}
						className={`text-center font-pbold text-[20px]`}>
						{meditate.name}
					</Text>
				</View>

				<View
					className={` mt-8 bg-slate-100 rounded-full w-[200px] h-[200px] p-8 mx-auto flex flex-col justify-center items-center`}>
					<Text
						style={{ color: meditate.colorTheme }}
						className={`text-center font-plight text-[55px]`}>
						00:10
					</Text>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default Meditate;
