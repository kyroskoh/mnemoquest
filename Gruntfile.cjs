module.exports = function(grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  
  // Time how long tasks take
  require('time-grunt')(grunt);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Clean directories
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
      temp: {
        src: ['.tmp']
      }
    },

    // Shell commands
    shell: {
      // TypeScript compilation
      typescript: {
        command: 'tsc',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      },

      // Vite build
      viteBuild: {
        command: 'vite build',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      },

      // Run dev server
      dev: {
        command: 'vite',
        options: {
          stdout: true,
          stderr: true
        }
      },

      // Preview production build
      preview: {
        command: 'vite preview',
        options: {
          stdout: true,
          stderr: true
        }
      },

      // Install dependencies
      install: {
        command: 'npm install',
        options: {
          stdout: true,
          stderr: true
        }
      },

      // Run tests (placeholder for future)
      test: {
        command: 'echo "No tests configured yet"',
        options: {
          stdout: true
        }
      },

      // Git commands for deployment
      gitStatus: {
        command: 'git status',
        options: {
          stdout: true
        }
      },

      gitAdd: {
        command: 'git add dist',
        options: {
          stdout: true
        }
      }
    }
  });

  // Custom task descriptions
  grunt.registerTask('build', 'Build the project for production', function() {
    grunt.log.writeln('Building MnemoQuest for production...');
    grunt.task.run([
      'clean:dist',
      'shell:typescript',
      'shell:viteBuild'
    ]);
  });

  grunt.registerTask('dev', 'Start development server', [
    'shell:dev'
  ]);

  grunt.registerTask('preview', 'Preview production build', [
    'shell:preview'
  ]);

  grunt.registerTask('test', 'Run tests', [
    'shell:test'
  ]);

  grunt.registerTask('install', 'Install dependencies', [
    'shell:install'
  ]);

  grunt.registerTask('deploy', 'Build and prepare for deployment', function() {
    grunt.log.writeln('Preparing deployment...');
    grunt.task.run([
      'clean:dist',
      'shell:typescript',
      'shell:viteBuild',
      'shell:gitStatus'
    ]);
    grunt.log.ok('Build complete! Deploy the dist/ folder.');
  });

  grunt.registerTask('ci', 'Continuous Integration build', function() {
    grunt.log.writeln('Running CI build...');
    grunt.task.run([
      'clean:dist',
      'shell:typescript',
      'shell:viteBuild'
    ]);
  });

  grunt.registerTask('clean-all', 'Clean all generated files', [
    'clean:dist',
    'clean:temp'
  ]);

  // Default task
  grunt.registerTask('default', function() {
    grunt.log.writeln('');
    grunt.log.writeln('MnemoQuest - Grunt Task Runner');
    grunt.log.writeln('==============================');
    grunt.log.writeln('');
    grunt.log.writeln('Available tasks:');
    grunt.log.writeln('  grunt build        - Build for production');
    grunt.log.writeln('  grunt dev          - Start development server');
    grunt.log.writeln('  grunt preview      - Preview production build');
    grunt.log.writeln('  grunt test         - Run tests');
    grunt.log.writeln('  grunt deploy       - Build and prepare for deployment');
    grunt.log.writeln('  grunt ci           - Run CI build (for GitHub Actions)');
    grunt.log.writeln('  grunt clean-all    - Clean all generated files');
    grunt.log.writeln('  grunt install      - Install dependencies');
    grunt.log.writeln('');
    grunt.log.writeln('Example: grunt build');
    grunt.log.writeln('');
  });
};

