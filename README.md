# webpack-template-review

This is the template created from [The Odin Project's Revisiting Webpack lesson](https://www.theodinproject.com/lessons/node-path-javascript-revisiting-webpack).

## Setup

Run `npm install` to install dependencies and generate `package-lock.json`.

## Development

Run `npm run dev` or `npm start`.

## Testing

Import Jest's globals at the top of test files:

```js
import { test, expect } from "@jest/globals";
```

Run tests once with:

```bash
npm test
```

Or run Jest in watch mode with:

```bash
npm run test:watch
```

## Build

Run `npm run build`.

## Deployment

For a repository created from this template, create the `gh-pages` branch once before the first deployment:

```bash
git branch gh-pages
```

Deploy with:

```bash
bash deploy.sh
```
