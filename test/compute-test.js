var chai = require('chai');
var expect = chai.expect;
var Compute = require('../src/compute');
var compute = Compute.compute;

describe('compute', function() {
  it('should return 353 for x=3 and y=3', function() {
    var result = compute(3,3);
    expect(result.value).to.equal(353);
  });
  it('should return 24709 for x=4 and y=5', function() {
    var result = compute(4,5);
    expect(result.value).to.equal(24709);
  });
  it('should return 23 for x=3 and y=2', function() {
    var result = compute(3,2);
    expect(result.value).to.equal(23);
  });
  it('should return 995957 for x=5 and y=6', function() {
    var result = compute(5,6);
    expect(result.value).to.equal(995957);
  });
  it('should return 3232862794349 for x=5 and y=13', function() {
    var result = compute(5,13);
    expect(result.value).to.equal(3232862794349);
  });
  it('should return "" for x=5 and y=16', function() {
    var result = compute(5,16);
    expect(result.value).to.equal("");
  });
  it('should throw a RangeError if a precision 0 is passed in', function() {
    expect(function() {compute(0,0);}).to.throw(RangeError, 'X must be 1 or greater');
  });
});
