import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationemailtemplate/pages/preview/components';
import Core from '@modules/configurationemailtemplate/pages/preview/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['menu', 'common', 'configuration', 'emailtemplatesconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
