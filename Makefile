.PHONY: pass fail test

TAP  = ./node_modules/tape/bin/tape
JSON = ./bin/tap-json

pass:
	@$(TAP) test/pass.js | $(JSON)

fail:
	@$(TAP) test/fail.js | $(JSON)

test: pass fail
