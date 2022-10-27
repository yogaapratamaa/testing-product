import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import useStyles from '@root/core/modules/return/pages/orderreplacement/components/style';
import TextField from '@common_textfield';
import Button from '@common_button';
import { StyledTableCell, StyledTableRow, spacing } from '@root/core/modules/return/pages/orderreplacement/components/variable';
import clsx from 'clsx';
import ProductReplacement from '@root/core/modules/return/pages/orderreplacement/components/ProductReplacement';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from '@i18n';

const ReturnOrderReplacementContent = ({ data, id, subsidiaryLookup }) => {
    const { t } = useTranslation(['common']);
    const classes = useStyles();
    const [listProduct, setlistProduct] = React.useState([]);

    const updateProductReplacement = (newData, index) => {
        setlistProduct((prev) => {
            const newListProduct = [...prev];
            newListProduct[index] = newData;
            return newListProduct;
        });
    };
    const handleValidationItem = (item) => {
        const variables = {
            warehouseLocationCode: item.warehouseLocationCode,
            subsidiary: item.subsidiary,
            courier: item.courier,
            returnId: id,
        };
        const errorMsg = [];
        data.items.forEach((el, index) => {
            if (!listProduct[index] || listProduct[index].length === 0) {
                errorMsg.push(`Product "${el.name}" doesn't have replacement item`);
            } else {
                listProduct[index].forEach((e) => {
                    if (!e.qty) {
                        errorMsg.push(`Product Replacement "${e.name}" doesnt have quantity`);
                    }
                });
            }
        });
        if (errorMsg.length === 0) {
            variables.items = listProduct;
            console.log(variables);
            window.toastMessage({
                open: true,
                text: 'Success submit return order replacement',
                variant: 'success',
            });
        } else {
            window.toastMessage({
                open: true,
                text: errorMsg.join(','),
                variant: 'error',
            });
        }
    };
    const getReturTotalQty = (index) => listProduct[index]?.reduce((total, val) => {
        if (val.qty) {
            // eslint-disable-next-line no-param-reassign
            total += val.qty;
        }
        return total;
    }, 0);
    const formikValidateItem = useFormik({
        initialValues: {
            warehouseLocationCode: data.warehouseLocationCode,
            subsidiary: data.subsidiary,
            courier: '',
        },
        validationSchema: Yup.object().shape({
            warehouseLocationCode: Yup.string().required('This field is required!'),
            subsidiary: Yup.string().required('This field is required!'),
            courier: Yup.string().required('This field is required!'),
        }),
        onSubmit: (values) => {
            handleValidationItem(values);
        },
    });
    return (
        <div className="row" style={{ paddingBottom: spacing }}>
            <div className={clsx('col-xs-12 col-sm-12', classes.productListContainer)}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Product Name</StyledTableCell>
                                <StyledTableCell>SKU Number</StyledTableCell>
                                <StyledTableCell>Qty Order</StyledTableCell>
                                <StyledTableCell>Qty Retur</StyledTableCell>
                                <StyledTableCell>Return Reason</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        {data && data.items.length !== 0 && (
                            <TableBody>
                                {data.items.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{row.name || '-'}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.sku || '-'}
                                        </StyledTableCell>
                                        <StyledTableCell>{row.quantity || '-'}</StyledTableCell>
                                        <StyledTableCell>
                                            {getReturTotalQty(index)}
                                        </StyledTableCell>
                                        <StyledTableCell>{row.reason || '-'}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                    {data && data.items.length === 0 && (
                        <Table size="small">
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell>
                                        <div className={classes.loading}>
                                            {t('common:No_records_to_display')}
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
            </div>
            <div className="col-xs-12 col-sm-6" style={{ display: 'grid', marginTop: spacing }}>
                <span>Warehouse*</span>
                <TextField
                    disabled
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="warehouseLocationCode"
                    value={formikValidateItem.values.warehouseLocationCode}
                    placeholder="Select warehouse"
                    error={!!(formikValidateItem.touched.warehouseLocationCode && formikValidateItem.errors.warehouseLocationCode)}
                    helperText={(formikValidateItem.touched.warehouseLocationCode && formikValidateItem.errors.warehouseLocationCode) || ''}
                    select
                >
                    <MenuItem key="a20" value="a20">
                        Warehouse Dummy
                    </MenuItem>
                </TextField>
            </div>
            <div className="col-xs-12 col-sm-6" style={{ display: 'grid', marginTop: spacing }}>
                <span>Subsidiary*</span>
                <TextField
                    disabled
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="subsidiary"
                    value={formikValidateItem.values.subsidiary}
                    placeholder="Select subsidiary"
                    error={!!(formikValidateItem.touched.subsidiary && formikValidateItem.errors.subsidiary)}
                    helperText={(formikValidateItem.touched.subsidiary && formikValidateItem.errors.subsidiary) || ''}
                    select
                >
                    {subsidiaryLookup.map((option) => (
                        <MenuItem key={option.code} value={option.code}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="col-xs-12 col-sm-6" style={{ display: 'grid', marginTop: spacing }}>
                <span>Courier*</span>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="courier"
                    value={formikValidateItem.values.courier}
                    placeholder="Select courier"
                    onChange={formikValidateItem.handleChange}
                    error={!!(formikValidateItem.touched.courier && formikValidateItem.errors.courier)}
                    helperText={(formikValidateItem.touched.courier && formikValidateItem.errors.courier) || ''}
                    select
                >
                    <MenuItem key="courier_test" value="courier_test">
                        Courier Dummy
                    </MenuItem>
                </TextField>
            </div>
            {data && data.items.length > 0 && data.items.map((row, index) => (
                <ProductReplacement key={index} data={row} index={index} onSubmit={updateProductReplacement} />
            ))}
            <div className="col-xs-12 col-sm-12">
                <div className="row center-xs" style={{ marginTop: spacing }}>
                    <div className="col-xs-6">
                        <Button
                            type="submit"
                            buttonType="black"
                            fullWidth
                            onClick={formikValidateItem.handleSubmit}
                        >
                            Submit Order Replacement
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ReturnOrderReplacementContent;
