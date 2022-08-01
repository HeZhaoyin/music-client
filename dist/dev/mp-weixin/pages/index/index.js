"use strict";
var common_vendor = require("../../common/vendor.js");
var apis_music = require("../../apis/music.js");
require("../../utils/request.js");
if (!Math) {
  (LrcArea + PlayerBottom)();
}
const PlayerBottom = () => "./components/PlayerBottom.js";
const LrcArea = () => "./components/LrcArea.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const lrcArea = common_vendor.ref(null);
    const curAudio = common_vendor.index.getBackgroundAudioManager();
    const audioCurTime = common_vendor.ref(0);
    const audioInfo = common_vendor.reactive({
      name: "",
      singer: "",
      pic: ""
    });
    let curMusicID = 167827;
    common_vendor.onMounted(() => {
      initMusicByID();
    });
    const initMusicByID = () => {
      apis_music.getMusicDetailByID(curMusicID).then((detailRes) => {
        console.log(detailRes);
        const musicDetail = detailRes.songs[0];
        apis_music.getMusicUrlByID(curMusicID).then((res) => {
          curAudio.title = musicDetail.name;
          audioInfo.name = musicDetail.name;
          let tempSingerName = "";
          musicDetail.ar.forEach((singer, index) => {
            if (index != musicDetail.ar.length - 1) {
              tempSingerName = tempSingerName + singer.name + "/";
            } else {
              tempSingerName = tempSingerName + singer.name;
            }
          });
          console.log("\u6B4C\u624B\u540D\u662F:", tempSingerName);
          curAudio.singer = tempSingerName;
          audioInfo.singer = tempSingerName;
          curAudio.coverImgUrl = musicDetail.al.picUrl;
          audioInfo.pic = musicDetail.al.picUrl;
          curAudio.src = res.data[0].url;
        });
      });
    };
    curAudio.onTimeUpdate(() => {
      audioCurTime.value = curAudio.currentTime;
    });
    const OnChangeBottomOpen = (isOpen) => {
      lrcArea.value.onBottomOpenChange(isOpen);
    };
    const OnChangeCurMusic = (musicID) => {
      curMusicID = musicID;
      initMusicByID();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: audioInfo.pic != ""
      }, audioInfo.pic != "" ? {
        b: common_vendor.s("background-image:url(" + audioInfo.pic + "?param=50y50)")
      } : {}, {
        c: audioInfo.pic != ""
      }, audioInfo.pic != "" ? {
        d: common_vendor.s("background-image:url(" + audioInfo.pic + "?param=300y300)")
      } : {}, {
        e: common_vendor.t(audioInfo.name),
        f: common_vendor.t(audioInfo.singer),
        g: common_vendor.sr(lrcArea, "1badc801-0", {
          "k": "lrcArea"
        }),
        h: common_vendor.p({
          ["music-i-d"]: common_vendor.unref(curMusicID),
          ["audio-cur-time"]: audioCurTime.value
        }),
        i: common_vendor.o(OnChangeBottomOpen),
        j: common_vendor.o(OnChangeCurMusic),
        k: common_vendor.p({
          ["cur-music-id"]: common_vendor.unref(curMusicID)
        }),
        l: common_vendor.o(() => {
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1badc801"], ["__file", "D:/web/music/music-client/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
