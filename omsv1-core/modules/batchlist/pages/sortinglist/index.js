import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@modules/batchlist/pages/sortinglist/components';
import Core from '@modules/batchlist/pages/sortinglist/core';

const Page = (props) => <Core Content={Content} {...props} />;

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'pickandpack', 'batchlist'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
