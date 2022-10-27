/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
const { GraphQLClient } = require('graphql-request');
const { graphqlEndpoint } = require('../../../../swift.config');

const { decrypt } = require('../../../helpers/encryption');
const { getAppEnv } = require('../../../helpers/env');

function requestGraph(query, variables = {}, context = {}) {
    let token = '';
    if (context.session || context.headers) {
        token = 'Bearer lala';
        // token = context.session.token ? `Bearer ${decrypt(context.session.token)}`
        //     : context.headers.authorization ? context.headers.authorization : '';
    }
    return new Promise((resolve) => {
        const headers = {
            Authorization: token,
            // Authorization: 'lala',
        };
        const appEnv = getAppEnv();
        const client = new GraphQLClient(`${graphqlEndpoint[appEnv] || graphqlEndpoint.prod}`, {
            headers,
        });
        console.log(client);
        client.request(query, variables).then((data) => resolve(data)).catch((err) => resolve(err));
    });
}

module.exports = requestGraph;
