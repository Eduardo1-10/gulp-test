const gulp = require('gulp'); /* Step 1 Get Gulp */

const sass = require('gulp-sass'); /*Step 2 Require the gulp-sass plugin*/

const browserSync = require('browser-sync').create(); //browser reload plugin

const cleanCSS = require('gulp-clean-css'); // css minify plugin


//compile scss into css and sync to browser
function mysass(){
    return gulp.src('app/scss/style.scss') /* this is the source file*/
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(cleanCSS({
        level: {
          2: {
            mergeAdjacentRules: true, // controls adjacent rules merging; defaults to true
            mergeIntoShorthands: true, // controls merging properties into shorthands; defaults to true
            mergeMedia: true, // controls `@media` merging; defaults to true
            mergeNonAdjacentRules: true, // controls non-adjacent rule merging; defaults to true
            mergeSemantically: false, // controls semantic merging; defaults to false
            overrideProperties: true, // controls property overriding based on understandability; defaults to true
            removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
            reduceNonAdjacentRules: true, // controls non-adjacent rule reducing; defaults to true
            removeDuplicateFontRules: true, // controls duplicate `@font-face` removing; defaults to true
            removeDuplicateMediaBlocks: true, // controls duplicate `@media` removing; defaults to true
            removeDuplicateRules: true, // controls duplicate rules removing; defaults to true
            removeUnusedAtRules: true, // controls unused at rule removing; defaults to false (available since 4.1.0)
            restructureRules: true, // controls rule restructuring; defaults to false
            skipProperties: [] // controls which properties won't be optimized, defaults to `[]` which means all will be optimized (since 4.1.0)
          },
        }
      })) // minify
      .pipe(gulp.dest('app/css')) /* this is the destination folder */
      .pipe (browserSync.stream()); /* sync css changes to the browser */
  };

function watch(){
    browserSync.init({
        server: "./app"
    });
gulp.watch('app/scss/*.scss', mysass); /* if anythig changes in app/scss folder Run mysass*/
gulp.watch('./app/*.html').on('change', browserSync.reload); /* reloads browser in change of any .html document in the app folder */
gulp.watch('./app/css/*.css').on('change', browserSync.reload); /* reloads browser in change of any .css document in the app folder */
gulp.watch('./app/scss/style.scss').on('change', browserSync.reload); /* reloads browser in change style.scss document in the app folder */
};

exports.watch = watch;