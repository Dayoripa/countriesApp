const { src, dest, watch, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


// imagenes
// const imagemin = require('gulp-imagemin');



function css(done) {
    src('src/scss/app.scss')
        .pipe( sass() )
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( dest('build/css'))

    done()
}

// function images(  ) {
//     return src('src/image/**/*')
//         .pipe( imagemin({ optimizationLevel: 3 }) )
//         .pipe( dest('build/img') );
//  }
 

function dev() {
    watch( 'src/scss/**/*.scss', css );
    // watch( 'src/image/**/*', images);
}


exports.css = css;
exports.dev = dev;
// exports.images = images;
exports.default = series( css, dev );
