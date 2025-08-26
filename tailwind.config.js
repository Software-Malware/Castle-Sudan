module.exports = {
  theme: {
    extend: {
      fontFamily: {
        input: 'var(--font-input)',
        reno: 'var(--font-reno)',
      },
    },
  },
  plugins: [require('daisyui')],
    daisyui: {
    themes: [
      "light", // default
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
     // default
    base: true, // applies background and text colors
    styled: true, // includes DaisyUI colors and design decisions
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for DaisyUI classnames
    logs: true, // shows info about DaisyUI version and used config
  },
}