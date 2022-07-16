"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "MusicController",
  setup(__props) {
    const isPlay = common_vendor.ref(false);
    const curAudio = common_vendor.index.getBackgroundAudioManager();
    curAudio.onPlay(() => {
      isPlay.value = true;
    });
    curAudio.onPause(() => {
      isPlay.value = false;
    });
    const changePlayStatus = () => {
      console.log("\u89E6\u53D1");
      if (isPlay.value) {
        curAudio.pause();
      } else {
        curAudio.play();
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(isPlay.value ? "active" : ""),
        b: common_vendor.n(isPlay.value ? "" : "active"),
        c: common_vendor.o(changePlayStatus)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-abe9682e"], ["__file", "D:/web/music/music-client/src/pages/index/components/MusicController.vue"]]);
wx.createComponent(Component);
