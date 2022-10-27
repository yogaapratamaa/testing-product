/* eslint-disable no-confusing-arrow */
/* eslint-disable indent */
/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/configurationlogistix/pages/default/components/style';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InputText from '@modules/configurationlogistix/pages/default/components/Input/inputText';
import InputSelect from '@modules/configurationlogistix/pages/default/components/Input/inputSelect';
import InputMultiSelect from '@modules/configurationlogistix/pages/default/components/Input/inputMultiSelect';

const LogistixConfigurationContent = (props) => {
    const { formik, dataLogistix, t } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState([]);
    const errorKey = Object.keys(formik.errors);
    const touchedKey = Object.keys(formik.touched);

    const handleChange = (panel) => (event, isExpanded) => {
        if (isExpanded) {
            setExpanded((prev) => [...prev, panel]);
        } else {
            setExpanded((prev) => prev.filter((item) => item !== panel));
        }
    };

    const forceExpand = (panel, name) => {
        if (errorKey.includes(name) && touchedKey.includes(name)) {
            const isExpanded = expanded.includes(panel);
            if (!isExpanded) {
                setExpanded((prev) => [...prev, panel]);
            }
        }
    };

    return (
        <>
            <h2 className={classes.titleTop}>{t('logistixconfiguration:Logistix_Configuration')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {dataLogistix?.map((parent, index) => (
                        <Accordion
                            TransitionProps={{ unmountOnExit: true }}
                            key={index}
                            elevation={4}
                            onChange={handleChange(parent.label)}
                            expanded={expanded.includes(parent.label)}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                <h2 className={classes.title} style={{ textTransform: 'uppercase' }}>
                                    {parent.label}
                                </h2>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                <div className={classes.contentChild}>
                                    {parent.fields.map((firstChild) => {
                                          const firstChildName = firstChild.id.replaceAll('/', '_');
                                          forceExpand(parent.label, firstChildName);
                                        if (firstChild.type === 'select') {
                                            return (
                                                <InputSelect
                                                    name={firstChildName}
                                                    formik={formik}
                                                    options={firstChild.options}
                                                    canRestore={firstChild.can_restore}
                                                    depends={firstChild.depends ? firstChild.depends : null}
                                                    t={t}
                                                    {...firstChild}
                                                />
                                            );
                                        }
                                        if (firstChild.type === 'multiselect') {
                                            return (
                                                <InputMultiSelect
                                                    name={firstChildName}
                                                    options={firstChild.options}
                                                    formik={formik}
                                                    canRestore={firstChild.can_restore}
                                                    depends={firstChild.depends ? firstChild.depends : null}
                                                    t={t}
                                                    {...firstChild}
                                                />
                                            );
                                        }
                                        return (
                                            <InputText
                                                name={firstChildName}
                                                formik={formik}
                                                canRestore={firstChild.can_restore}
                                                depends={firstChild.depends ? firstChild.depends : null}
                                                t={t}
                                                {...firstChild}
                                            />
                                        );
                                    })}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('logistixconfiguration:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default LogistixConfigurationContent;
