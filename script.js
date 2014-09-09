#!/usr/bin/env js
// script.js - a simple javascript script template
//
// no # for comments :/
// no argument parsing library in stdlib :/
// libraries are mostly async :/

// require the exec function from child_process
process.exec = require('child_process').exec

// usage function
var usage = function() {
    console.log();
    console.log('  Usage: ' + process.argv[1] + ': <path> ');
    console.log('  <path>      full path to a directory');
    console.log();
}

// spew usage if we didnt get a path or got -h or --help
if (process.argv.length < 3 || process.argv[2] === '-h' || process.argv[2] === '--help') {
    usage();
    process.exit(1);
}

// simple async workaround, make callbacks trigger the end of the script
var _scriptEnd = function(results, code) {
    console.log(results.stdout);
    process.exit(code);
}

// our callback
var _readFile = function(error, stdout, stderr) {
    results = {};
    results.stdout = stdout;
    results.stderr = stderr;
    results.error = null;
    results.code = 0;
    if (error !== null) {
        results.error = error
    }
    _scriptEnd(results, results.code)
}

// hopefully someone will appreciate a main function
var main = function() {
    var path = process.argv[2];
    var result = process.exec('ls -l ' + path, _readFile);
}

// only run if run directly instead of via require
if (module.parent === null) main()
