/* eslint-disable max-len */
import Dialog from '@material-ui/core/Dialog';
import Button from '@common_button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomTextField from '@common_textfield';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CustomAutocomplete from '@common_autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '@modules/orders/plugins/AddressFormDialog/components/style';

const AddressView = (props) => {
    const {
        showModal,
        setShowModal,
        formik,
        addressState,
        setAddressState,
        // enableSplitCity,
        getCountries,
        responCountries,
        getRegion,
        // responRegion,
        // responCities,
        // getCities,
    } = props;
    const classes = useStyles();

    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const handleCloseBtn = () => {
        setShowModal(false);
    };

    const getCountriesRender = () => (
        <div className={classes.boxField}>
            <CustomAutocomplete
                id="country"
                variant="standard"
                enableCustom={false}
                mode="lazy"
                value={formik.values.country}
                onChange={async (e) => {
                    formik.setFieldValue('country', e);
                    formik.setFieldValue('province', '');
                    formik.setFieldValue('city', '');
                    formik.setFieldValue('district', '');
                    formik.setFieldValue('subDistrict', '');
                    formik.setFieldValue('postalCode', '');
                    if (e && e.code) {
                        const state = { ...addressState };
                        state.dropdown.province = null;
                        state.dropdown.city = null;
                        await setAddressState(state);
                        getRegion({
                            variables: {
                                countryCode: e.code,
                            },
                        });
                    }
                }}
                loading={responCountries.loading}
                options={responCountries && responCountries.data && responCountries.data.getCountryList}
                getOptions={getCountries}
                name="country"
                label="Country"
                primaryKey="code"
                labelKey="name"
            />
        </div>
    );

    // regions is state/province
    const getRegionRender = () => {
        if (addressState.dropdown.province && addressState.dropdown.province.length > 0 && showModal) {
            return (
                <Autocomplete
                    disabled={!formik.values.country}
                    options={addressState.dropdown.province}
                    getOptionLabel={(option) => (option.name ? option.name : '')}
                    id="controlled-region"
                    value={!formik.values.province ? null : formik.values.province}
                    onChange={async (event, newValue) => {
                        formik.setFieldValue('province', newValue);
                        formik.setFieldValue('city', '');
                        formik.setFieldValue('district', '');
                        formik.setFieldValue('village', '');
                        formik.setFieldValue('postalCode', '');
                        if (newValue && newValue.region_id) {
                            const state = { ...addressState };
                            state.dropdown.city = null;
                            await setAddressState(state);
                            // getCities({
                            //     variables: { regionId: newValue.region_id },
                            // });
                            // getCities();
                        }
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                    autoCorrect: 'off',
                                    autoCapitalize: 'none',
                                    spellCheck: 'false',
                                }}
                                name={`state_${new Date().getTime()}`}
                                label="Province"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onKeyDown={(event) => {
                                    if (event.key !== 'Enter' && event.key !== 'Tab') {
                                        const state = {
                                            ...addressState,
                                        };
                                        state.dropdown.city = null;
                                        setAddressState(state);
                                        formik.setFieldValue('city', null);
                                    }
                                }}
                                error={!!(formik.touched.province && formik.errors.province)}
                            />
                            <Typography variant="p" color={formik.touched.province && formik.errors.province ? 'red' : 'default'}>
                                {formik.touched.province && formik.errors.province}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return (
            <CustomTextField
                disabled={!formik.values.country}
                // loading={responRegion.loading}
                autoComplete="new-password"
                label="State/Province"
                name="region"
                value={formik.values.province || ''}
                onChange={(e) => {
                    formik.setFieldValue('province', e.target.value);
                    formik.setFieldValue('city', '');
                    formik.setFieldValue('district', '');
                    formik.setFieldValue('village', '');
                    formik.setFieldValue('postalCode', '');
                }}
                onFocus={() => {
                    if (formik.values.country && formik.values.countryCode) {
                        getRegion({
                            variables: {
                                countryCode: formik.values.countryCode,
                            },
                        });
                    }
                }}
                error={!!(formik.touched.province && formik.errors.province)}
                errorMessage={(formik.touched.province && formik.errors.province) || null}
            />
        );
    };

    // city or kabupaten
    // const getCityRender = () => {
    //     if (addressState.dropdown.city && addressState.dropdown.city.length && addressState.dropdown.city.length > 0 && showModal) {
    //         return (
    //             <Autocomplete
    //                 disabled={!formik.values.province}
    //                 options={addressState.dropdown.city}
    //                 getOptionLabel={(option) => option.label}
    //                 id="controlled-city"
    //                 value={!formik.values.city ? null : formik.values.city}
    //                 onChange={(event, newValue) => {
    //                     formik.setFieldValue('city', newValue);
    //                     formik.setFieldValue('district', '');
    //                     formik.setFieldValue('subDistrict', '');
    //                     formik.setFieldValue('postalCode', '');
    //                 }}
    //                 renderInput={(params) => (
    //                     <div
    //                         style={{
    //                             marginTop: '10px',
    //                             marginBottom: '20px',
    //                         }}
    //                     >
    //                         <TextField
    //                             {...params}
    //                             inputProps={{
    //                                 ...params.inputProps,
    //                                 autoComplete: 'new-password',
    //                                 autoCorrect: 'off',
    //                                 autoCapitalize: 'none',
    //                                 spellCheck: 'false',
    //                             }}
    //                             name={`city_${new Date().getTime()}`}
    //                             label="City"
    //                             InputLabelProps={{
    //                                 shrink: true,
    //                             }}
    //                             error={!!(formik.touched.city && formik.errors.city)}
    //                         />
    //                         <Typography variant="p" color={formik.touched.city && formik.errors.city ? 'red' : 'default'}>
    //                             {formik.touched.city && formik.errors.city}
    //                         </Typography>
    //                     </div>
    //                 )}
    //             />
    //         );
    //     }

    //     return (
    //         <CustomTextField
    //             disabled={!formik.values.province}
    //             // loading={responCities.loading}
    //             autoComplete="new-password"
    //             label="City"
    //             name="city"
    //             value={formik.values.city || ''}
    //             onChange={(e) => {
    //                 formik.setFieldValue('city', e.target.value);
    //                 formik.setFieldValue('district', '');
    //                 formik.setFieldValue('village', '');
    //                 formik.setFieldValue('postalCode', '');
    //             }}
    //             error={!!(formik.touched.city && formik.errors.city)}
    //             errorMessage={(formik.touched.city && formik.errors.city) || null}
    //         />
    //     );
    // };
    // district / kecamatan
    // const getDistrictRender = () => {
    //     if (addressState.dropdown.district && addressState.dropdown.district.length && addressState.dropdown.district.length > 0 && showModal) {
    //         return (
    //             <Autocomplete
    //                 disabled={!formik.values.city}
    //                 options={addressState.dropdown.district}
    //                 getOptionLabel={(option) => (option.label ? option.label : '')}
    //                 id="controlled-district"
    //                 value={!formik.values.district ? null : formik.values.district}
    //                 onChange={(event, newValue) => {
    //                     formik.setFieldValue('district', newValue);
    //                     formik.setFieldValue('subDistrict', '');
    //                     formik.setFieldValue('postalCode', '');
    //                 }}
    //                 renderInput={(params) => (
    //                     <div
    //                         style={{
    //                             marginTop: '10px',
    //                             marginBottom: '20px',
    //                         }}
    //                     >
    //                         <TextField
    //                             {...params}
    //                             inputProps={{
    //                                 ...params.inputProps,
    //                                 autoCorrect: 'off',
    //                                 autoCapitalize: 'none',
    //                                 spellCheck: 'false',
    //                             }}
    //                             name={`district_${new Date().getTime()}`}
    //                             label="Kecamatan"
    //                             InputLabelProps={{
    //                                 shrink: true,
    //                             }}
    //                             error={!!(formik.touched.district && formik.errors.district)}
    //                         />
    //                         <Typography variant="p" color={formik.touched.district && formik.errors.district ? 'red' : 'default'}>
    //                             {formik.touched.district && formik.errors.district}
    //                         </Typography>
    //                     </div>
    //                 )}
    //             />
    //         );
    //     }

    //     return (
    //         <CustomTextField
    //             disabled={!formik.values.city}
    //             // loading={responCities.loading}
    //             autoComplete="new-password"
    //             label="Kecamatan"
    //             name="district"
    //             value={formik.values.district ? formik.values.district.label : ''}
    //             onChange={(e) => {
    //                 formik.setFieldValue('district', e.target.value);
    //                 formik.setFieldValue('subDistrict', '');
    //                 formik.setFieldValue('postalCode', '');
    //             }}
    //             error={!!(formik.touched.district && formik.errors.district)}
    //             errorMessage={(formik.touched.district && formik.errors.district) || null}
    //         />
    //     );
    // };
    // const getVillageRender = () => {
    //     if (addressState.dropdown.subDistrict && addressState.dropdown.subDistrict.length && addressState.dropdown.subDistrict.length > 0 && showModal) {
    //         return (
    //             <Autocomplete
    //                 disabled={!formik.values.district}
    //                 options={addressState.dropdown.subDistrict}
    //                 getOptionLabel={(option) => (option.label ? option.label : '')}
    //                 id="controlled-village"
    //                 value={!formik.values.subDistrict ? null : formik.values.subDistrict}
    //                 onChange={(event, newValue) => {
    //                     formik.setFieldValue('subDistrict', newValue);
    //                     formik.setFieldValue('postalCode', '');
    //                 }}
    //                 renderInput={(params) => (
    //                     <div
    //                         style={{
    //                             marginTop: '10px',
    //                             marginBottom: '20px',
    //                         }}
    //                     >
    //                         <TextField
    //                             {...params}
    //                             inputProps={{
    //                                 ...params.inputProps,
    //                                 autoCorrect: 'off',
    //                                 autoCapitalize: 'none',
    //                                 spellCheck: 'false',
    //                             }}
    //                             name={`village_${new Date().getTime()}`}
    //                             label="Kelurahan"
    //                             InputLabelProps={{
    //                                 shrink: true,
    //                             }}
    //                             error={!!(formik.touched.subDistrict && formik.errors.subDistrict)}
    //                         />
    //                         <Typography variant="p" color={formik.touched.subDistrict && formik.errors.subDistrict ? 'red' : 'default'}>
    //                             {formik.touched.subDistrict && formik.errors.subDistrict}
    //                         </Typography>
    //                     </div>
    //                 )}
    //             />
    //         );
    //     }

    //     return null;
    // };

    return (
        <Dialog open={showModal} className={[classes.address_drawer].join(' ')} maxWidth="sm" fullWidth={!!isDesktop} fullScreen={!isDesktop}>
            <div className={classes.container} id="formAddress">
                <div className={classes.headerForm}>
                    <div className={classes.closeBtn}>
                        <CloseIcon onClick={handleCloseBtn} />
                    </div>
                    <h1>Edit Shipping Address</h1>
                </div>
                <div className={[classes.address_form].join(' ')}>
                    <form onSubmit={formik.handleSubmit} autoComplete="new-password">
                        <CustomTextField
                            autoComplete="new-password"
                            label="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            errorMessage={(formik.touched.name && formik.errors.name) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label="Phone number"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.phone && formik.errors.phone)}
                            errorMessage={(formik.touched.phone && formik.errors.phone) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label="Mobile phone number"
                            name="mobile"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.mobile && formik.errors.mobile)}
                            errorMessage={(formik.touched.mobile && formik.errors.mobile) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.email && formik.errors.email)}
                            errorMessage={(formik.touched.email && formik.errors.email) || null}
                        />
                        {getCountriesRender()}
                        {getRegionRender()}
                        {/* {getCityRender()} */}
                        <CustomTextField
                            autoComplete="new-password"
                            label="City"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.city && formik.errors.city)}
                            errorMessage={(formik.touched.city && formik.errors.city) || null}
                        />
                        {/* {enableSplitCity ? getDistrictRender() : null} */}
                        <CustomTextField
                            autoComplete="new-password"
                            label="District"
                            name="district"
                            value={formik.values.district}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.district && formik.errors.district)}
                            errorMessage={(formik.touched.district && formik.errors.district) || null}
                        />
                        {/* {enableSplitCity ? getVillageRender() : null} */}
                        <CustomTextField
                            autoComplete="new-password"
                            label="Sub District"
                            name="subDistrict"
                            value={formik.values.subDistrict}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.subDistrict && formik.errors.subDistrict)}
                            errorMessage={(formik.touched.subDistrict && formik.errors.subDistrict) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label="Postal Code"
                            name="postalCode"
                            value={formik.values.postalCode}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.postalCode && formik.errors.postalCode)}
                            errorMessage={(formik.touched.postalCode && formik.errors.postalCode) || null}
                            onFocus={(e) => { e.target.setAttribute('autocomplete', 'new-password'); e.target.setAttribute('autocorrect', 'false'); e.target.setAttribute('aria-autocomplete', 'both'); e.target.setAttribute('aria-haspopup', 'false'); e.target.setAttribute('spellcheck', 'off'); e.target.setAttribute('autocapitalize', 'off'); e.target.setAttribute('autofocus', ''); e.target.setAttribute('role', 'combobox'); }}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label="Street"
                            placeholder="Address Detail"
                            name="street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.street && formik.errors.street)}
                            errorMessage={(formik.touched.street && formik.errors.street) || null}
                            onFocus={(e) => {
                                e.target.setAttribute('autocomplete', 'off');
                                e.target.setAttribute('autocorrect', 'false');
                                e.target.setAttribute('aria-autocomplete', 'both');
                                e.target.setAttribute('aria-haspopup', 'false');
                                e.target.setAttribute('spellcheck', 'off');
                                e.target.setAttribute('autocapitalize', 'off');
                                e.target.setAttribute('autofocus', '');
                                e.target.setAttribute('role', 'combobox');
                            }}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label="Address 2 (Optional)"
                            placeholder="Address Detail (Optional)"
                            name="address2"
                            value={formik.values.address2}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.address2 && formik.errors.address2)}
                            errorMessage={(formik.touched.address2 && formik.errors.address2) || null}
                            onFocus={(e) => {
                                e.target.setAttribute('autocomplete', 'off');
                                e.target.setAttribute('autocorrect', 'false');
                                e.target.setAttribute('aria-autocomplete', 'both');
                                e.target.setAttribute('aria-haspopup', 'false');
                                e.target.setAttribute('spellcheck', 'off');
                                e.target.setAttribute('autocapitalize', 'off');
                                e.target.setAttribute('autofocus', '');
                                e.target.setAttribute('role', 'combobox');
                            }}
                        />
                        <div className={classes.wrapper}>
                            <Button
                                className={classes.addBtn}
                                type="submit"
                                disabled={!formik.values.city}
                                buttonType="primary"
                            >
                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                    Save
                                </Typography>
                            </Button>
                            <Button
                                buttonType="link"
                                className={classes.addBtn}
                                onClick={handleCloseBtn}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};

export default AddressView;
