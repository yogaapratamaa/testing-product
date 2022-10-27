/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import DropFile from '@common_dropfile';
import Autocomplete from '@common_autocomplete';
import PhoneInput from '@common_phoneinput';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/managevendor/pages/edit/components/style';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ManageVendorEditContent = (props) => {
    const {
        formik, isVendor, handleDropFile, dataCourier, dataShipper, dataBank, dataPayout,
        dataShippingMethod, databeneficiaries, getCountriesRes, getCountry, getCountryRes,
        getCityKecByRegionCode, getCityKecByRegionCodeRes, t, setDialCode, dataApproval,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const option = [
        {
            name: t('managevendor:Yes'),
            value: 1,
        },
        {
            name: t('managevendor:No'),
            value: 0,
        },
    ];

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                <div>
                    <Button
                        className={classes.btnBack}
                        onClick={() => router.push('/vendorportal/managevendor')}
                        variant="contained"
                        style={{ marginRight: 16 }}
                    >
                        <ChevronLeftIcon style={{
                            fontSize: 30,
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        />
                    </Button>
                    <h2 className={classes.titleTop}>
                        {t('managevendor:Manage_Vendor')}
                        {' '}
                        {formik.values.company_name}
                    </h2>
                </div>
            </div>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>
                        {isVendor ? `${t('managevendor:Upload')} ` : ''}
                        {t('managevendor:Logo_Vendor')}
                    </h5>
                    {isVendor
                        && (
                            <DropFile
                                error={formik.errors.logo && formik.touched.logo}
                                getBase64={(file) => handleDropFile('logo', file)}
                                formatFile=".jpg, .jpeg, .png, .gif"
                            />
                        )}
                    {formik.values.logo
                        ? (
                            <img
                                className="logo"
                                alt="logo"
                                src={formik.values.logo}
                                style={{ height: 128, width: 'auto', marginLeft: 20 }}
                            />
                        ) : null}

                </div>

                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>
                        {isVendor ? `${t('managevendor:Upload')} ` : ''}
                        {t('managevendor:Promotion_Banner')}
                    </h5>
                    {isVendor
                        && (
                            <DropFile
                                error={formik.errors.promotion_banner && formik.touched.promotion_banner}
                                getBase64={(file) => handleDropFile('promotion_banner', file)}
                                formatFile=".jpg, .jpeg, .png, .gif"
                            />
                        )}

                    {formik.values.promotion_banner
                        ? (
                            <>
                                <img
                                    className="promotion_banner"
                                    alt="promotion_banner"
                                    src={formik.values.promotion_banner}
                                    style={{ height: 128, width: 'auto', marginLeft: 20 }}
                                />
                                {isVendor
                                    && (
                                        <img
                                            src="/assets/img/trash.svg"
                                            alt="delete"
                                            style={{
                                                height: 25, width: 'auto', cursor: 'pointer', marginLeft: 5,
                                            }}
                                            onClick={() => formik.setFieldValue('promotion_banner', '')}
                                        />
                                    )}
                            </>
                        ) : (
                            null
                        )}

                </div>

                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('managevendor:Company_Information')}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('managevendor:Vendor_Code')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            disabled={!isVendor}
                            name="company_code"
                            value={formik.values.company_code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.company_code && formik.errors.company_code)}
                            helperText={(formik.touched.company_code && formik.errors.company_code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label)}>{t('managevendor:Vendor_Name')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="company_name"
                            disabled={!isVendor}
                            value={formik.values.company_name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.company_name && formik.errors.company_name)}
                            helperText={(formik.touched.company_name && formik.errors.company_name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label)}>{t('managevendor:Address')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="company_street"
                            disabled={!isVendor}
                            value={formik.values.company_street}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.company_street && formik.errors.company_street)}
                            helperText={(formik.touched.company_street && formik.errors.company_street) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label)}>{t('managevendor:Country')}</span>
                        </div>
                        <Autocomplete
                            disabled={!isVendor}
                            className={classes.autocompleteRoot}
                            value={formik.values.company_country_id}
                            onChange={(e) => formik.setFieldValue('company_country_id', e)}
                            options={(getCountriesRes && getCountriesRes.data && getCountriesRes.data.countries) || []}
                            loading={getCountriesRes.loading}
                            primaryKey="id"
                            labelKey="full_name_english"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label)}>{t('managevendor:Province')}</span>
                        </div>
                        <Autocomplete
                            disabled={!(formik.values.company_country_id) || !isVendor}
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.company_region}
                            onChange={(e) => formik.setFieldValue('company_region', e)}
                            loading={getCountryRes.loading}
                            options={
                                getCountryRes && getCountryRes.data && getCountryRes.data.country && getCountryRes.data.country.available_regions
                            }
                            getOptions={getCountry}
                            getOptionsVariables={{ variables: { id: formik.values.company_country_id && formik.values.company_country_id.id } }}
                            primaryKey="id"
                            labelKey="name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label)}>{t('managevendor:City')}</span>
                        </div>
                        <Autocomplete
                            disabled={!(formik.values.company_region && formik.values.company_region.id) || !isVendor}
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.company_city}
                            onChange={(e) => formik.setFieldValue('company_city', e)}
                            loading={getCityKecByRegionCodeRes.loading}
                            options={
                                getCityKecByRegionCodeRes && getCityKecByRegionCodeRes.data && getCityKecByRegionCodeRes.data.getCityKecByRegionCode
                            }
                            getOptions={getCityKecByRegionCode}
                            getOptionsVariables={{
                                variables: {
                                    region_code: formik.values.company_region && formik.values.company_region.code,
                                },
                            }}
                            primaryKey="value"
                            labelKey="label"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel} style={{ verticalAlign: 'middle' }}>
                            <span className={classes.label} style={{ verticalAlign: '-webkit-baseline-middle' }}>{t('managevendor:Telephone')}</span>
                        </div>
                        <PhoneInput
                            disabled={!isVendor}
                            name="no_telephone"
                            value={formik.values.no_telephone}
                            onChange={(e, c) => {
                                formik.setFieldValue('no_telephone', e);
                                setDialCode(c.dialCode);
                            }}
                            error={!!(formik.touched.no_telephone && formik.errors.no_telephone)}
                            helperText={(formik.touched.no_telephone && formik.errors.no_telephone) || ''}
                            containerClass={classes.fieldPhoneContainer}
                            rootClasses={classes.fieldPhoneRoot}
                        />
                    </div>
                    {!isVendor
                        && (
                            <>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('managevendor:New_Product')}</span>
                                    </div>
                                    <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                                        <TextField
                                            style={{ width: '100%' }}
                                            variant="outlined"
                                            select
                                            name="is_new_product"
                                            value={formik.values.is_new_product}
                                            onChange={formik.handleChange}
                                            helperText={t('managevendor:Can_upload_new_product')}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        >
                                            {option.map((item, index) => (
                                                <MenuItem value={item.value} key={index}>{item.name}</MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('managevendor:Margin')}</span>
                                    </div>
                                    <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                                        <TextField
                                            style={{ width: '100%' }}
                                            variant="outlined"
                                            name="company_margin"
                                            value={formik.values.company_margin}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.company_margin && formik.errors.company_margin)}
                                            helperText={(formik.touched.company_margin && formik.errors.company_margin) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('managevendor:Product_Auto_Approval')}</span>
                                    </div>
                                    <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                                        <RadioGroup
                                            className={classes.radioGroup}
                                            name="is_product_approval"
                                            value={formik.values.is_product_approval}
                                            onChange={(e) => formik.setFieldValue('is_product_approval', Number(e?.target?.value) || 0)}
                                            error={!!(formik.touched.is_product_approval && formik.errors.is_product_approval)}
                                            helperText={t('managevendor:Can_auto_approve_product')}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        >
                                            {dataApproval.map((approval, i) => (
                                                <FormControlLabel
                                                    key={i}
                                                    value={Number(approval.value)}
                                                    label={approval.label}
                                                    control={<Radio />}
                                                />

                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>
                            </>
                        )}
                </div>

                {dataShippingMethod
                    ? (
                        <div className={classes.content}>
                            <h5 className={classes.titleSmall}>{t('managevendor:Shipping_Method')}</h5>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('managevendor:Shipper_Shipping')}</span>
                                </div>
                                <Autocomplete
                                    disabled={!isVendor}
                                    multiple
                                    className={classes.autocompleteRoot}
                                    name="shipper_shipping"
                                    value={typeof formik.values.shipper_shipping === 'object' ? formik.values.shipper_shipping
                                        : [formik.values.shipper_shipping]}
                                    onChange={(e) => formik.setFieldValue('shipper_shipping', e)}
                                    primaryKey="value"
                                    labelKey="label"
                                    options={dataShipper}
                                    fullWidth
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('managevendor:Vendor_Shipping')}</span>
                                </div>
                                <Autocomplete
                                    disabled={!isVendor}
                                    multiple
                                    className={classes.autocompleteRoot}
                                    name="vendor_shipping"
                                    value={typeof formik.values.vendor_shipping === 'object' ? formik.values.vendor_shipping
                                        : [formik.values.vendor_shipping]}
                                    onChange={(e) => formik.setFieldValue('vendor_shipping', e)}
                                    primaryKey="value"
                                    labelKey="label"
                                    options={dataCourier}
                                    fullWidth
                                />
                            </div>
                        </div>
                    )
                    : null}

                {(isVendor && databeneficiaries)
                    ? (
                        <div className={classes.content}>
                            <h5 className={classes.titleSmall}>{t('managevendor:Beneficiaries')}</h5>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={clsx(classes.label, classes.labelRequired)}>{t('managevendor:Bank')}</span>
                                </div>
                                <Autocomplete
                                    className={classes.autocompleteRoot}
                                    name="bank"
                                    value={formik.values.bank}
                                    onChange={(e) => formik.setFieldValue('bank', e)}
                                    primaryKey="bank_code"
                                    labelKey="bank_name"
                                    options={dataBank}
                                    fullWidth
                                    error={!!(formik.touched.bank && formik.errors.bank)}
                                    helperText={(formik.touched.bank && formik.errors.bank) || ''}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={clsx(classes.label, classes.labelRequired)}>{t('managevendor:Bank_Account_Number')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="account"
                                    value={formik.values.account}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                    error={!!(formik.touched.account && formik.errors.account)}
                                    helperText={(formik.touched.account && formik.errors.account) || ''}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={clsx(classes.label, classes.labelRequired)}>{t('managevendor:Bank_Account_Name')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                    error={!!(formik.touched.name && formik.errors.name)}
                                    helperText={(formik.touched.name && formik.errors.name) || ''}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={clsx(classes.label, classes.labelRequired)}>{t('managevendor:Alias_Name')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="alias_name"
                                    value={formik.values.alias_name}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                    error={!!(formik.touched.alias_name && formik.errors.alias_name)}
                                    helperText={(formik.touched.alias_name && formik.errors.alias_name) || ''}
                                />
                            </div>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={clsx(classes.label, classes.labelRequired)}>{t('managevendor:Payout_Schedule')}</span>
                                </div>
                                <Autocomplete
                                    className={classes.autocompleteRoot}
                                    name="payout_schedule"
                                    value={formik.values.payout_schedule}
                                    onChange={(e) => formik.setFieldValue('payout_schedule', e)}
                                    primaryKey="value"
                                    labelKey="label"
                                    options={dataPayout}
                                    fullWidth
                                    error={!!(formik.touched.payout_schedule && formik.errors.payout_schedule)}
                                    helperText={(formik.touched.payout_schedule && formik.errors.payout_schedule) || ''}
                                />
                            </div>
                        </div>
                    )
                    : null}

                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('managevendor:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ManageVendorEditContent;
