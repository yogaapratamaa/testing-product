/* eslint-disable eol-last */
/* eslint-disable no-confusing-arrow */
/* eslint-disable indent */
/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/configurationorder/pages/default/components/style';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InputText from '@modules/configurationorder/pages/default/components/Input/inputText';
import InputSelect from '@modules/configurationorder/pages/default/components/Input/inputSelect';
import InputSelectRegion from '@modules/configurationorder/pages/default/components/Input/inputSelectRegion';
import InputTable from '@modules/configurationorder/pages/default/components/Input/inputTable';

const OrderConfigurationContent = (props) => {
    const { formik, dataOrder, t } = props;
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
            <h2 className={classes.titleTop}>{t('orderconfiguration:Order_Configuration')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {dataOrder?.map((parent, index) => (
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
                                    {parent.fields.map((firstChild, idx) => {
                                        const firstChildName = firstChild.id.replaceAll('/', '_');
                                        forceExpand(parent.label, firstChildName);
                                        if (firstChild?.fields?.length > 0) {
                                            const pathLabel = `${parent.label}/${firstChild.label}`;
                                            return (
                                                <Accordion
                                                    TransitionProps={{ unmountOnExit: true }}
                                                    key={idx}
                                                    elevation={4}
                                                    className={classes.accordionChild}
                                                    onChange={handleChange(pathLabel)}
                                                    expanded={expanded.includes(pathLabel)}
                                                >
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                                        <h2 className={classes.title} style={{ textTransform: 'uppercase' }}>
                                                            {firstChild.label}
                                                        </h2>
                                                    </AccordionSummary>
                                                    <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                                        <div className={classes.contentChild}>
                                                            {firstChild?.fields?.map((secondChild) => {
                                                                const secondChildName = secondChild.id.replaceAll('/', '_');
                                                                forceExpand(parent.label, secondChildName);
                                                                forceExpand(pathLabel, secondChildName);
                                                                if (secondChild.type === 'select') {
                                                                    return (
                                                                        <InputSelect
                                                                            name={secondChildName}
                                                                            formik={formik}
                                                                            options={secondChild.options}
                                                                            canRestore={secondChild.can_restore}
                                                                            depends={secondChild.depends ? secondChild.depends : null}
                                                                            t={t}
                                                                            {...secondChild}
                                                                        />
                                                                    );
                                                                }
                                                                if (secondChild.type === 'select_region') {
                                                                    return (
                                                                        <InputSelectRegion
                                                                            name={secondChildName}
                                                                            formik={formik}
                                                                            options={secondChild.options}
                                                                            canRestore={secondChild.can_restore}
                                                                            depends={secondChild.depends ? secondChild.depends : null}
                                                                            t={t}
                                                                            {...secondChild}
                                                                        />
                                                                    );
                                                                }
                                                                if (secondChild.type === 'form') {
                                                                    return (
                                                                        <InputTable
                                                                            name={secondChildName}
                                                                            formik={formik}
                                                                            options={secondChild.options}
                                                                            depends={secondChild.depends ? secondChild.depends : null}
                                                                            t={t}
                                                                            {...secondChild}
                                                                        />
                                                                    );
                                                                }
                                                                return (
                                                                    <InputText
                                                                        name={secondChildName}
                                                                        formik={formik}
                                                                        canRestore={secondChild.can_restore}
                                                                        depends={secondChild.depends ? secondChild.depends : null}
                                                                        t={t}
                                                                        {...secondChild}
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            );
                                        }
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
                                        if (firstChild.type === 'select_region') {
                                            return (
                                                <InputSelectRegion
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
                                        if (firstChild.type === 'form') {
                                            return (
                                                <InputTable
                                                    name={firstChildName}
                                                    formik={formik}
                                                    options={firstChild.options}
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
                    <div className={classes.formFieldButton}>
                        <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                            {t('orderconfiguration:Submit')}
                        </Button>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default OrderConfigurationContent;