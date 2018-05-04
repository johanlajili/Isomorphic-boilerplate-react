const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack = require('webpack');
const webpackDevConfig = require('./webpack.dev.js');
const webpackProdConfig = require('./webpack.prod.js');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printBuildError = require('react-dev-utils/printBuildError');
const runSequence = require('run-sequence');
const nodemon = require('gulp-nodemon');

/* Builds each javascript file individually
using Babel, and copy them to the "build" folder.
Used only in the backend */
gulp.task('build-individual-files', () => (
	gulp.src('./app/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('./build'))
));

function buildClient(config, callback){
	const compiler = webpack(config, (err, stats) => {
		if (err) {
			printBuildError(err);
		}
		const rawMessages = stats.toJson({}, true);
		const messages = formatWebpackMessages(rawMessages);
		if (!messages.errors.length && !messages.warnings.length) {
			console.log('Compiled successfully!');
		}
		if (messages.errors.length) {
			console.log('Failed to compile.');
			messages.errors.forEach(e => console.log(e));
			return;
		}
		if (messages.warnings.length) {
			console.log('Compiled with warnings.');
			messages.warnings.forEach(w => console.log(w));
		}
		callback();
	});

}

/* uses webpack to bundle all the file together and also babel
to compile react/es6 */
gulp.task('build-client:dev', (callback) => {
	buildClient(webpackDevConfig, callback);
});
gulp.task('build-client:prod', (callback) => {
	buildClient(webpackProdConfig, callback);
});

gulp.task('run-server', () => nodemon({
	script: './build/server/index.js',
	ext: 'js html',
	env: { NODE_ENV: 'development' },
}));

gulp.task('watch-everything', () => (
	gulp.watch('./app/**.*', ['build-individual-files', 'build-client:dev'])
));

gulp.task('dev', () => (
	runSequence(['build-individual-files', 'build-client:dev'], ['run-server', 'watch-everything'])
));
gulp.task('prod', () => (
	runSequence(['build-individual-files', 'build-client:prod'], ['run-server'])
));
