import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { visualizer } from 'vite-plugin-visualizer'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), visualizer()],
//   build: {
//     chunkSizeWarningLimit: 1000, // تعيين الحد إلى 1000 KB (1 MB)
//     minify: 'terser', // استخدام Terser لتقليل حجم الشيفرة
//     sourcemap: false, // إيقاف توليد خرائط المصدر إذا لم تكن ضرورية
//   },
// })
