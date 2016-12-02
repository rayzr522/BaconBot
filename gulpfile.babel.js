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

gulp.task('bot', ['build'], (callback) => {
    const builtFile = `${paths.libDir}/${paths.entryPoint}`;
    console.log(`Running node at ${builtFile}`);

    if (node) { node.kill(); console.log('Killed server.') }
    node = spawn('node', [builtFile], { stdio: 'inherit' });
    node.on('close', function(code) {
        if (code === 8) {
            console.log('Error detected, waiting for changes...');
        }
    });
    console.log('Ran bot.');
});

gulp.task('watch', () => {
    gulp.watch(paths.srcFiles, ['bot'], () => console.log('Files were changed!'));
});

gulp.task('default', ['bot', 'watch']);

process.on('exit', function() {
    if (node) node.kill()
});
