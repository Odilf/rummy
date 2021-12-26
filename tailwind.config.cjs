module.exports = {
	contents: ["./src/**/*.{svelte, html, ts, js, jsx, tsx}", "./src/**/*.html"],

	theme: {
		fontFamily: {
			'sans': ['InterVariable']
		},
		extend: {},
		colors: {
			'primary': '#DDD5D0',
			'secondary': '#CFC0BD',
			'tertiary': '#B8B8AA',
			'accent': '#7F9183',
			'other': '#586F6B',
		},
	},

	variants: {
		extend: {},
	},

	plugins: [],
	content: ["./src/**/*.{html,js,svelte,ts}"],
};
