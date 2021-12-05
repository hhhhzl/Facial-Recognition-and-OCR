// https://stackoverflow.com/questions/52059596/loading-an-image-on-web-browser-using-promise/52060802
const loadImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.src = url;
  });

export function img2Base64(imgURL) {
  return loadImage(imgURL)
    .then((img) => {
      let canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL("image/jpeg", 0.7);
    })
    .catch((err) => console.log(err));
}

export function imageCrop(imgURL, locLeft, locTop, locWidth, locHeight) {
  let canvas = document.createElement("canvas");
  canvas.width = locWidth;
  canvas.height = locHeight;

  return loadImage(imgURL)
    .then((img) => {
      let ctx = canvas.getContext("2d");
      ctx.drawImage(
        img,
        locLeft,
        locTop,
        locWidth,
        locHeight,
        0,
        0,
        locWidth,
        locHeight
      );
      return canvas.toDataURL("image/jpeg", 0.7);
    })
    .catch((err) => console.log(err));
}

export function imageAddBBox(imgURL, locLeft, locTop, locWidth, locHeight) {
  let canvas = document.createElement("canvas");
  console.log("?????")
  return loadImage(imgURL)
    .then((img) => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      let ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);
      ctx.beginPath();
      ctx.moveTo(locLeft, locTop);
      ctx.lineTo(locLeft, locTop + locHeight);
      ctx.lineTo(locLeft + locWidth, locTop + locHeight);
      ctx.lineTo(locLeft + locWidth, locTop);
      ctx.lineTo(locLeft, locTop);
      ctx.lineWidth = 10;
      ctx.strokeStyle = "lightgreen";
      ctx.stroke();
      return canvas.toDataURL("image/jpeg", 0.7);
    })
    .catch((err) => console.log(err));
}
