var gulp = require('gulp');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var cached = require('gulp-cached');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imgmin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync');


var htmlSrc = 'src/*.html';
var htmlDist = 'views';
var sassSrc = 'src/sass/**/*.scss';
var cssDist = 'public/css';
var jsSrc = 'src/js/**/*.js';
var jsDist = 'public/js';
var imgSrc = 'src/img/**/*.{jpg,jpeg,png,gif}';
var imgDist = 'public/img';
var spriteSrc = 'src/img/*.png';
var spriteDist = 'public/img';


// 清除文件夹内容
gulp.task('clean', function() {
    gulp.src('public', {
            read: false,
        })
        .pipe(clean());
});

// HTML压缩
gulp.task('html', function() {
    gulp.src(htmlSrc)
        .pipe(htmlmin({
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest(htmlDist));
});

// Sass编译 压缩
gulp.task('css', function() {
    gulp.src(sassSrc)
        .pipe(cached('css'))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(gulp.dest(cssDist))
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(cssnano({
            zindex: false
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(cssDist))
        .pipe(browserSync.reload({
            stream: true,
        }));
});

// JavaScript压缩 合并
gulp.task('js', function() {
    gulp.src(jsSrc)
        .pipe(cached('js'))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(jsDist));
});

// 图片压缩
gulp.task('img', function() {
    gulp.src(imgSrc)
        .pipe(cached('img'))
        .pipe(imgmin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            multipass: true,
        }))
        .pipe(gulp.dest(imgDist));
});

// CSS Sprite生成
gulp.task('sprite', function() {
    gulp.src(spriteSrc)
        .pipe(imgmin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            multipass: true,
        }))
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
        }))
        .pipe(gulp.dest(spriteDist));
});


gulp.task('default', function() {
    browserSync.init(null, {
        proxy: 'http://localhost:3000'
    });
    gulp.watch(htmlSrc, ['html']);
    gulp.watch(sassSrc, ['css']);
    gulp.watch(jsSrc, ['js']);
    gulp.watch(['views/**/*', 'public/**/*', '!public/css/**/*']).on('change', browserSync.reload);
});