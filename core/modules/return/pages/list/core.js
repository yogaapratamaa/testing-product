/* eslint-disable no-console */
import Layout from '@layout';
import gqlService from '@modules/return/services/graphql';
import { getOrderList } from '@modules/return/services/graphql/index';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const pageConfig = {
        title: 'Return',
    };

    const { data, loading } = gqlService.getOrderList({ variables: { page: '1', limit: 10 } });
    // console.log(data && data);

    const contentProps = {
        data,
        loading,
        getOrderList,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
