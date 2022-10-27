/* eslint-disable no-nested-ternary */
import clsx from 'clsx';
import classNames from 'classnames';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import useStyles from '@sellermodules/order/pages/detail/components/style';

const ItemsTable = (props) => {
    const {
        orderItem, t,
    } = props;

    const classes = useStyles();

    return (
        <TableContainer>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={clsx(classes.tr, 'head')}>
                        <TableCell className={classNames(classes.th, 'first')}>
                            {t('order:Product_Name')}
                        </TableCell>
                        <TableCell className={classes.th}>{t('order:SKU')}</TableCell>
                        <TableCell className={classes.th}>{t('order:Price')}</TableCell>
                        <TableCell className={classes.th}>{t('order:Qty')}</TableCell>
                        <TableCell className={classes.th}>{t('order:Subtotal')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderItem?.map((item) => (
                        <>
                            <TableRow>
                                <TableCell className={classNames(classes.td, 'first')}>
                                    {item.isChild ? `- ${item.name}` : (item.name || '-')}
                                </TableCell>
                                <TableCell className={classes.td}>{item.sku}</TableCell>
                                <TableCell className={classes.td}>{item.price}</TableCell>
                                <TableCell className={classes.td}>{item.qty}</TableCell>
                                <TableCell className={classes.td}>{item.isChild ? '' : item.subtotal}</TableCell>
                            </TableRow>
                            {!!item.remark
                            && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Paper className={classes.notePaper}>
                                            <Grid container className={classes.gridNote}>
                                                <Grid item>
                                                    <img src="/assets/img/note.svg" alt="note" style={{ marginRight: 10 }} />
                                                </Grid>
                                                <Grid item>
                                                    {item.remark}
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </TableCell>
                                </TableRow>
                            )}
                        </>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ItemsTable;
