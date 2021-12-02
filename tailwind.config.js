module.exports = {
	purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'old-gray': '#B8C2CC',
				'gold': '#F2D024',
				'dark-mode': '#212121',
				'dark-mode-light': '#34363a',
				'dark-mode-lighter': '#303030',
				'dark-mode-lightest': '#424242',
				'dark-mode-blue': '#3d4852',
				'off-white': '#e6e6e6',
				'off-gray': '#737373',
				'dark-opacity': 'rgba(19,19,19,0.30);',
				'gray-darkest-alpha': 'rgba(56,56,56,.25);',
			},
		},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
