/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        ts: {
          bg: "var(--ts-bg)",
          'bg-soft': "var(--ts-bg-soft)",
          ink: "var(--ts-ink)",
          'ink-soft': "var(--ts-ink-soft)",
          accent: "var(--ts-accent)",
          line: "var(--ts-line)",
          paper: "var(--ts-paper)"
        },
        navy: {
          50: "#f5f7fb",
          100: "#e8edf4",
          200: "#d6ddeb",
          300: "#b3c2d8",
          400: "#8ba0c1",
          500: "#6c85ab",
          600: "#4f6a92",
          700: "#375276",
          800: "#23395b",
          900: "#0b1f3d",
          950: "#050f25"
        },
        bitcoin: {
          orange: '#f7931a',
          gold: '#ffb81c',
          'dark': '#0a0b0d',
          'gray': '#13151a',
        },
        gold: {
          light: '#f4ddba',
          DEFAULT: '#caa04c',
          dark: '#8a6c2b'
        },
        cream: {
          DEFAULT: '#fdfaf4',
          soft: '#f6efe3'
        },
        luxury: {
          gold: '#d4af37',
          silver: '#c0c0c0',
          bronze: '#cd7f32',
        }
      },
      fontFamily: {
        serif: ['"Inter"', 'ui-serif', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0,0,0,.35)',
        bitcoin: '0 0 20px rgba(247, 147, 26, 0.3), 0 0 40px rgba(247, 147, 26, 0.2)',
        'bitcoin-lg': '0 0 30px rgba(247, 147, 26, 0.4), 0 0 60px rgba(247, 147, 26, 0.3)',
      },
      backgroundImage: {
        'bitcoin-gradient': 'linear-gradient(135deg, #f7931a 0%, #ffb81c 50%, #d4af37 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0a0b0d 0%, #13151a 50%, #1a1d24 100%)',
      }
    },
  },
  plugins: [],
}
