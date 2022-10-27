/* eslint-disable no-param-reassign */
const requestGraph = require('../request');
const { encrypt } = require('../../../helpers/encryption');

const query = `
    mutation login(
      $username: String!,
      $password: String!,
    ) {
        login(
          input: {
            username: $username,
            password: $password
          }
        ) {
          token
        }
    }
`;

const internalGenerateCustomerToken = async (parent, args, context) => {
    const variables = {
        username: args.input.username,
        password: args.input.password,
    };
    const res = await requestGraph(query, variables, context);
    // context.session.destroy();
    if (res.login) {
        context.session.token = encrypt(res.login.token);
        return {
            originalToken: res.login.token,
            token: encrypt(res.login.token),
            message: 'welcome',
        };
    }
    return res;
};

module.exports = internalGenerateCustomerToken;
