import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';

export default [
  /** bundle components for the CDN */
  {
    input: Object.fromEntries(
      globSync('src/**/*.ts', {
        ignore: [
          'src/**/*.test.ts',
          'src/**/*.stories.ts',
          'src/**/*.styles.ts',
        ],
      }).map(file => [
        // This remove `src/` as well as the file extension from each
        // file, so e.g. src/nested/foo.js becomes nested/foo
        path.relative(
          'src',
          file.slice(0, file.length - path.extname(file).length),
        ),
        // This expands the relative paths to absolute paths, so e.g.
        // src/nested/foo becomes /project/src/nested/foo.js
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
    ),
    output: {
      dir: 'cdn',
      format: 'esm',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        outDir: 'cdn',
        sourceMap: false,
        declaration: false,
        declarationMap: false,
      }),
      resolve(),
    ],
  },

  /** bundle components for sandboxes */
  {
    input: globSync('src/**/index.ts'),
    output: {
      format: 'esm',
      file: 'public/html/index.js',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        outDir: 'public',
        sourceMap: false,
        declaration: false,
        declarationMap: false,
      }),
      resolve(),
    ],
  },

  /** bundle react components for sandboxes */
  {
    input: 'react/index.js',
    output: {
      format: 'esm',
      file: 'public/react/index.js',
      sourcemap: false,
    },
    external: ['react'],
    plugins: [resolve()],
  },
  // bundle react component types for sandboxes
  {
    input: './react/index.d.ts',
    output: [{ file: 'public/react/index.d.ts', format: 'es' }],
    external: ['react'],
    plugins: [dts(), resolve()],
  },
];