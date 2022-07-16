"use strict";
var utils_request = require("../utils/request.js");
const getMusicUrlByID = (id) => {
  return utils_request.request({
    url: `/song/url?id=${id}`,
    method: "GET"
  });
};
const getMusicDetailByID = (id) => {
  return utils_request.request({
    url: `/song/detail?ids=${id}`,
    method: "GET"
  });
};
const getMusicLrcByID = (id) => {
  return utils_request.request({
    url: `/lyric?id=${id}`,
    method: "GET"
  });
};
exports.getMusicDetailByID = getMusicDetailByID;
exports.getMusicLrcByID = getMusicLrcByID;
exports.getMusicUrlByID = getMusicUrlByID;
