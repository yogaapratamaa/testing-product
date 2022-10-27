import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/shipment/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getShipmentDetail = (variables) => useQuery(Schema.getShipmentDetail, {
    ...variables, ...context, ...fetchPolicy,
});

export const getShipmentList = (variables) => useLazyQuery(Schema.getShipmentList, {
    ...variables, ...context, ...fetchPolicy,
});

export const getChannelByOrderId = (variables) => useQuery(Schema.getChannelByOrderId, {
    ...variables, ...context,
});

export const setShipmentRTS = (variables) => useMutation(Schema.setShipmentRTS, {
    variables, ...context,
});

export const getChannelStoreName = (variables) => useQuery(Schema.getChannelStoreName, {
    ...variables, ...context,
});

export default {
    getShipmentDetail,
    getShipmentList,
    getChannelByOrderId,
    setShipmentRTS,
    getChannelStoreName,
};
