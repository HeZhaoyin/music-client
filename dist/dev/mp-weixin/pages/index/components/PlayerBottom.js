"use strict";
var common_vendor = require("../../../common/vendor.js");
var apis_music = require("../../../apis/music.js");
require("../../../utils/request.js");
if (!Math) {
  MusicController();
}
const MusicController = () => "./MusicController.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "PlayerBottom",
  props: {
    curMusicId: {
      type: Number,
      default: 0
    }
  },
  emits: ["changeBottomOpen", "changeCurMusic"],
  setup(__props, { emit }) {
    let touchStartPos = common_vendor.ref(0);
    let isOpen = common_vendor.ref(false);
    let musicListIDs = common_vendor.ref([28403111, 31108722, 1824025894, 167827]);
    let musicListDetails = common_vendor.ref([]);
    apis_music.getMusicDetailByIDs(musicListIDs.value).then((res) => {
      console.log("\u6B4C\u66F2\u5217\u8868\u8BE6\u60C5");
      console.log(res);
      musicListDetails.value = res.songs;
    });
    const getPlayerBottomHeight = common_vendor.computed$1(() => {
      return isOpen.value ? 800 : 200;
    });
    const playerBottomDragStart = (event) => {
      console.log("\u8FD9\u91CC\u662Ftouchstart");
      touchStartPos.value = event.touches[0].pageY;
    };
    const playerBottomDragMove = (event) => {
      if (event.touches[0].pageY - touchStartPos.value < -50 && !isOpen.value) {
        isOpen.value = true;
        emit("changeBottomOpen", true);
      } else if (event.touches[0].pageY - touchStartPos.value > 50 && isOpen.value) {
        isOpen.value = false;
        emit("changeBottomOpen", false);
      }
    };
    const OnSongClick = (music) => {
      console.log(music);
      emit("changeCurMusic", music.id);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(musicListDetails), (music, k0, i0) => {
          return {
            a: common_vendor.t(music.name),
            b: common_vendor.f(music.ar, (ar, index, i1) => {
              return common_vendor.e({
                a: common_vendor.t(ar.name),
                b: index != music.ar.length - 1
              }, index != music.ar.length - 1 ? {} : {});
            }),
            c: common_vendor.n(__props.curMusicId == music.id ? "cur-play-music-item" : ""),
            d: common_vendor.o(($event) => OnSongClick(music))
          };
        }),
        b: common_vendor.s("height:" + common_vendor.unref(getPlayerBottomHeight) + "rpx"),
        c: common_vendor.o(playerBottomDragStart),
        d: common_vendor.o(playerBottomDragMove)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c7029e58"], ["__file", "D:/web/music/music-client/src/pages/index/components/PlayerBottom.vue"]]);
wx.createComponent(Component);
