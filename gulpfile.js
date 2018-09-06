const gulp = require('gulp')
const less = require('gulp-less')
const base64 = require('gulp-css-base64')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const flexbugsFixes = require('postcss-flexbugs-fixes')
const postCssOpts = [
    autoprefixer(['iOS >= 8', 'Android >= 4.1']),
    flexbugsFixes
]


gulp.task('less', function() {
    return gulp.src(['src/app.less','src/**/*.less'], { base: 'src' })
        .pipe(less())
        .pipe(base64({
            baseDir: "images"
        }))
        .pipe(postcss(postCssOpts))
        .pipe(rename(function(path) {
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest('dist'))
})


gulp.task('pages', function() {
    return gulp.src([
            'src/app.js',
            'src/app.json',
            'src/app.wxss',
            'src/project.config.json',
            'src/pages/**',
            'src/images/*',
            'src/utils/**',
            'src/lib/mockjs/*',
            'src/templates/**',
            '!src/pages/**/*.less',
            '!src/*.less'
        ], { base: 'src' })
        .pipe(gulp.dest('dist'))
})

/**
 * 监听变动
 */
gulp.task('watch', function() {
    gulp.watch([
        'src/app.less',
        'src/zui/index.less',
        'src/zui/**/index.less',
        'src/less/*.less',
        'src/**/*.less',
        'src/templates/**/*.less',
        'src/common/**/*.less'
    ], ['less'])
    gulp.watch([
        'src/app.js',
        'src/app.json',
        'src/pages/**',
        'src/utils/**',
        'src/templates/**'
    ], ['pages'])
})

gulp.task('build', ['less', 'pages'])
gulp.task('default', ['less', 'pages', 'watch'])
