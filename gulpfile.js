const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

const paths = {
  scss: ["src/*.scss", "!src/boring/**/*.scss"], // Path to your SCSS files
  css: "./", // Output directory for CSS
};

function compileSass() {
  return gulp
    .src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        charset: true,
        outputStyle: "expanded", // This helps ensure charset is preserved
      }).on("error", sass.logError)
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.css));
}

function serve() {
  browserSync.init({
    server: "./", // Serve files from the root directory
  });

  gulp.watch(paths.scss, compileSass);
  gulp.watch(["./*.html", "./*.css"], (done) => {
    browserSync.reload();
    done();
  });
}

// Define gulp tasks
const build = gulp.series(compileSass);
const watch = gulp.series(build, serve);

exports.build = build;
exports.watch = watch;
exports.default = build;
