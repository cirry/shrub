import viteCompression from 'vite-plugin-compression'
import {
  defineConfig,
  loadEnv
} from 'vite'
//在plugins配置数组里添加gzip插件
export default defineConfig({
  plugins: [viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz',
  })]
})
