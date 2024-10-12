const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@assets' : 'src/assets',
    '@components' : 'src/components',
    '@redux-state' : 'src/redux-state',
    '@pages' : 'src/pages',
    '@routes' : 'src/routes',
    '@utils' : 'src/utils',
    '@helpers' : 'src/helpers',
  })(config)

  return config
}