const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

//compile scss to css

function style() {
  //WHere si my scss file ?
  return (
    gulp
      .src("./scss**/*.scss")
      //pass itthrough the compiler
      .pipe(sass().on("error", sass.logError))
      //where to save compiled css ?
      .pipe(gulp.dest("./css"))
      // changes goes to all browsers
      .pipe(browserSync.stream())
  );
}
function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./scss/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/**/*.js").on("change", browserSync.reload);
  gulp.watch("./pages/**/*.html").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
