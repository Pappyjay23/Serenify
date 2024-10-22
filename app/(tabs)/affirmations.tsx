import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

const Affirmations = () => {
	const [quote, setQuote] = useState("When a purpose of a thing is not known, abuse is inevitable.");
	const [affirmation, setAffirmation] = useState(
		"You are better than you think."
	);
	const [author, setAuthor] = useState("Albert Einstein.");

	const getQuote = async () => {
		fetch("https://zenquotes.io/api/random")
			.then((res) => res.json())
			.then((data) => {
				setQuote(data[0].q);
				setAuthor(data[0].a);
			});
	};

	const getAffirmation = async () => {
		fetch("https://www.affirmations.dev/")
			.then((res) => res.json())
			.then((data) => setAffirmation(data.affirmation));
	};

	useEffect(() => {
		getAffirmation();
		getQuote();
	}, []);
	return (
		<View className='flex-1 bg-[#0E4351]'>
			<SafeAreaView className='p-4 relative h-screen z-10'>
				<View className='pt-[10px] mb-3'>
					<Text className='text-3xl font-hlight text-white'>
						Change your beliefs with
					</Text>
					<Text className='text-3xl font-hmedium text-white'>
						Affirmations & Quotes
					</Text>

					<Text className='font-hlight text-white mt-4 text-sm'>
						Choose an affirmation to affirm to yourself.
					</Text>
				</View>
				<ScrollView showsVerticalScrollIndicator={false} className="my-4">
          {/* Quotes */}

					<View className='justify-center items-center mb-5'>
						<ScrollView showsVerticalScrollIndicator className='w-full'>
							<View className='bg-[#fff] rounded-lg p-4 flex flex-col space-y-3 w-[80%] mx-auto h-full overflow-y-scroll'>
								<Text className='text-4xl font-hlight text-[#0E4351]'>
									{quote}
								</Text>
								<Text className='text-4xl font-hmedium text-[#0E4351]'>
									{author}
								</Text>
							</View>
						</ScrollView>
						<CustomButton
							title='Get a new quote'
							onPress={() => {
								getQuote();
							}}
							buttonStyles='w-[80%] mt-4 bg-[#fff]/10'
							textStyles='font-hmedium'
						/>
					</View>

          {/* Affirmations */}
					<View className='justify-center items-center'>
						<ScrollView showsVerticalScrollIndicator className='w-full'>
							<View className='bg-[#fff] rounded-lg p-4 flex flex-col space-y-3 w-[80%] mx-auto h-full overflow-y-scroll'>
								<Text className='text-4xl font-hlight text-[#0E4351]'>
									{affirmation}
								</Text>
							</View>
						</ScrollView>
						<CustomButton
							title='Get a new affirmation'
							onPress={() => {
								getAffirmation();
							}}
							buttonStyles='w-[80%] mt-4 bg-[#fff]/10'
							textStyles='font-hmedium'
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

export default Affirmations;
