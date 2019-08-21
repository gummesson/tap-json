/* Modules */

var parser = require("tap-parser");
var through = require("through2");
var duplexer = require("duplexer");

/* Parser */

module.exports = function() {
  var tap = parser();
  var out = through.obj();
  var dup = duplexer(tap, out);

  var data = [];
  var name = null;
  var lastTag = null;

  tap.on("comment", function(res) {
    name = res;
  });

  tap.on("assert", function(res) {
    var assert = {
      number: res.number,
      comment: name,
      name: res.name,
      ok: res.ok,
      extra: {}
    };
    data.push(assert);
  });

  tap.on("extra", function(res) {
    if (shouldBeParsed(res)) {
      var id = [data.length - 1];
      const { key, value } = extractKeyAndValue(res);

      if (key) {
        lastTag = key;
        data[id].extra[key] = isMultiline(value)
          ? []
          : [value.replace(/'/g, "")];
      } else if (Array.isArray(data[id].extra[lastTag])) {
        data[id].extra[lastTag].push(value);
      }
    }
  });

  tap.on("results", function(res) {
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

const TAGS = ["name", "message", "at"];

function validTagsRegExp() {
  return new RegExp(TAGS.map(elem => `\\s+${elem}:\\s+`).join("|"), "g");
}

function isMultiline(input) {
  return input === ">-";
}

function extractKeyAndValue(input) {
  let key = undefined;
  let value = input;
  const match = input.match(validTagsRegExp());

  if (match) {
    key = match[0].trim().slice(0, -1);
    value = input.replace(validTagsRegExp(), "");
  }

  return { key, value: value.replace(/'/g, "").trim() };
}

function shouldBeParsed(input) {
  const extraDelimiterOrCommentRegExp = /-{3}|\.{3}|^\s*\*|^\s*#/;
  return !(input === "" || extraDelimiterOrCommentRegExp.test(input.trim()));
}
