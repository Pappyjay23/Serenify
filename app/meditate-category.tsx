import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReduceStressImg from "@/assets/images/reduce-stress.png";
import ImprovePerformanceImg from "@/assets/images/improve-performance.png";
import ReduceAnxietyImg from "@/assets/images/reduce-anxiety.png";
import BetterSleepImg from '@/assets/images/better-sleep.png';
import PersonalGrowthImg from '@/assets/images/personal-growth.png';
import IncreaseHappiness from '@/assets/images/increase-happiness.png';

export default function MeditateCategoryScreen() {
	const router = useRouter();
	return (
		<View className='flex-1 bg-[#0E4351]'>
			<SafeAreaView className='p-4 relative h-screen z-10'>
				<View className='pt-[10px]'>
					<Text className='text-3xl font-hlight text-white'>
						What Brings you
					</Text>
					<Text className='text-3xl font-hmedium text-white'>to Serenify?</Text>

					<Text className='font-hlight text-white my-4 text-sm'>
						Choose a category to focus on.
					</Text>
				</View>

				<View className='gap-3 flex-row justify-center flex-wrap'>
					<Pressable className='bg-[#808AFF] rounded-lg p-4 w-[150px] flex flex-col items-center space-y-1'>
						<Image
							resizeMode='contain'
							source={ReduceStressImg}
							className='w-[100px] h-[100px] mb-1'
						/>
						<Text className='text-white text-center font-hbold text-[16px]'>
							Reduce Stress
						</Text>
					</Pressable>
					<Pressable className='bg-[#F05D48] rounded-lg p-4 w-[150px] flex flex-col items-center space-y-1'>
						<Image
							resizeMode='contain'
							source={ImprovePerformanceImg}
							className='mb-1 w-[100px] h-[100px]'
						/>
						<Text className='text-white text-center font-hbold text-[16px]'>
							Improve Performance
						</Text>
					</Pressable>
					<Pressable className='bg-[#FFCF86] rounded-lg p-4 w-[150px] flex flex-col items-center space-y-1'>
						<Image
							resizeMode='contain'
							source={ReduceAnxietyImg}
							className='mb-1 w-[100px] h-[100px]'
						/>
						<Text className='text-white text-center font-hbold text-[16px]'>
							Reduce Anxiety
						</Text>
					</Pressable>
					<Pressable className='bg-[#4E5567] rounded-lg p-4 w-[150px] flex flex-col items-center space-y-1'>
						<Image
							resizeMode='contain'
							source={BetterSleepImg}
							className='w-[100px] h-[100px] mb-1'
						/>
						<Text className='text-white text-center font-hbold text-[16px]'>
							Better Sleep
						</Text>
					</Pressable>
					<Pressable className='bg-[#6CB28E] rounded-lg p-4 w-[150px] flex flex-col items-center space-y-1'>
						<Image
							resizeMode='contain'
							source={PersonalGrowthImg}
							className='w-[100px] h-[100px] mb-1'
						/>
						<Text className='text-white text-center font-hbold text-[16px]'>
							Personal Growth
						</Text>
					</Pressable>
					<Pressable className='bg-[#b5baf4] rounded-lg p-4 w-[150px] flex flex-col items-center space-y-1'>
						<Image
							resizeMode='contain'
							source={IncreaseHappiness}
							className='mb-1 w-[100px] h-[100px]'
						/>
						<Text className='text-white text-center font-hbold text-[16px]'>
							Reduce Stress
						</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</View>
	);
}
