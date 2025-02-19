const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    future: {
        hoverOnlyWhenSupported: true,
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', ...fontFamily.sans],
                mono: ['var(--font-jetbrains-mono)', ...fontFamily.mono],
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '65ch',
                        color: 'inherit',
                        a: {
                            color: 'inherit',
                            textDecoration: 'none',
                            fontWeight: '500',
                        },
                        strong: {
                            color: 'inherit',
                        },
                        code: {
                            color: 'inherit',
                        },
                    },
                },
            },
            gradientColorStops: (theme) => ({
                // ... existing gradients ...
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}
