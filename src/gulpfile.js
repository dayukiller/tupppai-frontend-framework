var gulp    = require('gulp'),
	shell   = require('gulp-shell'),
    jshint  = require('gulp-jshint'),
    uglify  = require('gulp-uglify'),
    clean   = require('gulp-clean'),
    rename  = require('gulp-rename'),
    rev     = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
	less    = require("gulp-less"),
    _       = require("underscore"),
    minimist= require('minimist');

var knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'production' }
};
var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('clean', function() {
    return gulp.src('../res', {read: false, force: true}).pipe(clean());
});

// 监听会变动的文件
gulp.task('watch', function() {
    //gulp.watch(['./app/**'], ['app']);
    //gulp.watch(['./less/**'], ['css']);
    gulp.watch(['./lib/**/*','./app/**/*', 'main.js', './less/**/*.less'], function(event, type) {
        var src = event.path;
        var arr = src.replace('/src/', '/res/').split('/');
        arr.pop();
        var dest = arr.join('/');

	    if(src.indexOf('less', src.length - 'less'.length) !== -1) {
            console.log(event.path + '(less) -> ' + '../css');
            return gulp.src(event.path)
                .pipe(less())
                .pipe(gulp.dest('../css'));
        }
        console.log(event.path + '(res) -> ' + dest);
        return gulp.src(event.path).pipe(gulp.dest(dest));

    });
});

gulp.task('rev', function() {
    return gulp.src(['../css/rev/**/*.json', '../index.html']);
});

gulp.task('css', function() {
    return gulp.src(['less/*.less'])
        .pipe(less()).pipe(rename(function(path) { 
            //path.basename += '.min';
            path.extname   = '.css';
        }))
        .pipe(gulp.dest('../css'));
        //.pipe(rev())
        //.pipe(rev.manifest())
        //.pipe(gulp.dest('../css/rev'));
});

gulp.task('app', function() {
    return gulp.src(['./app/**', './lib/**', 'main.js'])
        .pipe(gulp.dest('../res'));
});

gulp.task('less', function() {
    return gulp.src(['less/*.less'])
        .pipe(less())
        .pipe(gulp.dest('../css'));
});

gulp.task('rjs', shell.task([
	'node r.js -o build.js',
    'node r.js -o cssIn=../css/import.css out=../css/main.css optimizeCss=standard'
]));

gulp.task('cp', function() {
    gulp.src(['../css/**']).pipe(gulp.dest('./dist/css'));
    gulp.src(['../res/**']).pipe(gulp.dest('./dist/res'));
});

gulp.task('html', function() {
    // 获取fs
    var fs  = require("fs");
    // 同步读取
    var tpl = fs.readFileSync('index.tpl');
    // 参数获取
    var data= [];
    data['env']  = options.env;
    data['code'] = new Date().getTime();
    
    var template = _.template(tpl.toString());

    fs.writeFile("../index.html", template(data), function(e){//会先清空原先的内容
        if(e) throw e;
    })
});
