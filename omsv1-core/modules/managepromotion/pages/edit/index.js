import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/managepromotion/pages/edit/components';
import Core from '@modules/managepromotion/pages/edit/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'vendor'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
