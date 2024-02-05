const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
	entry : {
		main : './src/index.jsx'
	},
	output : {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	plugins: [
		new HtmlWebpackPlugin({
		  title: 'Muffins Management',
		  filename: 'popup.html',
		  templateContent : `
		       <html>
			     <head>
				 </head>
			    <body>
			        <div class="container">
			   		<div>
				 	<div class="title">MUFFINS AI</div>
				 	<div id="root"></div>
			   		</div>
			 		</div>
				 </body>
			   </html>
		  `
		}),
	],
	module : {
		rules : [
			{
				test: /\.?jsx$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					},
				},
			},
			{
				test: /\.(png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		]
	}
}