import React, { useState } from 'react';
import { Input, Box, Heading, AspectRatio, Image, Text, Center, HStack, FlatList, Icon, VStack, Spacer } from "native-base";
import { Dimensions, SafeAreaView } from 'react-native'
import { SearchDataBVID } from '../asset/SearchData.js'
import AppLoading from 'expo-app-loading';
import { useFonts, NotoSans_400Regular } from '@expo-google-fonts/noto-sans';
import { second2Minute } from '../utils/common.js'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
const { width, height } = Dimensions.get('window');
const data = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    fullName: "Aafreen Khan",
    timeStamp: "12:47 PM",
    recentText: "Good Day!",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    fullName: "Sujitha Mathur",
    timeStamp: "11:11 PM",
    recentText: "Cheer up, there!",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    fullName: "Anci Barroco",
    timeStamp: "6:22 PM",
    recentText: "Good Day!",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
}, {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    fullName: "Aniket Kumar",
    timeStamp: "8:56 PM",
    recentText: "All the best",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
}, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
}];

export default function SearchScreen({ navigation }) {


    return (
        <Box alignItems="center" maxHeight={height * 0.77} >
            <Box alignItems="center" maxW={width * 0.92} mt="2" rounded="2xl" borderColor="coolGray.400" borderWidth="1"
                _light={{
                    backgroundColor: "gray.50"
                }}>
                <Input placeholder="BVID/fid" width="100%" borderRadius="10" py="1" px="2" borderWidth="0" InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />

            </Box>
            <Box maxW={width * 0.92} m="2" rounded="2xl" borderColor="coolGray.200" borderWidth="1"
                _light={{
                    backgroundColor: "gray.50"
                }}>

                <Box rounded="2xl" >

                    <AspectRatio w="100%" ratio={16 / 9}>
                        <Image rounded="2xl" source={{
                            uri: SearchDataBVID.pic
                        }} alt="image" />
                    </AspectRatio>
                    <Center bg="violet.500" _dark={{
                        bg: "violet.400"
                    }} _text={{
                        color: "warmGray.50",
                        fontSize: "xs"
                    }} position="absolute" bottom="0" px="3" py="1.5">
                        {SearchDataBVID.bvid}
                    </Center>

                </Box>
                <Box style={{ flex: 1 }} >
                    <Heading fontSize="md" p="4" pb="3">
                        搜索歌单-{SearchDataBVID.title}
                    </Heading>
                    <FlatList style={{ flexGrow: 1 }} data={SearchDataBVID.pages} renderItem={({
                        item
                    }) => <Box pl="4" pr="5" py="2">
                            <HStack space={3} justifyContent="space-between">
                                <VStack>
                                    <Text color="coolGray.800" bold>
                                        {item.part}
                                    </Text>
                                    <Text color="coolGray.600" fontSize="xs">
                                        {second2Minute(item.duration)}
                                    </Text>
                                </VStack>
                                <Spacer />
                                <Text fontSize="xs" _dark={{
                                    color: "warmGray.50"
                                }} color="coolGray.800" alignSelf="flex-start">
                                    {item.duration}
                                </Text>
                            </HStack>
                        </Box>} keyExtractor={item => item.cid} />
                </Box>
            </Box>
        </Box>
    )
};