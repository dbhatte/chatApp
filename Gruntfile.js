var packageJson = require('./package.json');
var path = require('path');
var swPrecache = require('./node_modules/sw-precache/lib/sw-precache.js');


module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      js: {
       files: ['public/**/*.js'],
        tasks: ['uglify']
      }
     },

      uglify: {
       all: {
           files: {
               'public/js/min/main.min.js': [
               //'bower_components/*.js', 
               'public/js/src/*.js'
               ]
           }
        },
      },

      swPrecache: {
          dev: {
              handleFetch: true,
              publicDir: 'public',
              bowerDir: 'bower_components'
          }
      }
  });

    function writeServiceWorkerFile(publicDir, bowerDir, handleFetch, callback) {
        var config = {
            cacheId: packageJson.name,
            // If handleFetch is false (i.e. because this is called from swPrecache:dev), then
            // the service worker will precache resources but won't actually serve them.
            // This allows you to test precaching behavior without worry about the cache preventing your
            // local changes from being picked up during the development cycle.
            handleFetch: handleFetch,
            logger: grunt.log.writeln,
            staticFileGlobs: [
                publicDir + '/index.html',
                publicDir + '/css/app.css',
                publicDir + '/js/min/*.js',
                publicDir + '/partials/*.html',
                bowerDir + '/**/*min*.*',
                bowerDir + '/bootstrap/dist/*.*',
                bowerDir + '/socket.io-client/socket.io.js'
            ],
            runtimeCaching: [{
                urlPattern: /\/messages/,
                handler: 'fastest'
            }],
            stripPrefix: publicDir + '/',
            // verbose defaults to false, but for the purposes of this demo, log more.
            verbose: true
        };

        swPrecache.write(path.join(publicDir, 'service-worker.js'), config, callback);
    }

    grunt.registerMultiTask('swPrecache', function() {
        var done = this.async();
        var publicDir = this.data.publicDir;
        var bowerDir = this.data.bowerDir;
        var handleFetch = this.data.handleFetch;

        writeServiceWorkerFile(publicDir, bowerDir, handleFetch, function(error) {
            if (error) {
                grunt.fail.warn(error);
            }
            done();
        });
    });


    // Load the plugin that provides the "stylus" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Define the default task
    grunt.registerTask('default', ['uglify', 'watch']);

    grunt.registerTask('build', ['uglify', 'swPrecache']);

};