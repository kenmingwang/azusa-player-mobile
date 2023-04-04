import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MusicPlayer from "../component/MusicPlayer";

export default function PlayListScreen({ route, navigation }) {
	return <MusicPlayer />;
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: '#8fcbbc'
	},
});
