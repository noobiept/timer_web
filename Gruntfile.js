module.exports = function( grunt )
{
var root = './';
var dest = './release/<%= pkg.name %> <%= pkg.version %>/';

grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

            // delete the destination folder
        clean: {
            options: {
                force: true
            },
            release: [
                dest
            ],
                // remove temporary files
            temp: [
                root + 'temp/'
            ]
        },

            // compile to javascript
        ts: {
            release: {
                src: [ root + 'scripts/*.ts' ],
                dest: 'temp/code.js',
                options: {
                    sourceMap: false,
                    target: 'es5'
                }
            }
        },

            // copy the audio and libraries files
        copy: {
            release: {
                expand: true,
                cwd: root,
                src: [
                    'libraries/**',
                    'random/icon16.png',
                    'random/icon128.png',
                    'sounds/sound1.mp3',
                    'sounds/sound1.ogg',
                    'background.js',
                    'manifest.json'
                ],
                dest: dest
            }
        },

        uglify: {
            release: {
                files: [{
                    src: 'temp/code.js',
                    dest: dest + 'min.js'
                }]
            }
        },

        cssmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: root,
                    src: 'css/style.css',
                    dest: dest
                }]
            },
            options: {
                advanced: false
            }
        },

        processhtml: {
            release: {
                files: [{
                    expand: true,
                    cwd: root,
                    src: 'index.html',
                    dest: dest
                }]
            }
        }
    });

    // load the plugins
grunt.loadNpmTasks( 'grunt-contrib-copy' );
grunt.loadNpmTasks( 'grunt-contrib-uglify' );
grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
grunt.loadNpmTasks( 'grunt-contrib-clean' );
grunt.loadNpmTasks( 'grunt-processhtml' );
grunt.loadNpmTasks( 'grunt-ts' );

    // tasks
grunt.registerTask( 'default', [ 'clean:release', 'ts', 'copy', 'uglify', 'cssmin', 'processhtml', 'clean:temp' ] );
};
