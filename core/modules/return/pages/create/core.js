/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Layout from '@layout';
import gqlService from '@modules/orders/services/graphql';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getSubsidiaryList, getOrderDetail } from '@modules/return/services/graphql/index';

const ContentWrapper = (props) => {
    const {
        data, Content,
        variableId,
        loading,
        dataSubsidiary, loadingSubsidiary,
    } = props;

    const router = useRouter();
    const [validateAddItem, { data: dataValidation }] = gqlService.validateAddItem();
    const handleValidationItem = (item) => {
        const variables = {
            sku: item.sku,
            qty: item.qty,
            replacement_for: item.replacement_for,
            orderId: variableId.id,
        };
        window.backdropLoader(true);
        validateAddItem({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Product exist. Added item to table.',
                    variant: 'success',
                });
            })

            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };
    const formikValidateItem = useFormik({
        initialValues: {
            return_type: '',
            subsidiary: '',
            location: '',
        },
        validationSchema: Yup.object().shape({
            return_type: Yup.string().required('This field is required!'),
            subsidiary: Yup.string().required('This field is required!'),
            location: Yup.string().required('This field is required!'),
        }),
        onSubmit: (values) => {
            const valueToSubmit = {
                ...values,
                qty: Number(values.qty),
            };
            handleValidationItem(valueToSubmit);
            setTimeout(() => {
                router.push({
                    pathname: '/return',
                });
            }, 1000);
        },
    });

    const contentProps = {
        formikValidateItem,
        data,
        loading,
        dataSubsidiary,
        loadingSubsidiary,
        dataValidation,
        ...props,
    };
    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();

    const variables = {
        id: router && router.query && String(router.query.id),
    };

    const { data, loading } = getOrderDetail({ variables });

    const { data: dataSubsidiary, loading: loadingSubsidiary } = getSubsidiaryList();

    const customBreadcrumb = router?.query?.tab_status ? [
        { url: `/order/${router.query.tab_status}`, label: 'Orders' },
        { url: router.asPath, label: `Edit Order ${router.query?.id}` },
    ] : [
        { url: '/orders', label: 'Orders' },
        { url: '/orders/edit', label: 'Edit Order' },
    ];

    const pageConfig = {
        title: `Edit Order ${router.query?.id}`,
        customBreadcrumb,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                variableId={variables}
                data={data}
                loading={loading}
                dataSubsidiary={dataSubsidiary}
                loadingSubsidiary={loadingSubsidiary}
                parent={router && router.query && router.query.tab_status}
                {...props}
            />
        </Layout>
    );
};

export default Core;
