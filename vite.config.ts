import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path'; // 必须导入 resolve

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    // ⚠️ 重要：如果你的仓库名不是 username.github.io，请把下面的 '/' 改成 '/仓库名/'
    base: '/ElectrocatalysisGroup/', 
    
    plugins: [react(), tailwindcss()],
    
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },

    // ✨ 新增打包配置：告诉 Vite 你的多页面在哪里
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          news: resolve(__dirname, 'news.html'),
          people: resolve(__dirname, 'people.html'),
          publications: resolve(__dirname, 'publications.html'),
        },
      },
    },
  };
});