# UdonSwap SDK

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Information

This is SDK version-1 of Udonswap Project and you can install it by type given command in Terminal:
```sh
npm i udonswap-v2
```


## Running tests

To run the tests, follow these steps. You must have at least node v10 and [yarn](https://yarnpkg.com/) installed.

First clone the repository:

```sh
git clone https://github.com/DEX-Mode/V2-SDK
```

Move into the uniswap-sdk working directory

```sh
cd V2-SDK/
```

Install dependencies

```sh
yarn install 
```
or
```sh
npm install
```

Run tests

```sh
yarn test
```
or
```sh
npm test
```

You should see output like the following:

```sh
yarn run v1.22.4
$ tsdx test
 PASS  test/constants.test.ts
 PASS  test/pair.test.ts
 PASS  test/fraction.test.ts
 PASS  test/miscellaneous.test.ts
 PASS  test/entities.test.ts
 PASS  test/trade.test.ts

Test Suites: 2 failed, 1 skipped, 7 passed, 9 of 10 total
Tests:       2 failed, 3 skipped, 122 passed, 127 total
Snapshots:   0 total
Time:        34.1s
Ran all test suites.
✨  Done in 34.1s.
```
