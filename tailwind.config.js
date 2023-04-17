/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}",
              "./src/pages/auth/*.tsx",
              "./src/pages/autoblog/*.tsx",
              "./src/pages/cargo-traffic/*.tsx",
               "./src/pages/main/*.tsx",],
    theme: {
        extend: {},
    },
    plugins: [],
}