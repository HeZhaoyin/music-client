<template>
  <view class="lrc-content-box" :style="'height:' + contentHeight + 'rpx'">
    <view
      class="lrc-text-list-box"
      :style="
        'top:' +
        contentHeight / 2 +
        'rpx;transform:translateY(' +
        lrcScrollTop +
        'px'
      "
    >
      <span
        :id="'lrcText' + index"
        :class="activeIndex == index ? 'lrc-active' : ''"
        class="lrc-text"
        :key="lrc.uid"
        v-for="(lrc, index) in arrLrc"
        >{{ lrc.lyric }}</span
      >
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getMusicLrcByID } from "@/apis/music";
import {
  ComponentInternalInstance,
  getCurrentInstance,
  onMounted,
  Ref,
  ref,
  watch,
} from "vue";

const instance = getCurrentInstance();

interface ILyric {
  time: number;
  lyric: string;
  uid: number;
}

interface IReturnLyric {
  lyric: ILyric[];
  tlyric?: ILyric[];
}

const formatMusicLyrics = (lyric?: string): IReturnLyric => {
  if (lyric === "") {
    return { lyric: [{ time: 0, lyric: "这个地方没有歌词！", uid: 520520 }] };
  }
  const lyricObjArr: ILyric[] = []; // 最终生成的歌词数组

  // 将歌曲字符串变成数组，数组每一项就是当前歌词信息
  const lineLyric: any = lyric?.split(/\n/);

  // 匹配中括号里正则的
  const regTime = /\d{2}:\d{2}.\d{2,3}/;

  // 循环遍历歌曲数组
  for (let i = 0; i < lineLyric?.length; i++) {
    if (lineLyric[i] === "") continue;
    const time: number = formatLyricTime(lineLyric[i].match(regTime)[0]);

    if (lineLyric[i].split("]")[1] !== "") {
      lyricObjArr.push({
        time: time,
        lyric: lineLyric[i].split("]")[1],
        uid: parseInt(Math.random().toString().slice(-6)),
      });
    }
  }
  console.log(lyricObjArr);

  return {
    lyric: lyricObjArr,
  };
};

const formatLyricTime = (time: string) => {
  const regMin = /.*:/;
  const regSec = /:.*\./;
  const regMs = /\./;

  const min = parseInt((time.match(regMin) as any)[0].slice(0, 2));
  let sec = parseInt((time.match(regSec) as any)[0].slice(1, 3));
  const ms = time.slice(
    (time.match(regMs) as any).index + 1,
    (time.match(regMs) as any).index + 3
  );
  if (min !== 0) {
    sec += min * 60;
  }
  return Number(sec + "." + ms);
};

const props = defineProps({
  musicID: { type: Number, required: true },
  audioCurTime: { type: Number, required: true },
});

let arrLrc = ref<Array<ILyric>>([]);
const activeIndex = ref<number>(0);
let lrcScrollTop = ref<number>(0);
let contentHeight = ref<number>(500);
watch(
  () => props.audioCurTime,
  (time: number) => {
    if (time != 0 && time > (arrLrc.value[activeIndex.value + 1].time - 0.6)) {
      activeIndex.value++;

      if (instance) {
        const query = uni.createSelectorQuery().in(instance);

        query
          .select(`#lrcText${activeIndex.value}`)
          .boundingClientRect((data) => {
            if (data && data.height) {
              lrcScrollTop.value -= data.height;
            }
            console.log(data);
          })
          .exec();
      }
    }
  }
);

onMounted(() => {});

getMusicLrcByID(props.musicID).then((lrcRes: any) => {
  console.log(lrcRes);
  arrLrc.value = formatMusicLyrics(lrcRes.lrc.lyric).lyric;
});

const onBottomOpenChange = (isOpen: boolean) => {
  console.log("歌词组件触发了", isOpen);
  if (isOpen) {
    contentHeight.value = 200;
  } else {
    contentHeight.value = 500;
  }
};

defineExpose({
  onBottomOpenChange,
});
</script>

<style>
.lrc-content-box {
  height: 500rpx;
  margin-top: 30rpx;
  overflow: hidden;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 20%,
    black 80%,
    transparent 100%
  );
  transition: all 0.4s linear;
}

.lrc-text-list-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s linear;
  position: relative;
  top: 250rpx;
}

.lrc-text {
  font-size: 36rpx;
  color: rgb(105, 105, 105);
  transition: color 0.6s linear;
}

.lrc-active {
  color: white;
}
</style>
