import Layout from '@layout';
import gqlService from '@modules/locationpriceupload/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;

    const [getPriceLocationList, { data, loading }] = gqlService.getPriceLocationList();
    const [deleteProductPrice] = gqlService.deleteProductPrice();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_location_price_upload',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getPriceLocationList,
        data,
        loading,
        deleteProductPrice,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
