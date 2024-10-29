import { View, Text, Pressable, Image } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { meditateCategory } from "@/constants/MeditationData";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Progress from "react-native-progress";
import { Audio } from "expo-av";

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
	const meditateData = meditateCategory[Number(id) - 1];

	const [timerState, setTimerState] = useState<TimerState>({
		isRunning: false,
		timeInSeconds: 60, // Default time in seconds
	});

	const [sound, setSound] = useState<Audio.Sound | null>(null);

	// Load audio when the component mounts
	useEffect(() => {
		const loadSound = async () => {
			const { sound } = await Audio.Sound.createAsync(
				meditateData.audio,
				{ shouldPlay: false, isLooping: true } // Enable looping
			);
			setSound(sound);
		};
		loadSound();

		return () => {
			// Unload the sound when component unmounts
			sound && sound.unloadAsync();
		};
	}, [meditateData.audio]);

	// Play, pause, and stop audio based on timer state
	const handleAudioPlayback = useCallback(async () => {
		if (!sound) return;

		if (timerState.isRunning) {
			await sound.playAsync();
		} else {
			await sound.pauseAsync();
		}
	}, [timerState.isRunning, sound]);

	useEffect(() => {
		handleAudioPlayback();
	}, [handleAudioPlayback]);

	const resetTimer = useCallback(() => {
		setTimerState({
			isRunning: false,
			timeInSeconds: 60,
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
		sound && sound.stopAsync();
		console.log("Meditation complete!");
	}, []);

	useEffect(() => {
		if (timerState.timeInSeconds === 0) {
			handleTimerComplete();
		}
	}, [timerState.timeInSeconds, handleTimerComplete]);

	// Calculate progress percentage
	const progress = (60 - timerState.timeInSeconds) / 60;

	return (
		<View
			style={{ backgroundColor: meditateData.colorTheme }}
			className='flex-1 relative'>
			<SafeAreaView className='p-4 relative h-screen z-10'>
				<Pressable className='mb-4' onPress={() => router.back()}>
					<Ionicons name='arrow-back-circle' size={40} color='#f1f5f9' />
				</Pressable>

				<View className='bg-slate-100 rounded-full w-[200px] h-[200px] p-8 mx-auto flex flex-col justify-center items-center'>
					<Image
						resizeMode='contain'
						source={meditateData.image}
						className='w-[100px] h-[100px] mb-1'
					/>
					<Text
						style={{ color: meditateData.colorTheme }}
						className='text-center font-psemibold text-base tracking-tighter'>
						{meditateData.name}
					</Text>
				</View>

				<View className='mt-8 space-y-4'>
					<View className='relative flex flex-row justify-center '>
						<Progress.Circle
							borderColor='#e0e0e0'
							size={220}
							progress={progress}
							thickness={10}
							color={meditateData.colorTheme}
							unfilledColor='#e0e0e0'
						/>
						<Pressable
							onPress={toggleTimer}
							className='bg-slate-100 rounded-full w-[200px] h-[200px] p-8 mx-auto flex flex-col justify-center items-center absolute top-[10] left-[19.5%]'>
							<Text
								style={{ color: meditateData.colorTheme }}
								className='text-center font-pbold text-[50px]'>
								{formatTime(timerState.timeInSeconds)}
							</Text>
						</Pressable>
					</View>

					<View className='flex flex-row space-x-4 items-center justify-center'>
						<Pressable
							onPress={toggleTimer}
							className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-white'>
							<Text
								style={{ color: meditateData.colorTheme }}
								className='text-center font-medium font-plight  '>
								{timerState.isRunning ? (
									<FontAwesome6
										name='pause'
										size={15}
										color={meditateData.colorTheme}
									/>
								) : (
									<Fontisto
										name='play'
										size={15}
										color={meditateData.colorTheme}
									/>
								)}
							</Text>
						</Pressable>
						<Pressable
							onPress={resetTimer}
							className={` bg-white rounded-full w-[40px] h-[40px] flex justify-center items-center`}>
							<Text
								style={{ color: meditateData.colorTheme }}
								className='font-plight'>
								<MaterialIcons
									name='replay'
									size={18}
									color={meditateData.colorTheme}
								/>
							</Text>
						</Pressable>
					</View>
				</View>
			</SafeAreaView>
			<View className='absolute bottom-10 w-full'>
				<Pressable className='p-4 bg-transparent bg-white border-white border rounded-lg flex flex-row justify-center items-center w-[80%] mx-auto'>
					<Text
						style={{ color: meditateData.colorTheme }}
						className='font-psemibold'>
						Adjust Duration
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Meditate;
