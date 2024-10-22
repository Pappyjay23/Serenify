import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
	title: string;
	onPress: () => void;
    buttonStyles?: string;
    textStyles?: string;
}

const CustomButton = ({ onPress, title, buttonStyles, textStyles }: CustomButtonProps) => {
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPress} className={`w-full p-4 bg-transparent border-white border rounded-lg justify-center items-center ${buttonStyles}`}>
			<Text className={`text-white font-psemibold ${textStyles}`}>{title}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
