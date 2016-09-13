

function V1_GET_object_two_attr(req, res) {
  res.json({hello: 'world;'});
};

function hello(req, res, next) {
	res.json({hello: "hello", params: req.params })
}
module.exports = {
	V1_GET_object_two_attr: V1_GET_object_two_attr,
	hello: hello
};
