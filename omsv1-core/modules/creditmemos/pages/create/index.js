import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/creditmemos/pages/create/components';
import Core from '@modules/creditmemos/pages/create/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'return'] });
export default withApollo({ ssr: false })(withTranslation()(Page));
