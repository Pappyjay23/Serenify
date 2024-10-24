import { isLoading } from "expo-font";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
	title: string;
	onPress: () => void;
	buttonStyles?: string;
	textStyles?: string;
	color?: string;
	isLoading?: boolean;
}

const CustomButton = ({
	onPress,
	title,
	buttonStyles,
	textStyles,
	isLoading = false,
	color= '#0E4351',
}: CustomButtonProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={onPress}
			className={`w-full p-4 bg-transparent border-white border rounded-lg flex flex-row gap-1 justify-center items-center ${buttonStyles}`}>
			{isLoading ? (
				<ActivityIndicator size='small' color={color} />
			) : (
				<Text className={`text-white font-psemibold ${textStyles}`}>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	);
};

export default CustomButton;
