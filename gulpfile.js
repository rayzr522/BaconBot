const gulp = require('gulp');
const eslint = require('gulp-eslint');
const spawn = require('child_process').spawn;

var bot;

const paths = {
    srcFiles: './src/**/*.js',
    configs: './src/**/*.json',
    entryPoint: './src/bot.js'
}

gulp.task('lint', () =>
    gulp.src(paths.srcFiles)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task('main', ['lint'], () => {
    if (bot) { bot.kill(); console.log('Restarting bot...') }
    bot = spawn('node', [`${paths.entryPoint}`], { stdio: 'inherit' });
    bot.on('close', function (code) {
        if (code === 8) {
            console.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('watch', () => {
    gulp.watch([
        paths.srcFiles,
        paths.configs
    ], ['main']);
});

gulp.task('default', ['main', 'watch']);

process.on('exit', () => { if (bot) bot.kill(); });



