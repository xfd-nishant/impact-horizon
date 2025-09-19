module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Orbitron', 'Exo 2', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        'nature': ['Merriweather', 'Georgia', 'serif'],
      },
      colors: {
        forest: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8fd48f',
          400: '#5bb85b',
          500: '#369c36',
          600: '#2a7d2a',
          700: '#236323',
          800: '#1f501f',
          900: '#1a421a',
        },
        earth: {
          50: '#faf7f2',
          100: '#f4ede0',
          200: '#e8d9bf',
          300: '#d9c195',
          400: '#c8a568',
          500: '#b8914a',
          600: '#a67c3e',
          700: '#8a6535',
          800: '#705330',
          900: '#5c4429',
        },
        water: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        sky: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'grow': 'grow 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'leaf-fall': 'leafFall 8s ease-in-out infinite',
        'water-flow': 'waterFlow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        grow: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        leafFall: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)' },
          '50%': { transform: 'translateY(5px) rotate(180deg)' },
          '100%': { transform: 'translateY(-10px) rotate(360deg)' },
        },
        waterFlow: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(10px)' },
        }
      },
      backgroundImage: {
        'nature-gradient': 'linear-gradient(135deg, #f0f9f0 0%, #dcf2dc 50%, #bce5bc 100%)',
        'forest-gradient': 'linear-gradient(135deg, #1a421a 0%, #236323 50%, #2a7d2a 100%)',
        'earth-gradient': 'linear-gradient(135deg, #5c4429 0%, #705330 50%, #8a6535 100%)',
        'water-gradient': 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0284c7 100%)',
      }
    },
  },
  plugins: [],
};
