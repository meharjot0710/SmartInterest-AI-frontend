// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./components/CareerPathsSection.tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 25px rgba(255, 255, 255, 0.4)' },
          '50%': { boxShadow: '0 0 35px rgba(255, 255, 255, 0.8)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
