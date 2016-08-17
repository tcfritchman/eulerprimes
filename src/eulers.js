var Big = require('big.js');

var Euler = function() {};

// Translated from Ruby's 'BigMath.E'
Euler.prototype.E = function(prec) {
  if (prec < 1) {throw new RangeError('Precision is zero or less');}
  var n,one,zero,y,d,z,i,m;
  one = new Big(1);
  zero = new Big(0);
  n = new Big(prec * 2);
  y = one;
  d = new Big(1);
  z = one;
  i = 0;
  while (!d.eq(zero) && (m = n.minus(y.e - d.e).abs()).gt(zero)) {

    i += 1;
    z = z.times(i);
    Big.DP = parseFloat(m.toString());
    d = one.div(z);
    y = y.plus(d);
  }
  return y;
};

module.exports = Euler;
