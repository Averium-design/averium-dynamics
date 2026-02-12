module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#1B4D3E', foreground: '#FFFFFF' },
        secondary: { DEFAULT: '#F0FDF4', foreground: '#1B4D3E' },
        accent: { DEFAULT: '#FF4D00', foreground: '#FFFFFF' },
        background: { DEFAULT: '#FFFFFF', alt: '#F8F9FA', dark: '#0A0A0A' },
        foreground: { DEFAULT: '#1A1A1A', muted: '#6B7280' },
        border: '#E5E7EB',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
