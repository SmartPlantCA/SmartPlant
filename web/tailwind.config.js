/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				green: "#50b774",
				secondgray: "#eaeced",
			},
			fontFamily: {
				reem: ["Varela Round", "sans-serif"],
			},
		},
	},
	plugins: [],
};
