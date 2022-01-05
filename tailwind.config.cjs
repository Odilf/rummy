module.exports = {
	contents: ["./src/**/*.{svelte, html, ts, js, jsx, tsx}", "./src/**/*.html"],

	theme: {
		fontFamily: {
			'sans': ['InterVariable']
		},
		extend: {
			backgroundImage: {
				'triangles': "url('/falling-trangles.svg')",
			}
		},
		colors: {
			'primary': '#B1744E',
			'secondary': '#8E5D3E',
			'tertiary': '#C19071',

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
