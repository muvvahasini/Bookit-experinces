/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FACC15', // yellow-400
          hover: '#EAB308',   // yellow-500
        },
        textdark: '#111827',   // gray-900
        muted: '#6B7280',      // gray-500
        alert: '#DC2626',      // red-600
        disabled: '#E5E7EB'    // gray-200
      }
    }
  },
  plugins: []
};


