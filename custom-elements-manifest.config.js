import { getTsProgram, typeParserPlugin } from '@wc-toolkit/type-parser';
import { reactWrapperPlugin } from '@wc-toolkit/react-wrappers';
import { jsxTypesPlugin } from '@wc-toolkit/jsx-types';
import { customElementVuejsPlugin } from 'custom-element-vuejs-integration';
import { customElementSveltePlugin } from 'custom-element-svelte-integration';
import { cemInheritancePlugin } from '@wc-toolkit/cem-inheritance';
import { jsDocTagsPlugin } from '@wc-toolkit/jsdoc-tags';
import { lazyLoaderPlugin } from '@wc-toolkit/lazy-loader';
import { cemDeprecatorPlugin } from 'custom-elements-manifest-deprecator';
import { cemSorterPlugin } from '@wc-toolkit/cem-sorter';

export default {
  /** Globs to analyze */
  globs: ['src/components/**/*.ts'],
  /** Globs to exclude */
  exclude: ['src/**/*.test.ts', 'src/**/*.stories.ts', 'src/**/*.styles.ts'],
  /** Enable special handling for litelement */
  litelement: true,
  /** Provide custom plugins */
  plugins: [
    typeParserPlugin(),
    cemInheritancePlugin(),
    cemDeprecatorPlugin(),

    reactWrapperPlugin({
      outdir: 'react',
      modulePath: (_, tagName) =>
        `../dist/components/${tagName.replace('my-', '')}/index.js`,
    }),
    jsxTypesPlugin({
      outdir: 'types',
      stronglyTypedEvents: true,
      modulePath: (_, tagName) =>
        `../dist/components/${tagName.replace('my-', '')}/${tagName.replace('my-', '')}.js`,
    }),
    customElementVuejsPlugin({
      outdir: 'types',
      fileName: 'custom-element-vuejs.d.ts',
      modulePath: (_, tagName) =>
        `../dist/components/${tagName.replace('my-', '')}/${tagName.replace('my-', '')}.js`,
    }),
    customElementSveltePlugin({
      outdir: 'types',
      fileName: 'custom-element-svelte.d.ts',
      modulePath: (_, tagName) =>
        `../dist/components/${tagName.replace('my-', '')}/${tagName.replace('my-', '')}.js`,
    }),
    lazyLoaderPlugin({
      outdir: 'cdn',
      importPathTemplate: (_, tagName) =>
        `../dist/components/${tagName.replace('my-', '')}/${tagName.replace('my-', '')}.js`,
    }),

    jsDocTagsPlugin({
      tags: {
        status: {},
        since: {},
        dependency: { mappedName: 'dependencies', isArray: true },
      },
    }),

    cemSorterPlugin(),
  ],

  overrideModuleCreation: ({ ts, globs }) => {
    const program = getTsProgram(ts, globs, 'tsconfig.json');
    return program
      .getSourceFiles()
      .filter(sf => globs.find(glob => sf.fileName.includes(glob)));
  },
};
