/* eslint-env node */
/* eslint no-console: 0, no-var: 0 */
require('babel-core/register')();
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var ReactDOMServer = require('react-dom/server');
var Attardi = require('./js/main');

var paths = {
  '/': 'build/index.html',
  '/error': 'build/errors/error.html',
  '/notfound': 'build/errors/notfound.html',
};

var assets = {};
try {
  assets = require('./assets.json');
} catch(e) {
  console.warn('assets.json not found');
}

for (var p in paths) {
  mkdirp.sync(path.dirname(paths[p]));
  fs.writeFileSync(paths[p], '<!DOCTYPE html>' + ReactDOMServer.renderToString(Attardi.getPage(p, assets)));
}
