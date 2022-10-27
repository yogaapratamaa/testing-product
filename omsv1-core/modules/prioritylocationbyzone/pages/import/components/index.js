/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/prioritylocationbyzone/pages/import/components/style';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Progressbar from '@common_progressbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const ZoneUploadImport = (props) => {
    const {
        formik, urlDownload, handleDropFile, activityState, firstLoad, showProgress, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/oms/prioritylocationbyzone')}
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
            <h2 className={classes.titleTop}>{t('prioritylocationbyzone:Upload_Priority_Location')}</h2>
            <Paper className={classes.container}>
                <span className={clsx(classes.textAttach, classes.label)}>{t('prioritylocationbyzone:Attach_File')}</span>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <span className={classes.label}>
                            <a href={urlDownload} className={classes.linkDownload}>
                                {t('prioritylocationbyzone:Download_the_Sample_CSV')}
                            </a>
                        </span>
                    </div>
                    <div className={clsx(classes.formField, classes.textLeft)}>
                        <DropFile
                            title="Please select the file : "
                            error={formik.errors.binary && formik.touched.binary}
                            getBase64={handleDropFile}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('prioritylocationbyzone:Submit')}
                    </Button>
                </div>
                {activityState && ((activityState.run_status === 'running' || activityState.run_status === 'pending ') || showProgress)
                    ? (
                        <div className={classes.progressContainer}>
                            <Progressbar total={activityState?.data_total} value={activityState?.data_processed} title={t('prioritylocationbyzone:Progress')} />
                        </div>
                    )
                    : null}
                {firstLoad
                    ? (
                        <div className={classes.formFieldButton}>
                            <div className={clsx(classes.status)}>
                                Loading...
                            </div>
                        </div>
                    )
                    : (activityState && activityState.run_status
                        && ((activityState.run_status === 'running' || activityState.run_status === 'pending ') || showProgress)
                        && (
                            <div className={classes.formFieldButton}>
                                {activityState.run_status !== 'running' && showProgress
                                    ? activityState.error_message
                                        ? (
                                            <div className={clsx(classes.status, 'error')}>
                                                {t('prioritylocationbyzone:Error')}
                                            </div>
                                        )
                                        : (
                                            <div className={clsx(classes.status, 'success')}>
                                                {t('prioritylocationbyzone:Success')}
                                            </div>
                                        ) : null}

                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>
                                                    {`${t('prioritylocationbyzone:Status')} : `}
                                                </TableCell>
                                                <TableCell
                                                    className={clsx(classes.rightColumn, 'capitalize')}
                                                >
                                                    {activityState.run_status}

                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>
                                                    {`${t('prioritylocationbyzone:Started_At')} : `}
                                                </TableCell>
                                                <TableCell className={classes.rightColumn}>
                                                    {new Date(activityState.started_at).toLocaleString('en-US', {
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        second: 'numeric',
                                                    })}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>
                                                    {`${t('prioritylocationbyzone:Run_By')} : `}
                                                </TableCell>
                                                <TableCell
                                                    className={classes.rightColumn}
                                                >
                                                    {activityState.run_by}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>
                                                    {`${t('prioritylocationbyzone:Error_Message')} : `}
                                                </TableCell>
                                                <TableCell className={classes.rightColumn} style={{ color: 'red' }}>
                                                    {activityState.error_message || '-'}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>
                                                    {`${t('prioritylocationbyzone:Attachment')} : `}
                                                </TableCell>
                                                <TableCell className={classes.rightColumn}>
                                                    <a
                                                        onClick={() => (activityState.attachment
                                                            ? router.push(activityState.attachment) : null)}
                                                        style={{
                                                            color: '#BE1F93',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        {activityState.attachment ? t('prioritylocationbyzone:Download') : '-'}
                                                    </a>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        )
                    )}
            </Paper>
        </>
    );
};

export default ZoneUploadImport;
