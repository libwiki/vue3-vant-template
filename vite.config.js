import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import legacy from '@vitejs/plugin-legacy'

// 开发环境使用import导入 CommonJS模块导入
import {viteCommonjs} from '@originjs/vite-plugin-commonjs'

// Convert CommonJS modules to ES6
// https://github.com/rollup/plugins/tree/6eb661692f5b8d8fc4e3b61ff748f49fab1e82ec/packages/node-resolve
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';

// https://cn.vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        vue(),
        nodeResolve(),
        viteCommonjs(), // 在commonjs插件之前
        commonjs(),
        legacy({ // 浏览器兼容
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        }),
        commonjs(),
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
