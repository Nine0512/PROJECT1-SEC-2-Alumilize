/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",],
    theme: {
        colors: {
            soft_brown: "#F1DDC9",
            dark_brown: "#B76E22",
            black: "#000",
            light_dark: "#0A0A0A",
            white: "#fff",
            light_gray:"#D9D9D9",
            green: "#00FF00",
            red: "#D62626",
            dark_gray: "#7A7977",
        },
        extend: {
            spacing: {
                '0.1': '5px',
            }
        },
    },
    plugins: [],
}
