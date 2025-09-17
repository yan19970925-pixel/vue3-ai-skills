import path, { resolve } from 'path'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import { createVitePlugins } from './build/vite'
import { include, exclude } from "./build/vite/optimize"
// 当前执行node命令时文件夹的地址(工作目录)
const root = process.cwd()

// 路径查找
function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = {} as any
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    base: env.VITE_BASE_PATH,
    root: root,
    // 服务端渲染
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: env.VITE_PORT,
      host: "0.0.0.0",
      open: env.VITE_OPEN === 'true',
      proxy: {
        "/emr/runtime":{
          target: `http://192.168.1.31:8001/`,
          changeOrigin: true,
        },
        "/his-api-test":{
          target: `https://gcz-pay.forhis.com:8085/`,
          changeOrigin: true,
        },
        "/api-hc-ca":{
          target: `http://172.16.5.104:8080/sign/svs/sign/p1SignVerify.shtml`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-hc-ca/, "")
        },
        "/api-presc-upload":{
          // target: `http://192.168.6.104:8082`, // 市一南院区
          // target: `http://192.168.6.104:8002`, // 市一东大街院区
          target: `http://192.168.1.224:8888`, // 管城中医院
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-presc-upload/, "")
        },
        "/api-report":{
          target: `http://192.168.1.224:8980`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-report/, "")
        },
        "/api-wansky":{
          target: `http://192.168.1.141:70`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-wansky/, "")
        },
        "/api-JinC":{
          target: `http://192.168.1.107:8080`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-JinC/, "")
        },
        "/api-DIP":{
          target: `http://192.168.2.215:82`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-DIP/, "")
        },
        // 食源性疾病病例数据智能采集
        "/api-FDB":{
          target: `http://192.168.101.246`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-FDB/, "")
        },
        // CDSS知识库
        "/api-CDSS":{
          target: `http://192.168.1.141`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-CDSS/, "")
        },
        // 读卡器-华视身份证
        "/api-insurance":{
          target: `http://127.0.0.1:8187`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-insurance/, "")
        },
      },
    },
    // 项目使用的vite插件。 单独提取到build/vite/plugin中管理
    plugins: createVitePlugins(),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/variables.scss";',
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss', '.css','.vue'],
      alias: [
        {
          find: /\@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]
    },
    build: {
      minify: 'terser',
      outDir: env.VITE_OUT_DIR || 'dist',
      sourcemap: env.VITE_SOURCEMAP === 'true' ? 'inline' : false,
      // brotliSize: false,
      terserOptions: {
        compress: {
          drop_debugger: env.VITE_DROP_DEBUGGER === 'true',
          drop_console: env.VITE_DROP_CONSOLE === 'true'
        }
      }
    },
    optimizeDeps: { include, exclude }
  }
}
