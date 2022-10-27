import React from 'react';
// import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import RightToolbar from '@modules/theme/layout/components/rightToolbar';
import { drawerWidth } from '@modules/theme/layout/helpers';
import TopMenu from '@modules/theme/layout/components/topmenu';
import {
    PRIMARY, GRAY_LIGHT, WHITE, BLACK,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    swiftOmsLogo: {
        display: 'contents',
        [theme.breakpoints.down('xs')]: {
            '& img': {
                height: 36,
                verticalAlign: 'middle',
            },
            '& h1': {
                fontSize: '12px',
            },
        },
    },
    appBarShiftDesktop: {
        backgroundColor: WHITE,
        position: 'fixed',
        width: '100vw',
        height: 64,
    },
    appBar: {
        backgroundColor: WHITE,
        // opacity: '0.8',
        color: BLACK,
        boxShadow: 'none',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.down('xs')]: {
            // marginRight: 0,
            // transform: 'translate(0px, -2px)',
            '& .MuiToolbar-gutters': {
                paddingLeft: 5,
            },
        },
    },

    appBarShift: {
        marginLeft: drawerWidth,
        // width: `calc(100% - ${drawerWidth + 1}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    togleMenuButton: {
        marginRight: -6,
        width: 24,
        height: 24,
        transform: 'translateX(-24px)',
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
            transform: 'translate(0px, -2px)',
        },
    },
    togleMenuIcon: {
        fontSize: 27,
        color: PRIMARY,
        borderRadius: '3px',
        background: WHITE,
        boxShadow: `0px 3px 6px ${GRAY_LIGHT}`,
    },
}));

const Header = ({
    open,
    setOpen,
    menuList,
    // notificationRes,
    activeParentMenu,
    setActiveParentMenu,
    // activeChildMenu,
    // setActiveChildMenu,
    //  storeLogo,
}) => {
    const classes = useStyles();
    const HeadLogo = () => (
        <div className={classes.swiftOmsLogo}>
            <div>
                <img
                    alt="logo"
                    src="/assets/img/swiftoms_logo_v2.png"
                />
            </div>
            <div>
                <h1>
                    |
                    OMS v2
                </h1>
            </div>
        </div>

    );
    const HeaderMobile = () => (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <HeadLogo />
                {/* <RightToolbar notificationRes={notificationRes} /> */}
                <RightToolbar />
            </Toolbar>
            <TopMenu
                activeParentMenu={activeParentMenu}
                setActiveParentMenu={setActiveParentMenu}
                menuList={menuList}
                open={open}
                setOpen={setOpen}
            />
        </AppBar>
    );

    const HeaderDesktop = () => (
        <AppBar
            className={classes.appBar}
        >
            <Toolbar>
                <HeadLogo />
                {/* <RightToolbar notificationRes={notificationRes} /> */}
                <RightToolbar />
            </Toolbar>
            <TopMenu
                activeParentMenu={activeParentMenu}
                setActiveParentMenu={setActiveParentMenu}
                menuList={menuList}
                open={open}
                setOpen={setOpen}
            />
        </AppBar>
    );

    return (
        <>
            <Hidden smUp implementation="css">
                {HeaderMobile()}
            </Hidden>
            <Hidden xsDown implementation="css">
                {HeaderDesktop()}
            </Hidden>
        </>
    );
};

export default Header;
