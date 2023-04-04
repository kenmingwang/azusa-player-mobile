export default class VideoInfo {
	constructor(
		title = "",
		desc = "",
		videoCount = 0,
		picSrc = "",
		uploader = "",
		pages = 0,
		songList = []
	) {
		this.title = title;
		this.desc = desc;
		this.videoCount = videoCount;
		this.picSrc = picSrc;
		this.uploader = uploader;
		this.pages = pages;
		this.songList = songList;
	}

	setSongList(songList) {
		this.songList = songList;
	}

	isMutiPartVideo() {
		return this.videos > 1;
	}

	getMultiPartVideoList() {}
}
