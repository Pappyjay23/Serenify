import { View, Text, Pressable, Image } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { meditateCategory } from "@/constants/MeditationData";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomButton from "@/components/CustomButton";

interface TimerState {
	isRunning: boolean;
	timeInSeconds: number;
}

const formatTime = (timeInSeconds: number): string => {
	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = timeInSeconds % 60;
	return `${minutes.toString().padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")}`;
};

const Meditate = () => {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const meditate = meditateCategory[Number(id) - 1];

	const [timerState, setTimerState] = useState<TimerState>({
		isRunning: false,
		timeInSeconds: 600, // 10 minutes default
	});

	const resetTimer = useCallback(() => {
		setTimerState({
			isRunning: false,
			timeInSeconds: 600,
		});
	}, []);

	const toggleTimer = useCallback(() => {
		setTimerState((prev) => ({
			...prev,
			isRunning: !prev.isRunning,
		}));
	}, []);

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		if (timerState.isRunning && timerState.timeInSeconds > 0) {
			intervalId = setInterval(() => {
				setTimerState((prev) => {
					if (prev.timeInSeconds <= 0) {
						clearInterval(intervalId);
						return { ...prev, isRunning: false };
					}
					return { ...prev, timeInSeconds: prev.timeInSeconds - 1 };
				});
			}, 1000);
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [timerState.isRunning]);

	const handleTimerComplete = useCallback(() => {
		// Add any completion logic here (e.g., playing a sound, showing an alert)
		console.log("Meditation complete!");
	}, []);

	useEffect(() => {
		if (timerState.timeInSeconds === 0) {
			handleTimerComplete();
		}
	}, [timerState.timeInSeconds, handleTimerComplete]);

	return (
		<View
			style={{ backgroundColor: meditate.colorTheme }}
			className='flex-1 relative'>
			<SafeAreaView className='p-4 relative h-screen z-10'>
				<Pressable className='mb-4' onPress={() => router.back()}>
					<Ionicons name='arrow-back-circle' size={40} color='#f1f5f9' />
				</Pressable>

				<View className='bg-slate-100 rounded-full w-[200px] h-[200px] p-8 mx-auto flex flex-col justify-center items-center'>
					<Image
						resizeMode='contain'
						source={meditate.image}
						className='w-[100px] h-[100px] mb-1'
					/>
					<Text
						style={{ color: meditate.colorTheme }}
						className='text-center font-psemibold text-base tracking-tighter'>
						{meditate.name}
					</Text>
				</View>

				<View className='mt-8 space-y-4'>
					<Pressable
						onPress={toggleTimer}
						className='bg-slate-100 rounded-full w-[200px] h-[200px] p-8 mx-auto flex flex-col justify-center items-center'>
						<Text
							style={{ color: meditate.colorTheme }}
							className='text-center font-pbold text-[55px]'>
							{formatTime(timerState.timeInSeconds)}
						</Text>
					</Pressable>

					<View className='flex flex-row space-x-4 items-center justify-center'>
						<Pressable
							onPress={toggleTimer}
							className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-white'>
							<Text
								style={{ color: meditate.colorTheme }}
								className='text-center font-medium font-plight  '>
								{timerState.isRunning ? (
									<FontAwesome6
										name='pause'
										size={15}
										color={meditate.colorTheme}
									/>
								) : (
									<Fontisto name='play' size={15} color={meditate.colorTheme} />
								)}
							</Text>
						</Pressable>
						<Pressable
							onPress={resetTimer}
							className={` bg-white rounded-full w-[40px] h-[40px] flex justify-center items-center`}>
							<Text
								style={{ color: meditate.colorTheme }}
								className='text-slate-100 font-plight'>
								<MaterialIcons
									name='replay'
									size={18}
									color={meditate.colorTheme}
								/>
							</Text>
						</Pressable>
					</View>
				</View>
			</SafeAreaView>
			<View className='absolute bottom-10 w-full'>
				<Pressable className='p-4 bg-transparent bg-white border-white border rounded-lg flex flex-row justify-center items-center w-[80%] mx-auto'>
					<Text
						style={{ color: meditate.colorTheme }}
						className='font-psemibold'>
						Adjust Duration
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Meditate;
