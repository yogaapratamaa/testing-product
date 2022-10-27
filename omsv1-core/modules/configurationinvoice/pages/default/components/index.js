/* eslint-disable no-confusing-arrow */
/* eslint-disable indent */
/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/configurationinvoice/pages/default/components/style';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InputSelect from '@modules/configurationinvoice/pages/default/components/inputSelect';

const ConfigInvoiceContent = (props) => {
    const { formik, dataInvoice, t } = props;

    const classes = useStyles();

    return (
        <>
            <h2 className={classes.titleTop}>{t('invoiceconfiguration:Invoice_Configuration')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {dataInvoice?.map((parent, index) => (
                        <Accordion
                            TransitionProps={{ unmountOnExit: true }}
                            key={index}
                            elevation={4}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                <h2 className={classes.title} style={{ textTransform: 'uppercase' }}>
                                    {parent.label}
                                </h2>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                <div className={classes.contentChild}>
                                    {parent.fields.map((firstChild) => (
                                        <InputSelect
                                            name={firstChild.id.replaceAll('/', '_')}
                                            formik={formik}
                                            options={firstChild.options}
                                            canRestore={firstChild.can_restore}
                                            t={t}
                                            {...firstChild}
                                        />
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    <div className={classes.formFieldButton}>
                        <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                            {t('invoiceconfiguration:Submit')}
                        </Button>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default ConfigInvoiceContent;
