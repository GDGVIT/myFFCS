#!/usr/bin/env node
'use strict';
var meow = require('meow');
var w3counter = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ w3counter <type>',
		'',
		'Example',
		'  $ w3counter browser',
		'  $ w3counter country',
		'  $ w3counter os',
		'  $ w3counter res'
	].join('\n')
});

if (!cli.input.length) {
	console.error('Provide a type');
	process.exit(1);
}

w3counter(cli.input[0]).then(function (types) {
	types.forEach(function (type, i) {
		i++;
		console.log(i + '. ' + type.item + ' (' + type.percent + ')');
	});
});
