"use strict";
var common_vendor = require("../../../common/vendor.js");
var apis_music = require("../../../apis/music.js");
require("../../../utils/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "LrcArea",
  props: {
    musicID: { type: Number, required: true },
    audioCurTime: { type: Number, required: true }
  },
  setup(__props, { expose }) {
    const props = __props;
    const instance = common_vendor.getCurrentInstance();
    const formatMusicLyrics = (lyric) => {
      if (lyric === "") {
        return { lyric: [{ time: 0, lyric: "\u8FD9\u4E2A\u5730\u65B9\u6CA1\u6709\u6B4C\u8BCD\uFF01", uid: 520520 }] };
      }
      const lyricObjArr = [];
      const lineLyric = lyric == null ? void 0 : lyric.split(/\n/);
      const regTime = /\d{2}:\d{2}.\d{2,3}/;
      for (let i = 0; i < (lineLyric == null ? void 0 : lineLyric.length); i++) {
        if (lineLyric[i] === "")
          continue;
        const time = formatLyricTime(lineLyric[i].match(regTime)[0]);
        if (lineLyric[i].split("]")[1] !== "") {
          lyricObjArr.push({
            time,
            lyric: lineLyric[i].split("]")[1],
            uid: parseInt(Math.random().toString().slice(-6))
          });
        }
      }
      console.log(lyricObjArr);
      return {
        lyric: lyricObjArr
      };
    };
    const formatLyricTime = (time) => {
      const regMin = /.*:/;
      const regSec = /:.*\./;
      const regMs = /\./;
      const min = parseInt(time.match(regMin)[0].slice(0, 2));
      let sec = parseInt(time.match(regSec)[0].slice(1, 3));
      const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3);
      if (min !== 0) {
        sec += min * 60;
      }
      return Number(sec + "." + ms);
    };
    let arrLrc = common_vendor.ref([]);
    const activeIndex = common_vendor.ref(0);
    let lrcScrollTop = common_vendor.ref(0);
    let contentHeight = common_vendor.ref(500);
    common_vendor.watch(() => props.audioCurTime, (time) => {
      if (time != 0 && time > arrLrc.value[activeIndex.value + 1].time - 0.6) {
        activeIndex.value++;
        if (instance) {
          const query = common_vendor.index.createSelectorQuery().in(instance);
          query.select(`#lrcText${activeIndex.value}`).boundingClientRect((data) => {
            if (data && data.height) {
              lrcScrollTop.value -= data.height;
            }
            console.log(data);
          }).exec();
        }
      }
    });
    common_vendor.onMounted(() => {
      initLrcData();
    });
    common_vendor.watch(() => props.musicID, (musicID, oldMusicID) => {
      initLrcData();
    });
    const initLrcData = () => {
      apis_music.getMusicLrcByID(props.musicID).then((lrcRes) => {
        console.log(lrcRes);
        activeIndex.value = 0;
        lrcScrollTop.value = 0;
        arrLrc.value = formatMusicLyrics(lrcRes.lrc.lyric).lyric;
      });
    };
    const onBottomOpenChange = (isOpen) => {
      console.log("\u6B4C\u8BCD\u7EC4\u4EF6\u89E6\u53D1\u4E86", isOpen);
      if (isOpen) {
        contentHeight.value = 200;
      } else {
        contentHeight.value = 500;
      }
    };
    expose({
      onBottomOpenChange
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(arrLrc), (lrc, index, i0) => {
          return {
            a: common_vendor.t(lrc.lyric),
            b: "lrcText" + index,
            c: common_vendor.n(activeIndex.value == index ? "lrc-active" : ""),
            d: lrc.uid
          };
        }),
        b: common_vendor.s("top:" + (common_vendor.unref(contentHeight) / 2 - 13) + "rpx;transform:translateY(" + common_vendor.unref(lrcScrollTop) + "px"),
        c: common_vendor.s("height:" + common_vendor.unref(contentHeight) + "rpx")
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/web/music/music-client/src/pages/index/components/LrcArea.vue"]]);
wx.createComponent(Component);
