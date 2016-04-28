/* Modules */

var parser   = require('tap-parser');
var through  = require('through2');
var duplexer = require('duplexer');

/* Parser */

module.exports = function() {
  var tap = parser();
  var out = through.obj();
  var dup = duplexer(tap, out);

  var data = [];
  var name = null;

  tap.on('comment', function(res) {
    name = res;
  });

  tap.on('assert', function(res) {
    var assert = {
      number: res.number,
      comment: name,
      name: res.name,
      ok: res.ok,
      extra: {}
    };
    data.push(assert);
  });

  tap.on('extra', function(res) {
    if (res !== '' && filter(res)) {
      var id = [data.length - 1];
      var op = match('operator', res);
      var ac = match('actual', res);
      var ex = match('expected', res);
      if (op) { data[id].extra.operator = op; }
      if (ac) { data[id].extra.actual = ac; }
      if (ex) { data[id].extra.expected = ex; }
    }
  });

  tap.on('results', function(res) {
    var json = {
      stats: {
        asserts: res.asserts.length,
        passes: res.pass.length,
        failures: res.fail.length
      },
      asserts: data
    };
    out.push(json);
  });

  return dup;
};

/* Helpers */

function filter(input) {
  if (input.match(/(-{3}|\.{3})/)) { return; }
  return true;
}

function match(type, input) {
  if (input.match(type)) { return transform(type, input); }
  return;
}

function transform(type, input) {
  var match = new RegExp('\\s+' + type + ':\\s+');
  return input.replace(match, '');
}
