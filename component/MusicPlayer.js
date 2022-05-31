import React, { Profiler, useEffect, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Dimensions, TouchableOpacity, Image, FlatList, Animated } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import songs from '../asset/data.js'

const { width, height } = Dimensions.get('window');
const setupPlayer = async () => {
  await TrackPlayer.setupPlayer()
  await TrackPlayer.add(songs)
}

const togglePlayback = async (playbackState) => {
  const currentTrack = await TrackPlayer.getCurrentTrack()
  let trackObject = await TrackPlayer.getTrack(currentTrack);
  console.log(`Title: ${trackObject.title}`);
  console.log(playbackState)
  console.log('toggle')
  if (currentTrack !== null) {
    if (playbackState == State.Paused || playbackState == State.Ready) {
      await TrackPlayer.play()
      console.log('The player is playing');
    } else {
      await TrackPlayer.pause()
      console.log('The player is paused');
    }
  }
}

export default function MusicPlayer() {

  const playbackState = usePlaybackState()
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0)
  const songSlider = useRef(null)

  useEffect(() => {
    setupPlayer()

    scrollX.addListener(({ value }) => {
      console.log('Scrool X', scrollX)
      const index = Math.round(value / width)
      setSongIndex(index)
      console.log('index: ', index)
    })

    return () => {
      scrollX.removeAllListeners()
    }
  }, [])

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    })
  }

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    })
  }

  const renderSongs = ({ index, item }) => {
    return (
      <Animated.View style={{
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={styles.artworkWrapper}>
          <Image
            source={item.image}
            style={styles.artworkImage}></Image>
        </View>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={{ width: width }}>
          <Animated.FlatList
            ref={songSlider}
            renderItem={renderSongs}
            data={songs}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{
                nativeEvent: {
                  contentOffset: { x: scrollX }
                }
              }],
              { useNativeDriver: true }
            )}
          />
        </View>
        <View>
          <Text style={styles.title}>{songs[songIndex].title}</Text>
          <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        </View>
        <View>
          <Slider
            style={styles.progressContainer}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="FFD369"
            minimumTrackTintColor='FFD369'
            maximumTrackTintColor='#FFF'
            onSlidingComplete={() => { }} />
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabelTxt}>0:00</Text>
            <Text style={styles.progressLabelTxt}>3:55</Text>
          </View>
        </View>

        <View style={styles.musicControlls}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" style={{ marginTop: 25 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
            <Ionicons name={playbackState === State.Playing ? "ios-pause-circle" : "ios-play-circle"} size={75} color="#FFD369" />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons name="play-skip-forward-outline" size={35} color="#FFD369" style={{ marginTop: 25 }} />
          </TouchableOpacity>
        </View>


      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomControl}>

          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="heart-outline" size={30} color="#777777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="repeat" size={30} color="#777777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="share-outline" size={30} color="#777777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="ellipsis-horizontal" size={30} color="#777777" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831'
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    borderTopColor: '#303E46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15
  },
  bottomControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },
  artworkWrapper: {
    width: 300,
    height: 300,
    marginBottom: 50,

    // shadow for IOS
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    //shadow for andriod
    elevation: 5,
  },
  artworkImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1a701a',
  },
  artist: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    color: '#EEEEEE'
  },
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row'
  },
  progressLabelContainer: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progressLabelTxt: {
    color: '#fff'
  },
  musicControlls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 15,
  }
});
