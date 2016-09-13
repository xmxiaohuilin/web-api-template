/* global __ROOT_DIR */
require(`${__ROOT_DIR.TEST_SUPPORT}/_all.js`);

let rewire = require('rewire');
let sinon  = require('sinon');
let expect = require('expect.js');

let geocoderWrapper = rewire(`${__ROOT_DIR.LIB}/geocoder_wrapper`);
let sharedClient    = geocoderWrapper.__get__("_sharedClient");

describe('.getLongAndLat()', function() {
  let street    = '1234 fake st';
  let randomNum = 1234;
  let stubbedGeocodeMethod;

  beforeEach(function(){
    stubbedGeocodeMethod = sinon.spy();
    sinon.stub(sharedClient, "geocode", stubbedGeocodeMethod);
  });

  afterEach(function(){
    sharedClient.geocode.restore();
  });

  it('accepts location as a string', function() {
    geocoderWrapper.getLongAndLat({location: street}, function() {});
    expect(stubbedGeocodeMethod.calledWith(street)).to.be(true);
  });

  it('throws error if location is a number', function() {
    expect(geocoderWrapper.getLongAndLat).withArgs({location: randomNum}).to.throwException(/must be a string/);
  });
});
