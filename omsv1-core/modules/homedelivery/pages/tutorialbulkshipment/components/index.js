/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useRouter } from 'node_modules/next/router';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/homedelivery/pages/tutorialbulkshipment/components/style';

const TutorialBulkShipment = (props) => {
    const {
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/shipment/homedelivery/import')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>{t('homedelivery:Bulk_Shipment_Tutorial')}</h2>
            <Paper>
                <div className={classes.contentWithoutBorder}>
                    <p>
                        {t('homedelivery:This_feature_is_used_to_update_shipment_from')}
                        {' '}
                        {' '}
                        <b>{t('homedelivery:Ready_for_Ship')}</b>
                        {' '}
                        {' '}
                        {t('homedelivery:to')}
                        {' '}
                        {' '}
                        <b>{t('homedelivery:Order_Shipped')}</b>
                        {' '}
                        {' '}
                        {t('homedelivery:and_save_the_AWB_number_if_any_For_this_action_please_use_the_CSV_file_that_exported_using_the')}
                        {' '}
                        {' '}
                        <b>{t('homedelivery:Exports')}</b>
                        {' '}
                        {' '}
                        {t('homedelivery:button_as_a_template')}
                        <br />
                        {t('homedelivery:Here_are_the_complete_steps_for_bulk_shipment')}
                    </p>
                    <ol>
                        <li>
                            <p style={{ marginTop: 0 }}>
                                {t('homedelivery:Please_prepare_a_shipment_list_to_upload_in_CSV_format_To_download_the_template_go_to_the')}
                                {' '}
                                {' '}
                                <b>{t('homedelivery:Ready_for_Ship')}</b>
                                {' '}
                                {' '}
                                {t('homedelivery:tab_select_data_then_click_the')}
                                {' '}
                                {' '}
                                <b>{t('homedelivery:Exports')}</b>
                                {' '}
                                {' '}
                                {t('homedelivery:button_and_select')}
                                {' '}
                                {' '}
                                <b>
                                    {t('homedelivery:Export_Without_Items')}
                                    .
                                </b>
                                {' '}
                                {' '}
                                {t('homedelivery:Shipment_data_will_be_downloaded_into_a_CSV_file')}
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/homedeliv_bulk_ship01.jpg" alt="excel-example" />
                        </li>
                        <li>
                            <p>
                                {t('homedelivery:Open_the_exported_file_using_any_supported_application_add_the_AWB_number_if_the_shipment_is_using_manuallygenerated_AWB_not_from_SWIFT_OMS_If_not_leave_this_column_empty_then_save_the_file_Please_note_that_this_file_required_commaseparated_values_for_bulk_action_The_first_row_is_the_column_name_and_below_it_is_the_shipment_data_For_example')}
                            </p>
                            <p style={{ marginBottom: 0 }}>
                                <b>{t('homedelivery:Original_data')}</b>
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/homedeliv_bulk_ship02.jpg" alt="excel-example" />
                            <p style={{ marginBottom: 0 }}>
                                <b>{t('homedelivery:Updated data')}</b>
                                {' '}
                                {' '}
                                {t('homedelivery:added_AWB_number')}
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/homedeliv_bulk_ship03.jpg" alt="excel-example" />
                        </li>
                        <li>
                            <p>
                                {t('homedelivery:Select_the_file_you_have_exported_and_updated_earlier_csv_format_by_clicking')}
                                {' '}
                                {' '}
                                <b>{t('homedelivery:Choose_File')}</b>
                                {' '}
                                {' '}
                                {t('homedelivery:button')}
                                .
                            </p>
                            <img className={classes.imgImage} src="/assets/img/tutorial_content/homedeliv_bulk_ship04.jpg" alt="excel-example" />
                        </li>
                        <li>
                            <p>
                                {t('homedelivery:Click')}
                                {' '}
                                {' '}
                                <b>{t('homedelivery:Submit')}</b>
                                {' '}
                                {' '}
                                {t('homedelivery:button_to_run_bulk_shipment_and_please_wait_till_the_process_is_complete_The_shipment_status_will_update_to')}
                                {' '}
                                {' '}
                                <b>{t('homedelivery:Order_Shipped')}</b>
                                {' '}
                                {' '}
                                {t('homedelivery:when_it\'s_completed')}
                                <br />
                            </p>
                        </li>
                    </ol>
                </div>
            </Paper>
        </>
    );
};

export default TutorialBulkShipment;
