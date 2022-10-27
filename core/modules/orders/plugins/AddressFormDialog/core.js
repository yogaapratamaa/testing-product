/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { regexPhone } from '@helper_regex';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
// import {groupingCity,groupingSubCity} from '@helpers/city';
import {
    //  modules,
    storeConfigNameCookie,
} from '@config';
import helperCookies from '@helper_cookies';
import {
    // getCityByRegionId,
    getCountries, getRegions,
} from '@modules/orders/services/graphql';
// import { getLocalStorage } from '@helpers/localstorage';

const Core = (props) => {
    const {
        // country = '',
        province = null,
        // city = null,
        // postalCode = '',
        // maps = '',
        showModal,
        t,
        onSubmitAddress,
        dataAddress,
        // loading = false,
        // success = false,
        addressId = null,
        setShowModal,
        // latitude,
        // longitude,
        pageTitle,
        Content,
    } = props;
    let { storeConfig } = props;

    const initialAddress = {
        name: dataAddress && dataAddress.name,
        phone: dataAddress && dataAddress.phone,
        mobile: dataAddress && dataAddress.mobile,
        street: dataAddress && dataAddress.street,
        address2: dataAddress && dataAddress.address2,
        postalCode: dataAddress && dataAddress.postalCode,
        district: dataAddress && dataAddress.district,
        email: dataAddress && dataAddress.email,
        country: dataAddress && dataAddress.country,
    };
    if (!storeConfig && typeof window !== 'undefined') {
        storeConfig = helperCookies.get(storeConfigNameCookie);
    }
    // const pwaConfig = getLocalStorage('pwa_config');
    // const gmapKey = pwaConfig && pwaConfig.icube_pinlocation_gmap_key ? pwaConfig.icube_pinlocation_gmap_key : null;
    // const geocodingKey = pwaConfig && pwaConfig.icube_pinlocation_geocoding_key ? pwaConfig.icube_pinlocation_geocoding_key : null;
    // const { pin_location_latitude, pin_location_longitude } = pwaConfig ?? {};

    const [getAllCountries, responCountries] = getCountries();
    const [getRegion, responRegion] = getRegions();

    const [addressState, setAddressState] = useState({
        countries: null,
        allCity: [],
        dropdown: {
            countries: null,
            province: null,
            // city: null,
            // district: null,
            // village: null,
            // city: [
            //     {
            //         label: 'Jakarta Barat', value: 'Jakarta Barat',
            //     },
            //     {
            //         label: 'DI Jakarta', value: 'Jakarta Pusat',
            //     },
            // ],
            // district: [
            //     {
            //         label: 'Cengkareng', value: 'Cengkareng',
            //     },
            // ],
            // subDistrict: [
            //     {
            //         label: 'Kapuk', value: 'Kapuk',
            //     },
            // ],
        },
    });

    // const [enableSplitCity, setEnableSplitCity] = React.useState(country === 'ID' && modules.customer.plugin.address.splitCity);
    // const [enableSplitCity, setEnableSplitCity] = React.useState(countryCode === 'ID');

    // const getCityByLabel = (label, dataCity = null) => {
    //     const data = dataCity || addressState.dropdown.city;
    //     if (!data || data.length === 0) return null;
    //     return data.find((item) => item.label === label) ? data.find((item) => item.label === label) : null;
    // };

    // const splitCityValue = (cityValue) => cityValue.split(', ');

    // const [mapPosition, setMapPosition] = useState({
    //     lat: parseFloat(latitude) || parseFloat(pin_location_latitude),
    //     lng: parseFloat(longitude) || parseFloat(pin_location_longitude),
    // });

    // const displayLocationInfo = (position) => {
    //     const lng = position.coords.longitude;
    //     const lat = position.coords.latitude;

    //     setMapPosition({
    //         lat,
    //         lng,
    //     });
    // };

    // const displayLocationFallback = () => {
    //     // A callback that triggers when user deny map permissions.
    //     setMapPosition({
    //         lat: parseFloat(pin_location_latitude),
    //         lng: parseFloat(pin_location_longitude),
    //     });
    // };

    // const handleDragPosition = (value) => {
    //     setMapPosition(value);
    // };

    const ValidationAddress = {
        name: Yup.string().required(t('validate:firstName:required')),
        email: Yup.string().required(t('validate:email:required')),
        phone: Yup.string().required(t('validate:telephone:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        mobile: Yup.string().required(t('validate:telephone:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        street: Yup.string().required(t('validate:street:required')),
        // address2: Yup.string().required(t('validate:street:required')),
        postalCode: Yup.string().required(t('validate:postal:required')).min(3, t('validate:postal:wrong')).max(20, t('validate:postal:wrong')),
        country: Yup.string().nullable().required(t('validate:country:required')),
        province: Yup.string().nullable().required(t('validate:state:required')),
        city: Yup.string().nullable().required(t('validate:city:required')),
        district: Yup.string().nullable().required(t('validate:district:required')),
        subDistrict: Yup.string().nullable().required(t('validate:city:required')),
        // confirmPinPoint: Yup.bool().oneOf([true], t('validate:confirmPinPoint:required')),
    };

    const InitialValue = {
        name: initialAddress.name || '',
        phone: initialAddress.phone || '',
        mobile: initialAddress.mobile || '',
        street: initialAddress.street || '',
        address2: initialAddress.address2 || '',
        email: initialAddress.email || '',
        country: initialAddress.country || '',
        province: '',
        city: '',
        district: '',
        subDistrict: '',
        postalCode: initialAddress.postalCode || '',
        // maps: maps || '',
        // regionCode: '',
        // regionId: '',
        // confirmPinPoint: !gmapKey,
    };

    // add initial value if split city enabled
    // if (enableSplitCity) {
    //     ValidationAddress.district = Yup.string().nullable().required('Kecamatan');
    //     ValidationAddress.village = Yup.string()
    //         .nullable()
    //         .test('check-village', 'Kelurahan', (value) => {
    //             if (addressState.dropdown.village && addressState.dropdown.village.length > 0 && !value) return false;
    //             return true;
    //         });

    //     InitialValue.district = '';
    //     InitialValue.village = '';
    // }

    const AddressSchema = Yup.object().shape(ValidationAddress);

    const formik = useFormik({
        initialValues: InitialValue,
        validationSchema: AddressSchema,
        onSubmit: async (values, { resetForm }) => {
            const data = {
                ...values,
                // city: values.city.value,
                // province: values.province,
                // countryCode: values.country.id,
                // region: values.region && values.region.code ? values.region.code : values.region,
                // regionCode: values.region && values.region.code ? values.region.code : null,
                // regionId: values.region && values.region.code ? values.region.region_id : null,
                // addressId,
                // latitude: String(mapPosition.lat),
                // longitude: String(mapPosition.lng),
            };
            // const defaultCity = values.city && values.city.label ? values.city.label : values.city;
            // if (enableSplitCity) {
            //     if (values.village) {
            //         data.city = values.village.city ? values.village.city : defaultCity;
            //     } else if (values.district) {
            //         data.city = values.district.city ? values.district.city : defaultCity;
            //     } else {
            //         data.city = defaultCity;
            //     }
            // } else {
            //     data.city = defaultCity;
            // }

            // const type = addressId ? 'update' : 'add';

            // remove split values
            // delete data.district;
            // delete data.village;
            if (onSubmitAddress) {
                onSubmitAddress(data);
                if (!addressId) {
                    setTimeout(() => {
                        resetForm();
                    }, 1500);
                }
            }
        },
    });

    // togle enableSplitCity, set true when countryId === 'ID' & splitCity config === true
    // React.useEffect(() => {
    //     const countryId = formik.values.countryCode;
    //     // const countryId = formik.values.country && formik.values.country.id;
    //     // setEnableSplitCity(countryId === 'ID' && modules.customer.plugin.address.splitCity);
    //     setEnableSplitCity(countryId === 'ID');
    //     if (!formik.values.country) formik.setFieldValue('province', '');
    // }, [formik.values.country]);

    // const [getCities, responCities] = getCityByRegionId({});'
    // const responCities = [
    //     { label: 'Jakarta Barat', value: 'Jakarta Barat' },
    // ];
    // const getCities = () => responCities;

    // React.useMemo(() => {
    //     if (showModal) {
    //         formik.setFieldValue('name', initialAddress.name);
    //         formik.setFieldValue('street', initialAddress.street);
    //         formik.setFieldValue('phone', initialAddress.phone);
    //         formik.setFieldValue('mobile', initialAddress.mobile);
    //         formik.setFieldValue('postalCode', initialAddress.postalCode);

    //         formik.setFieldValue('country', initialAddress.country);
    //         formik.setFieldValue('province', province);
    //         formik.setFieldValue('city', city);

    //         if (initialAddress.country && countryCode) {
    //             getRegion({
    //                 variables: {
    //                     countryCode,
    //                 },
    //             });
    //         }

    //         // only set current location for add mode
    //         if (typeof window !== 'undefined' && navigator && navigator.geolocation && !addressId) {
    //             navigator.geolocation.getCurrentPosition(displayLocationInfo, displayLocationFallback);
    //         }

    //         // update map position after edit data
    //         if (showModal && latitude && longitude) {
    //             setMapPosition({
    //                 lat: latitude,
    //                 lng: longitude,
    //             });
    //         }

    //         if (
    //             province
    //             && typeof province === 'string'
    //             && addressState.dropdown.province
    //             && addressState.dropdown.province.length
    //             && addressState.dropdown.province.length > 0
    //         ) {
    //             const selectProvince = addressState.dropdown.province.filter((item) => item.name === province);
    //             if (selectProvince && selectProvince.length > 0) formik.setFieldValue('province', selectProvince[0]);
    //         }
    //     }
    // }, [showModal]);

    useEffect(() => {
        if (responRegion.data
          && responRegion.data.getProvinceByCountry
          && responRegion.data.getProvinceByCountry
          && responRegion.data.getProvinceByCountry.length > 0) {
            const state = { ...addressState };
            if (province && typeof province === 'string') {
                const selectRegion = responRegion.data.getProvinceByCountry.filter((item) => item.name === province);
                if (selectRegion && selectRegion.length > 0) formik.setFieldValue('province', selectRegion[0]);
            }
            state.dropdown.province = responRegion.data.getProvinceByCountry;
            setAddressState(state);
        }
    }, [responRegion]);

    // useEffect(() => {
    //     if (formik.values.province) {
    //         if (formik.values.province.region_id) {
    //             if (addressState.dropdown.city && addressState.dropdown.city.length && addressState.dropdown.city.length > 0) {
    //                 const defaultValue = splitCityValue(city);
    //                 const valueCity = getCityByLabel(defaultValue[0], addressState.dropdown.city);
    //                 if (!valueCity) {
    //                     getCities({ variables: { regionId: formik.values.region.region_id } });
    //                 } else {
    //                     formik.setFieldValue('city', valueCity);
    //                 }
    //                 formik.setFieldValue('district', '');
    //                 formik.setFieldValue('village', '');
    //                 // formik.setFieldValue('postcode', '');
    //             } else {
    //                 getCities({ variables: { regionId: formik.values.province.region_id } });
    //             }

    //             if (enableSplitCity) {
    //                 const state = { ...addressState };
    //                 state.dropdown.district = null;
    //                 state.dropdown.subDistrict = null;
    //                 setAddressState(state);
    //             }
    //         } else if (formik.values.province === province) {
    //             formik.setFieldValue('city', city);
    //         }
    //     } else if (!formik.values.province) {
    //         formik.setFieldValue('city', '');
    //     }
    // }, [formik.values.province]);

    // set city and grouping
    // useEffect(() => {
    //     if (responCities && responCities.data && !responCities.loading && !responCities.error && responCities.data.getCityByRegionId) {
    //         const state = { ...addressState };
    //         const { data } = responCities;
    //         if (data.getCityByRegionId.item.length !== 0) {
    //             state.allCity = data.getCityByRegionId.item;
    //             if (enableSplitCity) {
    //                 state.dropdown.city = groupingCity(data.getCityByRegionId.item);
    //                 state.dropdown.district = null;
    //                 state.dropdown.village = null;
    //                 // get default value by split city
    //                 if (city) {
    //                     const defaultValue = splitCityValue(city);
    //                     formik.setFieldValue('city', getCityByLabel(defaultValue[0], state.dropdown.city));
    //                 }
    //             } else {
    //                 state.dropdown.city = data.getCityByRegionId.item.map((item) => ({ ...item, id: item.id, label: item.city }));
    //                 formik.setFieldValue('city', getCityByLabel(city, state.dropdown.city));
    //             }

    //             setAddressState(state);
    //         } else if (enableSplitCity && city) {
    //             state.dropdown.city = data.getCityByRegionId.item.map((item) => ({ ...item, id: item.id, label: item.city }));
    //             formik.setFieldValue('city', getCityByLabel(city, state.dropdown.city));
    //         }
    //     }
    // }, [responCities]);

    // get kecamatan if city change
    // React.useMemo(() => {
    //     if (formik.values.city) {
    //         const state = { ...addressState };
    //         if (addressState.allCity && addressState.allCity.length && addressState.allCity.length > 0) {
    //             const district = groupingSubCity(formik.values.city.label, 'district', addressState.allCity);
    //             state.dropdown.district = district;
    //             setAddressState(state);
    //             let districtValue = '';
    //             if (city) {
    //                 const defaultValue = splitCityValue(city);
    //                 districtValue = getCityByLabel(defaultValue[1], district);
    //             }

    //             formik.setFieldValue('district', districtValue);
    //             formik.setFieldValue('subDistrict', '');
    //             // formik.setFieldValue('postcode', '');
    //         } else if (
    //             enableSplitCity
    //             // && responCities
    //             // && responCities.data
    //             // && !responCities.loading
    //             // && !responCities.error
    //             // && responCities.data.getCityByRegionId
    //         ) {
    //             // const { data } = responCities;
    //             // const district = data && data.getCityByRegionId
    //             //     ? groupingSubCity(formik.values.city.label, 'district', data.getCityByRegionId.item) : null;
    //             // state.dropdown.district = district;
    //             // state.dropdown.village = null;
    //             // if (city && !formik.values.district) {
    //             //     const defaultValue = splitCityValue(city);
    //             //     const districtValue = getCityByLabel(defaultValue[1], state.dropdown.district);
    //             //     if (districtValue) formik.setFieldValue('district', districtValue);
    //             // } else {
    //             //     // reset village and district if change city
    //             //     formik.setFieldValue('district', '');
    //             // }

    //             formik.setFieldValue('subDistrict', '');
    //             // formik.setFieldValue('postcode', '');
    //             // setAddressState(state);
    //         } else {
    //             // formik.setFieldValue('postcode', formik.values.city.postcode || postcode);
    //         }
    //     }
    // }, [formik.values.city]);

    // get kelurahan if kecamatan change
    // React.useMemo(() => {
    //     const state = { ...addressState };
    //     if (addressState.allCity && addressState.allCity.length && addressState.allCity.length > 0) {
    //         if (formik.values.district && formik.values.district.label) {
    //             const subDistrict = groupingSubCity(formik.values.district.label, 'subDistrict', addressState.allCity, formik.values.city);
    //             state.dropdown.subDistrict = subDistrict;
    //         }
    //         let villageValue = '';
    //         if (city) {
    //             const defaultValue = splitCityValue(city);
    //             villageValue = getCityByLabel(defaultValue[2], state.dropdown.subDistrict);
    //         }
    //         formik.setFieldValue('subDistrict', villageValue);
    //         if (villageValue && villageValue !== '') {
    //             formik.setFieldValue('postcode', '');
    //         } else if (formik.values.district) {
    //             formik.setFieldValue('postcode', formik.values.postcode || postcode);
    //         }
    //     } else if (
    //         formik.values.district
    //         && enableSplitCity
    //         && responCities
    //         && responCities.data
    //         && !responCities.loading
    //         && !responCities.error
    //         && responCities.data.getCityByRegionId
    //     ) {
    //         const { data } = responCities;
    //         const subDistrict = groupingSubCity(formik.values.district.label, 'subDistrict', data.getCityByRegionId.item, formik.values.city);
    //         state.dropdown.village = subDistrict;
    //         if (city && !formik.values.subDistrict && enableSplitCity) {
    //             const defaultValue = splitCityValue(city);
    //             const villageValue = getCityByLabel(defaultValue[2], state.dropdown.subDistrict);
    //             if (villageValue) {
    //                 formik.setFieldValue('subDistrict', villageValue);
    //             }
    //             formik.setFieldValue('postcode', formik.values.district.postcode || postcode);
    //         } else {
    //             // reset village if district change
    //             formik.setFieldValue('subDistrict', '');
    //             formik.setFieldValue('postcode', '');
    //         }
    //         setAddressState(state);
    //     }
    // }, [formik.values.district]);

    // clear child location value when clear parent location
    // example: clear country => clear region
    // React.useEffect(() => {
    //     if (!formik.values.city) formik.setFieldValue('district', '');
    // }, [formik.values.city]);

    // React.useEffect(() => {
    //     if (!formik.values.district) formik.setFieldValue('subDistrict', '');
    // }, [formik.values.district]);

    // React.useEffect(() => {
    //     if (city !== null) {
    //         const state = { ...addressState };
    //         if (formik.values.subDistrict && enableSplitCity) {
    //             const defaultValue = splitCityValue(city);
    //             const villageValue = getCityByLabel(defaultValue[2], state.dropdown.subDistrict);
    //             if (formik.values.subDistrict !== villageValue) {
    //                 formik.setFieldValue('postalCode', formik.values.subDistrict.postalCode);
    //             } else {
    //                 formik.setFieldValue('postalCode', initialAddress.postalCode);
    //             }
    //         }
    //     } else if (formik.values.subDistrict && enableSplitCity) {
    //         formik.setFieldValue('postalCode', formik.values.village.postalCode);
    //     }
    // }, [formik.values.village]);

    return (
        <Content
            t={t}
            showModal={showModal}
            setShowModal={setShowModal}
            pageTitle={pageTitle}
            formik={formik}
            addressState={addressState}
            // getCities={getCities}
            // responCities={responCities}
            setAddressState={setAddressState}
            // mapPosition={mapPosition}
            // handleDragPosition={handleDragPosition}
            // loading={loading}
            // success={success}
            // gmapKey={gmapKey}
            // geocodingKey={geocodingKey}
            // enableSplitCity={enableSplitCity}
            getCountries={getAllCountries}
            responCountries={responCountries}
            getRegion={getRegion}
            responRegion={responRegion}
        />
    );
};

export default Core;
