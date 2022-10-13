let project_folder = "src";
let source_folder = "assets";
let path = {
        build: {
            css: project_folder + "/css/",
            js: project_folder + "/js/",
            img: project_folder + "/img/",
            fonts: project_folder + "/fonts/",
            video: project_folder + "/video/",
        },
        src: {
            css: [source_folder + "/scss/*.scss", "!" + source_folder + "/_*.scss"],
            js: source_folder + "/js/*.js",
            img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
            fonts: source_folder + "/fonts/*.ttf",
            video: source_folder + "/video/*.mp4",
        },
        watch: {
            css: source_folder + "/scss/**/*.scss",
            js: source_folder + "/js/**/*.js",
        },
        clean: "./" + project_folder + "/"
    },

    {src, dest} = require("gulp"),
    gulp = require("gulp"),
    del = require("del"),
    scss = require("gulp-sass")(require("sass")),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    webp = require("gulp-webp"),
    imagemin = require("gulp-imagemin"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2");

function video() {
    return src(path.src.video)
        .pipe(dest(path.build.video))
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(group_media())
        .pipe(
            autoprefixer({
                overrideBrowserList: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
}

function js() {
    return src(path.src.js)
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
}

function images() {
  return src(path.src.img)
      .pipe(
          webp({
            quality: 70
          })
      )
      .pipe(dest(path.build.img))
      .pipe(src(path.src.img))
      .pipe(
          imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
          })
      )
      .pipe(dest(path.build.img))
}

function fonts(params) {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

function watchFiles(params) {
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, fonts, video, images));
let watch = gulp.parallel(build, watchFiles);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.video = video;
exports.build = build;
exports.watch = watch;
exports.default = watch;
