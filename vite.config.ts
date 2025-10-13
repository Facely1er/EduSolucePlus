import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Path resolve import removed as it's not used in current configuration

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic'
  })],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['lucide-react', 'clsx', 'tailwind-merge'],
          router: ['react-router-dom'],
          forms: ['react-error-boundary'],
          pdf: ['jspdf', 'jspdf-autotable'],
          csv: ['papaparse'],
          utils: ['file-saver', 'uuid', 'zod'],
          // Split large privacy components into separate chunks
          privacy: [
            './src/pages/privacy/PrivacyDashboardPage',
            './src/pages/privacy/DataRightsPortalPage',
            './src/pages/privacy/ComplianceObligationsPage'
          ],
          assessments: [
            './src/pages/AssessmentQuestionnairePage',
            './src/pages/AdministratorAssessmentPage',
            './src/pages/TeacherAssessmentPage',
            './src/pages/ITStaffAssessmentPage',
            './src/pages/StudentAssessmentPage'
          ],
          training: [
            './src/pages/TrainingPage',
            './src/pages/TrainingModuleDetailPage'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 600,
    sourcemap: process.env.NODE_ENV === 'development',
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true
      }
    }
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },
  preview: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  }
});