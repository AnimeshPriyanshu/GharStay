/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — deep forest green
        primary: {
          DEFAULT: '#12372A',
          50: '#f2f7f4',
          100: '#e0ebe4',
          200: '#c2d7cb',
          300: '#93b8a3',
          400: '#5c9377',
          500: '#1f6f54', // emerald — primary CTA
          600: '#1a6349',
          700: '#17553f',
          800: '#12372a', // deep forest
          900: '#0d2a20',
          950: '#071b14',
        },
        // Secondary — warm cream / beige
        cream: {
          DEFAULT: '#F8F5EF',
          50: '#fdfcfa',
          100: '#f8f5ef',
          200: '#efe9de',
          300: '#e3d9c7',
          400: '#cfc1a4',
          500: '#b3a081',
          600: '#9a8668',
          700: '#7d6c55',
          800: '#5f5243',
          900: '#443b31',
        },
        // Accent — terracotta (emergency / urgent)
        terracotta: {
          DEFAULT: '#D66A4A',
          50: '#fdf4f0',
          100: '#fbe6dd',
          200: '#f6c9b8',
          300: '#efa789',
          400: '#e48763',
          500: '#d66a4a',
          600: '#c15638',
          700: '#a0452e',
          800: '#803826',
          900: '#5f2a1d',
        },
        // Accent — warm amber (small highlights only)
        amber: {
          DEFAULT: '#E8A23A',
          50: '#fdf8ee',
          100: '#faeecd',
          200: '#f5dc9b',
          300: '#f0c664',
          400: '#e8a23a',
          500: '#dd9026',
          600: '#c07420',
          700: '#9a5a1c',
          800: '#7a461c',
          900: '#603719',
        },
        neutral: {
          50: '#f7f8f6',
          100: '#eef0ed',
          200: '#e2e5e1',
          300: '#c9cec8',
          400: '#9aa39b',
          500: '#66736b',
          600: '#4e5a53',
          700: '#3a453f',
          800: '#232d27',
          900: '#17211b',
          950: '#0d130f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.65' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.15' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.5rem', { lineHeight: '1.05' }],
      },
      maxWidth: {
        container: '80rem', // 1280px page container
      },
      spacing: {
        18: '4.5rem',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(23, 33, 27, 0.04), 0 4px 16px -2px rgba(23, 33, 27, 0.06)',
        medium: '0 2px 4px rgba(23, 33, 27, 0.05), 0 10px 30px -6px rgba(23, 33, 27, 0.1)',
        large: '0 4px 8px rgba(23, 33, 27, 0.06), 0 24px 48px -12px rgba(23, 33, 27, 0.18)',
        'glow-green': '0 0 0 4px rgba(31, 111, 84, 0.12)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.97)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-24px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out both',
        'slide-up': 'slideUp 0.5s ease-out both',
        'slide-down': 'slideDown 0.25s ease-out both',
        'scale-in': 'scaleIn 0.2s ease-out both',
        'slide-in-left': 'slideInLeft 0.3s ease-out both',
      },
    },
  },
  plugins: [],
};
