/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTranslation } from '@i18n';
import classnames from 'classnames';
import {
    TABLE_GRAY, PRIMARY, WHITE,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    btn: {
        color: TABLE_GRAY,
        boxShadow: 'none',
        // },
    },
    btnPurple: {
        background: PRIMARY,
        color: WHITE,
        boxShadow: 'none',
        '&:hover': {
            background: PRIMARY,
            boxShadow: 'none',
        },
    },
}));

const MenuPopover = (props) => {
    const { t } = useTranslation(['common']);
    const {
        openButton,
        menuItems,
        icon,
        iconPosition = 'start',
        color = TABLE_GRAY,
        className,
        buttonType = 'outlined',
        useMenuStyle = true,
    } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const styles = useStyles();

    const handleClickOpenButton = (event) => {
        setAnchorEl(event.currentTarget);
        if (openButton && openButton.onClick) openButton.onClick();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickMenuItem = (onClick) => {
        handleClose();
        if (onClick) onClick();
    };

    return (
        <div>
            <Button
                variant="contained"
                buttonType={buttonType}
                className={classnames(useMenuStyle && (color === TABLE_GRAY ? styles.btn : styles.btnPurple), className)}
                onClick={handleClickOpenButton}
            >
                {iconPosition === 'start'
                    ? (
                        <>
                            {openButton.label}
                            {icon}
                        </>
                    )
                    : (
                        <>
                            {icon}
                            {openButton.label}
                        </>
                    )}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {menuItems.map((menuItem, i) => (menuItem.hide ? null
                    : (
                        <MenuItem key={i} onClick={() => handleClickMenuItem(menuItem.onClick)}>
                            {menuItem.label}
                        </MenuItem>
                    )
                ))}
            </Menu>
        </div>
    );
};

export default MenuPopover;
