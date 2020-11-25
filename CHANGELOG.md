## Changes 1.0.14-rc1

- Moved build system to rollup, from webpack
- seperate transpiles for:
  - ./browser: iife bundle
  - ./es6: transpiled to es6, for bundlers (like rollup/webpack etc)
  - ./commonjs: for use in nodejs

- removed helper code to test, since opaque input variables will likely change

