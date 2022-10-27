/* eslint-disable no-nested-ternary */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/productlist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data, Content, getProductAttributes, setLoadingState, t,
    } = props;
    const router = useRouter();
    const [updateProduct] = gqlService.updateProduct();
    const productDetail = data.getProductAttributes;
    const [attribute_set_id, set_attribute_set_id] = React.useState(productDetail.attribute_set_id);

    const onChangeAttribute = (e) => {
        setLoadingState(true);
        const { value } = e.target;
        set_attribute_set_id(value);
        getProductAttributes({
            variables: {
                id: router && router.query && Number(router.query.id),
                attribute_set_id: Number(value),
            },
        });
        setLoadingState(false);
    };

    const newAttribute = () => {
        const tempAttributes = [...productDetail.groups[0].attributes];
        const idx_price = tempAttributes.findIndex((att) => att.attribute_code === 'price');
        tempAttributes[idx_price] = {
            ...tempAttributes[idx_price],
            disabled_code: 'price_type',
        };
        const idx_tax = tempAttributes.findIndex((att) => att.attribute_code === 'tax_class_id');
        tempAttributes[idx_tax] = {
            ...tempAttributes[idx_tax],
            disabled_code: 'price_type',
        };
        const idx_weight = tempAttributes.findIndex((att) => att.attribute_code === 'weight');
        tempAttributes[idx_weight] = {
            ...tempAttributes[idx_weight],
            disabled_code: 'weight_type',
        };
        const temp = {
            ...productDetail,
            groups: [
                {
                    ...productDetail.groups[0],
                    attributes: tempAttributes,
                },
                ...productDetail.groups.slice(1),
            ],
        };
        return temp;
    };

    const initValue = () => {
        const init = [];
        const valid = [];
        const input_image = [];
        const yupValidate = (attribute) => {
            const { backend_type, frontend_input } = attribute;
            if (frontend_input === 'boolean') {
                return Yup.boolean();
            }
            switch (backend_type) {
            case 'int':
            case 'decimal':
                return Yup.number().typeError(t('productlist:Value_must_be_a_number'));
            case 'text':
                return Yup.string();
            default:
                return Yup.string();
            }
        };
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < newAttribute().groups.length; i++) {
            const group = newAttribute().groups[i];
            group.attributes
                .filter((att) => att.frontend_input !== 'image')
                .map((attribute) => {
                    if (attribute.is_required) {
                        if (attribute.disabled_code) {
                            valid.push([attribute.attribute_code, yupValidate(attribute).nullable()
                                .when('price_type', {
                                    is: true,
                                    then: yupValidate(attribute).nullable(),
                                    otherwise: yupValidate(attribute).required(t('productlist:This_is_a_Required_field')),
                                }),
                            ]);
                        } else {
                            valid.push([attribute.attribute_code, yupValidate(attribute)
                                .required(t('productlist:This_is_a_Required_field'))]);
                        }
                    } else {
                        valid.push([attribute.attribute_code, yupValidate(attribute).nullable()]);
                    }
                    if (attribute.frontend_input === 'multiselect') {
                        const values = [];
                        if (attribute.attribute_value?.length) {
                            attribute.attribute_value.split(',').forEach((item) => {
                                values.push(attribute.attribute_options.find((o) => o.value === item));
                            });
                        }
                        return init.push([attribute.attribute_code, values]);
                    }
                    if (attribute.frontend_input === 'select' && attribute.attribute_value?.length) {
                        let values = '';
                        if (attribute.attribute_value) {
                            values = attribute.attribute_options.find((o) => o.value === attribute.attribute_value)?.value;
                        }
                        return init.push([attribute.attribute_code, values]);
                    }
                    if (attribute.frontend_input === 'boolean') {
                        const values = attribute.attribute_value === '1';
                        return init.push([attribute.attribute_code, values]);
                    }
                    return init.push([attribute.attribute_code, attribute.attribute_value || '']);
                });
            group.attributes
                .filter((att) => att.frontend_input === 'image')
                .map((attribute) => attribute.images.map((image) => input_image.push({
                    id: image.id,
                    url: image.url,
                    binary: '',
                    position: image.position,
                    types: image.types,
                    is_deleted: false,
                })));
        }
        return {
            init: Object.fromEntries(init),
            valid: Object.fromEntries(valid),
            image: input_image,
        };
    };

    const handleSubmit = (value) => {
        const variables = {
            ...value,
        };
        window.backdropLoader(true);
        updateProduct({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('productlist:The_product_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/product/productlist'), 250);
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

    const formik = useFormik({
        initialValues: {
            ...initValue().init,
            input_image: initValue().image,
            product_location: newAttribute().product_location,
            options: newAttribute().options?.map((option) => ({
                option_id: option.option_id,
                title: option.title,
                is_old: true,
                values: option.value,
                required: option.required,
                sort_order: option.sort_order,
            })) || [],
            shouldCheck: false,
            bundle_options: newAttribute().bundle_options.map((option) => ({
                input_type: option.type || 'select',
                is_old: true,
                is_delete: false,
                is_required: option.required,
                option_id: option.option_id,
                title: option.title,
                values: option.product_links.map((product) => ({
                    id: product.entity_id,
                    is_delete: false,
                    is_default: product.is_default,
                    name: product.product_name,
                    price: Number(product.price),
                    product_price: Number(product.price),
                    qty: product.qty,
                    sku: product.sku,
                    qty_edit: product.selection_can_change_quantity,
                })),
            })),
        },
        validationSchema: Yup.object().shape({
            ...initValue().valid,
            product_location: Yup.array().of(Yup.object().shape({
                loc_id: Yup.string().required(t('productlist:This_is_a_Required_field')),
            })).min(1, t('productlist:This_is_a_Required_field')),
            shouldCheck: Yup.boolean(),
            options: Yup.array().nullable().when('shouldCheck', {
                is: true,
                then: Yup.array().of(Yup.object().shape({
                    title: Yup.string().required(t('productlist:This_is_a_Required_field')),
                    values: Yup.array().of(Yup.object().shape({
                        title: Yup.string().required(t('productlist:This_is_a_Required_field')),
                        sku: Yup.string().required(t('productlist:This_is_a_Required_field')),
                    })).min(1, t('productlist:This_is_a_Required_field')),
                })),
                otherwise: Yup.array().nullable(),
            }),
            bundle_options: Yup.array().when('is_fixed_bundle', {
                is: false,
                then: Yup.array().of(Yup.object().shape({
                    title: Yup.string().required(t('productlist:This_is_a_Required_field')),
                    values: Yup.array().of(Yup.object().shape({
                        qty: Yup.number().typeError(t('productlist:Value_must_be_a_number'))
                            .required(t('productlist:This_is_a_Required_field')),
                    })).min(1, t('productlist:This_is_a_Required_field')),
                })).min(1, t('productlist:This_is_a_Required_field')),
                otherwise: Yup.array().of(Yup.object().shape({
                    title: Yup.string().nullable(),
                    values: Yup.array().of(Yup.object().shape({
                        qty: Yup.number().typeError(t('productlist:Value_must_be_a_number'))
                            .required(t('productlist:This_is_a_Required_field')),
                    })).min(1, t('productlist:This_is_a_Required_field')),
                })).min(1, t('productlist:This_is_a_Required_field')),
            }),
        }),
        onSubmit: (values) => {
            const {
                input_image, product_location, status, options, shouldCheck, price, weight,
                is_fixed_bundle, price_type, weight_type, bundle_options, ...restValues
            } = values;
            const valueToSubmit = {
                id: router && router.query && Number(router.query.id),
                input: Object.keys(restValues).map((key) => {
                    let attribute_value = restValues[key] || '';
                    if (typeof restValues[key] === 'object') {
                        attribute_value = restValues[key]?.map((val) => val.value).join(',') || '';
                    } else if (typeof restValues[key] === 'boolean') {
                        attribute_value = restValues[key] ? '1' : '0';
                    }
                    return {
                        attribute_code: key,
                        attribute_value,
                    };
                }),
            };
            valueToSubmit.input = [
                { attribute_code: 'status', attribute_value: status ? '1' : '2' },
                { attribute_code: 'attribute_set_id', attribute_value: String(attribute_set_id) },
                ...valueToSubmit.input,
            ];
            if (!price_type) {
                valueToSubmit.input = [
                    ...valueToSubmit.input,
                    { attribute_code: 'price', attribute_value: price },
                ];
            }
            if (!weight_type && weight) {
                valueToSubmit.input = [
                    ...valueToSubmit.input,
                    { attribute_code: 'weight', attribute_value: weight },
                ];
            }
            if (input_image && input_image.length) {
                valueToSubmit.input_image = input_image.map((input) => {
                    const {
                        url, name, size, ...restInput
                    } = input;
                    return restInput;
                });
            }
            if (product_location?.length) {
                valueToSubmit.product_location = product_location.map((loc) => Number(loc.loc_id));
            }
            if (options.length) {
                valueToSubmit.options = options.map((option) => {
                    const res = {
                        is_delete: option.is_delete || false,
                        title: option.title,
                        values: option.values.map((value, iv) => ({
                            title: value.title,
                            sku: value.sku,
                            sort_order: value.sort_order || iv + 1,
                            is_delete: option.is_delete ? true : value.is_delete || false,
                        })),
                    };
                    if (option.option_id && option.is_old) {
                        res.option_id = option.option_id;
                    }
                    return res;
                });
            }
            valueToSubmit.bundle_options = bundle_options.map((option) => ({
                input_type: is_fixed_bundle ? null : option.input_type,
                is_required: is_fixed_bundle ? true : option.is_required,
                is_delete: option.is_delete,
                title: is_fixed_bundle ? 'Bundle' : option.title,
                values: option.values.map((product) => ({
                    is_default: is_fixed_bundle ? true : product.is_default,
                    is_delete: option.is_delete ? true : product.is_delete || false,
                    price: (is_fixed_bundle ? product.product_price ? String(product?.product_price?.replace(/[^0-9.-]+/g, ''))
                        : String(product.price) : String(product.price)) || '0',
                    product_id: product.id,
                    qty: Number(product.qty),
                    qty_edit: is_fixed_bundle ? null : product.qty_edit,
                })),
            }));
            handleSubmit(valueToSubmit);
        },
    });

    const handleDropFile = (files) => {
        const { baseCode, file } = files[0];
        const input = formik.values.input_image;
        input.push({
            binary: baseCode,
            types: [],
            position: 0,
            is_deleted: false,
            name: file.name,
            size: `${file.size / 1000} KB`,
        });
        formik.setFieldValue('input_image', input);
    };

    const contentProps = {
        formik,
        productDetail: newAttribute(),
        handleDropFile,
        attribute_set_id,
        onChangeAttribute,
        t,
        ...props,
    };

    React.useEffect(() => {
        if (formik.values.options.length) {
            formik.setFieldValue('shouldCheck', true);
        } else {
            formik.setFieldValue('shouldCheck', false);
        }
    }, [formik.values.options]);

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: `${t('productlist:Product_Detail_')}${router?.query?.id}`,
    };

    const [loadingState, setLoadingState] = React.useState(false);
    const [getProductAttributes, productAttributes] = gqlService.getProductAttributes();
    const {
        loading, data, called, error, refetch,
    } = productAttributes;

    React.useEffect(() => {
        getProductAttributes({
            variables: { id: router && router.query && Number(router.query.id) },
        });
    }, []);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_product_list',
    });

    React.useEffect(() => {
        BackdropLoad(loading || !called || aclCheckLoading || loadingState);
    }, [loading, aclCheckLoading, called, loadingState]);

    if (loading || !called || aclCheckLoading || loadingState) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (called && !data) {
        const errMsg = error?.message ?? t('productlist:Data_not_found');
        const redirect = '/product/productlist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
        return <Layout pageConfig={pageConfig} />;
    }

    if (data?.getProductAttributes?.type_id !== 'bundle') {
        const errMsg = t('productlist:This_page_is_only_for_valuestype_products', { values: { type: data?.getProductAttributes?.type_id } });
        const redirect = '/product/productlist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                data={data}
                getProductAttributes={getProductAttributes}
                setLoadingState={setLoadingState}
                refetch={refetch}
                {...props}
            />
        </Layout>
    );
};

export default Core;
