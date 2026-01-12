# Lit Starter Kit

Welcome to the Lit Starter Kit. This is not an official kit for the Lit library, but this is a tool to get a component library up and running quickly.

## Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** (v18 or higher recommended)

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
- ✅ [Vue.js integration](https://www.npmjs.-com/package/-custom-element-vuejs-integration) (in `/types`)
- ✅ [Svelte integration](https://www.npmjs.-com/package/-custom-element-svelte-integration) (in `/types`)
- ✅ [Linter](https://wc-toolkit.com/integrations/wctools/) (in `/wc.config.js`)

## Getting Started

You can choose to fork this repository directly or you can run the following command to create a new project.

```bash
npm init lit-starter-kit your-project-name
```

Once created, navigate to your project directory and install dependencies:

```bash
cd your-project-name
```

## Project Structure

Understanding the project structure will help you navigate and customize the library:

```text
├── src/                    # Source code for your components
│   ├── index.ts           # Main entry point
│   └── components/        # Component definitions
├── dist/                  # NPM package build output (generated)
├── cdn/                   # CDN build output (generated)
├── react/                 # React wrapper components (generated)
├── types/                 # Framework type definitions (JSX, Vue, Svelte)
├── plop-templates/        # Component generator templates
├── public/                # Build outputs for CDN, HTML, and React
└── .storybook/            # Storybook configuration
```

## Running the Code

The development environment uses [Storybook](https://storybook.js.org/) to showcase and document the components. The documentation files are written in MDX files to increase portability in case you wan to use a different tool for documenting your components.

```bash
npm run dev
```

This command will:
- Build your components
- Watch for changes and rebuild automatically
- Start Storybook on http://localhost:6006

### Creating a New Component

This project leverages [plop](https://www.npmjs.com/package/plop) to generate new components in your library. You can create a new component by running the following command and following the prompts.

```bash
npm run new
```

This will scaffold:
- Component TypeScript file
- Styles file
- Test file
- Storybook stories
- MDX documentation

## Linting & Formatting

Maintain code quality with built-in linting and formatting tools:

```bash
# Run all linters
npm run lint

# Run ESLint
npm run lint:eslint

# Run Prettier check
npm run lint:prettier

# Auto-fix issues
npm run format
```

## Building the Project

Generating the final build assets will generate the `dist` assets for the NPM package, the content for the CDN located in the `cdn` directory at the root of the project, as well as the meta content for your components like framework integrations like types and react wrappers.

```bash
npm run build
```

This generates:
- **`/dist`** - NPM package distribution files
- **`/cdn`** - CDN-ready bundles for direct browser usage
- **`/react`** - React wrapper components
- **`/types`** - TypeScript definitions and framework integrations
- **`custom-elements.json`** - Component metadata manifest

### Building for Specific Targets

```bash
# Build only CDN version
npm run build:cdn

# Build only React wrappers
npm run build:react

# Build static Storybook documentation
npm run build-storybook
```

## Testing the Components

Tests are written and executed using [web-test-runner](https://modern-web.dev/docs/test-runner/overview/) which execute your tests in _real_ browsers to validate your APIs are working as expected in the environments you intend to be using them in.

Tests can be configured in the `web-test-runner.config.js` file located at the root of the project.

Tests can be run using the following command:

```bash
npm test
```

## Using Your Components

Once built, your components can be used in multiple ways:

### Via NPM Package

```bash
npm install your-package-name
```

```javascript
// Import all components
import 'your-package-name';

// Or import specific components
import 'your-package-name/components/button';

// Use in your HTML
<my-button variant="primary">Click Me</my-button>
```

### Via CDN

```html
<script type="module">
  import 'https://cdn.example.com/your-package/index.js';
</script>

<my-button>Click Me</my-button>
```

### With React

```jsx
import { MyButton } from 'your-package-name/react';

function App() {
  return <MyButton variant="primary">Click Me</MyButton>;
}
```

### With TypeScript/JSX

TypeScript and JSX support is included via the `/types` directory. Type definitions are automatically recognized by TypeScript when you import the components.

### With Vue.js and Svelte

Framework-specific type integrations are provided in the `/types` directory for Vue.js and Svelte to ensure proper type checking and intellisense.

## Publishing Your Library

Before publishing, update your package details:

1. **Update package.json:**
   ```json
   {
     "name": "@your-scope/your-package-name",
     "version": "1.0.0",
     "description": "Your component library description",
     "author": "Your Name",
     "repository": {
       "type": "git",
       "url": "https://github.com/your-username/your-repo"
     }
   }
   ```

2. **Build and publish:**
   ```bash
   npm run build
   npm publish
   ```

   Or use the deploy script:
   ```bash
   npm run deploy
   ```

3. **For scoped packages:**
   ```bash
   npm publish --access public
   ```

## Customization

### Renaming Your Package

1. Update the `name` field in [package.json](package.json)
2. Update component prefixes in your source files
3. Update import paths throughout the project

### Configuring the Build

- **Vite config:** [vite.config.ts](vite.config.ts)
- **TypeScript:** [tsconfig.json](tsconfig.json)
- **Custom Elements Manifest:** [custom-elements-manifest.config.js](custom-elements-manifest.config.js)

### Theming & Styling

Components use Lit's styling system. Create shared styles in a common file and import them into your components:

```typescript
import { css } from 'lit';

export const sharedStyles = css`
  :host {
    /* Your shared styles */
  }
`;
```

## Deploying Documentation

To deploy your Storybook documentation:

```bash
npm run build-storybook
```

This creates a static site in `storybook-static/` that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Troubleshooting

### Build Errors

- **"Module not found"**: Ensure all dependencies are installed with `pnpm install`
- **TypeScript errors**: Check [tsconfig.json](tsconfig.json) configuration
- **Import path issues**: Verify file extensions are included in imports (`.js` for TypeScript files)

### Storybook Issues

- **Port already in use**: Storybook runs on port 6006 by default. Stop other processes or change the port in the storybook script
- **Components not updating**: Clear Storybook cache and rebuild

### Test Failures

- **Browser not found**: Run `npx playwright install` to install test browsers
- **Tests timing out**: Increase timeout in [web-test-runner.config.js](web-test-runner.config.js)

## Contributing

Contributions are welcome! This project uses:
- **Husky** for git hooks
- **lint-staged** for pre-commit linting
- **Prettier** for code formatting
- **ESLint** for code quality

Code is automatically formatted and linted on commit.

## License

MIT
