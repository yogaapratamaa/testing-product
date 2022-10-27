/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/configurationintegrations/pages/create/components/style';

const IntegrationsCreateContent = (props) => {
    const {
        formik, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/configurations/integrations')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('configurationintegrations:New_Integration')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('configurationintegrations:Name')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('configurationintegrations:Email')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.email && formik.errors.email)}
                            helperText={(formik.touched.email && formik.errors.email) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('configurationintegrations:Callback_URL')}</span>
                        </div>
                        <div>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="callback_url"
                                value={formik.values.callback_url}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.callback_url && formik.errors.callback_url)}
                                helperText={(formik.touched.callback_url && formik.errors.callback_url) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                            <br />
                            <span className={classes.helper}>{t('configurationintegrations:Enter_URL_where_Oauth_credentials_can_be_sent_when_using_Oauth_for_token_exchange_We_strongly_recommend_using_https')}</span>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('configurationintegrations:Identity_link_URL')}</span>
                        </div>
                        <div>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="identity_link_url"
                                value={formik.values.identity_link_url}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.identity_link_url && formik.errors.identity_link_url)}
                                helperText={(formik.touched.identity_link_url && formik.errors.identity_link_url) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                            <br />
                            <span className={classes.helper}>{t('configurationintegrations:URL_to_redirect_user_to_link_their_3rd_party_account_with_this_Magento_integration_credentials')}</span>
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('configurationintegrations:Current_User_Identity_Verification')}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('configurationintegrations:Your_Password')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.password && formik.errors.password)}
                            helperText={(formik.touched.password && formik.errors.password) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('configurationintegrations:Save')}
                    </Button>
                    <Button
                        style={{ marginLeft: 10 }}
                        className={classes.btn}
                        // onClick={formik.handleSubmit}
                        onClick={() => {
                            formik.setFieldValue('activate', true);
                            formik.handleSubmit();
                        }}
                        variant="contained"
                    >
                        {t('configurationintegrations:Save__Activate')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default IntegrationsCreateContent;
