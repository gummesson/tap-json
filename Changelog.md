# Ava TAP JSON

## 2.0.4
The binary name was fixed

## 2.0.1
AVA 2.3.0 is printing logs starting with `#` instead of `*`, we included this new character in our parser and created an [issue](https://github.com/vadimdemedes/supertap/issues/3) to remove * from https://github.com/vadimdemedes/supertap

## 2.0.0
Breaking changes:
- "name", "message", "at" tags inside extra delimiters are exposed as arrays since ava now includes multiline yaml content in version 2.1.0 https://github.com/avajs/ava/releases/tag/v2.1.0 for errors' stacktrace
