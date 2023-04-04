import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PlayerScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>Player Screen</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#8fcbbc",
	},
});
