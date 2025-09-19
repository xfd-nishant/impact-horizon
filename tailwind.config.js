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
          50: '#f0f4f0',
          100: '#e1e8e1',
          200: '#c3d1c3',
          300: '#9fb59f',
          400: '#7a997a',
          500: '#5a7d5a',
          600: '#4a6b4a',
          700: '#3a5a3a',
          800: '#2a4a2a',
          900: '#1a3a1a',
          950: '#0f2f0f',
        },
        sage: {
          50: '#f8f9f8',
          100: '#f0f2f0',
          200: '#e1e5e1',
          300: '#c8d0c8',
          400: '#a8b5a8',
          500: '#8a9a8a',
          600: '#6d7d6d',
          700: '#5a6a5a',
          800: '#4a5a4a',
          900: '#3a4a3a',
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