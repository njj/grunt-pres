module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            templates: {
                files: [
                    {
                        cwd: 'src/',
                        src: ['*.html'],
                        expand: true,
                        dest: 'build/'
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/**/*.js',
                dest: 'build/js/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            js: {
                src: 'src/js/**/*.js',
                dest: 'build/js/<%= pkg.name %>.js'
            }
        },
        watch: {
          scripts: {
            files: ['src/js/**/*.js'],
            tasks: ['uglify','concat'],
            options: {
              spawn: false,
            }
          },
          templates: {
            files: ['src/*.html'],
            tasks: ['copy:templates'],
            options: {
              spawn: false,
            }
          }
      }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register tasks with Grunt
    grunt.registerTask('default', ['uglify', 'concat', 'copy']);

};