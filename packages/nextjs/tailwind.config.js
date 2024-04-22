const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            content: {
                empty: '',
            },
            opacity: {
                hovering: '0.08',
                pressing: '0.12',
            },
            colors: {
                primary: colors.violet[400],
                background: colors.zinc[800],
                surface: {
                    DEFAULT: colors.zinc[700],
                    high: colors.zinc[600],
                },
    
                positive: colors.green[400],
                negative: colors.red[400],
                neutral: colors.zinc[400],
    
                danger: colors.red[400],
                outline: {
                    DEFAULT: colors.zinc[300],
                    variant: colors.zinc[400],
                },
                on: {
                    primary: colors.zinc[50],
                    surface: {
                        DEFAULT: colors.zinc[50],
                        variant: colors.zinc[300],
                    },
                    danger: colors.zinc[50],
    
                    positive: colors.zinc[50],
                    negative: colors.zinc[50],
                    neutral: colors.zinc[50],
                },
            }
        }
    },

    plugins: [],
};
