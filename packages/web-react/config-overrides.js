const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  babelInclude,
  fixBabelImports,
} = require('customize-cra');

const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  babelInclude([
    path.resolve('src'), // make sure you link your own source
    path.resolve(appDirectory, '../core'),
  ]),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
);
