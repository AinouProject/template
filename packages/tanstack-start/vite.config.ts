import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return { plugins: [tsconfigPaths(), tanstackStart(), viteReact()], server: { host: '0.0.0.0', port: 3002 } }
})
