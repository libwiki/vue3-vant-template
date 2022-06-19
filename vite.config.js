import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import legacy from '@vitejs/plugin-legacy'

// 开发环境使用import导入 CommonJS模块导入
import {viteCommonjs} from '@originjs/vite-plugin-commonjs'

// 将 CommonJS 模块转换为 ES6
// https://github.com/rollup/rollup-plugin-commonjs
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

// https://cn.vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        vue(),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: 'node_modules/**',  // Default: undefined
            // these values can also be regular expressions
            // include: /node_modules/

            // search for files other than .js files (must already
            // be transpiled by a previous plugin!)
            extensions: ['.js'],  // Default: [ '.js' ]

            // if true then uses of `global` won't be dealt with by this plugin
            ignoreGlobal: false,  // Default: false

            // if false then skip sourceMap generation for CommonJS modules
            sourceMap: true,  // Default: true

            // explicitly specify unresolvable named exports
            // (see below for more details)
            // namedExports: { 'vue': ['createElement', 'Component' ] },  // Default: undefined

            // sometimes you have to leave require statements
            // unconverted. Pass an array containing the IDs
            // or a `id => boolean` function. Only use this
            // option if you know what you're doing!
            // ignore: [ 'conditional-runtime-dependency' ]
        }),
        legacy({ // 浏览器兼容
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        }),
        viteCommonjs(),
    ],
    build: {
        brotliSize: false,
        commonjsOptions: {
            include: [/design.config.js/], // 生产环境使用import导入 CommonJS模块导入
        }
    },
    define: {
        'process.env': {}
    },
    server: {
        // 反向代理（跨域处理）
        // proxy: {
        //     '/api': {
        //         target: 'https://api.test.com/api',
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, '')
        //     },
        // },
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: path.resolve(__dirname, "./src"),
            }
        ],
    },
    css: {
        preprocessorOptions: {
            less: {
                additionalData: `@import "@/styles/index.less";`
            }
        }
    }
})
