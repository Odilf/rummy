module.exports = {
	contents: ["./src/**/*.{svelte, html, ts, js, jsx, tsx}", "./src/**/*.html"],

	theme: {
		fontFamily: {
			'sans': ['InterVariable']
		},
		extend: {},
		colors: {
			'primary': '#c19071',
			'secondary': '#99caff',
			'success': '#21db2d',
			'warn': '#9e1c1c',
			'group': '#ff9d00',
			'stair': '#ffd500',
			'gray': '#888888',
			'white': '#ffffff',
			'black': '#000000',
			'debug': '#ff0000',
		},
	},

	variants: {
		extend: {},
	},

	plugins: [],
	content: ["./src/**/*.{html,js,svelte,ts}"],
};
