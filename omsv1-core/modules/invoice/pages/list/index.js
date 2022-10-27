import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/invoice/pages/list/components';
import Core from '@modules/invoice/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'order', 'invoice'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
