const canvas = document.querySelector("#canvas");
const tempCanvas = document.querySelector("#temp-canvas");

const previewImage = document.getElementById("img");

const signaturePad = new window.SignaturePad(canvas, {
  throttle: 0, // 防抖间隔
  minWidth: 0.5, // 线条最小宽度
  maxWidth: 2.5, // 线条最大宽度
  penColor: "black", // 画笔颜色
  backgroundColor: "transparent", // 背景颜色
});

// const tempSignaturePad = new window.SignaturePad(tempCanvas, {
//   backgroundColor: "transparent", // 背景颜色
// });

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/**
 * @description: 屏幕改变
 */
function resizeCanvas() {
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);
  signaturePad.clear();
}

/**
 * @description: 生成图片
 */
function generateImage() {
  const ctx = tempCanvas.getContext("2d");
  ctx.drawImage(signaturePad.canvas, 0, 0, 600, 337.5, 0, 0, 200, 112.5);
  const data = tempCanvas.toDataURL("image/png");
  //   ctx.putImageData(signaturePad.canvas.getContext("2d").getImageData(0, 0, 600, 337.5), 0, 0, 200, 112.5, 600, 337.5);

  //   tempSignaturePad.fromDataURL(data, {
  //     ratio: 1,
  //     width: 200,
  //     height: 112.5,
  //     xOffset: 0,
  //     yOffset: 0,
  //   });
  //   data = tempSignaturePad.toDataURL("image/png");

  previewImage.setAttribute("src", data);

  const a = document.createElement("a");
  a.download = "demo.png";
  a.href = data;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// // 将签名图像作为数据 URL 返回（查看 https://mdn.io/todataurl 获取可能的参数列表）
// signaturePad.toDataURL(); // 保存图像为 PNG
// signaturePad.toDataURL("image/jpeg"); // 保存图像为 JPEG
// signaturePad.toDataURL("image/jpeg", 0.5); // 保存图像为 JPEG，图像质量为 0.5
// signaturePad.toDataURL("image/svg+xml"); // 保存图像为 SVG 数据 URL

// // 返回 SVG 字符串，而不进行 base64 转换
// signaturePad.toSVG(); // "<svg...</svg>"
// signaturePad.toSVG({includeBackgroundColor: true}); // 在 SVG 输出中添加背景颜色

// // 从数据 URL  draws 签名图像（主要使用 https://mdn.io/drawImage 在底层实现）
// // 注意：这个方法不会填充签名的内部数据结构。因此，在使用 #fromDataURL 之后，#toData 不会正确工作。
// signaturePad.fromDataURL("data:image/png;base64,iVBORw0K...");

// // 从数据 URL  draws 签名图像，并使用给定的选项对其进行修改
// signaturePad.fromDataURL("data:image/png;base64,iVBORw0K...", { ratio: 1, width: 400, height: 200, xOffset: 100, yOffset: 50 });

// // 将签名图像作为一个点组的数组返回
// const data = signaturePad.toData();

// // 从一个点组的数组 draws 签名图像
// signaturePad.fromData(data);

// // 从一个点组的数组 draws 签名图像，不清除现有的图像（clear 默认为 true，如果不提供）
// signaturePad.fromData(data, { clear: false });

// // 清除画布
// signaturePad.clear();

// // 如果画布为空，返回 true，否则返回 false
// signaturePad.isEmpty();

// // 取消绑定所有事件处理程序
// signaturePad.off();

// // 重新绑定所有事件处理程序
// signaturePad.on();
// // 200 112.5

// // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible parameters)
// signaturePad.toDataURL(); // save image as PNG
// signaturePad.toDataURL("image/jpeg"); // save image as JPEG
// signaturePad.toDataURL("image/jpeg", 0.5); // save image as JPEG with 0.5 image quality
// signaturePad.toDataURL("image/svg+xml"); // save image as SVG data url

// // Return svg string without converting to base64
// signaturePad.toSVG(); // "<svg...</svg>"
// signaturePad.toSVG({includeBackgroundColor: true}); // add background color to svg output

// // Draws signature image from data URL (mostly uses https://mdn.io/drawImage under-the-hood)
// // NOTE: This method does not populate internal data structure that represents drawn signature. Thus, after using #fromDataURL, #toData won't work properly.
// signaturePad.fromDataURL("data:image/png;base64,iVBORw0K...");

// // Draws signature image from data URL and alters it with the given options
// signaturePad.fromDataURL("data:image/png;base64,iVBORw0K...", { ratio: 1, width: 400, height: 200, xOffset: 100, yOffset: 50 });

// // Returns signature image as an array of point groups
// const data = signaturePad.toData();

// // Draws signature image from an array of point groups
// signaturePad.fromData(data);

// // Draws signature image from an array of point groups, without clearing your existing image (clear defaults to true if not provided)
// signaturePad.fromData(data, { clear: false });

// // Clears the canvas
// signaturePad.clear();

// // Returns true if canvas is empty, otherwise returns false
// signaturePad.isEmpty();

// // Unbinds all event handlers
// signaturePad.off();

// // Rebinds all event handlers
// signaturePad.on();
