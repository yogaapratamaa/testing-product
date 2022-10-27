import Layout from '@layout';
import gqlService from '@modules/orders/services/graphql';
// import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
// import BackdropLoad from '@helper_backdropload';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import React from 'react';

const ContentWrapper = (props) => {
    const {
        data, Content,
        variableId,
        refetchOrderDetail,
    } = props;
    const [validateAddItem, { data: dataValidation }] = gqlService.validateAddItem();
    const [editItemOrder, { data: dataEditItem }] = gqlService.editItemOrder();
    const [showModal, setShowModal] = React.useState(false);
    const [dataItem, setDataItem] = React.useState();

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
            kota: '',
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
            const valueToSubmit = {
                ...values,
                qty: Number(values.qty),
            };
            handleValidationItem(valueToSubmit);
        },
    });

    const checkChanges = (updateAddress, updateItem) => {
        if (updateAddress && updateItem) {
            return 'Address and order item updated';
        }
        if (updateAddress) {
            return 'Shipping address updated';
        }
        if (updateItem) {
            return 'Item order updated';
        }
        return 'Updated';
    };

    const handleEditItem = (updateAddress, dataForm, updateItem) => {
        const items = dataItem.map((item) => ({
            sku: item?.sku,
            qty: Number(item.qty),
            price: {
                amount: item.price?.amount || 0,
                currencyCode: item.price?.currencyCode || 'IDR',
            },
            additionalInfo: {
                replacementFor: item.replacement_for || '',
            },
        }));
        const variables = {
            orderId: variableId.id,
        };
        if (updateAddress) {
            variables.recipient = dataForm;
        }
        if (updateItem) {
            variables.items = items;
        }
        window.backdropLoader(true);
        editItemOrder({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: checkChanges(updateAddress, updateItem),
                    variant: 'success',
                });
                setTimeout(() => refetchOrderDetail(), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: `Error! ${e.message}`,
                    variant: 'error',
                });
            });
    };

    const contentProps = {
        data,
        dataItem,
        setDataItem,
        dataEditItem,
        dataValidation,
        handleEditItem,
        formikValidateItem,
        showModal,
        setShowModal,
        ...props,
    };
    return <Content {...contentProps} />;
};
const Core = (props) => {
    const router = useRouter();
    const variables = {
        id: router && router.query && router.query.id,
    };
    const { loading, data, refetch } = gqlService.getOrderDetail({ variables });

    // const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
    //     acl_code: 'sales_order_queue_edit_replacement',
    // });

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

    // React.useEffect(() => {
    //     BackdropLoad(loading);
    // }, [loading]);

    if (loading || (!data)) {
        return <Layout pageConfig={pageConfig} />;
    }
    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                refetchOrderDetail={refetch}
                variableId={variables}
                data={data}
                loading={loading}
                // aclCheckData={aclCheckData}
                parent={router && router.query && router.query.tab_status}
                // isSales={isSales}
                {...props}
            />
        </Layout>
    );
};
export default Core;
