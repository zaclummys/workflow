const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        colors: {
            primary: colors.violet[400],
            background: colors.zinc[800],
            surface: colors.zinc[700],
            danger: colors.red[400],
            outline: {
                DEFAULT: colors.zinc[300],
                variant: colors.zinc[400],
            },
            on: {
                primary: colors.zinc[50],
                surface: colors.zinc[50],
                danger: colors.zinc[50],
            },
        }
    },

    plugins: [],
};
