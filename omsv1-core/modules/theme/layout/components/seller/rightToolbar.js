/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from 'js-cookie';
import { useTranslation } from '@i18n';
import { useRouter } from 'next/router';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { custDataNameCookie } from '@config';
import { removeIsLoginFlagging } from '@helper_auth';
import loginGqlService from '@modules/login/services/graphql';
import LanguageSelect from '@modules/theme/layout/components/languageSelect';
import {
    PRIMARY, TABLE_GRAY, PRIMARY_DARK, GRAY_LIGHT,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    iconButton: {
        backgroundColor: TABLE_GRAY,
        height: 46,
        width: 46,
        '& .icon': {
            height: 20,
            width: 20,
            fill: PRIMARY_DARK,
        },
        [theme.breakpoints.down('xs')]: {
            height: 30,
            width: 30,
            '& .icon': {
                height: 16,
                width: 16,
            },
        },
    },
    iconSvg: {
        '&.MuiSvgIcon-root': {
            height: 20,
            width: 20,
            fill: PRIMARY_DARK,
            verticalAlign: 'middle',
        },
    },
    lis: {
        margin: '0px 12px',
        '&:hover': {
            '& .MuiIconButton-root': {
                backgroundColor: PRIMARY,
                '& .icon': {
                    filter: 'brightness(0%) invert(100%)',
                },
            },
        },
        [theme.breakpoints.down('xs')]: {
            margin: '0px 6px',
        },
    },
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        padding: 4,
        background: PRIMARY,
        color: 'white',
        borderRadius: '50%',
        border: '1px solid white',
        height: 20,
        fontSize: 10,
        [theme.breakpoints.down('xs')]: {
            height: 18,
        },
    },
}))(Badge);

const RightToolbar = ({ notificationRes }) => {
    const { t } = useTranslation(['common']);
    const router = useRouter();
    const [removeCustomerToken] = loginGqlService.removeToken();
    const classes = useStyles();

    const handleLogout = () => {
        removeCustomerToken()
            .then(() => {
                removeIsLoginFlagging();
                Cookies.remove(custDataNameCookie);
                router.push('/login');
            })
            .catch(() => { });
    };
    const { loading, data } = notificationRes;

    return (
        <ul>
            <li className={classes.lis}>
                <IconButton className={classes.iconButton}>
                    <img alt="" src="/assets/img/layout/seller/chat.svg" className="icon" />
                </IconButton>
            </li>
            <li className={classes.lis}>
                <IconButton className={classes.iconButton}>
                    {/* {data?.getNotificationList.total_count
                        ? ( */}
                    <StyledBadge badgeContent={data?.getNotificationList.total_count} max={99} overlap="circular">
                        <img alt="" src="/assets/img/layout/notification.svg" className="icon" />
                    </StyledBadge>
                    {/* )
                        : <img alt="" src="/assets/img/layout/notification.svg" className="icon" />} */}
                </IconButton>
                <ul style={{ width: 270, left: -120 }}>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '15px 20px' }}>
                            <CircularProgress size={20} />
                        </div>
                    ) : (
                        <div>
                            <li className="viewMessage" style={{ textAlign: 'left', padding: '10px 20px' }}>
                                {t('common:You_have')}
                                {' '}
                                {data?.getNotificationList.total_count || 0}
                                {' '}
                                {t('common:notifications')}
                            </li>
                            {data?.getNotificationList?.items?.map((notif, idx) => (
                                <li
                                    key={idx}
                                    style={{
                                        color: 'black',
                                        borderTop: '1px solid #B1BCDB',
                                        margin: 0,
                                        textOverflow: 'ellipsis',
                                        padding: '10px 20px',
                                    }}
                                >
                                    <div style={{ color: '#9A9A9A', fontSize: 11, marginBottom: 5 }}>{notif.created_at}</div>
                                    <span style={{ color: '#000000', fontSize: 13, fontWeight: 'bold' }}>{notif.entity_type}</span>
                                    <br />
                                    <span
                                        style={{
                                            color: '#747474',
                                            fontSize: 12,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {notif.message.slice(0, 50)}
                                        ...
                                    </span>
                                </li>
                            ))}
                        </div>
                    )}
                </ul>
            </li>
            <li className={classes.lis}>
                <a href="#">
                    <IconButton className={classes.iconButton}>
                        <img alt="" src="/assets/img/layout/avatar.svg" className="icon" />
                    </IconButton>
                    {/* <KeyboardArrowDownIcon className={classes.iconSvg} /> */}
                </a>
                <ul style={{ padding: '15px 20px' }}>
                    <li>
                        <a className="linkOut" href="#">
                            {t('common:Edit_Profile')}
                        </a>
                        <div style={{ marginBottom: 20 }} />
                        <a className="linkOut" href="#" onClick={handleLogout}>
                            {t('common:Sign_Out')}
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                <LanguageSelect color={PRIMARY_DARK} />
            </li>

            <style jsx>
                {`
                    ul {
                        margin: 0;
                        list-style: none;
                        padding: 0;
                        float: right;
                        font-size: 10px;
                        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                        position: fixed;
                        right: 12px;
                        border-radius: 8px;
                    }
                    li {
                        display: inline-block;
                        position: relative;
                        vertical-align: middle;
                    }
                    li:hover > ul {
                        display: block;
                    }
                    ul ul {
                        position: absolute;
                        display: none;
                        margin: 0;
                        z-index: 999;
                        background: #fff;
                        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
                        right: -20px;
                        border: 1px solid ${GRAY_LIGHT};
                    }
                    ul ul li {
                        display: block;
                    }
                    ul ul ul {
                        position: absolute;
                        top: 0;
                        left: 100%;
                    }
                    a {
                        color: #ffffff;
                        text-decoration: none;
                        white-space: nowrap;
                        font-size: 14px;
                    }
                    a:hover {
                        border-bottom: 1px dashed #fff;
                        color: ${PRIMARY_DARK};
                    }
                    .linkOut {
                        color: ${PRIMARY_DARK};
                        font-size: 13px;
                    }
                    .viewMessage {
                        color: ${PRIMARY};
                        font-size: 12px;
                    }
                `}
            </style>
        </ul>
    );
};
export default RightToolbar;
