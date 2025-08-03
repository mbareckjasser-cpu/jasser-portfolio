module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules/, // Ignore les fichiers dans node_modules
      },
    ],
  },
  theme: {
    extend: {
      animation: {
        borderGlow: 'borderGlow 3s ease-in-out infinite',
        scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',

      },
      keyframes: {
        borderGlow: {
          '0%, 100%': { filter: 'blur(4px) brightness(1)' },
          '50%': { filter: 'blur(6px) brightness(2)' },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
    },
      },
  plugins: [],
}
