const {designWidth, pxToVw} = require("./design.config");

const unitValues = {
    0.5: pxToVw(0.5),
    1.5: pxToVw(1.5),
    2.5: pxToVw(2.5),
    3.5: pxToVw(3.5),
};
for (let i = 1; i <= 96; i++) {
    unitValues[i] = pxToVw(i)
}

// 文档参考： https://www.tailwindcss.cn/docs/installation#npm-tailwind
// 配置参考： https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L7
module.exports = {
    designWidth,
    prefix: 'tw-',
    content: [
        './index.html',
        './src/**/*.{vue,less,css,html}',
    ],
    corePlugins: {
        preflight: false,
    },
    // darkMode: 'media', // or 'media' or 'class'
    theme: {
        designWidth,
        spacing: unitValues,
        extend: {
            colors: {
                dark: "#27292B", // 默认的深黑色字体颜色
                light: "#858C96", // 默认的浅黑色字体颜色
            },
            fontSize: {
                ...unitValues,
                xs: [pxToVw(4), {lineHeight: pxToVw(4)}],
                sm: [pxToVw(5), {lineHeight: pxToVw(5)}],
                base: [pxToVw(6), {lineHeight: pxToVw(6)}],
                lg: [pxToVw(7), {lineHeight: pxToVw(7)}],
                xl: [pxToVw(8), {lineHeight: pxToVw(8)}],
                '2xl': [pxToVw(16), {lineHeight: pxToVw(16)}],
                '3xl': [pxToVw(24), {lineHeight: pxToVw(24)}],
                '4xl': [pxToVw(32), {lineHeight: pxToVw(32)}],
                '5xl': [pxToVw(40), {lineHeight: '1'}],
                '6xl': [pxToVw(48), {lineHeight: '1'}],
                '7xl': [pxToVw(56), {lineHeight: '1'}],
                '8xl': [pxToVw(64), {lineHeight: '1'}],
                '9xl': [pxToVw(72), {lineHeight: '1'}],
            },
            margin: {
                'position-center': "var(--padding-x)", // 自动填充（从而设置定位的最大宽度）
            },
            padding: {
                'position-center': "var(--padding-x)", // 自动填充（从而设置定位的最大宽度）
            },
            maxWidth: ({theme, breakpoints}) => ({
                'view-port': "var(--view-width)", // 最大宽度(使用--view-width 保证横屏时的视图)
                xs: pxToVw(20),
                sm: pxToVw(24),
                md: pxToVw(28),
                lg: pxToVw(32),
                xl: pxToVw(36),
                '2xl': pxToVw(42),
                '3xl': pxToVw(48),
                '4xl': pxToVw(56),
                '5xl': pxToVw(64),
                '6xl': pxToVw(72),
                '7xl': pxToVw(80),
            }),
            maxHeight: ({theme}) => ({
                // screen: '100vh',
                screen: 'var(--vh)', // 解决IOS端100%高度问题 需要单独设置 :root的 --vh为window.innerHeight
            }),
            columns: {
                '3xs': pxToVw(16),
                '2xs': pxToVw(18),
                xs: pxToVw(20),
                sm: pxToVw(24),
                md: pxToVw(28),
                lg: pxToVw(32),
                xl: pxToVw(36),
                '2xl': pxToVw(42),
                '3xl': pxToVw(48),
                '4xl': pxToVw(56),
                '5xl': pxToVw(64),
                '6xl': pxToVw(72),
                '7xl': pxToVw(80),
            },
            borderRadius: {
                ...unitValues,
                sm: pxToVw(0.125),
                DEFAULT: pxToVw(0.25),
                md: pxToVw(0.375),
                lg: pxToVw(0.5),
                xl: pxToVw(0.75),
                '2xl': pxToVw(1),
                '3xl': pxToVw(1.5),
            },
            lineHeight: {
                ...unitValues,
            },
            fontWeight: {
                100: '100',
                200: '200',
                300: '300',
                400: '400',
                500: '500',
                600: '600',
                700: '700',
                800: '800',
                900: '900',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}

