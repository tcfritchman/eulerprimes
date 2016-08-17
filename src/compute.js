var Eulers = require('./eulers.js');
var math = require('mathjs');
var eulers = new Eulers();

var compute = function(x, y) {
  if (x < 1) {throw new RangeError('X must be 1 or greater');}
  if (y < 1) {throw new RangeError('Y must be 1 or greater');}

  var chunksize = 100; // Size of additional digits compute.
  var chunk = 0;       // Current chunk
  var start, end;      // Current start and end pos within e.
  var i, d = 0, digits, num;
  var primes = [];

  while (true) {
    digits = eulers.E((chunk + 1) * chunksize + y + 1).c;
    digits.shift(); // remove the 2 before the decimal
    for (i=1; i<chunksize; i++) {
      start = chunk * chunksize + i;
      end =  start + y;
      num = listToInt(digits.slice(start, end));
      if (num >= Math.pow(10, y-1)) {
        // no fewer than than y digits long
        if (math.isPrime(num) && primes.indexOf(num) === -1) {
          // prime and not a duplicate
          primes.push(num);
          x--;
          if (x === 0) return num;
        }
      }
      d++;
    }
    chunk++;
  }
};

function listToInt(intList) {
  var result = "";
  intList.forEach(function(num) {
      result += num.toString();
  });
  return parseInt(result);
}

module.exports = compute;
