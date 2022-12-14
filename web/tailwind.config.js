/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				green: "#50b774",
				darkgreen: "#48a86a",
				darkergreen: "#3d915b",
				darkestgreen: "#2f6f44",
				secondgray: "#eaeced",
				dark: "#1a1a1a",
			},
			fontFamily: {
				reem: ["Signika Negative", "Varela Round", "sans-serif"],
			},
		},
	},
	darkMode: "class",
	plugins: [],
};
