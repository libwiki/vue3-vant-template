const config = require("./design.config");

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-px-to-viewport': {
            unitToConvert: 'px',
            viewportWidth: config.designWidth,
            unitPrecision: 5,
            propList: ['*', '!border'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: ['.px--', '.tw-'], // 忽略的.px-- .tw-前缀的类、
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: undefined,
            include: undefined,
            landscape: false,
            landscapeUnit: 'vw',
            landscapeWidth: config.designWidth,
            // cnjm-postcss-px-to-viewport插件独有 但是使用 tailwindcss有问题。如果没有使用其他的尺寸来设计，下面这个方法可以不需要，比如vant是375的
            customFun: ({file}) => {
                // 这个自定义的方法是针对处理vant组件下的设计稿为375问题
                return file.indexOf('vant') !== -1 ? 375 : config.designWidth;
            },
        }
    },
};
