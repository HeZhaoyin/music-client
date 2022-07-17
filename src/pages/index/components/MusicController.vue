<template>
  <view class="controller-box">
    <view class="controller-play-box" @click="changePlayStatus">
      <view class="play-btn-box">
        <view :class="isPlay ? 'active' : ''" class="pause">
          <view class="line line_1"></view>
          <view class="line line_2"></view>
        </view>
        <view :class="isPlay ? '' : 'active'" class="play">
          <view class="line line_1"></view>
          <view class="line line_2"></view>
          <view class="line line_3"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isPlay = ref<boolean>(false);
const curAudio: UniApp.BackgroundAudioManager = uni.getBackgroundAudioManager();

curAudio.onPlay(() => {
  isPlay.value = true;
});

curAudio.onPause(() => {
  isPlay.value = false;
});

const changePlayStatus = () => {
  console.log("触发");
  if (isPlay.value) {
    curAudio.pause();
  } else {
    curAudio.play();
  }
};
</script>

<style scoped>
.controller-box {
  width: 100vw;
  height: 120rpx;
  display: flex;
  justify-content: center;
  padding-top: 20rpx;
  box-sizing: border-box;
}
.controller-play-box {
  width: 100rpx;
  height: 100rpx;
  background: #000;
  background-image: linear-gradient(
    -20deg,
    #ddd6f3 0%,
    #faaca8 100%,
    #faaca8 100%
  );
  border-radius: 50%;
  box-shadow: 0 0 5px rgb(0 0 0 / 15%), 0 2px 10px rgb(0 0 0 / 10%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-btn-box {
  width: 40rpx;
  height: 40rpx;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

.pause,
.play {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
}
.line {
  position: absolute;
  width: 4rpx;
  height: 50%;
  background: #000;
  border-radius: 5rpx;
  transition: all 400ms cubic-bezier(0.8, 0, 0.33, 1);
}
.pause .line_1 {
  margin: 25% 0;
  left: 28%;
}
.pause .line_2 {
  margin: 100% -16%;
  right: 45%;
  transition-delay: 200ms;
}
.pause.active .line {
  opacity: 1;
}
.pause.active .line_1 {
  margin: 25% 0;
  left: 28%;
}
.pause.active .line_2 {
  margin: 25% 0;
  right: 28%;
}
.play .line {
  margin: 25% 0;
}
.play .line_1 {
  left: 28%;
}
.play .line_2 {
  height: 56%;
  left: 60%;
  transform: rotate(-55deg) translateY(-64rpx) translateX(8rpx);
  transition-delay: 100ms;
}
.play .line_3 {
  height: 56%;
  left: 60%;
  transform: rotate(55deg) translateY(-64rpx) translateX(8rpx);
  transition-delay: 200ms;
}
.play.active .line {
  opacity: 1;
  height: 62%;
  margin: 20% 0;
}
.play.active .line_1 {
  left: 28%;
  transform: translateY(-1rpx);
}
.play.active .line_2 {
  height: 56%;
  left: 63%;
  transform: rotate(-55deg) translateY(-8rpx) translateX(1rpx);
}
.play.active .line_3 {
  height: 56%;
  left: 63%;
  transform: rotate(55deg) translateY(8rpx) translateX(1rpx);
}
</style>
