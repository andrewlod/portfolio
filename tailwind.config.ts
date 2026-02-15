import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0e27',
        surface: '#151930',
        surfaceElevated: '#1e2438',
        accentPrimary: '#00d9ff',
        accentSecondary: '#ff6b35',
        accentTertiary: '#4CAF50',
        textPrimary: '#e4e4e7',
        textSecondary: '#a1a1aa',
        textTertiary: '#71717a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;

