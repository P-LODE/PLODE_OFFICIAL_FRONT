const typescriptTransform = require('i18next-scanner-typescript')

module.exports = {
  input: [
    '**/*.{ts,tsx}',
    // Use ! to filter out files or directories
    '!app/**/*.spec.{js,jsx}',
    '!app/i18n/**',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    compatibilityJSON: 'v3',
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't', '_'],
      extensions: ['.ts', '.tsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey: function (ns, value) {
        return value
      },
      acorn: {
        ecmaVersion: 2020,
        sourceType: 'module', // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
    },
    lngs: ['en', 'ko'],
    ns: ['common'],
    defaultLng: 'en',
    defaultNs: 'common',
    defaultValue(lng, ns, key, options) {
      if (options.defaultValue) {
        // use defaultValue if available
        return options.defaultValue
      }
      return key
    },
    resource: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      savePath: 'public/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: ':', // namespace separator
    keySeparator: '.', // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: typescriptTransform(
    // options
    {
      // default value for extensions
      extensions: ['.ts', '.tsx'],
      // optional ts configuration
      tsOptions: {
        target: 'es2017',
      },
    },

    // optional custom transform function
    function customTransform(outputText, file, enc, done) {
      'use strict'
      const parser = this.parser
      let count = 0

      // do something custom with the transpiled `outputText`
      parser.parseTransFromString(outputText)
      parser.parseFuncFromString(
        outputText,
        { list: ['i18next._', 'i18next.__'] },
        (key, options) => {
          parser.set(
            key,
            Object.assign({}, options, {
              nsSeparator: false,
              keySeparator: '.',
            }),
          )
          ++count
        },
      )

      done()
    },
  ),
}
