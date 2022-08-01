<template>
  <view
    :style="'height:' + getPlayerBottomHeight + 'rpx'"
    dragable="true"
    class="player-bottom-box"
    @touchstart.self="playerBottomDragStart"
    @touchmove.self="playerBottomDragMove"
  >
    <music-controller></music-controller>
    <scroll-view class="music-list-box" scroll-y="true">
      <view
        class="music-list-item"
        :class="curMusicId == music.id ? 'cur-play-music-item' : ''"
        v-for="music in musicListDetails"
        @click="OnSongClick(music)"
      >
        <view class="music-name">{{ music.name }}</view>
        <view class="music-name-delimiter">-</view>
        <view v-for="(ar, index) in music.ar"
          >{{ ar.name }}<span v-if="index != music.ar.length - 1">/</span></view
        >
        <!-- <view class="music-line"></view> -->
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import MusicController from "./MusicController.vue";
import { getMusicDetailByIDs } from "../../../apis/music";

const props = defineProps({
  curMusicId: {
    type: Number,
    default: 0,
  },
});

let touchStartPos = ref(0);
let isOpen = ref(false);
let musicListIDs = ref<Array<number>>([28403111, 31108722, 1824025894, 167827]);
let musicListDetails = ref<Array<any>>([]);

getMusicDetailByIDs(musicListIDs.value).then((res: any) => {
  console.log("歌曲列表详情");
  console.log(res);
  musicListDetails.value = res.songs;
});

const emit = defineEmits(["changeBottomOpen", "changeCurMusic"]);

const getPlayerBottomHeight = computed(() => {
  return isOpen.value ? 800 : 200;
});

const playerBottomDragStart = (event) => {
  console.log("这里是touchstart");
  touchStartPos.value = event.touches[0].pageY;
};

const playerBottomDragMove = (event) => {
  if (event.touches[0].pageY - touchStartPos.value < -50 && !isOpen.value) {
    isOpen.value = true;
    emit("changeBottomOpen", true);
  } else if (
    event.touches[0].pageY - touchStartPos.value > 50 &&
    isOpen.value
  ) {
    isOpen.value = false;
    emit("changeBottomOpen", false);
  }
};

const OnSongClick = (music: any) => {
  console.log(music);
  emit("changeCurMusic", music.id);
};
</script>

<style scoped>
.player-bottom-box {
  width: 100vw;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: 60rpx 60rpx 0 0;
  transition: height 0.2s ease-in-out;
}

.music-list-box {
  height: 500rpx;
  padding: 0 40rpx 0 40rpx;
  box-sizing: border-box;
}

.music-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6rpx;
  padding: 10rpx;
  position: relative;
  box-sizing: border-box;
  color: rgb(152, 152, 152);
  font-size: 20rpx;
}

.music-name {
  font-size: 26rpx;
  color: black;
}

.cur-play-music-item {
  color: rgb(240, 78, 57);
}

.cur-play-music-item .music-name {
  color: rgb(240, 78, 57);
}

.music-name-delimiter{
  margin: 0 6rpx;
}

.music-line {
  width: 100%;
  height: 1rpx;
  background: gray;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
