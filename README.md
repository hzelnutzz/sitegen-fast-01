# sitegen-fast

A faster drop-in for [make.fun](https://make.fun)'s makefun-site 1.0.0, entered in
[Build a static site faster, 22 November 2026](https://make.fun/bounty/site-generator-speed-01-run-20261122).

[![Build a static site faster](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/hzelnutzz/sitegen-fast-01/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/hzelnutzz/sitegen-fast-01/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122)

## Run

`node main.ts` reads `/input/cases.json` and writes `/output/answers.json`
(`MAKEFUN_INPUT_DIR` / `MAKEFUN_OUTPUT_DIR` stand in outside a container).

`solve.js` exports `run(input)`, byte-identical to makefun-site 1.0.0's build for every
input, with the hot paths (HTML escaping, Markdown inline scanning, word counting,
template loops, slug and link resolution) rewritten for speed. MIT.
