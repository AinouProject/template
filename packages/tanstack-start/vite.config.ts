import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import Inspect from 'vite-plugin-inspect'
import Sonda from 'sonda/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    build: {
      sourcemap: true,
    },
    plugins: [
      tsconfigPaths(),
      tanstackStart(),
      nitroV2Plugin({ preset: 'node-server' }),
      viteReact(),
      tailwindcss(),
      Inspect(),
      Sonda({
        open: false,
      }),
    ],
    server: { host: '0.0.0.0', port: 3002 },
  }
})
