import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const [fontsLoaded, error] = useFonts({
		"Poppins-Thin": require("../assets/fonts/poppins/Poppins-Thin.ttf"),
		"Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
		"Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.ttf"),
		"Poppins-Medium": require("../assets/fonts/poppins/Poppins-Medium.ttf"),
		"Poppins-Light": require("../assets/fonts/poppins/Poppins-Light.ttf"),
		"Poppins-ExtraLight": require("../assets/fonts/poppins/Poppins-ExtraLight.ttf"),
		"Poppins-ExtraBold": require("../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
		"Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
		"Poppins-Black": require("../assets/fonts/poppins/Poppins-Black.ttf"),
		"Helvetica-Neue-Light": require("../assets/fonts/helvetica/HelveticaNeueLight.otf"),
		"Helvetica-Neue-Medium": require("../assets/fonts/helvetica/HelveticaNeueMedium.otf"),
		"Helvetica-Neue-Heavy": require("../assets/fonts/helvetica/HelveticaNeueHeavy.otf"),
		"Helvetica-Neue-Bold": require("../assets/fonts/helvetica/HelveticaNeueBold.otf"),
		"Helvetica-Neue-Black": require("../assets/fonts/helvetica/HelveticaNeueBlack.otf"),
	});

	useEffect(() => {
		if (error) throw error;
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded, error]);

	if (!fontsLoaded && !error) return null;

	return (
		<Stack>
			<Stack.Screen name='index' options={{ headerShown: false }} />
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
		</Stack>
	);
};

export default RootLayout;
