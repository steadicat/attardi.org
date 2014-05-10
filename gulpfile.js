var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var gzip = require('gulp-gzip');
var stylus = require('gulp-stylus');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var s3 = require('gulp-s3');
var revall = require('gulp-rev-all');
var nib = require('nib');
var livereload = require('gulp-livereload');
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
  gulp.src('js/main.js')
    .pipe(browserify({
      insertGlobals: false,
      debug: !gutil.env.production,
      transform: ['reactify']
    }))
    .on('error', gutil.log)
    .pipe(jshint())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload(server))
    .on('error', gutil.log);
});

gulp.task('html', function() {
  gulp.src('*.jade')
    .pipe(jade())
    .on('error', gutil.log)
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
  var options = {gzippedOnly: true, headers: {'Cache-Control': 'max-age=315360000'}};
  var htmlOptions = {gzippedOnly: true, headers: {'Cache-Control': 'max-age=60'}};
  gulp.src(['dist/**/*.js'])
      .pipe(uglify())
      .pipe(revall())
      .pipe(gzip())
      .pipe(s3(Aws, options));
  gulp.src(['dist/**/*.css', 'dist/**/*.js'])
      .pipe(revall())
      .pipe(minifycss())
      .pipe(gzip())
      .pipe(s3(Aws, options));
  gulp.src(['dist/**/*.jpg', 'dist/**/*.png'])
      .pipe(revall())
      .pipe(s3(Aws, options));
  gulp.src(['dist/**/*.html'])
      .pipe(revall({ ignore: ['.html'] }))
      .pipe(gzip())
      .pipe(s3(Aws, {gzippedOnly: true}));
  gulp.src('static/**')
      .pipe(gzip())
      .pipe(s3(Aws, options));
});

gulp.task('watch', function () {
  //gulp.watch(['css', 'js', '*.jade'], ['clean']);
  gulp.watch('css/*.styl', ['css']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('images/*', ['images']);
  gulp.watch('*.jade', ['html']);
});

gulp.task('livereload', function() {
  server.listen(35729, function (err) {
    if (err) return console.log(err);
    console.log('Livereload listening on port 35729');
  });
});

gulp.task('default', ['html', 'css', 'js', 'images', 'watch', 'livereload']);
