/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0B0B14",
          800: "#12121F",
          700: "#1A1A2E",
          600: "#252540"
        },
        brand: {
          50:  "#EEF2FF",
          100: "#E0E7FF",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA"
        },
        accent: {
          300: "#F9A8D4",
          400: "#F472B6",
          500: "#EC4899",
          600: "#DB2777"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif']
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(99,102,241,0.55)",
        card: "0 10px 30px -12px rgba(0,0,0,0.45)"
      },
      backgroundImage: {
        'mesh': "radial-gradient(at 20% 20%, rgba(99,102,241,0.35) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(236,72,153,0.28) 0px, transparent 50%), radial-gradient(at 50% 90%, rgba(56,189,248,0.25) 0px, transparent 50%)"
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
}
