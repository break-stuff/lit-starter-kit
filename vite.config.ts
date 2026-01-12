import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';
import { defineConfig, UserConfigExport } from 'vite';
import dts from 'vite-plugin-dts';
import { readFileSync, writeFileSync } from 'fs';
import summary from 'rollup-plugin-summary';

// Get all component files for individual builds
const componentEntries = globSync('./src/**/*.ts', {
  ignore: [
    '**/*.d.ts',
    '**/*.mdx',
    '**/*.stories.ts',
    '**/*.styles.ts',
    '**/*.test.ts',
  ],
}).reduce(
  (entries, file) => {
    // Remove 'src/' and file extension: src/components/button.ts -> components/button
    const name = path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length),
    );
    // Expand to absolute path
    const filePath = fileURLToPath(new URL(file, import.meta.url));
    entries[name] = filePath;
    return entries;
  },
  {} as Record<string, string>,
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildTarget = process.env.BUILD_TARGET;

const kitchenSinkConfig: UserConfigExport = defineConfig({
  publicDir: false,
  build: {
    outDir: path.join(__dirname, './public/html'),
    lib: {
      entry: path.join(__dirname, './src/index.ts'),
      name: 'cui',
      formats: ['es'],
      fileName: 'index',
    },
  },
  plugins: [summary()],
});

const reactConfig: UserConfigExport = defineConfig({
  publicDir: false,
  build: {
    outDir: path.join(__dirname, './public/react'),
    lib: {
      entry: path.join(__dirname, './react/index.js'),
      name: 'react',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        inlineDynamicImports: true,
      },
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
    },
  },
  plugins: [
    {
      name: 'bundle-dts-files',
      closeBundle() {
        // Read all .d.ts files from react directory
        const dtsFiles = globSync('./react/**/*.d.ts');

        // Read and combine the contents
        let bundledContent = '';

        dtsFiles.forEach(file => {
          const content = readFileSync(file, 'utf-8');
          const fileName = path.basename(file);

          // For index.d.ts, skip it as we'll handle exports directly
          if (fileName === 'index.d.ts') {
            return;
          }

          // Add the content from other .d.ts files
          bundledContent += content + '\n\n';
        });

        // Write the bundled file
        const outputPath = path.join(__dirname, './public/react/index.d.ts');
        writeFileSync(outputPath, bundledContent.trim());
      },
    },
    summary(),
  ],
});

// CDN individual components config
const cdnConfig = defineConfig({
  publicDir: false,
  build: {
    outDir: path.join(__dirname, './cdn'),
    minify: true,
    sourcemap: false,
    lib: {
      entry: componentEntries,
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        // Preserve directory structure
        entryFileNames: '[name].js',
        chunkFileNames: 'shared/[name]-[hash].js',
      },
    },
  },
  plugins: [dts(), summary()],
});

// Export based on BUILD_TARGET
export default buildTarget === 'kitchen-sink'
  ? kitchenSinkConfig
  : buildTarget === 'react'
    ? reactConfig
    : buildTarget === 'cdn'
      ? cdnConfig
      : kitchenSinkConfig; // default
