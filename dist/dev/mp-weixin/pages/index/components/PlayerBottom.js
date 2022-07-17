"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Math) {
  MusicController();
}
const MusicController = () => "./MusicController.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "PlayerBottom",
  emits: ["changeBottomOpen"],
  setup(__props, { emit }) {
    let touchStartPos = common_vendor.ref(0);
    let isOpen = common_vendor.ref(false);
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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(100, (i, k0, i0) => {
          return {
            a: common_vendor.t(i)
          };
        }),
        b: common_vendor.s("height:" + common_vendor.unref(getPlayerBottomHeight) + "rpx"),
        c: common_vendor.o(playerBottomDragStart),
        d: common_vendor.o(playerBottomDragMove)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/web/music/music-client/src/pages/index/components/PlayerBottom.vue"]]);
wx.createComponent(Component);
