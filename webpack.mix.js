let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

mix.copyDirectory('resources/assets/materialize-admin-template/app-assets/fonts', 'public/fonts');
mix.copyDirectory('resources/assets/materialize-admin-template/app-assets/images', 'public/images');
mix.copyDirectory('resources/assets/materialize-admin-template/app-assets/js', 'public/js/materialize-admin');
mix.copyDirectory('resources/assets/materialize-admin-template/app-assets/vendors', 'public/vendors');
