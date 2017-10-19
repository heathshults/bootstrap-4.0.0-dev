const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const header = require('gulp-header')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')
const pkg = require('./package.json')

// Set the banner content
const banner = ['/*!\n',
  ' * Start USAFB - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ` * Copyright 2017-${(new Date()).getFullYear()}`, ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
  ' */\n',
  ''
].join('')

// Compiles SCSS files from /scss into /css
gulp.task('sass', () => {
  return gulp.src('./scss/bootstrap.scss')
        .pipe(sass())
        .pipe(header(banner, {
          pkg: 'pkg'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
          stream: true
        }))
})

// Minify compiled CSS
gulp.task('minify-css', ['sass'], () => {
  return gulp.src('./dist/css/*.css')
        .pipe(cleanCSS({
          compatibility: 'ie8'
        }))
        .pipe(rename({
          prefix: 'usafb-',
          suffix: '.min'
        }))
        .pipe(gulp.dest('../USAFB/http/css/'))
        .pipe(browserSync.reload({
          stream: true
        }))
})

// Minify JS
gulp.task('minify-js', () => {
  return gulp.src('dist/js/*.js')
        .pipe(uglify())
        .pipe(header(banner, {
          pkg
        }))
        .pipe(rename({
          prefix: 'usafb-',
          suffix: '.min'
        }))
        .pipe(gulp.dest('../USAFB/http/css/'))
        .pipe(browserSync.reload({
          stream: true
        }))
})

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', () => {
  gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))

  gulp.src([
    'node_modules/font-awesome/**',
    '!node_modules/font-awesome/**/*.map',
    '!node_modules/font-awesome/.npmignore',
    '!node_modules/font-awesome/*.txt',
    '!node_modules/font-awesome/*.md',
    '!node_modules/font-awesome/*.json'
  ])
        .pipe(gulp.dest('vendor/font-awesome'))
})

// autoprefix vendor browsers where necessary
gulp.task('autoprefixme', function () {
  return gulp.src('/dist/css/*.css')
      .pipe(sourcemaps.init())
      .pipe(postcss([ autoprefixer() ]))
      .pipe(sourcemaps.write('.'))
      .pipe(rename({prefix: 'usafb-'}))
      .pipe(gulp.dest('../USAFB/http/css/'))
})

// Run everything
gulp.task('default', ['sass', 'autoprefixme', 'minify-css', 'minify-js'])
// Configure the browserSync task
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: ''
    }
  })
})

// Build CSS & JS files with browserSync
gulp.task('all-in-one', ['browserSync', 'sass', 'autoprefixme', 'minify-css', 'minify-js'], () => {
  gulp.watch('scss/*.scss', ['sass'])
  gulp.watch('css/*.css', ['minify-css'], ['autoprefixme'])
  gulp.watch('js/*.js', ['minify-js'])
  // Reloads the browser whenever HTML, CSS or JS files change
  gulp.watch('*.html', browserSync.reload)
  gulp.watch('*.css', browserSync.reload)
  gulp.watch('js/**/*.js', browserSync.reload)
})
