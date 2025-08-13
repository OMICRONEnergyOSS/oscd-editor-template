[![Tests](https://github.com/OMICRONEnergyOSS/oscd-editor-template/actions/workflows/test.yml/badge.svg)](https://github.com/OMICRONEnergyOSS/oscd-editor-template/actions/workflows/test.yml) ![NPM Version](https://img.shields.io/npm/v/@omicronenergy/oscd-editor-template)

# \<oscd-editor-template>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## What is this?

This is an editor plugin for [OpenSCD](https://openscd.org). With this plugin you can view, edit and insert Data Type Templates into an SCL document. Visit the [demo environment](https://omicronenergyoss.github.io/oscd-editor-template/demo/index.html) and see for yourself.

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

> Currently there have been no unit tests developed for this plugin.

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm run start
```

To run a local development server that serves the basic demo located in `demo/index.html`

&copy; Jakob Vogelsang
&copy; 2025 OMICRON electronics GmbH

## License

[Apache-2.0](LICENSE)
