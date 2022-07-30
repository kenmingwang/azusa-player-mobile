import React, { useState } from 'react';
import { Input, Box, Heading, AspectRatio, Image, Text, Center, HStack, FlatList, Icon, VStack, Spacer } from "native-base";
import { Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import { SearchDataBVID } from '../asset/SearchData.js'
import AppLoading from 'expo-app-loading';
import { useFonts, NotoSans_400Regular } from '@expo-google-fonts/noto-sans';
import { second2Minute } from '../utils/common.js'
import { Ionicons, Feather } from "@expo/vector-icons";
import { getSongList, getFavList } from '../utils/DataProcess'
import VideoInfo from '../object/VideoInfo.js';

const { width, height } = Dimensions.get('window');

export default function SearchScreen({ navigation }) {
    // Every entry in the list is a song
    const [listInfo, setListInfo] = useState(new VideoInfo('输入BVID/Fid搜索', '', 0, '', '', 0, []));

    // Refactor this to upper level, resuse this code in other screens
    const onSearch = (e) => {

        console.log('value', e); // Validation of target Val
        getSongList(e)
            .then((list) => {
                console.log(list)
                setListInfo(list)
            })
        // Handles BV search    
        // if (input.startsWith('BV')) {
        //     getSongList(input)
        //         .then((songs) => {
        //             const list = {
        //                 songList: songs,
        //                 info: { title: '搜索歌单-' + input, id: ('FavList-' + 'Search') }
        //             }
        //             console.log(list)
        //         })
        //         .catch((error) => {
        //             //console.log(error)
        //             const list = {
        //                 songList: [],
        //                 info: { title: '搜索歌单-' + input, id: ('FavList-' + 'Search') }
        //             }
        //             handleSeach(list)

        //         })
        //         .finally(() => setLoading(false))
        // }
        // // Handles Fav search
        // else {
        //     getFavList(input)
        //         .then((songs) => {
        //             const list = {
        //                 songList: songs,
        //                 info: { title: '搜索歌单-' + input, id: ('FavList-' + 'Search') }
        //             }
        //             handleSeach(list)
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //             const list = {
        //                 songList: [],
        //                 info: { title: '搜索歌单-' + input, id: ('FavList-' + 'Search') }
        //             }
        //             handleSeach(list)
        //         })
        //         .finally(() => setLoading(false))
        // }
    }
    return (
        <SafeAreaView>
            <Box alignItems="center" >
                <Box m="2" rounded="2xl" borderColor="coolGray.200" borderWidth="1"
                    _light={{
                        backgroundColor: "gray.50"
                    }}>
                    <Box alignItems="center" m="2" mb="0" rounded="2xl"
                        _light={{
                            backgroundColor: "gray.50"
                        }}>
                        <Input placeholder="BVID/fid" width="100%" borderRadius="10" py="1" px="2" borderWidth="0"
                            InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />}
                            onSubmitEditing={({ nativeEvent }) => onSearch(nativeEvent.text)} />
                    </Box>

                    <Box rounded="2xl" >
                        <AspectRatio w="100%" ratio={16 / 9}>
                            <Image source={{
                                uri: listInfo.picSrc ? listInfo.picSrc : 'https://i0.hdslb.com/bfs/album/23cf027c05c762bd2bb816bc850b345ba5e838bf.jpg'
                            }} alt="image" />
                        </AspectRatio>
                        <Center bg="violet.500" _dark={{
                            bg: "violet.400"
                        }} _text={{
                            color: "warmGray.50",
                            fontSize: "xs"
                        }} position="absolute" bottom="0" px="3" py="1.5">
                            {listInfo.bvid ? listInfo.bvid : ''}
                        </Center>
                    </Box>

                    <Box style={{ flex: 1 }} >
                        <Heading fontSize="md" p="4" pb="3">
                            搜索歌单({listInfo.pages.length})-{listInfo.title}
                        </Heading>
                        {listInfo.pages ?
                            <FlatList style={{ flexGrow: 1 }} data={listInfo.pages} renderItem={({
                                item, index
                            }) => <Box pl="4" pr="5" py="2">
                                    <TouchableOpacity onPress={() => {
                                        /* 1. Navigate to the Details route with params */
                                        navigation.navigate('Player', item)
                                    }}>
                                        <HStack space={3} justifyContent="space-between">
                                            <Box style={{ justifyContent: "center", alignItems: "center" }}>
                                                <Text color="coolGray.400" bold style={{ textAlign: 'center', fontSize: 13 }}>
                                                    {index + 1}
                                                </Text>
                                            </Box>
                                            <VStack>
                                                <Text color="coolGray.800" bold>
                                                    {item.part}
                                                </Text>
                                                <Text color="coolGray.600" fontSize="xs">
                                                    {second2Minute(item.duration)}
                                                </Text>
                                            </VStack>
                                            <Spacer />
                                            <Box style={{ justifyContent: "center", alignItems: "center" }}>
                                                <TouchableOpacity onPress={() => { }}>
                                                    <Feather name="more-vertical" size={18} color="gray" />
                                                </TouchableOpacity>
                                            </Box>
                                        </HStack>
                                    </TouchableOpacity>
                                </Box>} keyExtractor={item => item.cid} /> : <></>}
                    </Box>


                </Box>
            </Box>
        </SafeAreaView>
    )
};