"use strict";
var common_vendor = require("../common/vendor.js");
const url_all = {
  dev: "http://192.168.50.127:3000"
};
let BASEURL = url_all["dev"];
function handleRequest(options, resolve, reject) {
  common_vendor.index.request({
    url: BASEURL + options.url,
    method: options.method,
    data: options.data,
    success: (response) => {
      return resolve(response.data);
    },
    fail: (fail) => {
      console.log("fail", fail);
      return reject(fail);
    }
  });
}
const request = (options) => {
  return new Promise((resolve, rejects) => {
    handleRequest(options, resolve, rejects);
  });
};
exports.request = request;
