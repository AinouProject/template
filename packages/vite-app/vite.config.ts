import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return { plugins: [tsconfigPaths()], server: { host: '0.0.0.0', port: 3002 } }
})
