var gulp = require('gulp');
var typescript = require('gulp-tsc');
var concat = require('gulp-concat');
var replace = require('gulp-replace');

gulp.task('famous.d.ts', function(){
	  gulp.src(['src/famous/**/*.d.ts'])
	    .pipe(replace(/\/\/\/.*reference *path.*/g, ''))
	    .pipe(concat('famous.d.ts'))
	    .pipe(gulp.dest('dist/'))
});

gulp.task('compile', function(){
  gulp.src(['src/**/*.ts'])
	    .pipe(typescript({ sourcemap: true, module: 'amd', noImplicitAny: true }))
	    .pipe(gulp.dest('dist/'))
});
