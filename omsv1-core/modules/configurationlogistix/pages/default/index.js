import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationlogistix/pages/default/components';
import Core from '@modules/configurationlogistix/pages/default/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'logistixconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
