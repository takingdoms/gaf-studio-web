import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import config from './src/config';

// https://vitejs.dev/config/
export default defineConfig({
  base: config.baseUrl,
  plugins: [
    react(),
    tsconfigPaths(),
  ],
})
