/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
import Router from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import Table from '@common_tableseller';
import Button from '@common_button';
import Checkbox from '@common_checkbox';

import { optionsProductType } from '@sellermodules/catalog/helpers';
import useStyles from '@sellermodules/catalog/pages/list/components/style';

const CatalogListContent = (props) => {
    const { data, loading, getProductList, t, isAllowDeleteProduct } = props;
    const classes = useStyles();
    const productList = (data && data.getProductList && data.getProductList.items) || [];
    const productTotal = (data && data.getProductList && data.getProductList.total_count) || 0;

    const [check, setCheck] = React.useState({
        simple: true,
        bundle: true,
        configurable: true,
    });

    const columns = [
        { field: 'entity_id', headerName: t('sellercatalog:ID'), hideable: true, sortable: true, initialSort: 'ASC' },
        { field: 'name', headerName: t('sellercatalog:Product_Name'), hideable: true, sortable: true },
        { field: 'sku', headerName: t('sellercatalog:SKU'), hideable: true, sortable: true },
        { field: 'type_id', headerName: t('sellercatalog:Product_Type'), hideable: true, sortable: true },
        { field: 'product_price', headerName: t('sellercatalog:Price'), hideable: true },
        { field: 'product_special_price', headerName: t('sellercatalog:Special_Price'), hideable: true },
        { field: 'productStatus', headerName: t('sellercatalog:Status'), hideable: true },
        { field: 'approval_status', headerName: t('sellercatalog:Approval_Status'), hideable: true, hidden: true },
    ];

    const rows = productList.map((product) => ({
        ...product,
        id: product.entity_id,
        productStatus: product.product_status.label,
        approval_status: product.approval_status === '1' ? t('sellercatalog:Approved') : t('sellercatalog:Not_Approved'),
        actions: () => {
            let valueType = optionsProductType.find((option) => product.type_id === option.label)?.value;
            if (!valueType) {
                valueType = 'simple';
            }
            return (
                <Link href={`/product/productlist/edit${valueType === 'simple' ? '' : valueType}/${product.entity_id}`}>
                    <a className="link-button">{t('sellercatalog:View')}</a>
                </Link>
            );
        },
    }));

    const rowActions = [
        {
            label: t('sellercatalog:Edit_Product'),
            confirmDialog: true,
            // onClick: async (id) => {
            //     console.log('edit', id);
            // },
        },
        {
            label: t('sellercatalog:Duplicate_Product'),
            confirmDialog: true,
            // onClick: async (id) => {
            //     console.log('duplicate', id);
            // },
            message: t('common:Are_you_sure_want_to_delete_selected_items'),
        },
        {
            label: t('sellercatalog:Delete'),
            confirmDialog: true,
            // onClick: async (id) => {
            //     console.log('delete', id);
            // },
            message: t('common:Are_you_sure_want_to_delete_selected_items'),
            hide: !isAllowDeleteProduct,
        },
    ];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElCat, setAnchorElCat] = React.useState(null);

    const menuAdd = [
        {
            label: t('sellercatalog:Add_at_Once'),
            onClick: () => Router.push('/seller/catalog/organize/add'),
        },
        {
            label: t('sellercatalog:Change_at_Once'),
            onClick: () => Router.push('/seller/catalog/organize/change'),
        },
    ];

    const menuCatalog = [
        {
            key: 'simple',
            label: t('sellercatalog:Simple_Product'),
        },
        {
            key: 'bundle',
            label: t('sellercatalog:Bundle_Product'),
        },
        {
            key: 'configurable',
            label: t('sellercatalog:Configurable_Product'),
        },
    ];

    const handleClickMenuItem = (onClick) => {
        if (onClick) onClick();
    };

    const handleClickOpenButton = (event, set) => {
        set(event.currentTarget);
    };

    const handleCheck = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
    };

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);

    const toolActionsRight = [
        <>
            <Button
                className={clsx(classes.btnAction, 'gray')}
                onClick={(e) => handleClickOpenButton(e, setAnchorEl)}
                endIcon={
                    <KeyboardArrowRightIcon className={getArrowClass(anchorEl)} />
                }
            >
                {t('sellercatalog:Set_at_Once')}
            </Button>
            <Menu
                elevation={0}
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                className={classes.menuAction}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {menuAdd.map((menuItem, i) => (
                    <MenuItem key={i} onClick={() => { setAnchorEl(null); handleClickMenuItem(menuItem.onClick); }}>
                        {menuItem.label}
                    </MenuItem>
                ))}
            </Menu>
        </>,
        <Button
            className={classes.btnAction}
            onClick={() => Router.push('/seller/catalog/create')}
            startIcon={
                <img src="/assets/img/add.svg" alt="add-icon" />
            }
        >
            {t('common:Add_Product')}
        </Button>,
    ];

    const toolActionsLeft = [
        <>
            <Button
                className={clsx(classes.btnAction, 'gray')}
                onClick={(e) => handleClickOpenButton(e, setAnchorElCat)}
                endIcon={
                    <KeyboardArrowRightIcon className={getArrowClass(anchorElCat)} />
                }
            >
                {t('sellercatalog:Category')}
            </Button>
            <Menu
                elevation={0}
                getContentAnchorEl={null}
                anchorEl={anchorElCat}
                keepMounted
                open={Boolean(anchorElCat)}
                onClose={() => setAnchorElCat(null)}
                className={classes.menuAction}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {menuCatalog.map((menuItem) => (
                    <MenuItem key={menuItem.key}>
                        <Checkbox name={menuItem.key} label={menuItem.label} checked={check[menuItem.key]} setChecked={handleCheck} />
                    </MenuItem>
                ))}
            </Menu>
        </>,
    ];

    return (
        <Table
            header={t('sellercatalog:Catalog')}
            toolActionsRight={toolActionsRight}
            toolActionsLeft={toolActionsLeft}
            columns={columns}
            getRows={getProductList}
            rows={rows}
            rowActions={rowActions}
            loading={loading}
            count={productTotal}
            showCheckbox
            searchPlaceholder={t('common:Search_product_name_or_SKU')}
        />
    );
};

export default CatalogListContent;
