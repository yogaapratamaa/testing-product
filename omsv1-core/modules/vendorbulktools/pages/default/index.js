import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/vendorbulktools/pages/default/components';
import Core from '@modules/vendorbulktools/pages/default/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'vendor'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
