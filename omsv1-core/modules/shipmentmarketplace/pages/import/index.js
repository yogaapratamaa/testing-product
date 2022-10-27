import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/shipmentmarketplace/pages/import/components';
import Core from '@modules/shipmentmarketplace/pages/import/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'shipment', 'shipmentmarketplace'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
