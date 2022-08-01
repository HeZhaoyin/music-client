import { request } from "../utils/request";

export const getMusicUrlByID = (id: string | number) => {
  return request({
    url: `/song/url?id=${id}`,
    method: "GET",
    withCredentials: true,
  });
};

export const getMusicDetailByID = (id: string | number) => {
  return request({
    url: `/song/detail?ids=${id}`,
    method: "GET",
  });
};

export const getMusicDetailByIDs = (id: Array<number>) => {
  return request({
    url: `/song/detail?ids=${id}`,
    method: "GET",
  });
};

export const getMusicLrcByID = (id: string | number) => {
  return request({
    url: `/lyric?id=${id}`,
    method: "GET",
  });
};
