import { setCustomElementsManifest } from '@storybook/web-components-vite';
import customElements from '../custom-elements.json';
import packageJson from '../package.json';
import { setStorybookHelpersConfig } from '@wc-toolkit/storybook-helpers';
import { withActions } from 'storybook/actions/decorator';
import { setWcDoxConfig } from 'wc-dox';
import './code-bubble-setup.js';
import './styles.css';
import '../public/html/index.js';

import type { Preview } from '@storybook/web-components-vite';

setCustomElementsManifest(customElements);

// This adds additional features to storybook - https://www.npmjs.com/package/wc-storybook-helpers
setStorybookHelpersConfig({});

// This configures the documentation for the API documentation - https://www.npmjs.com/package/wc-dox
setWcDoxConfig(customElements, {
  imports: {
    langOnPreTag: true,
    imports: [
      {
        label: 'HTML',
        lang: 'html',
        importTemplate: tagName =>
          `<script type="module" src="https://cdn.jsdelivr.net/npm/${packageJson.name}/cdn/components/${tagName}/index.js"></script>`,
      },
      {
        label: 'NPM',
        lang: 'js',
        importTemplate: tagName =>
          `import '${packageJson.name}/dist/components/${tagName}/index.js';`,
      },
      {
        label: 'React',
        lang: 'js',
        importTemplate: (tagName, className) =>
          `import { ${className} } from '${packageJson.name}/react/index.js';`,
      },
    ],
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true, // provides descriptions and additional info for controls
      sort: 'alpha', // sorts controls in alphabetical order
    },
  },
  decorators: [withActions],
};

export default preview;
