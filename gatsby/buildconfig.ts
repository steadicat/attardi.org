import * as fs from 'fs';

const FILES = '../app/public';
const PREFIX = 'public';
const TEMPLATE = '../app/app.template.yaml';
const OUTPUT = '../app/app.yaml';
const PLACEHOLDER = '%STATIC%\n';

function handler(path, add) {
  //console.log('found', path);
  if (/^\/404/.test(path)) return;
  //url = url.replace(/^assets/, '');
  if (/\.html$/.test(path)) {
    let url = path.replace(/\/index\.html$/, '').replace(/\.html$/, '');
    add({
      url: url + '/?',
      file: path,
      mime_type: 'text/html; charset=UTF-8',
      expiration: '1m',
    });
  } else if (/\.js$/.test(path)) {
    add({
      url: path,
      file: path,
      mime_type: 'application/javascript; charset=UTF-8',
    });
  } else if (/\.css$/.test(path)) {
    add({
      url: path,
      file: path,
      mime_type: 'text/css; charset=UTF-8',
    });
  } else if (/\.sass$/.test(path)) {
    // Skip
  } else {
    add({url: path, file: path});
  }
}

function toYaml(obj) {
  return (
    '- ' +
    Object.keys(obj)
      .map(key => {
        return key + ': ' + obj[key];
      })
      .join('\n  ')
  );
}

var entries = '';

function addEntry(info) {
  //console.log('adding', info);
  if (info.file) {
    info.file = PREFIX + info.file;
    info.static_files = info.file;
    info.upload = info.file.replace(/\./g, '\\.');
    delete info.file;
  }
  info.url = info.url.replace(/\./g, '\\.');
  info.secure = 'always';
  info.http_headers = `
    Strict-Transport-Security: 'max-age=63072000; includeSubDomains; preload'`;
  var entry = toYaml(info);
  //console.log(entry);
  entries += entry + '\n';
}

function walk(dir, callback) {
  for (const name of fs.readdirSync(`${FILES}/${dir}`)) {
    const stat = fs.statSync(`${FILES}/${dir}/${name}`);
    if (stat.isDirectory()) {
      walk(`${dir}/${name}`, callback);
    } else {
      callback(`${dir}/${name}`);
    }
  }
}

walk('.', function(file) {
  if (/\/\./.test(file)) return;
  return handler(file.substring(1), addEntry);
});

let data = fs.readFileSync(TEMPLATE, 'utf8');
data = data.replace(PLACEHOLDER, entries);
//console.log(data);
fs.writeFileSync(OUTPUT, data);
