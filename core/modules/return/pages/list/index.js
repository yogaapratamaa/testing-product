import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/return/pages/list/components';
import Core from '@modules/return/pages/list/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'return'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
