import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#ffffff",
				tabBarInactiveTintColor: "#ffffffbe",
				tabBarStyle: { backgroundColor: "#07232a", paddingBottom: 2 },
				tabBarLabelStyle: {
					fontSize: 8,
					marginBottom: 5,
					fontFamily: 'Helvetica-Neue-Light',
				  },
			}}>
			<Tabs.Screen
				name='meditate-category'
				options={{
					tabBarLabel: "Meditate",
					tabBarIcon: ({ color, focused }) => (
						<MaterialCommunityIcons
							name='flower-tulip'
							size={focused ? 24 : 18}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='affirmations'
				options={{
					tabBarLabel: "Affirmations",
					tabBarIcon: ({ color, focused }) => (
						<Entypo name='open-book' size={focused ? 24 : 18} color={color} />
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
