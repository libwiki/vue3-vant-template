const config = require("./design.config");

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-pxtorem': { // https://github.com/cuth/postcss-pxtorem
            rootValue: config.rootValue,
            propList: ['*', '!border'],
            selectorBlackList: ['.px--', '.tw-'], // 忽略的.px-- .tw-前缀的类、
        },
    },
};
