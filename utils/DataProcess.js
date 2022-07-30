import { fetchVideoInfo, fetchPlayUrlPromise, fetchFavList } from './Data'
import Song from '../object/Song'

const DEFAULT_BVID = 'BV1BQ4y1X714'
const LAST_PLAY_LIST = 'LastPlayList'

// Load last-playist from storage, else use DEFAULT_BVID as initial list.
export const initSongList = async (setCurrentSongList) => {
    chrome.storage.local.get([LAST_PLAY_LIST], async function (result) {
        if (result[LAST_PLAY_LIST] && result[LAST_PLAY_LIST].length != 0) {
            // console.log(result)
            const defaultSongList = result[LAST_PLAY_LIST]
            defaultSongList.map(v => v['musicSrc'] = () => { return fetchPlayUrlPromise(v.bvid, v.id) })
            setCurrentSongList(defaultSongList)
        }
        else {
            const defaultSongList = await getSongList(DEFAULT_BVID)
            setCurrentSongList(defaultSongList)
        }
    })
}

// Get song list from bvid, either it's muliple songs or single song.
export const getSongList = async (bvid) => {
    let info = await fetchVideoInfo(bvid)
    let songs = []

    // Case of single part video
    if (info.pages.length == 1) {
        songs = [new Song({
            cid: info.pages[0].cid,
            bvid: bvid,
            name: info.title,
            singer: info.uploader.name,
            singerId: info.uploader.mid,
            cover: info.picSrc,
            // musicSrc: () => { return fetchPlayUrlPromise(bvid, info.pages[0].cid) },
        })]

        info.setSongList(songs)
        return (info)
    }

    // Can't use forEach, does not support await
    for (let index = 0; index < info.pages.length; index++) {
        let page = info.pages[index]

        songs.push(new Song({
            cid: page.cid,
            bvid: bvid,
            name: page.part,
            singer: info.uploader.name,
            singerId: info.uploader.mid,
            cover: info.picSrc,
            // musicSrc: () => { return fetchPlayUrlPromise(bvid, page.cid) },
        }))
    }

    info.setSongList(songs)
    return (info)
}

export const getFavList = async (mid) => {
    const infos = await fetchFavList(mid)

    let songs = []

    infos.forEach(info => {
        if (!info)
            return
        // Case of single part video
        if (info.pages.length == 1) {
            // lrc = await fetchLRC(info.title)
            songs.push(new Song({
                cid: info.pages[0].cid,
                bvid: info.pages[0].bvid,
                name: info.title,
                singer: info.uploader.name,
                singerId: info.uploader.mid,
                cover: info.picSrc,
                musicSrc: () => { return fetchPlayUrlPromise(info.pages[0].bvid, info.pages[0].cid) }
            }))
        }
        else {
            // Can't use forEach, does not support await
            for (let index = 0; index < info.pages.length; index++) {
                let page = info.pages[index]
                // lrc = fetchLRC(page.part)
                songs.push(new Song({
                    cid: page.cid,
                    bvid: page.bvid,
                    name: page.part,
                    singer: info.uploader.name,
                    singerId: info.uploader.mid,
                    cover: info.picSrc,
                    musicSrc: () => { return fetchPlayUrlPromise(page.bvid, page.cid) }

                }))
            }
        }
    })

    return (songs)
}