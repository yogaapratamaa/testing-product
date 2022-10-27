import Layout from '@layout';
import gqlService from '@modules/orders/services/graphql';
import * as Yup from 'yup';

// import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';
import { useFormik } from 'formik';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const pageConfig = {
        title: 'Orders',
    };
    const [importOrderCSV] = gqlService.importOrderCSV();
    const [showModal, setShowModal] = React.useState(false);
    const [varExport, setVarExport] = React.useState({});
    const [collect, setCollect] = React.useState([]);
    const [getOrderList, { data, loading }] = gqlService.getOrderList();
    const [getOrderSearch, { data: dataOrderSearch, loading: loadingOrderSearch, error }] = gqlService.getOrderSearch();
    const [errorSearch, setErrorSearch] = React.useState(false);

    const variable = {
        input: {
            ids: collect,
        },
    };

    const { data: dataChannelStoreName, loading: loadingChannelStoreName } = gqlService.getChannelStoreName({ variables: variable });

    const handleSubmit = ({
        base64,
    }) => {
        const variables = {
            base64,
        };
        window.backdropLoader(true);
        importOrderCSV({
            variables,
        }).then((res) => {
            if (res.data.orderImport.is_success === false) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: `Import Order Failed! Detail message: ${res.data.orderImport.error_message}`,
                    variant: 'error',
                });
            } else if (res.data.orderImport.is_success === true) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Import Order Success!',
                    variant: 'success',
                });
                setShowModal(false);
                // setTimeout(() => router.push('/product/categorybychannel'), 250);
            }
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: `Import Order Failed! Detail message: ${e.message}`,
                variant: 'error',
            });
        });
    };

    const formik = useFormik({
        initialValues: {
            base64: '',
        },
        validationSchema: Yup.object().shape({
            base64: Yup.string().required('Required!'),
        }),
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
        },
    });

    const handleDropFile = (files) => {
        if (files.length === 0) {
            formik.setFieldValue('base64', '');
        } else {
            const { baseCode } = files[0];
            const idx = baseCode.indexOf('base64,');
            formik.setFieldValue('base64', baseCode.slice(idx + 7));
        }
    };

    React.useEffect(() => {
        BackdropLoad(loading || loadingChannelStoreName);
    }, [loading, loadingChannelStoreName]);

    React.useEffect(() => {
        if (error) {
            setErrorSearch(true);
        }
    }, [error]);

    React.useEffect(() => {
        if (data) {
            const collectStoreId = data && data?.orderPage.items.map((item) => item.storeId);
            const onlyUnique = (val, inxd, self) => self.indexOf(val) === inxd;
            const unique = collectStoreId.filter(onlyUnique);
            if (collect) {
                setCollect(unique);
            }
        }
    }, [data]);

    const contentProps = {
        formik,
        data,
        dataOrderSearch,
        loading,
        loadingOrderSearch,
        errorSearch,
        setErrorSearch,
        dataChannelStoreName,
        loadingChannelStoreName,
        getOrderList,
        getOrderSearch,
        setShowModal,
        showModal,
        handleDropFile,
        // exportOrderToCsv,
        varExport,
        setVarExport,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
