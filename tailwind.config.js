const {designWidth, pxToRem, twRemToRem} = require("./design.config");
const unitValues = {
    0.5: pxToRem(0.5),
    1.5: pxToRem(1.5),
    2.5: pxToRem(2.5),
    3.5: pxToRem(3.5),
};
for (let i = 1; i <= 96; i++) {
    unitValues[i] = pxToRem(i)
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
                xs: [pxToRem(4), {lineHeight: pxToRem(4)}],
                sm: [pxToRem(5), {lineHeight: pxToRem(5)}],
                base: [pxToRem(6), {lineHeight: pxToRem(6)}],
                lg: [pxToRem(7), {lineHeight: pxToRem(7)}],
                xl: [pxToRem(8), {lineHeight: pxToRem(8)}],
                '2xl': [pxToRem(16), {lineHeight: pxToRem(16)}],
                '3xl': [pxToRem(24), {lineHeight: pxToRem(24)}],
                '4xl': [pxToRem(32), {lineHeight: pxToRem(32)}],
                '5xl': [pxToRem(40), {lineHeight: '1'}],
                '6xl': [pxToRem(48), {lineHeight: '1'}],
                '7xl': [pxToRem(56), {lineHeight: '1'}],
                '8xl': [pxToRem(64), {lineHeight: '1'}],
                '9xl': [pxToRem(72), {lineHeight: '1'}],
            },
            margin: {
                'position-center': "var(--padding-x)", // 自动填充（从而设置定位的最大宽度）
            },
            padding: {
                'position-center': "var(--padding-x)", // 自动填充（从而设置定位的最大宽度）
            },
            maxWidth: ({theme, breakpoints}) => ({
                'view-port': "var(--view-width)", // 最大宽度(使用--view-width 保证横屏时的视图)
                xs: twRemToRem(20),
                sm: twRemToRem(24),
                md: twRemToRem(28),
                lg: twRemToRem(32),
                xl: twRemToRem(36),
                '2xl': twRemToRem(42),
                '3xl': twRemToRem(48),
                '4xl': twRemToRem(56),
                '5xl': twRemToRem(64),
                '6xl': twRemToRem(72),
                '7xl': twRemToRem(80),
            }),
            maxHeight: ({theme}) => ({
                // screen: '100vh',
                screen: 'var(--vh)', // 解决IOS端100%高度问题 需要单独设置 :root的 --vh为window.innerHeight
            }),
            columns: {
                '3xs': twRemToRem(16),
                '2xs': twRemToRem(18),
                xs: twRemToRem(20),
                sm: twRemToRem(24),
                md: twRemToRem(28),
                lg: twRemToRem(32),
                xl: twRemToRem(36),
                '2xl': twRemToRem(42),
                '3xl': twRemToRem(48),
                '4xl': twRemToRem(56),
                '5xl': twRemToRem(64),
                '6xl': twRemToRem(72),
                '7xl': twRemToRem(80),
            },
            borderRadius: {
                ...unitValues,
                sm: twRemToRem(0.125),
                DEFAULT: twRemToRem(0.25),
                md: twRemToRem(0.375),
                lg: twRemToRem(0.5),
                xl: twRemToRem(0.75),
                '2xl': twRemToRem(1),
                '3xl': twRemToRem(1.5),
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

