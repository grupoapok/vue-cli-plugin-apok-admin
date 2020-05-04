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
        name: 'restClient',
        type: 'confirm',
        message: 'Will you use a REST client?',
        default: true,
    },
    {
        name: 'restBaseUrl',
        type: 'input',
        message: 'REST Client endpoint:',
        when: function (answers) {
            return answers.restClient
        }
    },
    {
        name: 'graphQLClient',
        type: 'confirm',
        message: 'Will you use GraphQL?',
        default: false,
    },
    {
        name: 'graphBaseUrl',
        type: 'input',
        message: 'GraphQL Client endpoint:',
        when: function (answers) {
            return answers.graphQLClient
        }
    }
];
