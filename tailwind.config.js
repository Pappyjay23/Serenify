/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        hlight: ["Helvetica-Neue-Light", "sans-serif"],
        hmedium: ["Helvetica-Neue-Medium", "sans-serif"],
        hheavy: ["Helvetica-Neue-Heavy", "sans-serif"],
        hbold: ["Helvetica-Neue-Bold", "sans-serif"],
        hblack: ["Helvetica-Neue-Black", "sans-serif"],
      },
    },
	},
	plugins: [],
};
