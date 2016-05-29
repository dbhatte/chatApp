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
  });

  // Load the plugin that provides the "stylus" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Define the default task
  grunt.registerTask('default', ['uglify' , 'watch']);

  grunt.registerTask('build', ['uglify']);

};