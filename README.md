## Setup

1. Clone this repo & `cd` into root directory

2. Ensure [nvm](https://github.com/nvm-sh/nvm) is installed

3. Install all necessary things

```bash
npm run init
```

6. Run the tests & view report

```bash
npx playwright test
npx playwright show-report
```

7. If you have [Docker](https://docs.docker.com/engine/install/) installed then you can run tests using this command

```bash
docker compose up
```
