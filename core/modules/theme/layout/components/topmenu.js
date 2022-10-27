/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import {
  GRAY_LIGHT, WHITE, BLACK, PRIMARY, PRIMARY_SOFT,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    divMenu: {
        color: GRAY_LIGHT,
        '& .itemText span': {
            fontWeight: 700,
            fontSize: 20,
            textTransform: 'capitalize',
            [theme.breakpoints.down('xs')]: {
              fontSize: 12,
          },
        },
    },
    menuList: {
        background: GRAY_LIGHT,
        color: BLACK,
        display: 'flex',
        padding: '0 10px',
        [theme.breakpoints.down('xs')]: {
          padding: 0,
      },

    },
    menuItem: {
        // marginTop: 8,
        // paddingLeft: 20,
        // '&.open': { borderRadius: '0 26px 26px 0' },
        '&:hover': {
            background: PRIMARY,
            color: PRIMARY_SOFT,
        },
        '&.active': {
            background: PRIMARY,
            color: WHITE,
        },
    },
    menuChildItem: {
        paddingLeft: 70,
        '&.active span': {
            color: PRIMARY,
            fontWeight: 'bold',
        },
        '&:hover span': {
            color: PRIMARY,
            fontWeight: 'bold',
        },
        '&:hover': {
            background: 'transparent',
        },
    },
    textStyle: {
      textDecoration: 'none',
      color: BLACK,
    },
}));

const TopMenu = ({
    activeParentMenu,
    setActiveParentMenu,
    // activeChildMenu,
    // setActiveChildMenu,
    open,
    setOpen,
    menuList,
    // aclDetail,
    // storeConfigDetailBatch,
    // storeConfigDetailWave,
    // storeLogo,
    // storeConfigDetailTada,
    // storeConfigDetailVendor,
    // storeConfigBeneficiaries,
}) => {
    const router = useRouter();
    const classes = useStyles();
    const handleClickParent = (menu) => {
        if (menu.key === (activeParentMenu && activeParentMenu.key)) {
            setActiveParentMenu(null);
        } else {
            setActiveParentMenu(menu);
            if (menu.url) router.push(menu.url);
        }
        setOpen(true);
        if (menu.url) router.push(menu.url);
    };

    const TopMenuView = () => (
        <div className={classes.menuList}>
            {menuList
              && menuList.map((menu) => (
                  <div key={menu.key}>
                      <div className={classes.divMenu} key={menu.key}>
                          <Link href={`${menu.url}`} key={menu.key}>
                              <a href={`${menu.url}`} className={classes.textStyle}>
                                  <ListItem
                                      button
                                      className={clsx(
                                        classes.menuItem,
                                        open ? 'open' : 'close',
                                        menu.key === (activeParentMenu && activeParentMenu.key) && 'active',
                                      )}
                                      onClick={() => handleClickParent(menu)}
                                  >
                                      <ListItemText className="itemText" primary={menu.label} />
                                  </ListItem>
                              </a>
                          </Link>
                      </div>
                  </div>
              ))}
        </div>
    );

    return (
        <>
            {TopMenuView()}
        </>
    );
};

export default TopMenu;
