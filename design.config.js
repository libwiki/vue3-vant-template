const designConfig = require("./design.config.json")
const designWidth = designConfig.designWidth; // 设计稿的宽度
const maxViewPort = designConfig.maxViewPort; // 最大视口宽度
const vwUnitValue = designWidth / 100;  // 1vw = ?px


module.exports = {
    designWidth, // 设计稿的宽度
    maxViewPort, // 最大视口宽度
    pxToVw,
}

function pxToVw(variable, unit = 'vw') {
    variable = Number(variable) || 0;
    if (variable === 0) {
        return variable;
    }
    return `${variable / (vwUnitValue)}${unit}`
}

