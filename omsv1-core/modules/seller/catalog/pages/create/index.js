import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@sellermodules/catalog/pages/create/components';
import Core from '@sellermodules/catalog/pages/create/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'catalog', 'productList'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
