const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const del = require('del');
const exec = require('child_process').exec;

var lastProcess;

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

gulp.task('main', ['build'], (callback) => {
    const builtFile = `${paths.libDir}/${paths.entryPoint}`;
    console.log(`Running node at ${builtFile}`);
    console.log(typeof lastProcess);
    if (lastProcess && typeof lastProcess.kill === 'function') {
        lastProcess.kill();
    }
    console.log(typeof lastProcess);
    lastProcess = exec(`node ${builtFile}`, {}, function(error, stdout) {
        return callback(error);
    });
    lastProcess.stdout.on('data', function(data) {
        console.log(`[Node] ${data.substr(0, data.lastIndexOf('\n'))}`);
    });
    console.log(typeof lastProcess);
});

gulp.task('watch', () => gulp.watch(paths.srcFiles, ['main']));

gulp.task('default', ['watch', 'main']);
