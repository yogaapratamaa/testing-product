import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/wavepack/pages/scan/components';
import Core from '@modules/wavepack/pages/scan/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'pickandpack', 'packlist'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
