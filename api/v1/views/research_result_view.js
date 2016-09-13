let elasticSearchWrapper = require(`${__ROOT_DIR.LIB}/elasticsearch_wrapper`);
let es_utils = require('../utils/elasticsearch_view_utils');
let winston = require('winston');

function hello(req, res, next) {
	res.json({hello: "hello", params: req.params })
}

function V1_GET_data_search(req, res) {
  elasticSearchWrapper.getPostingCalibrationsByGeolocationSort({
    distance: 50,
    jobTitle: req.query.keywords,
    latitude: req.query.latitude,
    longitude: req.query.longitude,
    sortField: "_source.doc.publish_date",
  }).then(function (resp) {
    res.json(resp.hits);
  });
}

function posting_recent(res, location) {
  elasticSearchWrapper.getPostingRecent({ location: location
  }).then(function (resp) {
//	  var r = es_utils.elasticsearch_result_short(resp);
      res.json(resp.hits);
  });
}

function V1_GET_postings_recent(req, res) {
	
	var location = req.query.location;
	posting_recent(res, location);
	
	if (location != null) {
		winston.info("POSTING-RECENT: location is ", location);
	
	} else {
		winston.info("POSTING-RECENT: location is null");
		
	}
	

}


module.exports = {
	V1_GET_postings_searchjobs: V1_GET_data_search,
	V1_GET_postings_recent: V1_GET_postings_recent,
	hello: hello
};
