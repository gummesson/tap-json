# ava-tap-json

JSON TAP output formatter.

## Installation

~~~ text
npm install -g tap-json
npm install tap-json --save-dev
~~~

## Usage

~~~ text
tape test/*.js | tap-json
node test.js | ./node_modules/tap-json/bin/tap-json
~~~

## Output

![tap-json](http://i.imgur.com/LvDpOuz.png)

![tap-json](http://i.imgur.com/hSytjmn.png)

~~~ json
{
  "stats": {
    "asserts": 4,
    "passes": 2,
    "failures": 2
  },
  "asserts": [
    {
      "number": 1,
      "comment": "1 === 1",
      "name": "should be equal",
      "ok": true,
      "extra": {}
    },
    {
      "number": 2,
      "comment": "2 === 2",
      "name": "should be equal",
      "ok": true,
      "extra": {}
    }
    {
      "number": 3,
      "comment": "1 === 2",
      "name": "should be equal",
      "ok": false,
      "extra": {
        "operator": "equal",
        "expected": "2",
        "actual": "1"
      }
    },
    {
      "number": 4,
      "comment": "2 === 1",
      "name": "should be equal",
      "ok": false,
      "extra": {
        "operator": "equal",
        "expected": "1",
        "actual": "2"
      }
    }
  ]
}
~~~

## License

The MIT License (MIT)

Copyright (c) 2014 Ellen Gummesson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
