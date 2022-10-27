/* eslint-disable no-unused-vars */
import Layout from '@layout';
// import gqlService from '@modules/return/services/graphql';
// import aclService from '@modules/theme/services/graphql';
// import { useRouter } from 'next/router';
// import BackdropLoad from '@helper_backdropload';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    // const router = useRouter();
    const pageConfig = {
        title: 'Return > New Return Request',
        // customBreadcrumb: [
        //     { url: '/return', label: 'Return' },
        //     { url: router.asPath, label: 'Return' },
        // ],
    };

    const [varExport, setVarExport] = React.useState({});
    // const [getOrderDetail, { data, loading }] = gqlService.getOrderDetail();
    // const { getOrderList, data, loading } = gqlService.getOrderList();
    // console.log(data, ' data');
    // console.log(getOrderDetail, ' detail');
    // console.log(data, ' list');
    // const [setReallocation] = gqlService.setReallocation();
    // const [exportOrderToCsv] = gqlService.exportOrderToCsv({
    //     onCompleted: (res) => {
    //         window.backdropLoader(false);
    //         window.toastMessage({
    //             open: true,
    //             text: t('order:Order_has_been_exported_successfully'),
    //             variant: 'success',
    //         });
    //         router.push(res.exportOrderToCsv);
    //     },
    //     onError: (e) => {
    //         window.backdropLoader(false);
    //         window.toastMessage({
    //             open: true,
    //             text: e.message,
    //             variant: 'error',
    //         });
    //     },
    // });

    // const handleExport = () => {
    //     window.backdropLoader(true);
    //     exportOrderToCsv({
    //         variables: {
    //             ...varExport,
    //         },
    //     });
    // };

    // const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
    //     acl_code: 'oms_lite_sales_order_queue',
    // });

    // React.useEffect(() => {
    //     BackdropLoad(aclCheckLoading);
    // }, [aclCheckLoading]);

    // if (aclCheckLoading) {
    //     return <Layout />;
    // }

    // if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
    //     router.push('/');
    // }

    const formikValidateItem = useFormik({
        initialValues: {
            return_type: '',
            subsidiary: '',
            location: '',
            sku: '',
            qty: '',
            replacement_for: '',
        },
        validationSchema: Yup.object().shape({
            sku: Yup.string().required('This field is required!'),
            qty: Yup.number().typeError('Value must be a number!').required('This field is required!').positive()
                .integer(),
            replacement_for: Yup.string().required('This field is required!'),
        }),
        onSubmit: (values) => {
            // const valueToSubmit = {
            //     ...values,
            //     qty: Number(values.qty),
            // };
            // handleValidationItem(valueToSubmit);
        },
    });

    const contentProps = {
        // getOrderQueueList,
        // setReallocation,
        // data,
        // loading,
        // exportOrderToCsv,
        // handleExport,
        varExport,
        setVarExport,
        t,
        formikValidateItem,
    };

    // const customBreadcrumb = router?.query?.tab_status ? [
    //     { url: `/return/${router.query.tab_status}`, label: 'Return' },
    //     // { url: router.asPath, label: `${t('order:Detail_Order_')}${router.query?.id}` },
    // ] : [
    //     { url: '/return', label: 'Return' },
    //     { url: '/return/newpage', label: 'New Return Request' },
    // ];

    // const pageConfig = {
    //     title: `New Return Request ${router.query?.id}`,
    //     customBreadcrumb,
    // };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
