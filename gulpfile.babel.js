const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const del = require('del');
const spawn = require('child_process').spawn;

var node;

const paths = {
    srcFiles: './src/**/*.js',
    libDir: './lib',
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

gulp.task('main', ['build'], () => {
    if (node) { node.kill(); console.log('Restarting bot...') }
    node = spawn('node', [`${paths.libDir}/${paths.entryPoint}`], { stdio: 'inherit' });
    node.on('close', function (code) {
        if (code === 8) {
            console.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('watch', () => {
    gulp.watch(paths.srcFiles, ['main']);
});

gulp.task('default', ['main', 'watch']);

process.on('exit', function () {
    if (node) node.kill()
});
