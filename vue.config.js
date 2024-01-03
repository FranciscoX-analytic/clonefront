module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/sakai-vue' : '/',
	devServer: {
		proxy: 'http://localhost/'

		//   '/api-sakai': {
		// 	target: 'http://localhost',
		// 	changeOrigin: true,
		// 	pathRewrite: {
		// 	  '^/api-sakai': ''
		// 	}
		  
  	}
}
