<template>
  <view class="content" @touchmove.stop.prevent>
    <view
      class="background-box"
      v-if="audioInfo.pic != ''"
      :style="'background-image:url(' + audioInfo.pic + '?param=50y50)'"
    ></view>
    <view class="music-info">
      <image
        v-if="audioInfo.pic != ''"
        class="album-pic"
        :style="'background-image:url(' + audioInfo.pic + '?param=300y300)'"
      ></image>
      <view class="music-info-right">
        <text class="music-name">{{ audioInfo.name }}</text>
        <text class="music-singer">{{ audioInfo.singer }}</text>
      </view>
    </view>
    <lrc-area
      ref="lrcArea"
      :music-i-d="curMusicID"
      :audio-cur-time="audioCurTime"
    ></lrc-area>
    <player-bottom
      :cur-music-id="curMusicID"
      @change-bottom-open="OnChangeBottomOpen"
      @change-cur-music="OnChangeCurMusic"
    ></player-bottom>
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, Ref, ref, toRefs } from "vue";
import { getMusicUrlByID, getMusicDetailByID } from "@/apis/music";
import PlayerBottom from "./components/PlayerBottom.vue";
import LrcArea from "./components/LrcArea.vue";

interface AudioInfo {
  name: string;
  singer: string;
  pic: string;
  musicLrc?: Array<any>;
}

const lrcArea = ref<any>(null);
const curAudio: UniApp.BackgroundAudioManager = uni.getBackgroundAudioManager();
const audioCurTime = ref<number>(0);
const audioInfo: AudioInfo = reactive({
  name: "",
  singer: "",
  pic: "",
});
let curMusicID: number = 167827;

onMounted(() => {
  initMusicByID();
});

const initMusicByID = () => {
  getMusicDetailByID(curMusicID).then((detailRes: any) => {
    console.log(detailRes);
    const musicDetail = detailRes.songs[0];
    getMusicUrlByID(curMusicID).then((res: any) => {
      curAudio.title = musicDetail.name;
      audioInfo.name = musicDetail.name;
      let tempSingerName = "";
      musicDetail.ar.forEach((singer: any, index: number) => {
        if (index != musicDetail.ar.length - 1) {
          tempSingerName = tempSingerName + singer.name + "/";
        } else {
          tempSingerName = tempSingerName + singer.name;
        }
      });
      console.log("歌手名是:", tempSingerName);
      curAudio.singer = tempSingerName;
      audioInfo.singer = tempSingerName;
      curAudio.coverImgUrl = musicDetail.al.picUrl;
      audioInfo.pic = musicDetail.al.picUrl;
      curAudio.src = res.data[0].url;
      // setTimeout(() => {
      //   curAudio.pause();
      // }, 500);

      // curAudio.volume = 0.15;
      // curAudio.play();
    });
  });
};

curAudio.onTimeUpdate(() => {
  audioCurTime.value = curAudio.currentTime;
});

const OnChangeBottomOpen = (isOpen: boolean) => {
  lrcArea.value.onBottomOpenChange(isOpen);
};

const OnChangeCurMusic = (musicID: number) => {
  curMusicID = musicID;
  initMusicByID();
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding-top: 200rpx;
}

.background-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #000000;
  filter: blur(50rpx); /*滤镜*/
  transform: scale(1.2);
  z-index: -1;
}
.background-box:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: -1;
}

.music-info {
  width: 100vw;
  display: flex;
  box-sizing: border-box;
  padding: 0 50rpx 0 50rpx;
}

.music-info-right {
  display: flex;
  flex: 1;
  padding-left: 30rpx;
  flex-direction: column;
}

.album-pic {
  height: 300rpx;
  width: 300rpx;
  /* border: 1rpx solid rgba(0, 0, 0, 0.3); */
  box-shadow: 3px 4px 7px 0px #000000;
  background-size: contain;
}

.music-name {
  font-size: 46rpx;
  font-weight: bolder;
  margin-bottom: 10rpx;
}
.music-singer {
  font-size: 26rpx;
  font-weight: bolder;
}
</style>
