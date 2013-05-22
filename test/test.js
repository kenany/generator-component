var path    = require('path');
var assert  = require('assert');
var helpers = require('yeoman-generator').test;

describe('generator-component', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('component:lib', [
        '../../lib'
      ]);
      done();
    }.bind(this));
  });

  it('can be imported', function() {
    var importApp = require('../lib');
    assert(importApp !== undefined);
  });

  it('creates basic files', function(done) {
    var expected = [
      '.gitattributes',
      '.gitignore',
      'HISTORY.md',
      ['component.json', /"name": "temp"/],
      'index.js',
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      'componentRepo': 'KenanY/tester',
      'componentDescription': 'Component for testing.',
      'componentHasJS': 'Y',
      'componentHasCSS': 'N',
      'componentHasHTML': 'N',
      'testScaffolding': 'N',
      'editorConfig': 'N',
      'npmPublishing': 'N'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function() {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates extra files', function(done) {
    var expected = [
      'test/index.js',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.travis.yml',
      'HISTORY.md',
      ['component.json', /"name": "temp"/],
      'index.js',
      ['package.json', /"name": "temp"/],
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      'componentRepo': 'KenanY/tester',
      'componentDescription': 'Component for testing.',
      'componentHasJS': 'Y',
      'componentHasCSS': 'Y',
      'componentHasHTML': 'Y',
      'testScaffolding': 'Y',
      'editorConfig': 'Y',
      'npmPublishing': 'Y'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function() {
      helpers.assertFiles(expected);
      done();
    });
  });
});