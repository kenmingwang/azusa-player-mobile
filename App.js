import React from "react";
import { StyleSheet, StatusBar, View, Text, Button } from "react-native";
import MusicPlayer from "./component/MusicPlayer";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./navigation/tab";
import { NativeBaseProvider } from "native-base";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Home Screen</Text>
			<Button
				title="go to Details"
				onPress={() => navigation.navigate("Detail")}
			/>
		</View>
	);
}

function DetailScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Detail Screen</Text>
		</View>
	);
}
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		// <NavigationContainer>
		//   <View style={styles.container}>
		//     <StatusBar barStyle="light-content" />
		//     <MusicPlayer />
		//   </View>
		// </NavigationContainer>

		<NavigationContainer>
			<NativeBaseProvider>
				{/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} /> */}
				<Tabs />
			</NativeBaseProvider>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
