const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const del = require('del');
const exec = require('child_process').exec;

const paths = {
    srcFiles: 'src/**/*.js',
    libDir: 'lib',
    entryPoint: 'bot.js'
}

gulp.task('build', ['clean', 'lint'], () =>
    gulp.src(paths.srcFiles)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir))
);

gulp.task('clean', () => del(paths.libDir));

gulp.task('lint', () =>
    gulp.src(paths.srcFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('main', ['build'], (callback) =>
    exec(`node ${paths.libDir}/${paths.entryPoint}`, (error, stdout) => {
        console.log(stdout);
        return callback(error);
    })
);

gulp.task('watch', () => gulp.watch(paths.srcFiles, ['main']));

gulp.task('default', ['watch', 'main']);
