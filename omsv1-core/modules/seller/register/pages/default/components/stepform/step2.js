/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import useStyles from '@sellermodules/register/pages/default/components/stepform/style';
import IcubeMapsAutocomplete from '@common_googlemaps_autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReCAPTCHA from 'react-google-recaptcha';
import DropFile from '@sellermodules/register/pages/default/components/dropfile';

const RegisterSeller = (props) => {
    const classes = useStyles();
    const {
        formik, getCountry, getCountryRes, getCountries, getCountriesRes,
        getCityKecByRegionCode, getCityKecByRegionCodeRes, t, handleDropFile,
        gmapKey, enableMap, mapPosition, handleDragPosition,
        recaptcha, sitekey, onReCAPTCHAChange, recaptchaRef, termAgree, setTermAgree,
    } = props;

    return (
        <>
            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                <InputLabel htmlFor="store_name" className={[classes.label, classes.required]}>
                    {t('registerseller:Store_Name')}
                </InputLabel>
                <TextField
                    id="store_name"
                    name="store_name"
                    value={formik.values.store_name}
                    onChange={formik.handleChange}
                    className={classes.textInput}
                    error={!!(formik.touched.store_name && formik.errors.store_name)}
                    helperText={(formik.touched.store_name && formik.errors.store_name) || ''}
                />
            </div>
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
                        formik.setFieldValue('street', '');
                    }}
                    options={(getCountriesRes && getCountriesRes.data && getCountriesRes.data.countries)
                        || []}
                    loading={getCountriesRes.loading}
                    primaryKey="id"
                    labelKey="full_name_english"
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            value={formik.values.country_id}
                            className={classes.textInput}
                            error={!!(formik.touched.country_id && formik.errors.country_id)}
                            helperText={(formik.touched.country_id && formik.errors.country_id) || ''}
                            {...params}
                        />
                    )}
                    disableClearable
                />
            </div>
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
                        formik.setFieldValue('street', '');
                    }}
                    options={(getCountryRes && getCountryRes.data
                        && getCountryRes.data.country && getCountryRes.data.country.available_regions)
                        || []}
                    loading={getCountryRes.loading}
                    primaryKey="id"
                    labelKey="name"
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            value={formik.values.region}
                            className={classes.textInput}
                            error={!!(formik.touched.region && formik.errors.region)}
                            helperText={(formik.touched.region && formik.errors.region) || ''}
                            {...params}
                        />
                    )}
                    disableClearable
                />
            </div>
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
                        formik.setFieldValue('street', '');
                    }}
                    options={(getCityKecByRegionCodeRes && getCityKecByRegionCodeRes.data
                        && getCityKecByRegionCodeRes.data.getCityKecByRegionCode)
                        || []}
                    loading={getCityKecByRegionCodeRes.loading}
                    primaryKey="value"
                    labelKey="label"
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            value={formik.values.city}
                            className={classes.textInput}
                            error={!!(formik.touched.city && formik.errors.city)}
                            helperText={(formik.touched.city && formik.errors.city) || ''}
                            {...params}
                        />
                    )}
                    disableClearable
                />
            </div>

            {gmapKey && enableMap ? (
                <div className={classes.boxMap} name="street">
                    <div>
                        <IcubeMapsAutocomplete
                            gmapKey={gmapKey}
                            formik={formik}
                            formikName="street"
                            mapPosition={mapPosition}
                            dragMarkerDone={handleDragPosition}
                            customLabel={() => (
                                <InputLabel htmlFor="city" className={[classes.label, classes.required]}>
                                    {t('registerseller:Pinpoint_your_Location')}
                                </InputLabel>
                            )}
                            placeholder={t('registerseller:Write_the_name_of_the_street__building__housing')}
                            className={classes.textInputMaps}
                        />
                    </div>
                </div>
            )
                : (
                    <>
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
                    </>
                )}

            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                <InputLabel htmlFor="postcode" className={[classes.label, classes.required]}>
                    {t('registerseller:Postal_Code')}
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

            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                <InputLabel htmlFor="taxpayer_number" className={[classes.label, classes.required]}>
                    {t('registerseller:NPWP')}
                </InputLabel>
                <TextField
                    id="taxpayer_number"
                    name="taxpayer_number"
                    value={formik.values.taxpayer_number}
                    onChange={formik.handleChange}
                    className={classes.textInput}
                    error={!!(formik.touched.taxpayer_number && formik.errors.taxpayer_number)}
                    helperText={(formik.touched.taxpayer_number && formik.errors.taxpayer_number) || ''}
                />
                <div style={{ height: 10 }} />
                <DropFile
                    name="taxpayer_file"
                    error={!!(formik.touched.taxpayer_file && formik.errors.taxpayer_file)}
                    helperText={(formik.touched.taxpayer_file && formik.errors.taxpayer_file) || ''}
                    getBase64={(file) => handleDropFile(file, 'taxpayer_file')}
                    formatFile=".jpg, .jpeg, .png"
                    t={t}
                />
            </div>

            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                <InputLabel htmlFor="id_card_number" className={[classes.label, classes.required]}>
                    {t('registerseller:KTP')}
                </InputLabel>
                <TextField
                    id="id_card_number"
                    name="id_card_number"
                    value={formik.values.id_card_number}
                    onChange={formik.handleChange}
                    className={classes.textInput}
                    error={!!(formik.touched.id_card_number && formik.errors.id_card_number)}
                    helperText={(formik.touched.id_card_number && formik.errors.id_card_number) || ''}
                />
                <div style={{ height: 10 }} />
                <DropFile
                    name="id_card_file"
                    error={!!(formik.touched.id_card_file && formik.errors.id_card_file)}
                    helperText={(formik.touched.id_card_file && formik.errors.id_card_file) || ''}
                    getBase64={(file) => handleDropFile(file, 'id_card_file')}
                    formatFile=".jpg, .jpeg, .png"
                    t={t}
                />
            </div>
            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            checked={termAgree}
                            name="termAgree"
                            onChange={(e) => setTermAgree(e.target.checked)}
                        />
                    )}
                    label={(
                        <span>
                            {t('registerseller:I_agree_to_the')}
                            {' '}
                            <span className={classes.termsCondition}>{t('registerseller:terms_and_conditions')}</span>
                            {' '}
                            {t('registerseller:and_the_privacy_policy')}
                        </span>
                    )}
                    className={classes.controlLabel}
                />

            </div>
            {recaptcha.enable
                && (
                    <div className={clsx('col-xs-12 col-sm-12', classes.formField, classes.recaptcha)}>
                        <ReCAPTCHA
                            sitekey={sitekey}
                            onChange={onReCAPTCHAChange}
                            ref={recaptchaRef}
                            onErrored={() => formik.setFieldValue('captcha', '')}
                            onExpired={() => formik.setFieldValue('captcha', '')}
                        />
                    </div>
                )}
        </>
    );
};

export default RegisterSeller;
