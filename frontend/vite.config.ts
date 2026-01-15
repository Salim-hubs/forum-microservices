import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: [
      '@ionic/angular',
      '@ionic/angular/standalone',
      'ionicons',
      '@ionic/core',
      '@ionic/core/loader',
      '@stencil/core'
    ],
    exclude: []
  },
  server: {
    fs: {
      strict: false
    }
  }
});
