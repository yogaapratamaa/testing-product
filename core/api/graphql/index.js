/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const fetch = require('cross-fetch');
const { print } = require('graphql');
const { graphqlEndpoint } = require('../../../swift.config');
const { decrypt } = require('../../helpers/encryption');
const { getAppEnv } = require('../../helpers/env');

// make remote schema
const fetcher = async ({
    query: queryDocument, variables, operationName, context,
}) => {
    try {
        let token = '';
        if (context) {
            token = context.graphqlContext.session.token;
        }
        const query = print(queryDocument);
        const appEnv = getAppEnv();
        const fetchResult = await fetch(graphqlEndpoint[appEnv] || graphqlEndpoint.dev, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `${decrypt(token)}` : '',
                // Authorization: 'FOOBAR',
            },
            body: JSON.stringify({ query, variables, operationName }),
        });
        const response = await fetchResult.json();
        if (response.errors) {
            const err = response.errors[0];
            if (err && err.message) {
                return {
                    errors: [
                        {
                            message: err.message,
                        },
                    ],
                };
            }
            if (err.extensions.category === 'graphql-authorization') {
                return {
                    errors: [
                        {
                            message: err.extensions.category,
                            extensions: err.extensions,
                        },
                    ],
                    data: response.data,
                };
            }
            return {
                errors: [
                    {
                        message: err.message,
                        extensions: err.extensions,
                    },
                ],
                data: response.data,
            };
        }
        return response;
    } catch (error) {
        console.error('There was an uncaught error', error);
        // process.exit(1); // mandatory (as per the Node docs)
        return false;
    }
};

module.exports = fetcher;
