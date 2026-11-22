/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // New Minimalist Clinical SaaS Palette
        primary: {
          DEFAULT: '#0F766E',
          hover: '#115E59',
          soft: '#E6F4F1',
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        'medical-blue': '#2563EB',
        'brand-bg': '#F8FAFC',
        'brand-surface': '#FFFFFF',
        'brand-border': '#E2E8F0',
        'brand-text': '#0F172A',
        'brand-muted': '#64748B',
        'brand-success': '#16A34A',
        'brand-warning': '#D97706',
        'brand-danger': '#DC2626',
        'brand-ai': '#7C3AED',

        // Theme Mappings for backward compatibility & unified visual identity
        accent: '#0F766E',
        'on-accent': '#FFFFFF',
        secondary: '#0F766E',
        'on-secondary': '#FFFFFF',
        'light-bg': '#F8FAFC',
        success: '#16A34A',
        'on-success': '#FFFFFF',
        warning: '#D97706',
        'on-warning': '#FFFFFF',
        danger: '#DC2626',
        'on-danger': '#FFFFFF',
        'light-primary': '#0F172A',
        'light-on-primary': '#FFFFFF',
        'light-surface': '#FFFFFF',
        'light-on-surface': '#0F172A',
        'light-surface-variant': '#F8FAFC',
        'light-on-surface-variant': '#64748B',
        'light-outline': '#E2E8F0',
        'light-outline-variant': '#F1F5F9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        headline: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        title: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        label: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        code: ['"Spline Sans Mono"', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'dropdown': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
        'glass': '0 8px 32px 0 rgba(15, 23, 42, 0.06)',
        'glass-hover': '0 12px 36px 0 rgba(15, 23, 42, 0.10)',
        'bento': '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 4px 16px -2px rgba(15, 23, 42, 0.03)',
      },
      borderRadius: {
        'bento': '1.25rem',
        'bento-sm': '1rem',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

