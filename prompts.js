/**
 * @file Array of questions initial configuration trough prompts.js
 */
module.exports = [
  {
    name: 'cssFramework',
    type: 'list',
    message: 'CSS Framework',
    choices: [
      {
        name: 'Bootstrap', value: 'bootstrap'
      },
      {
        name: 'Bulma', value: 'bulma'
      }
    ],
    default: 'Bootstrap',
  },
  {
    name: 'icons',
    type: 'checkbox',
    message: 'What icons do you want to use?',
    choices: [
      {
        name: 'Font Awesome', value: 'fontawesome', checked: true,
      },
      {
        name: 'Material Design Icons (materialdesignicons.com)', value: 'mdi'
      },
      {
        name: 'Material Design Icons (https://material.io/tools/icons)', value: 'material'
      },
      {
        name: 'Unicons', value: 'unicons'
      }
    ],
  },
  {
    name: 'restClient',
    type: 'confirm',
    message: 'Will you use a REST client?',
    default: true,
  },
  {
    name: 'graphQLClient',
    type: 'confirm',
    message: 'Will you use GraphQL?',
    default: false,
  },
  {
    name: 'charts',
    type: 'confirm',
    message: 'Will you use charts? (vue-chartjs)',
    default: true,
  },
];
