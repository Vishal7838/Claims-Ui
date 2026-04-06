import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] })
    ],
    server: {
      allowedHosts: ['claims-ui-latest.onrender.com', 'yajaira-unconcealing-uncorruptedly.ngrok-free.dev'],
    },
    preview: {
      allowedHosts: ['claims-ui-latest.onrender.com', 'yajaira-unconcealing-uncorruptedly.ngrok-free.dev'],
    }
  }
})
