module.exports = function( grunt )
{
const os = require( 'os' );
var root = './';
var dest = './release/<%= pkg.name %> <%= pkg.version %>/';
var desktopDest = './release/<%= pkg.name %> <%= pkg.version %> desktop/';
var temp = './temp/';

grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

        clean: {
                // delete the destination folder
            previousBuild: [
                dest,
                desktopDest
            ],

                // remove temporary files
            afterBuild: [
                    temp,
                    '.tscache',
                ]
        },

            // compile to javascript
        ts: {
            release: {
                src: [ root + 'scripts/*.ts' ],
                dest: temp + 'code.js',
                options: {
                    "noImplicitAny": true,
                    "noImplicitReturns": true,
                    "noImplicitThis": true,
                    "noUnusedLocals": true,
                    "strictNullChecks": true,
                    "target": "es5"
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
                    'random/icon128.png',
                    'sounds/sound1.mp3',
                    'sounds/sound1.ogg',
                    'web_workers/*.js',
                    'electron_main.js',
                    'license.txt',
                    'package.json'
                ],
                dest: dest
            }
        },

        uglify: {
            release: {
                files: [{
                    src: temp + 'code.js',
                    dest: dest + 'min.js'
                }]
            }
        },

        cssmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: root + 'css',
                    src: '*.css',
                    dest: dest + 'css'
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
        },

        'electron-packager': {
            release: {
                options: {
                    platform: os.platform(),
                    arch: os.arch(),
                    dir: dest,
                    out: desktopDest,
                    name: '<%= pkg.name %>'
                }
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
grunt.loadNpmTasks( 'grunt-electron-packager' );

    // tasks
grunt.registerTask( 'default', [ 'clean:previousBuild', 'ts', 'copy', 'uglify', 'cssmin', 'processhtml', 'clean:afterBuild' ] );
grunt.registerTask( 'desktop', [ 'default', 'electron-packager' ] );
};
