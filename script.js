#!/usr/bin/env js
// script.js - a simple javascript script template
// author info, date


// usage function
var usage = function() {
    console.log();
    console.log('  Usage: ' + process.argv[1] + ': <path> ');
    console.log('  <path>      full path to a directory');
    console.log();
};

// simple async workaround, make callbacks trigger the end of the script
var _scriptEnd = function(results, code) {
    console.log(results.stdout);
    process.exit(code);
};

// our callback
var _readFile = function(error, stdout, stderr) {
    var results = {};
    results.stdout = stdout;
    results.stderr = stderr;
    results.error = null;
    results.code = 0;
    if (error !== null) {
        results.error = error
    }
    _scriptEnd(results, results.code)
};

// hopefully someone will appreciate a main function
var main = function() {
    // require the exec function from child_process
    var exec = require('child_process').exec;
    var argv = process.argv;

    // spew usage if we didnt get a path or got -h or --help
    if (argv.length < 3 || argv[2] === '-h' || argv[2] === '--help') {
        usage();
        process.exit(1);
    }

    exec('ls -l ' + argv[2], _readFile);
};

// only run if run directly instead of via require
if (module.parent === null) main();