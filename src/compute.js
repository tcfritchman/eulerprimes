var Eulers = require('./eulers.js');
var math = require('mathjs');
var Papa = require('papaparse');

var compute = function(x, y) {
  if (x < 1) {throw new RangeError('X must be 1 or greater');}
  if (y < 1) {throw new RangeError('Y must be 1 or greater');}
  if (y > 15) return {value: "", position: ""}; // don't calculate if y too big
  if (x > 15) return {value: "", position: ""}; // don't calculate if x too big

  var chunksize = 100; // Size of additional digits compute.
  var chunk = 0;       // Current chunk
  var start, end;      // Current start and end pos within e.
  var i, d = 1, digits, num;

  while (true) {
    digits = Eulers.E((chunk + 1) * chunksize + y + 1).c;
    digits.shift(); // remove the 2 before the decimal
    for (i=0; i<chunksize; i++) {
      start = chunk * chunksize + i;
      end =  start + y;
      num = listToInt(digits.slice(start, end));
      if (num >= Math.pow(10, y-1)) {
        // no fewer than than y digits long
        if (math.isPrime(num)) {
          x--;
          if (x === 0) return {value: num, position: d};
        }
      }
      d++; // Update current position within e
    }
    chunk++;
  }
};

var multiCompute = function(csv) {
  var parseResult = Papa.parse(csv);
  var xyPairs = parseResult.data; // array of arrays [x, y]
  if (parseResult.errors.length) {
    throw new Error("Error parsing CSV");
  }

  var results = []; // Store results as a list of objects
  var result, x, y;

  xyPairs.forEach(function(xyPair) {
    x = parseInt(xyPair[0]);
    y = parseInt(xyPair[1]);
    if (isNaN(x) || isNaN(y)) {
      throw new Error("Non-integer value in CSV");
    }
    try {
      result = compute(x,y);
    } catch (e) {
      throw e;
    }
    results.push({
      x: x,
      y: y,
      value: result.value,
      position: result.position
    });
  });
  return results;
};

function listToInt(intList) {
  var result = "";
  intList.forEach(function(num) {
      result += num.toString();
  });
  return parseInt(result);
}

module.exports = {
  compute: compute,
  multiCompute: multiCompute
};
