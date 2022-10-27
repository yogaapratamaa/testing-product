import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Radio from '@material-ui/core/Radio';

import useStyles from '@sellermodules/income/pages/withdrawal/components/Card/style';

const IncomeListContent = ({
    entity_id, bank_name, account_number, bank_logo, formik,
    handleDeleteBank, name,
}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item xs={1} sm={1}>
                    <Radio
                        checked={formik.values.beneficiary_id === entity_id}
                        onChange={() => formik.setFieldValue('beneficiary_id', Number(entity_id))}
                        value={entity_id}
                        className={classes.radio}
                    />
                </Grid>
                <Grid item xs={10} sm={4}>
                    {bank_logo
                        ? (
                            <div
                                className={classes.bankImg}
                                style={{
                                    backgroundImage: `url(${bank_logo || '/assets/img/bank.svg'})`,
                                }}
                            />
                        )
                        : (
                            <div
                                className={classes.bankImg}
                            >
                                <img src="/assets/img/bank.svg" className="placeholder" alt="bank-place" />

                            </div>
                        )}
                </Grid>
                <Grid item xs={10} sm={6} className={classes.wallet}>
                    <span className={classes.text}>{bank_name || '-'}</span>
                    <br />
                    <span className={clsx(classes.text, 'big')}>{account_number}</span>
                    <br />
                    <span className={classes.text}>
                        a.n
                        {' '}
                        {name}
                    </span>
                </Grid>
                <Grid item xs={2} sm={1}>
                    <IconButton
                        className={classes.btn}
                        onClick={() => handleDeleteBank(entity_id)}
                    >
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>

    );
};

export default IncomeListContent;
