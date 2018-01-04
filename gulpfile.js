const gulp = require('gulp');
const eslint = require('gulp-eslint');
const { spawn } = require('child_process');

let bot;

const paths = {
    srcFiles: './src/**/*.js',
    config: './config.json',
    entryPoint: './src/bot.js'
};

gulp.task('lint', () =>
    gulp.src(paths.srcFiles)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError()));

gulp.task('main', ['lint'], () => {
    if (bot) {
        bot.kill();
        console.log('Restarting bot...');
    }

    bot = spawn('node', [paths.entryPoint], { stdio: 'inherit' });
    bot.on('close', code => {
        if (code === 8) {
            console.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('watch', () => gulp.watch([paths.srcFiles, paths.config], ['main']));

gulp.task('default', ['main', 'watch']);

process.on('exit', () => bot && bot.kill());



