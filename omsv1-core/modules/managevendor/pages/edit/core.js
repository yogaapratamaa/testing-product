/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/managevendor/services/graphql';
import aclService from '@modules/theme/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import Cookies from 'js-cookie';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import { regexPhoneDial } from '@helper_regex';

const ContentWrapper = (props) => {
    const {
        data, dataCourier, dataShipper, Content, getCountries, getCountriesRes, dataShippingMethod,
        databeneficiaries, dataBank, dataPayout, t,
    } = props;
    const router = useRouter();
    const vendor = data.getVendorById;
    const [vendorUpdate] = gqlService.vendorUpdate();
    const [getCountry, getCountryRes] = locationGqlService.getCountry();
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = locationGqlService.getCityKecByRegionCode();
    const [firstRender, setFirstRender] = React.useState(true);

    const isVendor = JSON.parse(Cookies.get('cdt'))?.customer_company_code !== null;

    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        vendorUpdate({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('managevendor:successSaveVendor'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/vendorportal/managevendor'), 250);
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

    const validationBeneficiaries = isVendor && databeneficiaries ? {
        bank: Yup.object().typeError(t('managevendor:This_is_a_Required_field')).required(t('managevendor:This_is_a_Required_field')),
        account: Yup.string().required(t('managevendor:This_is_a_Required_field')),
        name: Yup.string().required(t('managevendor:This_is_a_Required_field')),
        alias_name: Yup.string().required(t('managevendor:This_is_a_Required_field')),
        payout_schedule: Yup.object().typeError(t('managevendor:This_is_a_Required_field')).required(t('managevendor:This_is_a_Required_field')),
    } : {};

    const formik = useFormik({
        initialValues: {
            company_id: vendor.company_id,
            company_code: vendor.company_code,
            company_name: vendor.company_name,
            company_street: vendor.company_street,
            company_country_id: getCountriesRes.data?.countries.find((country) => country.id === vendor.company_country_id),
            company_region: '',
            company_city: { label: vendor.company_city, value: vendor.company_city },
            no_telephone: vendor.no_telephone,
            is_new_product: vendor.is_new_product,
            company_margin: vendor.company_margin,
            is_product_approval: Number(vendor.is_product_approval) || 0,
            logo: vendor.logo,
            promotion_banner: vendor.promotion_banner,
            shipper_shipping: vendor.shipper_shipping?.length && vendor.shipper_shipping[0] !== ''
                ? vendor.shipper_shipping.map((code) => dataShipper.find((ship) => ship?.value === code))
                : [],
            vendor_shipping: vendor.vendor_shipping?.length && vendor.vendor_shipping[0] !== ''
                ? vendor.vendor_shipping.map((code) => dataCourier.find((ship) => ship?.value === code))
                : [],
            bank: dataBank?.find((e) => e.bank_code === vendor.beneficiaries.bank),
            account: vendor.beneficiaries.account || '',
            name: vendor.beneficiaries.name || '',
            alias_name: vendor.beneficiaries.alias_name || '',
            payout_schedule: dataPayout?.find((e) => e?.value === vendor.beneficiaries.payout_schedule),
            is_Vendor: isVendor,
        },
        validationSchema: Yup.object().shape({
            company_code: Yup.string().required(t('managevendor:This_is_a_Required_field')),
            no_telephone: Yup.string().nullable().when('is_Vendor', {
                is: true,
                then: Yup.string().nullable().matches(useRegexPhone, t('managevendor:Invalid_phone_number_format')),
            }),
            ...validationBeneficiaries,
        }),
        onSubmit: (values) => {
            const {
                company_id,
                company_code,
                shipper_shipping,
                vendor_shipping,
                logo,
                company_country_id,
                company_region,
                company_city,
                promotion_banner,
                is_new_product,
                company_margin,
                is_product_approval,
                bank,
                account,
                name,
                alias_name,
                payout_schedule,
                is_Vendor,
                ...restValues
            } = values;
            let valuesToSubmit = {};
            if (isVendor) {
                valuesToSubmit = {
                    ...restValues,
                    company_id,
                    company_code,
                    company_country_id: company_country_id?.id || '',
                    company_region: company_region?.code || '',
                    company_city: company_city?.value || '',
                };
                if (databeneficiaries) {
                    valuesToSubmit.beneficiaries = {
                        bank: bank?.bank_code || '',
                        account: account || '',
                        name: name || '',
                        alias_name: alias_name || '',
                        payout_schedule: payout_schedule?.value || '',
                    };
                }
                if (dataShippingMethod) {
                    valuesToSubmit.shipper_shipping = shipper_shipping?.map((ship) => ship?.value || '');
                    valuesToSubmit.vendor_shipping = vendor_shipping?.map((ship) => ship?.value || '');
                }
                if (logo !== vendor.logo) {
                    valuesToSubmit.logo = logo;
                }
                if (promotion_banner && promotion_banner !== vendor.promotion_banner) {
                    valuesToSubmit.promotion_banner = promotion_banner;
                }
                if (vendor.promotion_banner && !promotion_banner) {
                    valuesToSubmit.promotion_banner_deleted = true;
                }
            } else {
                valuesToSubmit = {
                    company_id,
                    company_code,
                    is_new_product,
                    company_margin: company_margin ? Number(company_margin) : 0,
                    is_product_approval,
                };
            }
            handleSubmit(valuesToSubmit);
        },
    });

    const handleDropFile = (name, files) => {
        const { baseCode } = files[0];
        formik.setFieldValue(name, baseCode);
    };

    React.useEffect(() => {
        if (vendor.company_country_id) {
            getCountry({
                variables: {
                    id: vendor.company_country_id,
                },
            });
        }
    }, []);

    React.useEffect(() => {
        if (firstRender && getCountryRes.data) {
            const currentRegion = getCountryRes.data?.country.available_regions.find((val) => val.code === vendor.company_region);
            formik.setFieldValue('company_region', currentRegion);
            setFirstRender(false);
        }
    }, [getCountryRes.data]);

    React.useEffect(() => {
        if (vendor.company_region) {
            getCityKecByRegionCode({
                variables: {
                    region_code: vendor.company_region,
                },
            });
        }
    }, []);

    const contentProps = {
        formik,
        isVendor,
        vendor,
        dataCourier,
        dataShipper,
        dataBank,
        dataPayout,
        dataShippingMethod,
        databeneficiaries,
        handleDropFile,
        getCountries,
        getCountriesRes,
        getCountry,
        getCountryRes,
        getCityKecByRegionCode,
        getCityKecByRegionCodeRes,
        t,
        setDialCode,
        ...props,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_vendor_manage',
    });

    const [getCountries, getCountriesRes] = locationGqlService.getCountries();
    const { loading: loadingCourier, data: dataCourier } = gqlService.getCourierOption();
    const { loading: shipperLoading, data: dataShipper } = gqlService.getShipperMethodOption();
    const { loading: loadingBank, data: dataBank } = gqlService.getVendorIrisBankList();
    const { loading: loadingPayout, data: dataPayout } = gqlService.getVendorIrisPayoutSchedule();
    const { loading, data, error } = gqlService.getVendorById({
        id: router && router.query && Number(router.query.id),
    });
    const { loading: loadingApproval, data: dataApproval } = gqlService.getAutoApprovalOptions();

    const pageConfig = {
        title: `${t('managevendor:Manage_Vendor')} ${data && data.getVendorById && data.getVendorById.company_name ? data.getVendorById.company_name : ''}`,
    };

    const { loading: loadingShippingMethod, data: dataShippingMethod } = gqlService.getStoreConfig({
        path: 'swiftoms_vendorportal/configuration/shipping_method',
    });

    const { loading: loadingbeneficiaries, data: databeneficiaries } = gqlService.getStoreConfig({
        path: 'swiftoms_vendorportal/configuration/beneficiaries',
    });

    React.useEffect(() => {
        getCountries();
    }, []);

    React.useEffect(() => {
        BackdropLoad(loading || loadingCourier || shipperLoading || loadingShippingMethod || loadingbeneficiaries
            || loadingBank || loadingPayout || aclCheckLoading || getCountriesRes.loading || loadingApproval);
    }, [loading, loadingCourier, shipperLoading, loadingShippingMethod, loadingbeneficiaries,
        loadingBank, loadingPayout, aclCheckLoading, getCountriesRes.loading, loadingApproval]);

    if (loading || loadingCourier || shipperLoading || loadingShippingMethod || loadingbeneficiaries
        || loadingBank || loadingPayout || aclCheckLoading || getCountriesRes.loading || loadingApproval) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    if (!data) {
        const errMsg = error?.message ?? t('managevendor:Data_not_found');
        const redirect = '/vendorportal/managevendor';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    const contentProps = {
        data,
        dataCourier: dataCourier.getCourierOption,
        dataShipper: dataShipper.getShipperMethodOption,
        dataShippingMethod: JSON.parse(dataShippingMethod.getStoreConfig),
        databeneficiaries: JSON.parse(databeneficiaries.getStoreConfig),
        getCountries,
        getCountriesRes,
        dataBank: dataBank.getVendorIrisBankList,
        dataPayout: dataPayout.getVendorIrisPayoutSchedule,
        dataApproval: dataApproval.getAutoApprovalOptions,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
