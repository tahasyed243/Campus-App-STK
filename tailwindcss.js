{ import('tailwindcss').Config }
export default {
    content: [
        "./index.html",
        // 💡 Zaroori: Aapke saare component files ka path
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}