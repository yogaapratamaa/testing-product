import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/aclgroup/pages/create/components';
import Core from '@modules/aclgroup/pages/create/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'user', 'usergroup'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
