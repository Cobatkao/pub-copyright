const request = (url, config) => {
  return fetch(url, config)
    .then((res) => {
      if (!res.ok) {
        // 服务器异常返回
        throw Error("");
      }

      return res.json();
    })
    .then((resJson) => {
      if (!resJson) {
        // 项目内部认为的错误
        throw Error("抛出错误");
      } else {
        return resJson;
      }
    })
    .catch((error) => {
      // 公共错误处理
      console.warn(error && error.message);
    });
};

// GET请求
export const get = (url) => {
  return request(url, { method: "GET" });
};

// POST请求
export const post = (url, data) => {
  return request(url, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  });
};
