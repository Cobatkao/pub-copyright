export default (url) => {
  return `https://mianbaoduo.com/mbd/api/gen_qrcode?content=${encodeURIComponent(
    url
  )}`;
};
