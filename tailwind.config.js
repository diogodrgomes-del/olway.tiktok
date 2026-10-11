/** @type {import('tailwindcss').Config} */
// As cores vêm de variáveis CSS definidas em src/index.css (tokens da marca).
// Para aplicar a identidade oficial, edite apenas os valores em :root.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        coal: "rgb(var(--c-coal) / <alpha-value>)",
        graphite: "rgb(var(--c-graphite) / <alpha-value>)",
        bone: "rgb(var(--c-bone) / <alpha-value>)",
        mute: "rgb(var(--c-mute) / <alpha-value>)",
        gold: "rgb(var(--c-gold) / <alpha-value>)",
        "gold-soft": "rgb(var(--c-gold-soft) / <alpha-value>)",
        "gold-deep": "rgb(var(--c-gold-deep) / <alpha-value>)",
        danger: "rgb(var(--c-danger) / <alpha-value>)",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "1200px",
      },
    },
  },
  plugins: [],
};
