let winston = require('winston');

function sortNumber(a,b) {
    return a - b;
}

function elasticsearch_result_short(results) {
	var out = [];
	var arr = results.hits.hits;
	
	for (var i in arr) {
		var obj = arr[i]
		var r = {
			updatedAt: obj._source.updatedAt,
			createdAt: obj._source.createdAt
		}
		out.push(r)
	}

	return out;
}

function hello() { winston.error('Message')}

module.exports = {
	elasticsearch_result_short: elasticsearch_result_short,
	hello: hello
};