/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './app/**/*.{js,jsx}', './src/**/*.{js,jsx}'],
  prefix: '',
  theme: {
    colors: {
      error: '#D81A1A',
      success: '#46A758',
      primaryLight: {
        10: '#FEFCFB',
        20: '#FFF8F4',
        30: '#FFEDD5',
        40: '#FFE0BB',
        50: '#FFD3A4',
        60: '#FFC291',
        70: '#FFAA7D',
        80: '#ED8A5C',
        90: '#F76808',
        100: '#ED5F00',
        110: '#99543A',
        120: '#582D1D',
      },
      primaryDark: {
        10: '#1F1206',
        20: '#271504',
        30: '#341C0A',
        40: '#3F220D',
        50: '#4B2910',
        60: '#5D3213',
        70: '#7E4318',
        80: '#C36522',
        90: '#F76808',
        100: '#FF802B',
        110: '#FFA366',
        120: '#FFE0C2',
      },
      neuturalLight: {
        10: '#FDFDFC',
        20: '#F9F9F8',
        30: '#F2F2F0',
        40: '#EBEBE9',
        50: '#E4E4E2',
        60: '#DDDDDA',
        70: '#D3D2CE',
        80: '#BCBBB5',
        90: '#8D8D86',
        100: '#80807A',
        110: '#63635E',
        120: '#21201C',
      },
      neuturalDark: {
        10: '#181816',
        20: '#1B1B1A',
        30: '#282826',
        40: '#30302E',
        50: '#383734',
        60: '#403F3C',
        70: '#4C4B47',
        80: '#62605B',
        90: '#6F6D66',
        100: '#83817A',
        110: '#B2B1AA',
        120: '#EEEEEC',
      },
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'user-input': "url('@/assets/images/user.png')",
        'password-input': "url('@/assets/images/password.png')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
