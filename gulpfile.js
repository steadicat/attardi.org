var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var stylus = require('gulp-stylus');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var s3 = require('gulp-s3');
var revall = require('gulp-rev-all');
var nib = require('nib');
var serve = require('gulp-serve');
var livereload = require('gulp-livereload');
var adler32 = require('./adler32');
var lr = require('tiny-lr');
var server = lr();

var Aws = require('./aws');

gulp.task('css', function() {
  return gulp.src('css/main.styl')
    .pipe(stylus({use: [nib()]}))
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload(server))
    .on('error', gutil.log);
});

gulp.task('js', function() {
  gulp.src('js/pages/*.js')
    .pipe(browserify({
      insertGlobals: false,
      debug: false,
      transform: ['reactify']
    }))
    .on('error', gutil.log)
    .pipe(jshint())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload(server))
    .on('error', gutil.log);
});

var React = require('./js/react');
var through2 = require('through2');

var path = require('path');
require('node-jsx').install()

gulp.task('html', function() {
  gulp.src('js/pages/**/*.js')
    .pipe(function() {
      return through2.obj(function(file, enc, done) {
        var p = path.relative(__dirname, file.path);
        p = p.substring(0, p.length - 3);
        var module = './' + p;
        delete require.cache[module];
        var component = require(module);
        var str = React.renderComponentToString(component({js: '/js/' + p.substring(9) + '.js'}));
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

gulp.task('clean', function() {
  return gulp.src(['dist'], {read: false})
    .pipe(clean())
    .on('error', gutil.log);
});

gulp.task('deploy', function () {
  var options = {headers: {'Cache-Control': 'max-age=315360000'}};
  var textOptions = {headers: {'Cache-Control': 'max-age=315360000'}, encoding: 'utf-8'};
  var htmlOptions = {headers: {'Cache-Control': 'max-age=300'}, encoding: 'utf-8'};
  var buffer = require('gulp-buffer');
  gulp.src(['dist/**/*.js'])
    .pipe(revall())
    .pipe(uglify())
    .pipe(gzip())
    .pipe(s3(Aws, textOptions));
  gulp.src(['dist/**/*.css'])
    .pipe(revall())
    .pipe(minifycss())
    .pipe(gzip())
    .pipe(s3(Aws, textOptions));
  gulp.src(['dist/**/*.jpg', 'dist/**/*.png'])
    .pipe(revall())
    .pipe(s3(Aws, options));
  gulp.src(['dist/**/*.html'])
    .pipe(revall({ ignore: ['.html'] }))
    .pipe(through2.obj(function(f, enc, cb) {
      // Fix React checksum
      var markup = f.contents.toString();
      var originalMarkup = markup.replace(/ data-react-checksum="-?\d+"/, '');
      var checksum = adler32(originalMarkup);
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
  //gulp.watch(['css', 'js', '*.jade'], ['clean']);
  gulp.watch('css/**/*.styl', ['css']);
  gulp.watch('js/**/*.js', ['js', 'html']);
  gulp.watch('images/**', ['images']);
});

gulp.task('livereload', function() {
  server.listen(35729, function (err) {
    if (err) return console.log(err);
    console.log('Livereload listening on port 35729');
  });
});

gulp.task('serve', serve({root: ['dist', 'static'], port: 8080}));

gulp.task('default', ['html', 'css', 'js', 'images', 'watch', 'livereload', 'serve']);
