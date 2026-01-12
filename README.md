# Lit Starter Kit

Welcome to the Lit Starter Kit. This is not an official kit for the Lit library, but this is a tool to get a component library up and running quickly.

## Features

This repository is designed to be a "batteries included" repo, so you can hit the ground running with what you need to start delivering components. This repo includes:

- ✅ Library and component scaffolding
- ✅ [Storybook](https://storybook.js.org/docs/get-started/frameworks/web-components-vite?renderer=web-components) integration (with [helpers](https://www.npmjs.com/package/wc-storybook-helpers))
- ✅ CDN build (in `/cdn`)
- ✅ NPM build (in `/dist`)
- ✅ Testing
- ✅ Documentation
- ✅ [React wrappers](https://wc-toolkit.com/integrations/react/) (in - `/react`)
- ✅ [JSX integration](https://wc-toolkit.com/integrations/jsx/) - (in `/types`)
- ✅ [Vue.js integration](https://www.npmjs.-com/package/-custom-element-vuejs-integration) (in `/- types`)
- ✅ [Svelte integration](https://www.npmjs.-com/package/-custom-element-svelte-integration) (in `/- types`)
- ✅ [Linter](https://wc-toolkit.com/integrations/wctools/) (in `/wc.config.js`)

## Getting Started

You can choose to fork this repository directly or you can run the following command to create a new project.

```bash
npm init lit-starter-kit your-project-name
```

## Running the Code

The development environment uses [Storybook](https://storybook.js.org/) to showcase and document the components. The documentation files are written in MDX files to increase portability in case you wan to use a different tool for documenting your components.

```bash
npm run dev
```

### Creating a New Component

This project leverages [plop](https://www.npmjs.com/package/plop) to generate new components in your library. You can create a new component by running the following command and following the prompts.

```bash
npm run new
```

## Building the Project

Generating the final build assets will generate the `dist` assets for the NPM package, the content for the CDN located in the `cdn` directory at the root of the project, as well as the meta content for your components like framework integrations like types and react wrappers.

```bash
npm run build
```

## Testing the Components

Tests are written and executed using [web-test-runner](https://modern-web.dev/docs/test-runner/overview/) which execute your tests in _real_ browsers to validate your APIs are working as expected in the environments you intend to be using them in.

Tests can be configured in the `web-test-runner.config.js` file located at the root of the project.

Tests can be run using the following command:

```bash
npm test
```
