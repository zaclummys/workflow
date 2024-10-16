const colors = require('tailwindcss/colors');

const gray = colors.zinc;

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.violet[400],

                background: gray[800],
                
                surface: {
                    DEFAULT: gray[700],
                    high: gray[600],

                    hover: {
                        DEFAULT: gray[600],
                        high: gray[500],
                    }
                },
    
                positive: colors.green[400],
                negative: colors.red[400],
                neutral: gray[400],
    
                danger: colors.red[400],

                outline: {
                    DEFAULT: gray[400],
                    variant: gray[500],
                },

                on: {
                    primary: gray[50],
                    background: {
                        DEFAULT: gray[50],
                        variant: gray[400],
                    },
                    surface: {
                        DEFAULT: gray[50],
                        variant: gray[300],
                    },
                    danger: gray[50],
    
                    positive: gray[50],
                    negative: gray[50],
                    neutral: gray[50],
                },

                user: {
                    red: colors.red[400],
                    orange: colors.orange[400],
                    yellow: colors.yellow[400],
                    green: colors.green[400],
                    indigo: colors.indigo[400],
                    purple: colors.purple[400],
                    pink: colors.pink[400],
                    blue: colors.blue[400],
                }
            }
        }
    },

    plugins: [],
};
