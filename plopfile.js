/** @arg {import('plop').NodePlopAPI} plop */

export default function (plop) {
  plop.setHelper('dashToTitle', text => {
    const titleCase = plop.getHelper('titleCase');
    return titleCase(text.replace(/-/g, ' '));
  });

  plop.setGenerator('component', {
    description: 'generate a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'Please enter your component name in kebab-case (e.g. button-group)',
        default: 'component',
      },
      {
        type: 'input',
        name: 'prefix',
        message: 'What is the prefix for your component? (e.g. my)',
        default: '',
      },
    ],
    actions: function (data) {
      const basename = data?.name;
      if (
        // Must only contain alphanumeric characters and dashes
        !/[a-z0-9-]+/.test(basename) ||
        // Must start with a letter
        !/^[a-z]/.test(basename) ||
        // Must not end in a dash
        basename.endsWith('-')
      ) {
        console.log(
          'The name must only contain alphanumeric characters and dashes, start with a letter, and not end in a dash. Please try again.',
        );
        return [];
      }

      const BASE_PATH = `src/components/{{kebabCase name}}`;

      data.tagName = data?.prefix ? `${data.prefix}-${data.name}` : data.name;

      return [
        {
          type: 'add',
          skipIfExists: true,
          path: `${BASE_PATH}/{{kebabCase name}}.ts`,
          templateFile: 'plop-templates/component.ts.hbs',
        },
        {
          type: 'add',
          skipIfExists: true,
          path: `${BASE_PATH}/{{kebabCase name}}.styles.ts`,
          templateFile: 'plop-templates/component.styles.ts.hbs',
        },
        {
          type: 'add',
          skipIfExists: true,
          path: `${BASE_PATH}/{{kebabCase name}}.test.ts`,
          templateFile: 'plop-templates/component.test.ts.hbs',
        },
        {
          type: 'add',
          skipIfExists: true,
          path: `${BASE_PATH}/{{kebabCase name}}.mdx`,
          templateFile: 'plop-templates/component.docs.hbs',
        },
        {
          type: 'add',
          skipIfExists: true,
          path: `${BASE_PATH}/{{kebabCase name}}.stories.ts`,
          templateFile: 'plop-templates/component.stories.ts.hbs',
        },
        {
          type: 'add',
          skipIfExists: true,
          path: `${BASE_PATH}/index.ts`,
          templateFile: 'plop-templates/component.definition.ts.hbs',
        },
      ];
    },
  });
}
