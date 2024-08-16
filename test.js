_imageShape({ imageShape: "./twitter.png" });

/**
 * @description: 处理图片
 * @param {*} option
 */
function _imageShape(option) {
  var img = window.document.createElement("img");
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    this._maskCanvas = tempCanvas;
    this._maskCanvas.width = img.width;
    this._maskCanvas.height = img.height;

    var ctx = this._maskCanvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var imageData = ctx.getImageData(
      0,
      0,
      this._maskCanvas.width,
      this._maskCanvas.height
    );
    var newImageData = ctx.createImageData(imageData);

    for (var i = 0; i < imageData.data.length; i += 4) {
      var tone =
        imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
      var alpha = imageData.data[i + 3];

      if (alpha < 128 || tone > 128 * 3) {
        // Area not to draw
        newImageData.data[i] =
          newImageData.data[i + 1] =
          newImageData.data[i + 2] =
            255;
        newImageData.data[i + 3] = 0;
      } else {
        // Area to draw
        newImageData.data[i] =
          newImageData.data[i + 1] =
          newImageData.data[i + 2] =
            0;
        newImageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(newImageData, 0, 0);
    // _renderShape.call(this, option);
  };

  img.onerror = function () {
    //   _renderShape.call(this, option);
  };
  img.src = option.imageShape;
}

// /**
//  * @description: 渲染轮廓图
//  * @param {*} option
//  */
// function _renderShape(option) {
//     // 如果 _maskCanvas 存在，将其放大到跟 canvas 一样大
//     if (this._maskCanvas) {
//         // 将 clearCanvas 选项设置为 false，以便在渲染 _maskCanvas 的时候不清除画布
//         option.clearCanvas = false

//         // 创建一个临时 canvas，并将其背景色设置为 option.backgroundColor
//         /* Determine bgPixel by creating
//          another canvas and fill the specified background color. */
//         var bctx = window.document.createElement('canvas').getContext('2d')

//         bctx.fillStyle = option.backgroundColor || '#fff'
//         bctx.fillRect(0, 0, 1, 1)
//         // 获取背景色的像素值
//         var bgPixel = bctx.getImageData(0, 0, 1, 1).data

//         // 创建一个跟 canvas 一样大的 canvas
//         var maskCanvasScaled = window.document.createElement('canvas')
//         maskCanvasScaled.width = this._canvas.width
//         maskCanvasScaled.height = this._canvas.height
//         // 将 _maskCanvas 绘制到 maskCanvasScaled  canvas 中
//         var ctx = maskCanvasScaled.getContext('2d')

//         ctx.drawImage(this._maskCanvas,
//             0, 0, this._maskCanvas.width, this._maskCanvas.height,
//             0, 0, maskCanvasScaled.width, maskCanvasScaled.height)

//         // 获取 maskCanvasScaled 的像素数据
//         var imageData = ctx.getImageData(0, 0, maskCanvasScaled.width, maskCanvasScaled.height)
//         // 创建一个新的像素数据对象
//         var newImageData = ctx.createImageData(imageData)
//         // 遍历像素数据
//         for (var i = 0; i < imageData.data.length; i += 4) {
//             // 如果当前像素的 alpha 值大于 128，就将其设置为背景色
//             if (imageData.data[i + 3] > 128) {
//                 newImageData.data[i] = bgPixel[0]
//                 newImageData.data[i + 1] = bgPixel[1]
//                 newImageData.data[i + 2] = bgPixel[2]
//                 newImageData.data[i + 3] = bgPixel[3]
//             } else {
//                 // 否则，将其设置为背景色的反色
//                 // This color must not be the same w/ the bgPixel.
//                 newImageData.data[i] = bgPixel[0]
//                 newImageData.data[i + 1] = bgPixel[1]
//                 newImageData.data[i + 2] = bgPixel[2]
//                 newImageData.data[i + 3] = bgPixel[3] ? (bgPixel[3] - 1) : 1
//             }
//         }
//         // 将新的像素数据绘制到 maskCanvasScaled  canvas 中
//         ctx.putImageData(newImageData, 0, 0)

//         // 将 maskCanvasScaled  canvas 绘制到 this._canvas  canvas 中
//         ctx = this._canvas.getContext('2d')
//         ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
//         ctx.drawImage(maskCanvasScaled, 0, 0);
//     }

//     // 如果 this._data 为空，并且配置了 noDataLoadingOption 选项
//     if(this._dataEmpty() && option && option.noDataLoadingOption) {
//         // 将 noDataLoadingOption 选项中的文本样式、背景色等信息设置到 _dataMask  div 中
//         var STYLE = ''
//         if(option.noDataLoadingOption.textStyle) {
//             if(typeof option.noDataLoadingOption.textStyle.color === 'string') {
//                 STYLE += ('color: ' + option.noDataLoadingOption.textStyle.color + ';')
//             }
//             if(typeof option.noDataLoadingOption.textStyle.fontSize === 'number') {
//                 STYLE += ('font-size: ' + option.noDataLoadingOption.textStyle.fontSize + 'px;')
//             }
//         }
//         if(typeof option.noDataLoadingOption.backgroundColor === 'string') {
//             this._dataMask.style.backgroundColor = option.noDataLoadingOption.backgroundColor
//         }
//         // 将 noDataLoadingOption 选项中的文本信息设置到 _dataMask  div 中
//         var TEXT = option.noDataLoadingOption.text || ''
//         this._showMask(LODAING_WRAPPTER_HTML_PRE + '<span class="__wc_no_data_text__" style="' + STYLE + '">' + TEXT + '</span>' + LODAING_WRAPPTER_HTML_END)
//     } else {
//         // 否则，隐藏 _dataMask  div，并将 this._wordcloud2  obj 重新实例化
//         this._showMask('');
//         this._wordcloud2 = WordCloud(this._canvas, option)
//     }
// }

/* 实际在网格上绘制文本 */
var drawText = function drawText(
  gx,
  gy,
  info,
  word,
  weight,
  distance,
  theta,
  rotateDeg,
  attributes
) {
  // 获取文本颜色，如果没有设置 getTextColor 函数，则使用默认颜色
  var color = getTextColor
    ? getTextColor(word, weight, info.fontSize, distance, theta)
    : settings.color;

  // 获取文本类名，如果没有设置 getTextClasses 函数，则使用默认类名
  var classes = getTextClasses
    ? getTextClasses(word, weight, info.fontSize, distance, theta)
    : settings.classes;

  // 计算文本在网格中的位置和大小
  var dimension = {
    x: (gx + info.bounds[3]) * g,
    y: (gy + info.bounds[0]) * g,
    w: (info.bounds[1] - info.bounds[3] + 1) * g,
    h: (info.bounds[2] - info.bounds[0] + 1) * g,
  };
  (28 + 6 / 2) * 8 * 1
  // 遍历所有的元素（一般是 canvas），并在其上绘制文本
  elements.forEach(function (el) {
    if (el.getContext) {
      var ctx = el.getContext("2d");
      var mu = info.mu;

      // 在绘制之前保存当前状态
      ctx.save();

      // 缩放画布，使得文本的像素大小与设置的 fontSize 一致
      ctx.scale(1 / mu, 1 / mu);

      // 设置文本样式
      ctx.font =
        settings.fontWeight +
        " " +
        (info.fontSize * mu).toString(10) +
        "px " +
        settings.fontFamily;
      ctx.fillStyle = color;

      // 将画布位置转换为文本应该被放置的原点坐标
      ctx.translate(
        (gx + info.gw / 2) * g * mu,
        (gy + info.gh / 2) * g * mu
      );

      // 旋转画布
      if (rotateDeg !== 0) {
        ctx.rotate(-rotateDeg);
      }

      // 设置文本位置和方向
      ctx.textBaseline = "middle";
      ctx.fillText(
        word,
        info.fillTextOffsetX * mu,
        (info.fillTextOffsetY + info.fontSize * 0.5) * mu
      );

      // 恢复之前的状态
      ctx.restore();
    }
  });
};

/* 实际在网格上绘制文本 */
var drawText = function drawText(
  gx,
  gy,
  info,
  word,
  weight,
  distance,
  theta,
  rotateDeg,
  attributes
) {
  var fontSize = info.fontSize;
  var color;
  if (getTextColor) {
    color = getTextColor(word, weight, fontSize, distance, theta);
  } else {
    color = settings.color;
  }

  var classes;
  if (getTextClasses) {
    classes = getTextClasses(word, weight, fontSize, distance, theta);
  } else {
    classes = settings.classes;
  }

  var dimension;
  var bounds = info.bounds;
  dimension = {
    x: (gx + bounds[3]) * g,
    y: (gy + bounds[0]) * g,
    w: (bounds[1] - bounds[3] + 1) * g,
    h: (bounds[2] - bounds[0] + 1) * g,
  };

  elements.forEach(function (el) {
    if (el.getContext) {
      var ctx = el.getContext("2d");
      var mu = info.mu;

      // 在绘制之前保存当前状态
      ctx.save();
      ctx.scale(1 / mu, 1 / mu);

      ctx.font =
        settings.fontWeight +
        " " +
        (fontSize * mu).toString(10) +
        "px " +
        settings.fontFamily;
      ctx.fillStyle = color;

      // 将画布位置转换为文本应该被放置的原点坐标
      ctx.translate((gx + info.gw / 2) * g * mu, (gy + info.gh / 2) * g * mu);

      if (rotateDeg !== 0) {
        ctx.rotate(-rotateDeg);
      }

      // 最后，填充文本

      // XXX: 我们不能使用 textBaseline = 'top' 因为 Firefox 和 Chrome 使用不同的默认行高来绘制 canvas。
      // 请参阅 https://bugzil.la/737852#c6。
      // 这里，我们使用 textBaseline = 'middle' 并将文本绘制在精确位于 0.5 * fontSize 的位置。
      ctx.textBaseline = "middle";
      ctx.fillText(
        word,
        info.fillTextOffsetX * mu,
        (info.fillTextOffsetY + fontSize * 0.5) * mu
      );

      // 下面的矩形始终与 <span> 的位置相匹配
      /* ctx.strokeRect(info.fillTextOffsetX, info.fillTextOffsetY,
	              info.fillTextWidth, info.fillTextHeight); */

      // 恢复之前的状态
      ctx.restore();
    }
  });
};

