module.exports = {
	contents: ["./src/**/*.{svelte, html, ts, js, jsx, tsx}", "./src/**/*.html"],

	theme: {
		fontFamily: {
			'sans': ['InterVariable']
		},
		extend: {},
		colors: {
			'primary': '#d1b09b',
			'secondary': '#87B1DE',
			'group': '#FC99FF',
			'stair': '#7DDE92',
			'white': '#ffffff',
			'black': '#000000',
		},
	},

	variants: {
		extend: {},
	},

	plugins: [],
	content: ["./src/**/*.{html,js,svelte,ts}"],
};
