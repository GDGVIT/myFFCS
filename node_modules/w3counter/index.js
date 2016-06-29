'use strict';
var cheerio = require('cheerio');
var got = require('got');
var Promise = require('pinkie-promise');

module.exports = function (type) {
	if (typeof type !== 'string') {
		return Promise.reject(new TypeError('Expected a string'));
	}

	var types = {
		browser: 'Web Browsers',
		country: 'Countries',
		os: 'Platforms',
		res: 'Screen Resolutions'
	};

	var method = types[type];
	var ret = [];

	return got('http://www.w3counter.com/globalstats.php').then(function (res) {
		var $ = cheerio.load(res.body);

		$('th').filter(function (i, el) {
			return $(el).text().replace(/^Top 10/, '').trim() === method;
		}).parent().nextAll('tr').each(function (i, el) {
			ret.push({
				item: $(el).children('.item').text(),
				percent: $(el).children('.pct').text()
			});
		});

		if (!ret.length) {
			throw new Error('Couldn\'t get any ' + method.toLowerCase());
		}

		return ret;
	});
};
