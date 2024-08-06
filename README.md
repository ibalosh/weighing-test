![test workflow](https://github.com/ibalosh/weighing-test/actions/workflows/playwright.yml/badge.svg)

## Requirements
 
Ensure [nvm](https://github.com/nvm-sh/nvm) is installed.

## Setup 

1. Clone this repo & `cd` into root directory

2. Install all necessary things by running following script with npm:

```bash
  npm run setup
```

3. Run the tests & view report:

```bash
  npx playwright test
  npx playwright show-report
```

4. If you have [Docker](https://docs.docker.com/engine/install/) installed, you can run tests using this command:

```bash
  npm run testd
```
