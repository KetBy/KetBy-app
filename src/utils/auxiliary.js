export const randStr = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const randArrElem = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

const lerpColor = (a, b, amount) => {
  var aRGB = hexToRgb(a);
  var bRGB = hexToRgb(b);
  var r = lerp(aRGB.r, bRGB.r, amount);
  var g = lerp(aRGB.g, bRGB.g, amount);
  var b = lerp(aRGB.b, bRGB.b, amount);
  return rgbToHex(r, g, b);
};

const lerp = (a, b, amount) => {
  return (1 - amount) * a + amount * b;
};

const hexToRgb = (hex) => {
  var r = parseInt(hex.substr(1, 2), 16);
  var g = parseInt(hex.substr(3, 2), 16);
  var b = parseInt(hex.substr(5, 2), 16);
  return { r: r, g: g, b: b };
};

const rgbToHex = (r, g, b) => {
  var hex = ((r << 16) | (g << 8) | b).toString(16);
  return "#" + ("000000" + hex).slice(-6);
};

export const getPhaseColor = (value) => {
  var colors = ["#BA2BDE", "#0288d1", "#FFDC48", "#EB0014", "#BA2BDE"];
  var intervalPosition = value / (2 * Math.PI);
  var segmentIndex = Math.floor(intervalPosition * (colors.length - 1)) + 1;
  var segmentPosition = (intervalPosition * (colors.length - 1)) % 1;
  return lerpColor(
    colors[segmentIndex],
    colors[segmentIndex + 1],
    segmentPosition
  );
};
