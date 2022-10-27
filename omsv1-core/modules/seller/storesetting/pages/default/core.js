import Layout from '@layout';
import aclService from '@modules/theme/services/graphql';
import gqlLocation from '@modules/location/services/graphql';
import gqlService from '@sellermodules/storesetting/services/graphql';
import BackdropLoad from '@helper_backdropload';
import ErrorRedirect from '@common_errorredirect';
import { regexPhoneDial } from '@helper_regex';

import * as Yup from 'yup';
import { useFormik } from 'formik';

const ContentWrapper = (props) => {
    const {
        Content, t, dataStore, refetch, dataShipment,
        countryOptions,
        regionOptions,
        cityOptions,
    } = props;

    const [getCountries, getCountriesRes] = gqlLocation.getCountries();
    const [getCountry, getCountryRes] = gqlLocation.getCountry();
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = gqlLocation.getCityKecByRegionCode();

    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);

    const [mapPosition, setMapPosition] = React.useState({
        lat: dataStore.latitude ? String(dataStore.latitude) : '-6.197361',
        lng: dataStore.longitude ? String(dataStore.longitude) : '106.774535',
    });

    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        setMapPosition({
            lat,
            lng,
        });
    };

    const shipmentGroup = () => {
        const values = [];
        const keys = {};
        const valid = {};
        if (dataShipment?.length) {
            dataShipment.forEach((shipment) => {
                keys[shipment.provider] = {
                    services_id: [...(keys[shipment.provider]?.services_id || []), shipment.entity_id],
                    value: [keys[shipment.provider]?.value, (dataStore?.shipping_methods || [])?.includes(shipment.entity_id)]
                        .some((el) => (el) === true),
                };
                keys[shipment.provider].selected = dataStore?.shipping_methods?.filter((v) => keys[shipment.provider]?.services_id?.includes(v));
                const existIdx = values.findIndex((data) => data.provider === shipment.provider);
                if (existIdx >= 0) {
                    values[existIdx] = {
                        ...values[existIdx],
                        service: `${values[existIdx].service}, ${shipment.service}`,
                        options: [...values[existIdx].options, shipment],
                    };
                } else {
                    values.push({
                        provider: shipment.provider,
                        service: shipment.service,
                        shipping_method_logo_url: shipment.shipping_method_logo_url,
                        options: [shipment],
                    });
                }
                const temp = [];
                temp.push(['value', Yup.boolean()]);
                temp.push(['selected', Yup.array().of(Yup.number()).when('value', {
                    is: true,
                    then: Yup.array().of(Yup.number()).min(1, t('storesetting:Choose_at_least_min_key', { min: 1, key: 'service' })),
                })]);
                valid[shipment.provider] = Yup.object().shape(Object.fromEntries(temp));
            });
        }
        return { values, keys, valid };
    };

    const [saveSellerStore] = gqlService.saveSellerStore();
    const handleSubmit = (input) => {
        window.backdropLoader(true);
        saveSellerStore({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storesetting:Store setting has been saved!'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
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
            city: cityOptions.find((city) => city.value === (dataStore?.city)) || null,
            country_id: countryOptions.find((country) => country.id === (dataStore?.country_id || 'ID')),
            description: dataStore?.description,
            id: dataStore?.id,
            is_active: dataStore?.is_active ?? true,
            latitude: dataStore?.latitude ? Number(dataStore?.latitude) : '',
            logo: dataStore?.logo,
            longitude: dataStore?.longitude ? Number(dataStore?.longitude) : '',
            name: dataStore?.name || '',
            postcode: dataStore?.postcode || '',
            region: regionOptions.find((region) => region.code === (dataStore?.region))
                || regionOptions.find((region) => region.name === (dataStore?.region)) || null,
            street: dataStore?.street || '',
            telephone: dataStore?.telephone || '',
            address: '',
            ...shipmentGroup().keys,
        },
        validationSchema: Yup.object().shape({
            country_id: Yup.object().typeError(t('storesetting:This_is_a_Required_field'))
                .required(t('storesetting:This_is_a_Required_field')),
            region: Yup.object().typeError(t('storesetting:This_is_a_Required_field'))
                .required(t('storesetting:This_is_a_Required_field')),
            city: Yup.object().typeError(t('storesetting:This_is_a_Required_field'))
                .required(t('storesetting:This_is_a_Required_field')),
            latitude: Yup.string().typeError(t('storesetting:This_is_a_Required_field')).required(t('storesetting:This_is_a_Required_field')),
            longitude: Yup.string().typeError(t('storesetting:This_is_a_Required_field')).required(t('storesetting:This_is_a_Required_field')),
            name: Yup.string().typeError(t('storesetting:This_is_a_Required_field')).required(t('storesetting:This_is_a_Required_field')),
            postcode: Yup.string().typeError(t('storesetting:This_is_a_Required_field')).required(t('storesetting:This_is_a_Required_field')),
            street: Yup.string().typeError(t('storesetting:This_is_a_Required_field')).required(t('storesetting:This_is_a_Required_field')),
            telephone: Yup.string().required(t('storesetting:This_is_a_Required_field')).typeError(t('storesetting:This_is_a_Required_field'))
                .matches(useRegexPhone, t('storesetting:Invalid_phone_number_format')),
            ...shipmentGroup().valid,
        }),
        onSubmit: (values) => {
            const {
                country_id, region, city, latitude, longitude, address, ...restValues
            } = values;
            const valueToSubmit = {
                ...restValues,
                country_id: country_id.id,
                region: region.code,
                city: city.value,
                latitude: String(latitude),
                longitude: String(longitude),
            };
            const keys = Object.keys(shipmentGroup().keys);
            let temp = [];
            keys.forEach((key) => {
                if (valueToSubmit[key].value) {
                    temp = [...temp, ...valueToSubmit[key].selected];
                }
            });
            valueToSubmit.shipping_methods = temp;
            keys.forEach((key) => {
                delete valueToSubmit[key];
            });
            handleSubmit(valueToSubmit);
        },
    });

    const handleDragPosition = (value) => {
        setMapPosition(value);
        formik.setFieldValue('longitude', value.lng);
        formik.setFieldValue('latitude', value.lat);
    };

    const handleDropFile = (files) => {
        formik.setFieldValue('logo', files[0].baseCode);
    };

    React.useMemo(() => {
        if (typeof window !== 'undefined' && navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, []);

    const contentProps = {
        ...props,
        formik,
        getCountries,
        getCountriesRes,
        getCountry,
        getCountryRes,
        getCityKecByRegionCode,
        getCityKecByRegionCodeRes,
        mapPosition,
        setMapPosition,
        handleDragPosition,
        handleDropFile,
        setDialCode,
        shipmentGroup: shipmentGroup().values,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('storesetting:Store_Setting'),
    };

    const {
        loading: loadStore, data: dataStore, refetch, error,
    } = gqlService.getSellerStore();
    const { loading: loadShipment, data: dataShipment } = gqlService.getLogistixShippingMethods();

    const { loading: loadMap, data: dataMap } = aclService.getStoreConfig({
        path: 'swiftoms_general/google_map/api_key',
    });
    const { loading: loadEnableMap, data: dataEnableMap } = aclService.getStoreConfig({
        path: 'swiftoms_general/google_map/enabled',
    });

    const [getCountries, getCountriesRes] = gqlLocation.getCountries();
    const [getCountry, getCountryRes] = gqlLocation.getCountry();
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = gqlLocation.getCityKecByRegionCode();

    React.useEffect(() => {
        if (dataStore?.getSellerStore) {
            getCountries();
            if (dataStore?.getSellerStore?.country_id) {
                getCountry({ variables: { id: dataStore?.getSellerStore?.country_id } });
            }
            if (dataStore?.getSellerStore?.region) {
                getCityKecByRegionCode({ variables: { region_code: dataStore?.getSellerStore?.region } });
            }
        }
    }, [dataStore?.getSellerStore]);

    React.useEffect(() => {
        BackdropLoad(loadMap || loadEnableMap || loadStore || loadShipment
            || getCountriesRes.loading || getCountryRes.loading || getCityKecByRegionCodeRes.loading);
    }, [loadMap, loadEnableMap, loadStore, loadShipment,
        getCountriesRes.loading, getCountryRes.loading, getCityKecByRegionCodeRes.loading]);

    if (loadMap || loadEnableMap || loadStore || loadShipment || loadShipment
        || getCountriesRes.loading || getCountryRes.loading || getCityKecByRegionCodeRes.loading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!dataStore?.getSellerStore) {
        const errMsg = error?.message ?? t('productlist:Data_not_found');
        const redirect = '/seller/order';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    const contentProps = {
        ...props,
        enableMap: dataEnableMap?.getStoreConfig === '1',
        gmapKey: dataMap?.getStoreConfig || 'AIzaSyA0ASp4Tnk0TxLPM2i7kG5S8fZau0snI_A',
        dataStore: dataStore?.getSellerStore,
        dataShipment: dataShipment.getLogistixShippingMethods,
        refetch,
        countryOptions: (getCountriesRes && getCountriesRes.data && getCountriesRes.data.countries) || [],
        regionOptions: (getCountryRes && getCountryRes.data && getCountryRes.data.country && getCountryRes.data.country.available_regions) || [],
        cityOptions: (getCityKecByRegionCodeRes && getCityKecByRegionCodeRes.data && getCityKecByRegionCodeRes.data.getCityKecByRegionCode) || [],

    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
