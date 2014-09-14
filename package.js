/* jshint camelcase: false */
/* global
   Package: false
 */

Package.describe({
  name: 'sanjo:jasmine',
  summary: 'Easily use Jasmine in Meteor',
  version: '0.2.0-pre1',
  git: 'https://github.com/Sanjo/meteor-jasmine.git'
})

Npm.depends({
  'jasmine-core': '2.0.0',
  'meteor-stubs': '0.0.2',
  'component-mocker': '0.2.0',
  'lodash': '2.4.1',
  'mkdirp': '0.5.0',
  'glob': '3.2.9',
  'rimraf': '2.2.8',
  'coffee-script': '1.7.1'
})

Package.on_use(function (api) {
  var both = ['server', 'client']

  if (api.versionsFrom) {
    api.versionsFrom("METEOR@0.9.0");
    api.use([
      'velocity:core@0.2.0-pre0',
      'alanning:package-stubber@0.0.9'
    ], 'server')
  } else {
    api.use([
      'velocity',
      'package-stubber'
    ], 'server')
  }
  api.use(['templating'], 'client')


  api.add_files([
    'lib/JasmineTestFramework.js',
    'lib/JasmineInterface.js',
    'lib/VelocityTestReporter.js'
  ], both)

  // setup each framework
  //   load jasmine files
  // load jasmine-velocity reporter
  // [unit] mock packages
  // execute tests
  // report results


  api.add_files('server/metadata-reader.js.tpl', 'server', {isAsset: true})

  if (process.env.IS_MIRROR) {
    /*

    // Client side integration testing
    api.add_files([
      '.npm/package/node_modules/component-mocker/index.js',
      '.npm/package/node_modules/meteor-stubs/index.js',
      '.npm/package/node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
      '.npm/package/node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
      //'client/jasmine-setup.js',
      'lib/mock.js'
    ], 'client')

    api.add_files([
        // set up server-side Meteor methods
      'server/lib/mirror-info.js'
    ], 'server')

    */
  } else {

    // no mirror
    
    api.add_files([
      'server/lib/runFileInContext.js',
      'server/lib/coffee-require.js',
      'server/lib/file-loader.js',
      'server/lib/html-scanner.js',
      'server/lib/load-order-sort.js',
      'server/lib/stub-loader.js',
      //'server/jasmine-setup.js',
      'server/lib/fileCopier.js',

      'server/unit/mock-generator.js',
      'server/unit/ServerUnitTestFramework.js',

      'server/lib/get-files.js',
      'registerFrameworks.js'
    ], 'server')

    api.add_files([
      'lib/mock.js',  // load as asset too so vm instance has access
      'server/lib/contextSpec.js'
    ], 'server', {isAsset: true})
  }

  api.add_files([
  ], 'server')

})
