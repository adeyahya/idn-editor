module.exports = ({ file, options, env }) => ({
  // parser: file.extname === '.sss' ? 'sugarss' : false,
  syntax: 'postcss-scss',
  plugins: [
    require('autoprefixer'),
    env === 'production' ? options.cssnano : false
  ]
})