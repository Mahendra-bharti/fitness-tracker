import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'FitQuest - Gamified Fitness Tracker',
        short_name: 'FitQuest',
        description: 'A gamified fitness and task tracker with XP, levels, and streaks',
        theme_color: '#dc2626',
        background_color: '#0a0a0a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/LogUpadte.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/LogUpadte.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/LogUpadte.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      }
    })
  ],
})

