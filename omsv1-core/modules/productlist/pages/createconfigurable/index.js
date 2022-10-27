import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/productlist/pages/createconfigurable/components';
import Core from '@modules/productlist/pages/createconfigurable/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'catalog', 'productlist'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
