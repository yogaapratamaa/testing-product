/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// import Breadcrumb from '@common_breadcrumb';
import Hidden from '@material-ui/core/Hidden';
import Sidebar from '@modules/theme/layout/components/sidebar';
import SidebarSeller from '@modules/theme/layout/components/seller/sidebar';
import Header from '@modules/theme/layout/components/header';
import HeaderSeller from '@modules/theme/layout/components/seller/header';
import gqlService from '@modules/theme/services/graphql';
import gqlNotification from '@modules/notification/services/graphql';
import gqlBalance from '@sellermodules/income/services/graphql';
import Head from 'next/head';
import Cookies from 'js-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';
import { helpersMenuList } from '@modules/theme/helpers';
import sellerMenus from '@modules/theme/helpers/seller';
import { useTranslation } from '@i18n';
import useStyles from '@modules/theme/layout/style';

const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const Message = dynamic(() => import('@common_toast'), { ssr: false });

const Layout = (props) => {
    const {
        children, pageConfig, useBreadcrumbs = true, plainMode = false, seller,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [loadLang, setLoadLang] = React.useState(false);
    const [activeParentMenu, setActiveParentMenu] = React.useState();
    const [activeChildMenu, setActiveChildMenu] = React.useState();
    const [backdropLoader, setBackdropLoader] = React.useState(false);
    const [currentLocation, setCurrentLocation] = React.useState('');
    const [toastMessage, setToastMessage] = React.useState({
        open: false,
        variant: '',
        text: '',
    });
    const storeLogo = Cookies.getJSON('store_logo');
    const { t } = useTranslation(['common, menu']);
    const language = Cookies.getJSON('language');

    const dataAcl = [];
    const varianAcl = () => {
        const { loading, data } = gqlService.customerAccessControlList();
        if (loading) {
            return <>Loading...</>;
        }

        if (!data) {
            return <>Data not found!</>;
        }
        dataAcl.push(data.customerAccessControlList);
    };

    const dataStoreConfigWave = [];
    const varianStoreConfigWave = () => {
        const { loading, data } = gqlService.getStoreConfig({
            path: 'swiftoms_pickpack/wave/enable',
        });
        if (loading) {
            return <>Loading...</>;
        }

        if (!data) {
            return <>Data not found!</>;
        }
        dataStoreConfigWave.push(data.getStoreConfig);
    };

    const dataStoreConfigBatch = [];
    const varianStoreConfigBatch = () => {
        const { loading, data } = gqlService.getStoreConfig({
            path: 'swiftoms_pickpack/batch/enable',
        });
        if (loading) {
            return <>Loading...</>;
        }

        if (!data) {
            return <>Data not found!</>;
        }
        dataStoreConfigBatch.push(data.getStoreConfig);
    };

    const dataStoreConfigTada = [];
    const varianStoreConfigTada = () => {
        const { loading, data } = gqlService.getStoreConfig({
            path: 'swiftoms_tada/general/enable',
        });
        if (loading) {
            return <>Loading...</>;
        }

        if (!data) {
            return <>Data not found!</>;
        }
        dataStoreConfigTada.push(data.getStoreConfig);
    };

    const dataStoreConfigVendor = [];
    const varianStoreConfigVendor = () => {
        const { loading, data } = gqlService.getStoreConfig({
            path: 'swiftoms_vendorportal/configuration/enable_vendor_portal',
        });
        if (loading) {
            return <>Loading...</>;
        }

        if (!data) {
            return <>Data not found!</>;
        }
        dataStoreConfigVendor.push(data.getStoreConfig);
    };

    const dataStoreConfigBeneficiaries = [];
    const varianStoreConfigBeneficiaries = () => {
        const { loading, data } = gqlService.getStoreConfig({
            path: 'swiftoms_vendorportal/configuration/beneficiaries',
        });
        if (loading) {
            return <>Loading...</>;
        }

        if (!data) {
            return <>Data not found!</>;
        }
        dataStoreConfigBeneficiaries.push(data.getStoreConfig);
    };

    const balance = [];
    const sellerBalance = () => {
        const { loading, data } = gqlBalance.getVendorIrisBalance({
            path: 'swiftoms_vendorportal/configuration/beneficiaries',
        });
        if (loading) {
            return <>Loading...</>;
        }

        if (!data) {
            return <>Data not found!</>;
        }
        balance.push(data.getVendorIrisBalance);
    };

    const [getNotificationList, notificationRes] = gqlNotification.getNotificationList({
        pageSize: 4,
        currentPage: 1,
        filter: {
            is_read: {
                eq: '0',
            },
            type: { eq: 'web' },
        },
        sort: {
            id: 'ASC',
        },
    });

    const menuList = seller ? sellerMenus(t) : helpersMenuList(t);
    const mappedMenuList = menuList.reduce((accumulator, parent) => {
        const parentBreadcrumb = { url: parent.url || '', label: parent.label };
        const mappedParent = {
            key: parent.key,
            url: parent.url || '',
            breadcrumb: [parentBreadcrumb],
        };
        accumulator.push(mappedParent);
        if (parent && parent.children && parent.children.length) {
            const mappedChildren = parent.children.map((child) => {
                const childBreadcrumb = [parentBreadcrumb, { url: child.url || '', label: child.label }];
                return {
                    key: child.key,
                    url: child.url || '',
                    parentKey: parent.key,
                    breadcrumb: childBreadcrumb,
                };
            });
            accumulator = [...accumulator, ...mappedChildren];
        }
        return accumulator;
    }, []);

    const getBreadcrumbData = () => {
        const activeMenu = mappedMenuList.find((e) => e.url === router.pathname);
        let activeMenuBreadcrumb = [];
        if (pageConfig?.customBreadcrumb) {
            activeMenuBreadcrumb = pageConfig.customBreadcrumb;
        } else if (activeMenu) {
            activeMenuBreadcrumb = activeMenu && activeMenu.breadcrumb;
        } else {
            const activeMenuSecondary = mappedMenuList.find((e) => e.url === router.pathname?.split('/').slice(0, 3).join('/'));
            activeMenuBreadcrumb = (activeMenuSecondary && activeMenuSecondary.breadcrumb) || [];
            activeMenuBreadcrumb.push({ url: router.asPath, label: pageConfig?.title ? pageConfig.title : currentLocation });
        }
        return [{ url: '/', label: 'Home' }, ...activeMenuBreadcrumb];
    };

    const handleCloseMessage = () => {
        setToastMessage({ ...toastMessage, open: false });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.backdropLoader = setBackdropLoader;
            window.toastMessage = setToastMessage;
            if (window.innerWidth >= 768) setOpen(true);
        }
    }, []);

    useEffect(() => {
        if (router.pathname.split('/')?.[1] !== 'login' && Cookies.get('isLogin') === '1') {
            getNotificationList();
        }
    }, []);

    const removeLastPathOnUrl = (url) => {
        const output = url.split('/').slice(0, 3).join('/');
        return output;
    };

    useEffect(() => {
        const activeMenuFirstChild = mappedMenuList.find((e) => e.url === (router && router.asPath) || e.url === (router && router.pathname));

        if (activeMenuFirstChild && activeMenuFirstChild.parentKey) {
            if (activeMenuFirstChild && activeMenuFirstChild.parentKey) {
                setActiveChildMenu(activeMenuFirstChild);
                setActiveParentMenu(mappedMenuList.find((e) => e.key === activeMenuFirstChild.parentKey));
            } else {
                setActiveParentMenu(activeMenuFirstChild);
            }
        } else {
            let activeMenuSecondChild = null;

            for (let i = 0; i < mappedMenuList.length; i += 1) {
                if (mappedMenuList[i].url.includes(removeLastPathOnUrl(router && router.asPath) || removeLastPathOnUrl(router && router.pathname))) {
                    activeMenuSecondChild = mappedMenuList[i];
                    break;
                }
            }

            if (activeMenuSecondChild && activeMenuSecondChild.parentKey) {
                setActiveChildMenu(activeMenuSecondChild);
                setActiveParentMenu(mappedMenuList.find((e) => e.key === activeMenuSecondChild.parentKey));
            } else {
                setActiveParentMenu(activeMenuSecondChild);
            }
        }
    }, [router]);

    const showHeader = () => {
        if (typeof pageConfig === 'undefined' || (pageConfig && typeof pageConfig.header === 'undefined')) {
            return true;
        }
        return pageConfig && pageConfig.header;
    };

    const showSidebar = () => {
        if (typeof pageConfig === 'undefined' || (pageConfig && typeof pageConfig.sidebar === 'undefined')) {
            return true;
        }
        return pageConfig && pageConfig.sidebar;
    };

    useEffect(() => {
        setCurrentLocation((old) => {
            if (activeChildMenu?.breadcrumb?.filter((val) => val?.url)?.[0]?.label) {
                const labelMenu = activeChildMenu?.breadcrumb?.filter((val) => val?.url)?.[0]?.label;
                if (router.pathname.split('/').length > 3) {
                    const lengthPath = router.pathname.split('/').length;

                    if (!router.pathname.split('/')[lengthPath - 1].includes('[')) {
                        const pathRoute = router.pathname.split('/')[lengthPath - 1];
                        return `${pathRoute?.charAt(0)?.toUpperCase() + pathRoute.slice(1)} ${labelMenu}`;
                    }
                    const pathRoute = router.pathname.split('/')[lengthPath - 2];
                    return `${pathRoute?.charAt(0)?.toUpperCase() + pathRoute.slice(1)} ${labelMenu}`;
                }
                return labelMenu;
            }

            if (activeParentMenu?.breadcrumb?.[0]?.label) {
                return activeParentMenu?.breadcrumb?.[0]?.label;
            }

            if (router.pathname.split('/')?.[1] === 'login') {
                return 'Login';
            }

            if (router.pathname.split('/')?.[1] === 'requestreturn') {
                return 'Request Return';
            }

            return old;
        });
    }, [activeChildMenu, activeParentMenu, router]);

    useEffect(() => {
        if (language) {
            setLoadLang(true);
            setTimeout(() => { setLoadLang(false); }, 500);
        }
    }, [language]);

    return (
        <>
            <Head>
                <title>{pageConfig?.title ? pageConfig.title : currentLocation}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={classes.root}>
                {showHeader() && !plainMode && (
                    seller ? (
                        <HeaderSeller
                            notificationRes={notificationRes}
                            mappedMenuList={sellerMenus}
                            open={open}
                            setOpen={setOpen}
                            storeLogo={storeLogo}
                        />
                    )
                        : (
                            <Header
                                notificationRes={notificationRes}
                                mappedMenuList={mappedMenuList}
                                breadcrumbData={getBreadcrumbData()}
                                open={open}
                                setOpen={setOpen}
                                storeLogo={storeLogo}
                            />
                        )
                )}
                {showSidebar() && !plainMode && (
                    <>
                        {seller ? (
                            <SidebarSeller
                                activeParentMenu={activeParentMenu}
                                setActiveParentMenu={setActiveParentMenu}
                                activeChildMenu={activeChildMenu}
                                setActiveChildMenu={setActiveChildMenu}
                                open={open}
                                setOpen={setOpen}
                                menuList={menuList}
                                storeLogo={storeLogo}
                                balance={balance}
                            >
                                {sellerBalance()}
                            </SidebarSeller>
                        )
                            : (
                                <Sidebar
                                    activeParentMenu={activeParentMenu}
                                    setActiveParentMenu={setActiveParentMenu}
                                    activeChildMenu={activeChildMenu}
                                    setActiveChildMenu={setActiveChildMenu}
                                    open={open}
                                    setOpen={setOpen}
                                    menuList={menuList}
                                    aclDetail={dataAcl}
                                    storeConfigDetailWave={dataStoreConfigWave}
                                    storeConfigDetailBatch={dataStoreConfigBatch}
                                    storeLogo={storeLogo}
                                    storeConfigDetailTada={dataStoreConfigTada}
                                    storeConfigDetailVendor={dataStoreConfigVendor}
                                    storeConfigBeneficiaries={dataStoreConfigBeneficiaries}
                                >
                                    {varianAcl()}
                                    {varianStoreConfigWave()}
                                    {varianStoreConfigBatch()}
                                    {varianStoreConfigTada()}
                                    {varianStoreConfigVendor()}
                                    {varianStoreConfigBeneficiaries()}
                                </Sidebar>
                            )}
                    </>
                )}
                <main className={showHeader() ? classes.content : classes.contentNoHeader}>
                    <Loading open={backdropLoader} />
                    <Message open={toastMessage.open} variant={toastMessage.variant} setOpen={handleCloseMessage} message={toastMessage.text} />
                    {/* necessary for content to be below app bar */}
                    <div className={showHeader() && !plainMode ? classes.toolbar : ''} />
                    {showHeader() && useBreadcrumbs && !plainMode && (
                        <Hidden smUp implementation="css">
                            {/* <Breadcrumb data={getBreadcrumbData()} /> */}
                            <div style={{ height: 25 }} />
                        </Hidden>
                    )}
                    {loadLang ? (
                        <div className={classes.progressContainer}>
                            <CircularProgress className={classes.progress} size={80} />
                        </div>
                    )
                        : children}
                </main>
            </div>
        </>
    );
};

export default Layout;
