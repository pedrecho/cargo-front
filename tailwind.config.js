/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}",
              "./src/pages/auth/*.tsx",
               "./src/pages/main/*.tsx",
        "./src/pages/library/*.tsx",
    "./src/pages/carpark/*.tsx",
    "./src/pages/cinema/*.tsx",
    "./src/pages/storage/*.tsx"],
    theme: {
        extend: {},
    },
    plugins: [],
}