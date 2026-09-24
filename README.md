[![Tests](https://github.com/OMICRONEnergyOSS/oscd-editor-template/actions/workflows/test.yml/badge.svg)](https://github.com/OMICRONEnergyOSS/oscd-editor-template/actions/workflows/test.yml) ![NPM Version](https://img.shields.io/npm/v/@omicronenergy/oscd-editor-template)

# \<oscd-editor-template>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## What is this?

This is an editor plugin for [OpenSCD](https://openscd.org). With this plugin you can view, edit and insert Data Type Templates into an SCL document. Visit the [demo environment](https://omicronenergyoss.github.io/oscd-editor-template/demo/index.html) and see for yourself.

## Linting and formatting

This project uses the shared [`@omicronenergy/oscd-tooling`](https://github.com/OMICRONEnergyOSS/oscd-tooling) CLI (`oscd`) for its dev tooling — see that package's README for the full command reference.

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Tooling configs

Build, lint, test, and bundle configuration is centralized in `@omicronenergy/oscd-tooling` and resolved automatically by the `oscd` CLI. This repo only keeps thin, project-relative overrides:

- `tsconfig.json` extends `@omicronenergy/oscd-tooling/configs/base.tsconfig.json`, setting only `outDir`/`rootDir`/`include`.
- `eslint.config.js` re-exports `@omicronenergy/oscd-tooling/configs/eslint.config.js` unchanged.

To fully customize a tool's configuration, drop a same-named config file (e.g. `rollup.config.js`) at the repo root — `oscd` will use it instead of the shared default.

## Local Demo

```bash
npm run start
```

To run a local development server that serves the basic demo located in `demo/index.html`

&copy; Jakob Vogelsang
&copy; 2025 OMICRON electronics GmbH

## License

[Apache-2.0](LICENSE)
