import Vue from 'vue'

const requireDirective = require.context(
  // Look for files in the current directory
  '~/directives',
  // Do not look in subdirectories
  false,
  /\w+\.js$/
)

// For each matching file name...
requireDirective.keys().forEach((fileName) => {
  // Get the component config
  const directiveConfig = requireDirective(fileName)
  // Get the PascalCase version of the directive name
  const directiveName = fileName // Remove the file extension from the end
    .replace(/\.\w+$/, '')
    .substring(2)
  // Globally register the directive
  Vue.directive(
    directiveName,
    directiveConfig.default || directiveConfig[directiveName]
  )
})
