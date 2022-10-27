import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/ecommercechannel/pages/add/components';
import Core from '@modules/ecommercechannel/pages/add/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'integration', 'ecommercechannel'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
