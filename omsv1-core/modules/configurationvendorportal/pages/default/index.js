import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/configurationvendorportal/pages/default/components';
import Core from '@modules/configurationvendorportal/pages/default/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'configuration', 'vendorconfiguration'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
