const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
// 将JPEG和PNG图像转换为WebP
const imageminWebp = require('imagemin-webp');

(async () => {
  await imagemin(['src/assets/*.{jpg,png}'], {
    destination: 'build/images',
    plugins: [
      // imageminWebp({quality: 50}),
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  }).then(() => {
    console.log('Images optimized')
  })
})();
