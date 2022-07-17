<template>
  <view
    :style="'height:' + getPlayerBottomHeight + 'rpx'"
    dragable="true"
    class="player-bottom-box"
    @touchstart.self="playerBottomDragStart"
    @touchmove.self="playerBottomDragMove"
  >
    <music-controller></music-controller>
    <scroll-view scroll-y="true" style="height:400rpx">
      <view style="color:black" v-for="i in 100">{{ i }}</view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import MusicController from "./MusicController.vue";
let touchStartPos = ref(0);
let isOpen = ref(false);

const emit = defineEmits(["changeBottomOpen"]);

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
</script>

<style>
.player-bottom-box {
  width: 100vw;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: 60rpx 60rpx 0 0;
  transition: height 0.2s ease-in-out;
}
</style>
