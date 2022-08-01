const url_all = {
  dev: "http://192.168.31.125:3000", // 开发
  prod: "https://www.hezhaoyin.com:2335"
};
// let BASEURL = url_all["dev"];
let BASEURL = url_all["prod"];

function handleRequest(
  options: UniNamespace.RequestOptions,
  resolve: Function,
  reject: Function
) {
  uni.request({
    url: BASEURL + options.url,
    method: options.method,
    data: options.data,
    success: (response: UniApp.RequestSuccessCallbackResult) => {
      return resolve(response.data);
    },
    fail: (fail) => {
      console.log("fail", fail);
      return reject(fail);
    },
  });
}

export const request = (options: UniNamespace.RequestOptions) => {
  return new Promise((resolve, rejects) => {
    handleRequest(options, resolve, rejects);
  });
};
