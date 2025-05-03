/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          animation: {
            'fadeIn': 'fadeIn 0.3s ease-out forwards',
            'pulse': 'pulse 2s infinite',
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: 0, transform: 'translateY(10px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            },
          },
          boxShadow: {
            'custom': '3px 3px 0px 0px rgba(0, 0, 0, 0.1)',
            'glow': '0 0 15px rgba(255, 255, 255, 0.1)',
          },
        },
      },
      plugins: [],
    }

  
  