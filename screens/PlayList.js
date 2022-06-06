import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MusicPlayer from '../component/MusicPlayer'

export default function PlayListScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <MusicPlayer />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    }
})