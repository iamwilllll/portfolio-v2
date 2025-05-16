// gulp, gulp-sass, gulp-terser, gulp-typescript, prettier, sass, sharp

import * as dartSass from 'sass'; // Import the dart sass module
import gulpSass from 'gulp-sass'; // Import the gulp-sass module
import terser from 'gulp-terser'; // Import the gulp-terser module to compress JS files
import ts from 'gulp-typescript'; // Import the gulp-typescript module to compilate TS files
import sharp from 'sharp'; // Import the sharp module for image manipulation
import path from 'path'; // Import the path module to work with file paths
import fs from 'fs'; // Import the fs module to work with the file system
import { exec } from 'child_process'; // Import exec to run Prettier

// Import Gulp methods

import { src, dest, watch, series } from 'gulp';

const sass = gulpSass(dartSass); // Initialize gulp-sass with dart-sass

// Function to process JS files
export function compileTs() {
    const tsProject = ts.createProject('tsconfig.json');

    return src('src/scripts/**/*.ts').pipe(tsProject()).js.pipe(terser()).pipe(dest('build/JavaScript'));
}

// Function to process CSS files
export function css() {
    return src('src/styles/index.scss', { sourcemaps: true })
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // Compile and compress SCSS
        .pipe(dest('build/css', { sourcemaps: '.' })); // Save compiled files with sourcemaps
}

// Function to process images
export async function crop() {
    const folders = ['src/assets/images', 'build/images/webp', 'build/images/png', 'build/images/jpg', 'build/images/ico', 'build/images/svg', 'build/images/crop/webp', 'build/images/crop/png', 'build/images/crop/jpg'];

    const cropWidth = null;
    const cropHeight = null;

    // Create folders if they don't exist
    folders.forEach(folder => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
    });

    const images = fs.readdirSync('src/assets/images').filter(file => /\.(jpg|png)$/i.test(file));

    try {
        for (const file of images) {
            const inputFile = path.join('src/assets/images', file);
            const fileName = path.parse(file).name;

            await sharp(inputFile).toFormat('webp', { quality: 99 }).toFile(`build/images/webp/${fileName}.webp`);
            await sharp(inputFile).toFormat('png', { quality: 99 }).toFile(`build/images/png/${fileName}.png`);
            await sharp(inputFile).toFormat('jpeg', { quality: 99 }).toFile(`build/images/jpg/${fileName}.jpg`);

            if (cropWidth && cropHeight) {
                await sharp(inputFile).resize(cropWidth, cropHeight, { fit: 'cover' }).toFormat('webp', { quality: 99 }).toFile(`build/images/crop/webp/${fileName}-crop.webp`);
                await sharp(inputFile).resize(cropWidth, cropHeight, { fit: 'cover' }).toFormat('png', { quality: 99 }).toFile(`build/images/crop/png/${fileName}-crop.png`);
                await sharp(inputFile).resize(cropWidth, cropHeight, { fit: 'cover' }).toFormat('jpeg', { quality: 99 }).toFile(`build/images/crop/jpg/${fileName}-crop.jpg`);
            }
        }

        // Move icons and SVGs
        src('src/assets/images/**/*.ico').pipe(dest('build/images/ico'));
        src('src/assets/images/**/*.svg').pipe(dest('build/images/svg'));

        // Copiar directamente los archivos WebP sin conversión
        src('src/assets/images/**/*.webp').pipe(dest('build/images/webp'));
    } catch (error) {
        console.error('Error processing images:', error);
    }
}

// Ejecuta el comando Prettier usando el archivo de configuración .prettierrc
export function format(cb) {
    exec('prettier --write .', (err, stdout, stderr) => {
        console.log(stdout);
        console.error(stderr);
        cb(err);
    });
}

// Function to watch for changes in SCSS and JS files
export function dev() {
    watch('src/styles/**/*.scss', css);
    watch('src/TypeScript/**/*.ts', compileTs);
    watch('src/assets/images/**', crop);
}

// Default task that runs functions in series
export default series(format, crop, compileTs, css, dev);
