import React, { useState } from "react";
import {
	Input,
	Box,
	Heading,
	AspectRatio,
	Image,
	Text,
	Center,
	HStack,
	FlatList,
	Icon,
	VStack,
	Spacer,
} from "native-base";
import {
	Dimensions,
	View,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	Modal,
	TouchableWithoutFeedback,
	Clipboard
} from "react-native";
import { SearchDataBVID } from "../asset/SearchData.js";
import AppLoading from "expo-app-loading";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import { second2Minute } from "../utils/common.js";
import { Ionicons, Feather, AntDesign  } from "@expo/vector-icons";
import { getSongList, getFavList } from "../utils/DataProcess";
import VideoInfo from "../object/VideoInfo.js";

const { width, height } = Dimensions.get("window");

export default function SearchScreen({ navigation }) {
	// Every entry in the list is a song
	const [listInfo, setListInfo] = useState(
		new VideoInfo()
	);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedSong, setSelectedSong] = useState(null);
	
	const handleCopyToClipboard = (text) => {
		Clipboard.setString(text);
	};

	const handleLongPress = (item) => {
		
		setSelectedSong(item);
		setModalVisible(true);
	};


	// Refactor this to upper level, resuse this code in other screens
	const onSearch = (e) => {
		console.log("value", e); // Validation of target Val
		getSongList(e).then((list) => {
			console.log(list);
			setListInfo(list);
		});

	};

	// Renders Flatlist item
	const renderItem = ({ item, index }) => (
		<TouchableOpacity
			style={styles.itemContainer}
			onPress={() => navigation.navigate("Player", item)}
			onLongPress={() => handleLongPress(item)}
		>
			<Text color="coolGray.400" style={styles.itemIndex}>{index + 1}</Text>
			<View style={styles.itemTitleContainer}>
				<Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
					{item.part}
				</Text>
				<Text style={styles.itemDuration}>{second2Minute(item.duration)}</Text>
			</View>
			<TouchableOpacity style={styles.itemOptionButton}>
				<Feather name="more-vertical" size={18} color="gray" />
			</TouchableOpacity>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView>
			<Box alignItems="center">
				<Box
					m="2"
					rounded="2xl"
					borderColor="coolGray.200"
					borderWidth="1"
					_light={{
						backgroundColor: "gray.50",
					}}
				>
					<Box
						alignItems="center"
						m="2"
						mb="0"
						rounded="2xl"
						_light={{
							backgroundColor: "gray.50",
						}}
					>
						<Input
							placeholder="BVID/fid"
							width="100%"
							padding="1"
							borderWidth="0"
							InputLeftElement={
								<Icon
									ml="2"
									size="4"
									color="gray.400"
									as={<Ionicons name="ios-search" />}
								/>
							}
							onSubmitEditing={({ nativeEvent }) => onSearch(nativeEvent.text)}
						/>
					</Box>

					<Box rounded="2xl">
						<AspectRatio w="100%" ratio={16 / 9}>
							<Image
								source={{
									uri: listInfo.picSrc
										? listInfo.picSrc
										: "https://i0.hdslb.com/bfs/album/23cf027c05c762bd2bb816bc850b345ba5e838bf.jpg",
								}}
								alt="image"
							/>
						</AspectRatio>
						<Center
							bg="violet.500"
							_dark={{
								bg: "violet.400",
							}}
							_text={{
								color: "warmGray.50",
								fontSize: "xs",
							}}
							position="absolute"
							bottom="0"
							px="3"
							py="1.5"
						>
							{listInfo.bvid ? listInfo.bvid : ""}
						</Center>
					</Box>
					<Heading numberOfLines={1} ellipsizeMode="tail" style={styles.listTitle} >
						{listInfo.title ? listInfo.title + '(' + listInfo.pages.length + ')' : "输入BVID/FID进行歌单搜索"}
					</Heading>
					<FlatList
						data={listInfo.pages}
						renderItem={renderItem}
						keyExtractor={(item) => item.cid}
					/>
					<Modal
						animationType="fade"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => setModalVisible(false)}
					>
						<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
							<View style={styles.modalBackdrop}>
								<View style={styles.modalContainer}>
									<Text style={styles.modalText}>{selectedSong?.part}</Text>
									<TouchableOpacity onPress={() => handleCopyToClipboard(selectedSong?.part)}  style={styles.copyButton}>
										<AntDesign name="copy1" size={24} color="white" />
									</TouchableOpacity>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</Modal>
				</Box>
			</Box>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	listTitle: {
		color: 'grey',
		fontSize: 12,
		padding: 6,
	},
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	itemTitleContainer: {
		alignItems: "flex-start",
		marginLeft: 8,
		flex: 1,
	},
	itemTitle: {
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 2,
	},
	itemDuration: {
		fontSize: 10,
		color: "#999",
	},
	itemOptionButton: {
		padding: 8,
	},
	itemOptionText: {
		fontSize: 24,
		fontWeight: "bold",
	},
	itemIndex: {
		fontSize: 16,
		marginRight: 4,
		width: 24,
		textAlign: 'center'
	},
	modalText: {
		fontSize: 18,
		fontWeight: 'bold',
		padding: 8,
		color: 'white'
	},
	modalBackdrop: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
	},
	modalContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		borderRadius: 14,
		padding: 10,
		width: '100%',
		alignItems: 'center',
		flexDirection: "row",
		justifyContent: 'space-between',
	},
});
