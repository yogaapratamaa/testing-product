import Button from '@common_button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Table from '@common_tableoffset';
import { searchCatalogProduct } from '@modules/return/services/graphql';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { StyledTableCell, StyledTableRow, spacing } from '@root/core/modules/return/pages/orderreplacement/components/variable';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableMui from '@material-ui/core/Table';
import TextField from '@common_textfield';
import useStyles from '@root/core/modules/return/pages/orderreplacement/components/style';
import React from 'react';

const ProductReplacement = ({ onSubmit, index, data }) => {
    const classes = useStyles();
    const [listProduct, setlistProduct] = React.useState([]);
    const handleSubmit = (newData) => {
        setlistProduct((prev) => {
            const newListProduct = [...prev];
            newData.forEach((row) => {
                const getProductIndex = newListProduct.findIndex((el) => el.id === row.id);
                if (getProductIndex !== -1) {
                    if (newListProduct[getProductIndex].qty) {
                        newListProduct[getProductIndex].qty += row.qty;
                    } else {
                        newListProduct[getProductIndex].qty = row.qty;
                    }
                } else {
                    newListProduct.push(row);
                }
            });
            return newListProduct;
        });
    };
    const handleQtyChange = (idx, val) => {
        setlistProduct((prev) => {
            const newListProduct = [...prev];
            if (val === 0) {
                newListProduct.splice(idx, 1);
            } else {
                newListProduct[idx].qty = val;
            }
            return newListProduct;
        });
    };
    React.useEffect(() => onSubmit(listProduct, index), [listProduct]);

    return (
        <div style={{ marginTop: spacing }} className="col-xs-12 col-sm-12">
            <Button buttonType="outlined" style={{ marginBottom: spacing }}>
                Produk
                {' '}
                {data.name || '-'}
                {' '}
                replaced with
                <ArrowForwardIosIcon fontSize="small" style={{ marginLeft: spacing }} />
            </Button>
            <TableContainer component={Paper} style={{ marginBottom: spacing }}>
                <TableMui aria-label="collapsible table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Product</StyledTableCell>
                            <StyledTableCell>SKU</StyledTableCell>
                            <StyledTableCell>Quantity</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {listProduct && listProduct.length !== 0 && listProduct.map((row, idx) => (
                            <StyledTableRow key={idx}>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.sku || '-'}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <TextField
                                        error={!row.qty}
                                        className={classes.fieldRoot}
                                        value={row.qty || ''}
                                        onChange={(e) => { handleQtyChange(idx, parseInt(e.target.value, 10)); }}
                                        variant="outlined"
                                        type="number"
                                    />
                                </StyledTableCell>
                                <StyledTableCell>{row.unitPerPrice}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableMui>
                {listProduct.length === 0 && (
                    <TableMui size="small">
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell>
                                    <div className={classes.loading}>
                                        Please add the replacement item
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </TableMui>
                )}

            </TableContainer>
            <ProductReplacementDialog onSubmit={handleSubmit} />
        </div>
    );
};

const MemoizeTable = React.memo((props) => (
    <Table {...props} />), (prevProps, nextProps) => prevProps.loading === nextProps.loading);

const ProductReplacementDialog = ({ onSubmit }) => {
    const classes = useStyles();
    const [rowQty, setRowQty] = React.useState({});
    const [selectedRow, setSelectedRow] = React.useState([]);
    const [getSearchCatalogProduct, { loading, data }] = searchCatalogProduct();
    const [open, setOpen] = React.useState(false);

    const totalData = (data && data.searchCatalogProduct && data.searchCatalogProduct.total) || 0;
    const columns = [
        {
            field: 'name', headerName: 'Product name', hideable: false,
        },
        {
            field: 'sku', headerName: 'SKU', hideable: false,
        },
        {
            field: 'qty', headerName: 'Quantity', hideable: false,
        },
        {
            field: 'unitPerPrice', headerName: 'Price', hideable: false,
        },
    ];
    const handleQtyChange = (id, val) => {
        setRowQty((prev) => ({ ...prev, [id]: val }));
    };
    const getData = (data && data.searchCatalogProduct && data.searchCatalogProduct.items) || [];
    const rows = getData.map((row) => ({
        ...row,
        qty: (
            <TextField
                className={classes.fieldRoot}
                defaultValue={rowQty[row.id]}
                onChange={(e) => { handleQtyChange(row.id, parseInt(e.target.value, 10)); }}
                variant="outlined"
                type="number"
            />
        )
        ,
    }));

    const handleClickOpen = () => {
        setOpen(true);
        setRowQty({});
        setSelectedRow([]);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        const finalSelectedRow = selectedRow.reduce((res, val) => {
            if (rowQty[val.id]) {
                res.push({ ...val, qty: rowQty[val.id] });
            }
            return res;
        }, []);
        if (finalSelectedRow.length === 0) {
            window.toastMessage({
                open: true,
                text: 'No data selected, plase make sure to check 1 product and fill the quantity.',
                variant: 'warning',
            });
        } else {
            onSubmit(finalSelectedRow);
            handleClose();
        }
    };
    const updateSelectedRow = (val) => {
        setSelectedRow(val);
    };

    return (
        <div>
            <Button variant="text" buttonType="link" onClick={handleClickOpen}>
                <AddIcon fontSize="small" />
                Add more replacement item for produk x
            </Button>
            <Dialog
                fullWidth
                maxWidth="md"
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle>
                    Product x replaced with
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <MemoizeTable
                        searchable
                        rows={rows}
                        totalData={totalData}
                        getRows={getSearchCatalogProduct}
                        showCheckbox
                        loading={loading}
                        columns={columns}
                        handleChecked={updateSelectedRow}
                    />
                </DialogContent>
                <DialogActions>
                    <div className="col-xs-12 col-sm-12">
                        <div className="row center-xs">
                            <div className="col-xs-6">
                                <Button
                                    type="submit"
                                    buttonType="black"
                                    fullWidth
                                    onClick={handleSubmit}
                                >
                                    Submit Order Replacement
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProductReplacement;
