/* eslint-disable no-param-reassign */
import React from 'react';
import clsx from 'clsx';

import DropFile from '@sellermodules/storesetting/pages/default/components/DropFile';
import Card from '@sellermodules/storesetting/pages/default/components/Card';

import TextField from '@common_textfield';
import Switch from '@common_switch';
import Autocomplete from '@common_autocomplete';
import IcubeMapsAutocomplete from '@common_googlemaps_autocomplete';
import Button from '@common_button';
import PhoneInput from '@common_phoneinput';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

import { breakPointsUp } from '@helper_theme';
import useStyles from '@sellermodules/storesetting/pages/default/components/style';

const StoreSettingContent = (props) => {
    const {
        t, formik, getCountry, getCountryRes, getCountries, getCountriesRes, shipmentGroup,
        getCityKecByRegionCode, getCityKecByRegionCodeRes, handleDropFile, gmapKey,
        enableMap, mapPosition, handleDragPosition, setDialCode,
    } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    const countryOptions = (getCountriesRes && getCountriesRes.data && getCountriesRes.data.countries) || [];
    const regionOptions = (getCountryRes && getCountryRes.data && getCountryRes.data.country && getCountryRes.data.country.available_regions) || [];
    const cityOptions = (getCityKecByRegionCodeRes && getCityKecByRegionCodeRes.data && getCityKecByRegionCodeRes.data.getCityKecByRegionCode) || [];

    return (
        <div style={{ paddingBottom: 10 }}>
            <Paper className={classes.container}>
                <Grid container spacing={isDesktop ? 6 : 0}>
                    <Grid item xs={12} sm={6}>
                        <h2 className={classes.title}>{t('storesetting:Store_Information')}</h2>
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <InputLabel htmlFor="name" className={[classes.label, classes.required]}>
                                {t('storesetting:Store_Name')}
                            </InputLabel>
                            <TextField
                                id="name"
                                name="name"
                                className={classes.textInput}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.name && formik.errors.name)}
                                helperText={(formik.touched.name && formik.errors.name) || ''}
                            />
                        </div>
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <InputLabel htmlFor="description" className={classes.label}>
                                {t('storesetting:Store_Description')}
                            </InputLabel>
                            <TextField
                                id="description"
                                name="description"
                                className={classes.textInput}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.description && formik.errors.description)}
                                helperText={(formik.touched.description && formik.errors.description) || ''}
                                multiline
                                rows={4}
                            />
                        </div>
                        <div className={classes.helper}>
                            {t('storesetting:This_information_is_only_for_the_purposes_of_the_')}
                            <span className={classes.colored}>{t('storesetting:Store_Page')}</span>
                            <br />
                            {`(${t('storesetting:Monday')} 08.00 - 17.00 - ${t('storesetting:Friday')} 08.00 - 17.00)`}
                        </div>
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <InputLabel htmlFor="is_active" className={classes.label}>
                                {t('storesetting:Store_Status')}
                            </InputLabel>
                            <Switch
                                id="is_active"
                                name="is_active"
                                value={formik.values.is_active}
                                onChange={formik.handleChange}
                                trueLabel={t('storesetting:Activate')}
                                falseLabel={t('storesetting:Deactivate')}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <h2 className={classes.title}>{t('storesetting:Store_Logo')}</h2>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                <div
                                    className={classes.imgBack}
                                    style={{
                                        backgroundImage: `url(${formik.values.logo || '/assets/img/placeholder_image.jpg'})`,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <div className={classes.helper}>
                                    {t('storesetting:Minimum_photo_size')}
                                    {' '}
                                    <span className={classes.colored}>500 x 500px</span>
                                    {' '}
                                    {t('storesetting:with_format')}
                                    {' '}
                                    <span className={classes.colored}>JPG, JPEG,</span>
                                    {' '}
                                    {t('storesetting:and')}
                                    {' '}
                                    <span className={classes.colored}>PNG.</span>
                                    {' '}
                                    {t('storesetting:File_size')}
                                    {' '}
                                    <span className={classes.colored}>{`${t('storesetting:Maximum')} 10,000,000 bytes `}</span>
                                    (10 Megabytes).
                                </div>
                                <DropFile
                                    getBase64={handleDropFile}
                                    {...props}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <div style={{ height: 20 }} />
            <Paper className={classes.container}>
                <h2 className={classes.title}>{t('storesetting:Store_Details')}</h2>
                <Grid container>
                    <Grid item container spacing={isDesktop ? 6 : 0}>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="street" className={[classes.label, classes.required]}>
                                    {t('storesetting:Store_Address')}
                                </InputLabel>
                                <TextField
                                    id="street"
                                    name="street"
                                    className={classes.textInput}
                                    value={formik.values.street}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.street && formik.errors.street)}
                                    helperText={(formik.touched.street && formik.errors.street) || ''}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="country_id" className={[classes.label, classes.required]}>
                                    {t('registervendor:Country')}
                                </InputLabel>
                                <Autocomplete
                                    id="country_id"
                                    name="country_id"
                                    mode="lazy"
                                    getOptions={getCountries}
                                    value={formik.values.country_id}
                                    onChange={(e) => {
                                        formik.setFieldValue('country_id', e);
                                        formik.setFieldValue('region', '');
                                        formik.setFieldValue('city', '');
                                        formik.setFieldValue('address', '');
                                    }}
                                    options={countryOptions}
                                    loading={getCountriesRes.loading}
                                    primaryKey="id"
                                    labelKey="full_name_english"
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            value={formik.values.country_id}
                                            className={classes.textInput}
                                            error={!!(formik.touched.country_id && formik.errors.country_id)}
                                            helperText={(formik.touched.country_id && formik.errors.country_id) || ''}
                                        />
                                    )}
                                    disableClearable
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={isDesktop ? 6 : 0}>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="region" className={[classes.label, classes.required]}>
                                    {t('registerseller:Province')}
                                </InputLabel>
                                <Autocomplete
                                    disabled={!formik.values.country_id}
                                    id="region"
                                    name="region"
                                    mode="lazy"
                                    getOptions={getCountry}
                                    getOptionsVariables={{ variables: { id: formik.values.country_id?.id } }}
                                    value={formik.values.region}
                                    onChange={(e) => {
                                        formik.setFieldValue('region', e);
                                        formik.setFieldValue('city', '');
                                        formik.setFieldValue('address', '');
                                    }}
                                    options={regionOptions}
                                    loading={getCountryRes.loading}
                                    primaryKey="id"
                                    labelKey="name"
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            value={formik.values.region}
                                            className={classes.textInput}
                                            error={!!(formik.touched.region && formik.errors.region)}
                                            helperText={(formik.touched.region && formik.errors.region) || ''}
                                        />
                                    )}
                                    disableClearable
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="city" className={[classes.label, classes.required]}>
                                    {t('registerseller:City')}
                                </InputLabel>
                                <Autocomplete
                                    disabled={!formik.values.region}
                                    id="city"
                                    name="city"
                                    mode="lazy"
                                    getOptions={getCityKecByRegionCode}
                                    getOptionsVariables={{ variables: { region_code: formik.values.region?.code } }}
                                    value={formik.values.city}
                                    onChange={(e) => {
                                        formik.setFieldValue('city', e);
                                        formik.setFieldValue('address', '');
                                    }}
                                    options={cityOptions}
                                    loading={getCityKecByRegionCodeRes.loading}
                                    primaryKey="value"
                                    labelKey="label"
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            value={formik.values.city}
                                            className={classes.textInput}
                                            error={!!(formik.touched.city && formik.errors.city)}
                                            helperText={(formik.touched.city && formik.errors.city) || ''}
                                        />
                                    )}
                                    disableClearable
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={isDesktop ? 6 : 0}>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="postcode" className={[classes.label, classes.required]}>
                                    {t('registerseller:Zip_Code')}
                                </InputLabel>
                                <TextField
                                    id="postcode"
                                    name="postcode"
                                    value={formik.values.postcode}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    error={!!(formik.touched.postcode && formik.errors.postcode)}
                                    helperText={(formik.touched.postcode && formik.errors.postcode) || ''}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="telephone" className={[classes.label, classes.required]}>
                                    {t('registerseller:Phone')}
                                </InputLabel>
                                <PhoneInput
                                    name="telephone"
                                    value={formik.values.telephone}
                                    onChange={(e, c) => {
                                        formik.setFieldValue('telephone', e);
                                        setDialCode(c.dialCode);
                                    }}
                                    error={!!(formik.touched.telephone && formik.errors.telephone)}
                                    helperText={(formik.touched.telephone && formik.errors.telephone) || ''}
                                    containerClass={classes.fieldPhoneContainer}
                                    rootClasses={classes.fieldPhoneRoot}
                                    variant="standard"
                                    onBlur={() => formik.setFieldTouched('telephone', true)}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                {gmapKey && enableMap ? (
                    <div className={clsx('col-xs-12 col-sm-12', classes.formField)} name="address">
                        <InputLabel htmlFor="city" className={[classes.label]} style={{ paddingTop: 10 }}>
                            {t('registerseller:Pinpoint_your_Location')}
                        </InputLabel>
                        <div>
                            <IcubeMapsAutocomplete
                                gmapKey={gmapKey}
                                formik={formik}
                                formikName="address"
                                mapPosition={mapPosition}
                                dragMarkerDone={handleDragPosition}
                                placeholder={t('registerseller:Write_the_name_of_the_street__building__housing')}
                                InputProps={{
                                    startAdornment: (
                                        <img src="/assets/img/search.svg" alt="search" style={{ marginRight: 10 }} />
                                    ),
                                }}
                                className={classes.textInput}
                                style={{ marginBottom: 10 }}
                                mapStyle={{ height: 300 }}
                            />
                        </div>
                    </div>
                )
                    : (
                        <Grid item container spacing={isDesktop ? 6 : 0}>
                            <Grid item xs={12} sm={6}>
                                <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                    <InputLabel htmlFor="longitude" className={[classes.label, classes.required]}>
                                        {t('registerseller:Longitude')}
                                    </InputLabel>
                                    <TextField
                                        id="longitude"
                                        name="longitude"
                                        value={formik.values.longitude}
                                        onChange={formik.handleChange}
                                        className={classes.textInput}
                                        error={!!(formik.touched.longitude && formik.errors.longitude)}
                                        helperText={(formik.touched.longitude && formik.errors.longitude) || ''}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                    <InputLabel htmlFor="latitude" className={[classes.label, classes.required]}>
                                        {t('registerseller:Latitude')}
                                    </InputLabel>
                                    <TextField
                                        id="latitude"
                                        name="latitude"
                                        value={formik.values.latitude}
                                        onChange={formik.handleChange}
                                        className={classes.textInput}
                                        error={!!(formik.touched.latitude && formik.errors.latitude)}
                                        helperText={(formik.touched.latitude && formik.errors.latitude) || ''}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    )}
            </Paper>
            <div style={{ height: 20 }} />
            <Paper className={classes.container}>
                <h2 className={classes.title}>{t('storesetting:Shipping_Information')}</h2>
                <Grid container spacing={3}>
                    {shipmentGroup?.map((shipment) => (
                        <Grid item xs={12} sm={6} md={4} lg={shipmentGroup?.length < 4 ? 4 : 3}>
                            <Card {...shipment} {...props} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
            <Grid container className={classes.btnContainer}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button
                        variant="contained"
                        className={classes.btnSave}
                        onClick={formik.handleSubmit}
                    >
                        <span className={classes.btnText}>
                            {t('registerseller:Save')}
                        </span>
                    </Button>
                </Grid>
            </Grid>

        </div>
    );
};

export default StoreSettingContent;
