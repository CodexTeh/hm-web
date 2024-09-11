const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@redux-state' : 'src/redux-state',
    '@pages' : 'src/pages',
    '@routes' : 'src/routes',
    '@utils' : 'src/utils',
  })(config)

  return config
}