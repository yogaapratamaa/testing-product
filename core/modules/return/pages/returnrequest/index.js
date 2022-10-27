import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
// import Content from '@modules/return/pages/list/components';
// import Core from '@modules/return/pages/list/core';
import Content from '@modules/return/pages/returnrequest/components';
import Core from '@modules/return/pages/returnrequest/core';

// const Page = () => (
//     <div>
//         <p>test</p>
//     </div>
// );

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'menu', 'return'] });

export default withApollo({ ssr: false })(withTranslation()(Page));
