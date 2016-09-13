/* global __ROOT_DIR */
require(`${__ROOT_DIR.TEST_SUPPORT}/_all.js`);

let expect = require('expect.js');

let requireFilesFromDir = require(`${__ROOT_DIR.LIB}/require_files_from_dir.js`);

describe('.requireFilesFromDir()', function() {
  let absDirPath = `${__ROOT_DIR.TEST_FIXTURES}/lib/require_files_from_dir`;

  context('guards against bad parameters', function() {
    it('requires params.callback and it must be a function', function() {
      expect(requireFilesFromDir).withArgs({callback: '/'})
        .to.throwException(/must be a function/);
    });

    it('requires params.absDirPath and it must be a string', function() {
      expect(requireFilesFromDir).withArgs({callback: function() {}, absDirPath: 1})
        .to.throwException(/must be a String/);
    });
  });

  it('is a function', function() {
    expect(requireFilesFromDir).to.be.a('function');
  });

  it('loads all .js and .json files with ignoreJson defaulting to false', function() {
    let actual = 0;
    let cb = function() { actual += 1; };

    requireFilesFromDir({absDirPath, callback: cb});
    expect(actual).to.be(4);
  });

  it('loads all .js only if ignoreJson is true', function() {
    let actual = 0;
    let cb = function() { actual += 1; };

    requireFilesFromDir({absDirPath, callback: cb, ignoreJson: true});
    expect(actual).to.be(2);
  });

  it('strips the file extension and camelcases the file name by default', function() {
    let actual = [];
    let cb = function(filename) { actual.push(filename); };

    requireFilesFromDir({absDirPath, callback: cb});

    // Sort because fs.readdirSync does not gauranteed order
    expect(actual.sort()).to.eql(["a", "b", "barFoo", "fooBar"]);
  });

  it('calls params.callback(filename, requiredFile) with the files from dir', function() {
    let actualName = [];
    let actualType = [];

    let cb = function(filename, requiredFile) {
      actualName.push(requiredFile.name);
      actualType.push(typeof requiredFile);
    };

    requireFilesFromDir({absDirPath, callback: cb});
    expect(actualName.sort()).to.eql(["a", "b", "barFoo", "fooBar"]);
    expect(actualType.sort()).to.eql(['function', 'function', 'object', 'object']);
  });
});
