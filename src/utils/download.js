// module.exports = function(data, filename, mime, bom) {
//   var blobData = (typeof bom !== 'undefined') ? [bom, data] : [data]
//   var blob = new Blob(blobData, {type: mime || 'application/octet-stream'});
//   if (typeof window.navigator.msSaveBlob !== 'undefined') {
//       // IE workaround for "HTML7007: One or more blob URLs were
//       // revoked by closing the blob for which they were created.
//       // These URLs will no longer resolve as the data backing
//       // the URL has been freed."
//       window.navigator.msSaveBlob(blob, filename);
//   }
//   else {
//       var blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
//       var tempLink = document.createElement('a');
//       tempLink.style.display = 'none';
//       tempLink.href = blobURL;
//       tempLink.setAttribute('download', filename);

//       // Safari thinks _blank anchor are pop ups. We only want to set _blank
//       // target if the browser does not support the HTML5 download attribute.
//       // This allows you to download files in desktop safari if pop up blocking
//       // is enabled.
//       if (typeof tempLink.download === 'undefined') {
//           tempLink.setAttribute('target', '_blank');
//       }

//       document.body.appendChild(tempLink);
//       tempLink.click();

//       // Fixes "webkit blob resource error 1"
//       setTimeout(function() {
//           document.body.removeChild(tempLink);
//           window.URL.revokeObjectURL(blobURL);
//       }, 200)
//   }
// }

// import getOs from './getOs';

// export default (sUrl) => {
//   const { isChrome, isSafari } = getOs();

//   //iOS devices do not support downloading. We have to inform user about this.
//   if (/(iP)/g.test(navigator.userAgent)) {
//       alert('Your device does not support files downloading. Please try again in desktop browser.');
//       return false;
//   }

//   //If in Chrome or Safari - download via virtual link click
//   if (isChrome || isSafari) {
//       //Creating new link node.
//       var link = document.createElement('a');
//       link.href = sUrl;

//       if (link.download !== undefined) {
//           //Set HTML5 download attribute. This will prevent file from opening if supported.
//           var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
//           link.download = fileName;
//       }

//       //Dispatching click event.
//       if (document.createEvent) {
//           var e = document.createEvent('MouseEvents');
//           e.initEvent('click', true, true);
//           link.dispatchEvent(e);
//           return true;
//       }
//   }

//   // Force file download (whether supported by server).
//   if (sUrl.indexOf('?') === -1) {
//       sUrl += '?download';
//   }

//   window.open(sUrl, '_self');
//   return true;
// };

export default function (sUrl, name, hasAttname = false) {
  // if (!sUrl) return this.$toast.warning("受保护的PDF，无法直接下载");

  const isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
  const isSafari = navigator.userAgent.toLowerCase().indexOf("safari") > -1;

  //iOS devices do not support downloading. We have to inform user about this.
  if (/(iP)/g.test(navigator.userAgent)) {
    alert(
      "Your device does not support files downloading. Please try again in desktop browser."
    );
    return false;
  }

  //If in Chrome or Safari - download via virtual link click
  if (isChrome || isSafari) {
    //Creating new link node.
    var link = document.createElement("a");
    if (!hasAttname) {
      const query = sUrl && sUrl.includes("?") ? "&" : "?";
      link.href = `${sUrl}${query}attname=${encodeURI(name)}`;
    } else {
      link.href = sUrl;
    }
    if (link.download !== undefined) {
      //Set HTML5 download attribute. This will prevent file from opening if supported.
      var fileName = sUrl.substring(sUrl.lastIndexOf("/") + 1, sUrl.length);
      link.download = fileName;
    }

    //Dispatching click event.
    if (document.createEvent) {
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      link.dispatchEvent(e);
      return true;
    }
  }

  // Force file download (whether supported by server).
  if (sUrl.indexOf("?") === -1) {
    sUrl += `?download=${encodeURI(name)}&attname=${encodeURI(name)}`;
  }

  window.open(`${sUrl}&attname=${encodeURI(name)}`, "_self");
  return true;
}
