/* eslint-disable no-lone-blocks */
import React from 'react';
import Button from '@common_button';
import Select from '@common_select';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/configurationpickpack/pages/default/components/style';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@common_textfield';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const PickPackConfigContent = (props) => {
    const { formik, t } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState({
        wave: true,
        batch: true,
    });

    const options = [
        { value: '0', label: t('pickpackconfiguration:No') },
        { value: '1', label: t('pickpackconfiguration:Yes') },
    ];

    const optionsSorting = [
        { value: 'single_item', label: t('pickpackconfiguration:Single_Item') },
        { value: 'multiple_item', label: t('pickpackconfiguration:Multiple_Item') },
    ];

    const optionsResetMethodDefault = [
        {
            value: 'default',
            label: t('pickpackconfiguration:Default'),
        },
        {
            value: 'every_day',
            label: t('pickpackconfiguration:Every_Day'),
        },
    ];

    const handleChangeAccordion = (num) => {
        if (num === 1) {
            setExpanded({
                ...expanded,
                wave: !expanded.wave,
            });
        } else {
            setExpanded({
                ...expanded,
                batch: !expanded.batch,
            });
        }
    };

    return (
        <>
            <h2 className={classes.titleTop}>{t('pickpackconfiguration:Pick_Pack_Configuration')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <Accordion elevation={4} expanded={expanded.wave} onChange={() => handleChangeAccordion(1)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                            <h2 className={classes.title}>Pick by Wave</h2>
                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                            <div className={classes.content}>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Enable')}</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_wave_enable.value"
                                        value={formik.values.swiftoms_pickpack_wave_enable.value}
                                        onChange={formik.handleChange}
                                        dataOptions={options}
                                        error={!!(formik.swiftoms_pickpack_wave_enable && formik.swiftoms_pickpack_wave_enable)}
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_wave_enable.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_wave_enable.is_default"
                                                    checked={formik.values.swiftoms_pickpack_wave_enable.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_wave_enable.is_default"
                                                checked={formik.values.swiftoms_pickpack_wave_enable.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Number_of_Slots_per_Picker')}</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="swiftoms_pickpack_wave_slots_per_picker.value"
                                        value={formik.values.swiftoms_pickpack_wave_slots_per_picker.value}
                                        onChange={formik.handleChange}
                                        error={
                                            !!(
                                                formik.touched.swiftoms_pickpack_wave_slots_per_picker
                                                && formik.errors.swiftoms_pickpack_wave_slots_per_picker
                                            )
                                        }
                                        helperText={
                                            (formik.touched.swiftoms_pickpack_wave_slots_per_picker
                                                && formik.errors.swiftoms_pickpack_wave_slots_per_picker)
                                            || ''
                                        }
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        fullWidth
                                    />
                                </div>

                                <div style={{ height: 15 }} />

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Number_of_Slots_per_Slots')}</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="swiftoms_pickpack_wave_items_per_slot.value"
                                        value={formik.values.swiftoms_pickpack_wave_items_per_slot.value}
                                        onChange={formik.handleChange}
                                        error={
                                            !!(
                                                formik.touched.swiftoms_pickpack_wave_items_per_slot
                                                && formik.errors.swiftoms_pickpack_wave_items_per_slot
                                            )
                                        }
                                        helperText={
                                            (formik.touched.swiftoms_pickpack_wave_items_per_slot
                                                && formik.errors.swiftoms_pickpack_wave_items_per_slot)
                                            || ''
                                        }
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_wave_items_per_slot.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_wave_items_per_slot.is_default"
                                                    checked={formik.values.swiftoms_pickpack_wave_items_per_slot.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_wave_items_per_slot.is_default"
                                                checked={formik.values.swiftoms_pickpack_wave_items_per_slot.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Allow_Confirm_Pick_Without_Scan_Barcode')}</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_wave_allow_manual_confirm_pick.value"
                                        value={formik.values.swiftoms_pickpack_wave_allow_manual_confirm_pick.value}
                                        onChange={formik.handleChange}
                                        dataOptions={options}
                                        error={
                                            !!(
                                                formik.swiftoms_pickpack_wave_allow_manual_confirm_pick
                                                && formik.swiftoms_pickpack_wave_allow_manual_confirm_pick
                                            )
                                        }
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_wave_allow_manual_confirm_pick.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_wave_allow_manual_confirm_pick.is_default"
                                                    checked={formik.values.swiftoms_pickpack_wave_allow_manual_confirm_pick.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_wave_allow_manual_confirm_pick.is_default"
                                                checked={formik.values.swiftoms_pickpack_wave_allow_manual_confirm_pick.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Use_Camera_To_Scan_Barcode')}</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_wave_use_camera_to_scan.value"
                                        value={formik.values.swiftoms_pickpack_wave_use_camera_to_scan.value}
                                        onChange={formik.handleChange}
                                        dataOptions={options}
                                        error={
                                            !!(formik.swiftoms_pickpack_wave_use_camera_to_scan && formik.swiftoms_pickpack_wave_use_camera_to_scan)
                                        }
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_wave_use_camera_to_scan.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_wave_use_camera_to_scan.is_default"
                                                    checked={formik.values.swiftoms_pickpack_wave_use_camera_to_scan.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_wave_use_camera_to_scan.is_default"
                                                checked={formik.values.swiftoms_pickpack_wave_use_camera_to_scan.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Wave_Number_Reset_Method')}</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_wave_number_reset_method.value"
                                        value={formik.values.swiftoms_pickpack_wave_number_reset_method.value}
                                        onChange={formik.handleChange}
                                        dataOptions={optionsResetMethodDefault}
                                        error={
                                            !!(formik.swiftoms_pickpack_wave_number_reset_method && formik.swiftoms_pickpack_wave_number_reset_method)
                                        }
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_wave_number_reset_method.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_wave_number_reset_method.is_default"
                                                    checked={formik.values.swiftoms_pickpack_wave_number_reset_method.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_wave_number_reset_method.is_default"
                                                checked={formik.values.swiftoms_pickpack_wave_number_reset_method.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Wave_Number_Prefix')}</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="swiftoms_pickpack_wave_number_prefix.value"
                                        value={formik.values.swiftoms_pickpack_wave_number_prefix.value}
                                        onChange={formik.handleChange}
                                        error={
                                            !!(
                                                formik.touched.swiftoms_pickpack_wave_number_prefix
                                                && formik.errors.swiftoms_pickpack_wave_number_prefix
                                            )
                                        }
                                        helperText={
                                            (formik.touched.swiftoms_pickpack_wave_number_prefix
                                                && formik.errors.swiftoms_pickpack_wave_number_prefix)
                                            || ''
                                        }
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_wave_number_prefix.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_wave_number_prefix.is_default"
                                                    checked={formik.values.swiftoms_pickpack_wave_number_prefix.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_wave_number_prefix.is_default"
                                                checked={formik.values.swiftoms_pickpack_wave_number_prefix.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion elevation={4} expanded={expanded.batch} onChange={() => handleChangeAccordion(2)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                            <h2 className={classes.title}>{t('pickpackconfiguration:Pick_by_Batch')}</h2>
                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                            <div className={classes.content}>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Enable')}</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_batch_enable.value"
                                        value={formik.values.swiftoms_pickpack_batch_enable.value}
                                        onChange={formik.handleChange}
                                        dataOptions={options}
                                        error={!!(formik.swiftoms_pickpack_batch_enable && formik.swiftoms_pickpack_batch_enable)}
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_batch_enable.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_batch_enable.is_default"
                                                    checked={formik.values.swiftoms_pickpack_batch_enable.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_batch_enable.is_default"
                                                checked={formik.values.swiftoms_pickpack_batch_enable.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>
                                <div style={{ height: 5 }} />
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Number_of_Items_per_Slots')}</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="swiftoms_pickpack_batch_items_per_slot.value"
                                        value={formik.values.swiftoms_pickpack_batch_items_per_slot.value}
                                        onChange={formik.handleChange}
                                        error={
                                            !!(
                                                formik.touched.swiftoms_pickpack_batch_items_per_slot
                                                && formik.errors.swiftoms_pickpack_batch_items_per_slot
                                            )
                                        }
                                        helperText={
                                            (formik.touched.swiftoms_pickpack_batch_items_per_slot
                                                && formik.errors.swiftoms_pickpack_batch_items_per_slot)
                                            || ''
                                        }
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_batch_items_per_slot.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_batch_items_per_slot.is_default"
                                                    checked={formik.values.swiftoms_pickpack_batch_items_per_slot.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_batch_items_per_slot.is_default"
                                                checked={formik.values.swiftoms_pickpack_batch_items_per_slot.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Sorting_Method')}</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_batch_sorting_method.value"
                                        value={formik.values.swiftoms_pickpack_batch_sorting_method.value}
                                        onChange={formik.handleChange}
                                        dataOptions={optionsSorting}
                                        error={!!(formik.swiftoms_pickpack_batch_sorting_method && formik.swiftoms_pickpack_batch_sorting_method)}
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_batch_sorting_method.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_batch_sorting_method.is_default"
                                                    checked={formik.values.swiftoms_pickpack_batch_sorting_method.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_batch_sorting_method.is_default"
                                                checked={formik.values.swiftoms_pickpack_batch_sorting_method.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Allow_Confirm_Pick_Without_Scan_Barcode')}</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_batch_allow_manual_confirm_pick.value"
                                        value={formik.values.swiftoms_pickpack_batch_allow_manual_confirm_pick.value}
                                        onChange={formik.handleChange}
                                        dataOptions={options}
                                        error={
                                            !!(
                                                formik.swiftoms_pickpack_batch_allow_manual_confirm_pick
                                                && formik.swiftoms_pickpack_batch_allow_manual_confirm_pick
                                            )
                                        }
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_batch_allow_manual_confirm_pick.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_batch_allow_manual_confirm_pick.is_default"
                                                    checked={formik.values.swiftoms_pickpack_batch_allow_manual_confirm_pick.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_batch_allow_manual_confirm_pick.is_default"
                                                checked={formik.values.swiftoms_pickpack_batch_allow_manual_confirm_pick.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Use_Camera_To_Scan_Barcode')}</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_batch_use_camera_to_scan.value"
                                        value={formik.values.swiftoms_pickpack_batch_use_camera_to_scan.value}
                                        onChange={formik.handleChange}
                                        dataOptions={options}
                                        error={
                                            !!(formik.swiftoms_pickpack_batch_use_camera_to_scan && formik.swiftoms_pickpack_batch_use_camera_to_scan)
                                        }
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_batch_use_camera_to_scan.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_batch_use_camera_to_scan.is_default"
                                                    checked={formik.values.swiftoms_pickpack_batch_use_camera_to_scan.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_batch_use_camera_to_scan.is_default"
                                                checked={formik.values.swiftoms_pickpack_batch_use_camera_to_scan.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Batch_Number_Reset_Method')}</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_batch_number_reset_method.value"
                                        value={formik.values.swiftoms_pickpack_batch_number_reset_method.value}
                                        onChange={formik.handleChange}
                                        dataOptions={optionsResetMethodDefault}
                                        error={
                                            !!(
                                                formik.swiftoms_pickpack_batch_number_reset_method
                                                && formik.swiftoms_pickpack_batch_number_reset_method
                                            )
                                        }
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_batch_number_reset_method.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_batch_number_reset_method.is_default"
                                                    checked={formik.values.swiftoms_pickpack_batch_number_reset_method.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_batch_number_reset_method.is_default"
                                                checked={formik.values.swiftoms_pickpack_batch_number_reset_method.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Batch_Number_Prefix')}</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="swiftoms_pickpack_batch_number_prefix.value"
                                        value={formik.values.swiftoms_pickpack_batch_number_prefix.value}
                                        onChange={formik.handleChange}
                                        error={
                                            !!(
                                                formik.touched.swiftoms_pickpack_batch_number_prefix
                                                && formik.errors.swiftoms_pickpack_batch_number_prefix
                                            )
                                        }
                                        helperText={
                                            (formik.touched.swiftoms_pickpack_batch_number_prefix
                                                && formik.errors.swiftoms_pickpack_batch_number_prefix)
                                            || ''
                                        }
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_batch_number_prefix.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_batch_number_prefix.is_default"
                                                    checked={formik.values.swiftoms_pickpack_batch_number_prefix.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_batch_number_prefix.is_default"
                                                checked={formik.values.swiftoms_pickpack_batch_number_prefix.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Pick_List_Number_Reset_Method')}</span>
                                    </div>
                                    <Select
                                        name="swiftoms_pickpack_pick_list_number_reset_method.value"
                                        value={formik.values.swiftoms_pickpack_pick_list_number_reset_method.value}
                                        onChange={formik.handleChange}
                                        dataOptions={[...optionsResetMethodDefault,
                                            { value: 'every_batch', label: t('pickpackconfiguration:Every_Batch') }]}
                                        error={
                                            !!(
                                                formik.swiftoms_pickpack_pick_list_number_reset_method
                                                && formik.swiftoms_pickpack_pick_list_number_reset_method
                                            )
                                        }
                                        selectClasses={classes.fieldInput}
                                        formControlClasses={classes.selectControl}
                                        enableEmpty={false}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_pick_list_number_reset_method.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_pick_list_number_reset_method.is_default"
                                                    checked={formik.values.swiftoms_pickpack_pick_list_number_reset_method.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_pick_list_number_reset_method.is_default"
                                                checked={formik.values.swiftoms_pickpack_pick_list_number_reset_method.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('pickpackconfiguration:Pick_List_Number_Prefix')}</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="swiftoms_pickpack_pick_list_number_prefix.value"
                                        value={formik.values.swiftoms_pickpack_pick_list_number_prefix.value}
                                        onChange={formik.handleChange}
                                        error={
                                            !!(
                                                formik.touched.swiftoms_pickpack_pick_list_number_prefix
                                                && formik.errors.swiftoms_pickpack_pick_list_number_prefix
                                            )
                                        }
                                        helperText={
                                            (formik.touched.swiftoms_pickpack_pick_list_number_prefix
                                                && formik.errors.swiftoms_pickpack_pick_list_number_prefix)
                                            || ''
                                        }
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        fullWidth
                                        disabled={formik.values.swiftoms_pickpack_pick_list_number_prefix.is_default}
                                    />
                                    <div className="hidden-mobile">
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    name="swiftoms_pickpack_pick_list_number_prefix.is_default"
                                                    checked={formik.values.swiftoms_pickpack_pick_list_number_prefix.is_default}
                                                    onChange={formik.handleChange}
                                                />
                                            )}
                                            className={classes.controlLabel}
                                            classes={{ root: classes.rootLabel }}
                                            label={t('pickpackconfiguration:Use_system_value')}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                                    <div />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                name="swiftoms_pickpack_pick_list_number_prefix.is_default"
                                                checked={formik.values.swiftoms_pickpack_pick_list_number_prefix.is_default}
                                                onChange={formik.handleChange}
                                            />
                                        )}
                                        className={classes.controlLabel}
                                        classes={{ root: classes.rootLabel }}
                                        label={t('pickpackconfiguration:Use_system_value')}
                                    />
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className={classes.formFieldButton}>
                        <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                            {t('pickpackconfiguration:Submit')}
                        </Button>
                    </div>
                </div>
            </Paper>
            <div style={{ height: 30 }} />
        </>
    );
};

export default PickPackConfigContent;
