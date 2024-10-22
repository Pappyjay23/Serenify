import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#fff",
				tabBarActiveBackgroundColor: "#0E4351",
				tabBarStyle: { backgroundColor: "#0E4351", paddingBottom: 4 },
			}}>
			<Tabs.Screen
				name='meditate-category'
				options={{
					tabBarLabel: "Meditate",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name='flower-tulip'
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='affirmations'
				options={{
					tabBarLabel: "Affirmations",
					tabBarIcon: ({ color }) => (
						<Entypo name='open-book' size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
