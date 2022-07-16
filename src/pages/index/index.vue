<template>
  <view class="content">
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
    <!-- <button @click="onStopMusicBtn">停止播放</button>
    <button @click="onStartMusicBtn">开始播放</button> -->
    <lrc-area
      ref="lrcArea"
      :music-i-d="musicID"
      :audio-cur-time="audioCurTime"
    ></lrc-area>
    <player-bottom @change-bottom-open="OnChangeBottomOpen"></player-bottom>
  </view>
</template>

<script setup lang="ts">
import { reactive, Ref, ref, toRefs } from "vue";
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
let musicID: number = 28403111;

getMusicDetailByID(musicID).then((detailRes: any) => {
  console.log(detailRes);
  const musicDetail = detailRes.songs[0];
  getMusicUrlByID(musicID).then((res: any) => {
    curAudio.title = musicDetail.name;
    audioInfo.name = musicDetail.name;
    curAudio.singer = musicDetail.ar[0].name;
    audioInfo.singer = musicDetail.ar[0].name;
    curAudio.coverImgUrl = musicDetail.al.picUrl;
    audioInfo.pic = musicDetail.al.picUrl;
    curAudio.src = res.data[0].url;
    setTimeout(() => {
      curAudio.pause();
    }, 500);

    // curAudio.volume = 0.15;
    // curAudio.play();
  });
});

const onStopMusicBtn = () => {
  curAudio.pause();
};

const onStartMusicBtn = () => {
  curAudio.play();
};

curAudio.onTimeUpdate(() => {
  audioCurTime.value = curAudio.currentTime;
});

const OnChangeBottomOpen = (isOpen: boolean) => {
  lrcArea.value.onBottomOpenChange(isOpen);
};
</script>

<style>
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
  filter: blur(50rpx); /*滤镜*/
  transform: scale(1.2);
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
  font-size: 40rpx;
  font-weight: bolder;
  margin-bottom: 10rpx;
}
.music-singer {
  font-size: 20rpx;
  font-weight: bolder;
}
</style>
