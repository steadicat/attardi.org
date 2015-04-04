const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const uglify = require('gulp-uglify');
const gzip = require('gulp-gzip');
const jshint = require('gulp-jshint');
const s3 = require('gulp-s3');
const revall = require('gulp-rev-all');
const glob = require('glob');
const serve = require('gulp-serve');
const adler32 = require('./adler32');
const path = require('path');

const DEBUG = process.env.NODE_ENV !== 'production';
const Aws = require('./aws');

gulp.task('js', function() {
  const entries = {};

  glob.sync('./js/pages/*.js').forEach(function(pathName) {
    const baseName = path.basename(pathName, '.js');
    const dirName = path.dirname(pathName);
    entries[baseName] = [dirName + '/' + baseName];
  });

  gulpWebpack({
    entry: entries,
    watch: DEBUG,
    devtool: DEBUG ? 'inline-source-map' : null,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel-loader?stage=0'],
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      path: __dirname + '/dist/js',
      filename: '[name].js',
      chunkFilename: '[name].js',
      pathinfo: DEBUG,
      publicPath: '/js/',
    },
    plugins: DEBUG ? [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin('common.js', Object.keys(entries), 2)
    ] : [
      new webpack.optimize.CommonsChunkPlugin('common.js', Object.keys(entries), 2),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      }),
      new webpack.optimize.UglifyJsPlugin({sourceMap: false}),
    ],
  })
  .on('error', gutil.log)
  .pipe(gulp.dest('dist/js'))
  .on('error', gutil.log);
});

const React = require('react');
const through2 = require('through2');

require('babel/register')({
  stage: 0,
  blacklist: ['regenerator'],
});

gulp.task('html', function() {
  gulp.src('js/pages/**/*.js')
    .pipe(function() {
      return through2.obj(function(file, enc, done) {
        var p = path.relative(__dirname, file.path);
        p = p.substring(0, p.length - 3);
        const module = './' + p;
        delete require.cache[module];
        const component = require(module);
        var str = React.renderToString(React.createElement(component, {js: '/js/' + p.substring(9) + '.js'}));
        str = str.replace(/&#x2f;/g, '/');
        file.contents = new Buffer(str);
        file.path = module + '.html';
        return done(null, file);
      });
    }())
    .pipe(gulp.dest('dist/'));
});

gulp.task('images', function() {
  gulp.src('images/*')
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/img'));
});

gulp.task('deploy', function () {
  const options = {headers: {'Cache-Control': 'max-age=315360000'}};
  const textOptions = {headers: {'Cache-Control': 'max-age=315360000'}, encoding: 'utf-8'};
  const htmlOptions = {headers: {'Cache-Control': 'max-age=300'}, encoding: 'utf-8'};
  const buffer = require('gulp-buffer');
  gulp.src(['dist/**/*.js'])
    .pipe(revall())
    .pipe(gzip())
    .pipe(s3(Aws, textOptions));
  gulp.src(['dist/**/*.jpg', 'dist/**/*.png'])
    .pipe(revall())
    .pipe(s3(Aws, options));
  gulp.src(['dist/**/*.html'])
    .pipe(revall({ ignore: ['.html'] }))
    .pipe(through2.obj(function(f, enc, cb) {
      // Fix React checksum
      const markup = f.contents.toString();
      const originalMarkup = markup.replace(/ data-react-checksum="-?\d+"/, '');
      const checksum = adler32(originalMarkup);
      f.contents = new Buffer(markup.replace(/ data-react-checksum="-?\d+"/, ' data-react-checksum="'+checksum+'"'));
      this.push(f);
      cb();
    }))
    .pipe(gzip())
    .pipe(s3(Aws, htmlOptions));
  gulp.src('static/**')
    .pipe(gzip())
    .pipe(s3(Aws, options));
});

gulp.task('watch', function () {
  gulp.watch('js/**/*.js', ['html']);
});

gulp.task('serve', serve({root: ['dist', 'static'], port: 8080}));

gulp.task('build', ['html', 'js', 'images']);

gulp.task('default', ['html', 'js', 'images', 'watch', 'serve']);
