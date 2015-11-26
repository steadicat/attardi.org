var yaml = require('gae-static-yaml');

var config = {
  files: 'build', // Directory to crawl for static files
  template: 'apptemplate.yaml',
  output: 'app.yaml',
  placeholder: '%STATIC%\n',
}

yaml(config, function (request, file, next) {
  request = request.replace('build', '');
  request = request.replace('/index.html', '/?');
  if (request === '/.DS_Store') request = '';
  if (request === '/?') request = '';
  if (/^\/img\//.test(request)) request = '';
  if (/^\/errors\//.test(request)) request = '';
  if (/\.js$/.test(request)) request = '';
  next(request, file);
});
