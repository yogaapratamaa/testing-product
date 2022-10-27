import { useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/register/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

// const fetchPolicy = {
//     fetchPolicy: 'cache-and-network',
// };

export const createSeller = (variables) => useMutation(Schema.createSeller, {
    variables, ...context,
});

export default {
    createSeller,
};
