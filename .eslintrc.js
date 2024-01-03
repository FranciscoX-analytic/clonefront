module.exports = {
	root: true,
	env: {
		"node": true,
		"browser": true,
	},
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-unused-vars': 'off', // Desactiva la regla de variables no utilizadas
		"no-mixed-spaces-and-tabs": "off"

	},
};
