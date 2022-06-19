const designWidth = 375; // 设计稿的宽度
const rootValue = designWidth / 10;

module.exports = {
    designWidth, // 设计稿的宽度
    maxViewPort: 760, // 最大视口宽度
    rootValue,
    pxToRem,
    twRemToRem,
}

function pxToRem(variable, unit = 'rem') {
    variable = Number(variable) || 0;
    if (variable === 0) {
        return variable;
    }
    return `${variable / (rootValue)}${unit}`
}

// 将tailwind的rem转换为项目对应的设计稿的rem
// https://www.tailwindcss.cn/docs/customizing-spacing#-2
// 按照pxToRem的转换方式换算 tailwind （1 ： 0.25rem ： 4px）=>设计稿等于1600px => 则换算单位为16
function twRemToRem(remVariable) {
    return pxToRem(remVariable * 16)
}
