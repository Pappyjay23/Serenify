import { meditateCategory } from "@/constants/MeditationData";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, Modal, Pressable, Text, TextInput, View } from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";

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

	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [completionModalVisible, setCompletionModalVisible] =
		useState<boolean>(false);
	const [timerDurationInSeconds, setTimerDurationInSeconds] =
		useState<number>(10);

	const [timerState, setTimerState] = useState<TimerState>({
		isRunning: false,
		timeInSeconds: timerDurationInSeconds, // Default time in seconds
	});

	const toggleModal = () => {
		setIsModalVisible(!isModalVisible);
	};

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
			if (sound) {
				sound.stopAsync();
				sound.unloadAsync();
			}
		};
	}, [meditateData.audio]);

	useFocusEffect(
		useCallback(() => {
			return () => {
				if (sound) {
					sound.stopAsync();
				}
			};
		}, [sound])
	);

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
			timeInSeconds: timerDurationInSeconds,
		});
	}, [timerDurationInSeconds]);

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

		setCompletionModalVisible(true);

		setTimeout(() => {
			setCompletionModalVisible(false);
		}, 3000);
	}, []);

	useEffect(() => {
		if (timerState.timeInSeconds === 0) {
			handleTimerComplete();
			setTimerState({
				isRunning: false,
				timeInSeconds: timerDurationInSeconds,
			});
		}
	}, [timerState.timeInSeconds, handleTimerComplete]);

	// Calculate progress percentage
	const progress = useMemo(() => {
		return (
			(timerDurationInSeconds - timerState.timeInSeconds) /
			timerDurationInSeconds
		);
	}, [timerDurationInSeconds, timerState.timeInSeconds]);

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

			{/* Completion Modal */}
			<Modal
				visible={completionModalVisible}
				animationType='slide'
				onRequestClose={() => setCompletionModalVisible(false)}>
				<View className='flex-1 justify-center items-center bg-black/90'>
					<View
						style={{ backgroundColor: meditateData.colorTheme }}
						className='rounded-lg p-6 w-[80%] flex flex-col justify-center items-center'>
						<Ionicons name='checkmark-circle' size={50} color='#fff' />
						<Text className='text-2xl text-white font-hmedium text-center mt-4'>
							Meditation Complete 🎉
						</Text>
						<Text className='text-center text-white font-hlight mt-2'>
							Great job on completing your session!
						</Text>
						<Pressable
							onPress={() => setCompletionModalVisible(false)}
							className='mt-6 py-2 px-4 bg-white rounded-md'>
							<Text
								style={{ color: meditateData.colorTheme }}
								className='font-hmedium'>
								Close
							</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

			{/* Adjust Duration Modal */}
			<Modal
				visible={isModalVisible}
				animationType='fade'
				transparent={true}
				onRequestClose={toggleModal}>
				<View className='flex-1 bg-black/90 justify-center items-center'>
					<View
						style={{ backgroundColor: meditateData.colorTheme }}
						className='bg-white rounded-lg p-6 w-[80%]'>
						<Text className='text-white text-[20px] tracking-tighter font-hmedium text-center mb-4'>
							Adjust Timer Duration
						</Text>
						<View className='flex-row items-center justify-between mb-4'>
							<Text className='text-white font-hlight'>
								Duration (minutes):
							</Text>
							<TextInput
								value={
									isNaN(timerDurationInSeconds)
										? "0"
										: Math.floor(timerDurationInSeconds / 60).toString()
								}
								onChangeText={(text) => {
									const minutes = text === "" ? 0 : parseInt(text);
									setTimerDurationInSeconds(minutes * 60);
								}}
								keyboardType='numeric'
								className='bg-white rounded-md px-3 py-2 w-20 text-center font-hlight'
							/>
						</View>
						<View className='flex-row justify-end space-x-4'>
							<Pressable
								onPress={toggleModal}
								className='py-2 px-4 bg-white rounded-md'>
								<Text className='text-gray-700 font-hlight'>Cancel</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									setTimerState({
										isRunning: false,
										timeInSeconds: timerDurationInSeconds,
									});
									toggleModal();
								}}
								className='py-2 px-4 bg-black rounded-md'>
								<Text className='text-white font-hlight'>Save</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			{/* Adjust Duration Button */}
			<View className='absolute bottom-10 w-full z-[20]'>
				<Pressable
					onPress={toggleModal}
					className='p-4 bg-transparent bg-white border-white border rounded-lg flex flex-row justify-center items-center w-[80%] mx-auto'>
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
