/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import Badge from '@material-ui/core/Badge';
// import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import loginGqlService from '@modules/login/services/graphql';
import { removeIsLoginFlagging } from '@helper_auth';
import Cookies from 'js-cookie';
import { custDataNameCookie } from '@config';
import { useRouter } from 'next/router';
// import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { useTranslation } from '@i18n';
// import LanguageSelect from '@modules/theme/layout/components/languageSelect';
import {
    PRIMARY, WHITE, BLACK,
} from '@theme_color';

// const StyledBadge = withStyles(() => ({
//     badge: {
//         right: 5,
//         top: 3,
//         padding: '0 4px',
//         background: PRIMARY,
//     },
// }))(Badge);

const RightToolbar = () => {
    // const { t } = useTranslation(['common']);
    const router = useRouter();
    const [removeCustomerToken] = loginGqlService.removeToken();
    const [getCustomer, getCustomerRes] = loginGqlService.getCustomer();
    const getCustomerFromGql = () => getCustomerRes && getCustomerRes.data && getCustomerRes.data.getCurrentUser;
    const [username, setUsername] = React.useState('');
    const handleSetUsername = (customer) => {
        const fullname = (customer && customer.fullname);
        setUsername(`${fullname}`);
    };
    // eslint-disable-next-line no-console

    React.useEffect(() => {
        if (Cookies.getJSON(custDataNameCookie)) {
            handleSetUsername(Cookies.getJSON(custDataNameCookie));
        } else {
            getCustomer();
        }
    }, []);

    React.useEffect(() => {
        if (getCustomerFromGql()) {
            Cookies.set(custDataNameCookie, getCustomerFromGql());
            handleSetUsername(getCustomerFromGql());
        }
    }, [getCustomerFromGql()]);

    const handleLogout = () => {
        removeCustomerToken()
            .then(() => {
                removeIsLoginFlagging();
                Cookies.remove(custDataNameCookie);
                router.push('/login');
            })
            .catch(() => {});
    };

    return (
        <ul>
            <li>
                <a href="#">
                    <Hidden xsDown implementation="css">
                        Hello
                        {' '}
                        {username}
                        <KeyboardArrowDownIcon style={{ verticalAlign: 'middle', marginLeft: 5 }} />
                    </Hidden>
                    <Hidden smUp implementation="css">
                        <AccountCircleOutlinedIcon style={{ transform: 'translateY(2px)', fontSize: 27, color: PRIMARY }} />
                    </Hidden>
                </a>
                <ul>
                    {/* <li>
                        <a className="linkOut" href="/myaccount">
                            My Account
                        </a>
                    </li> */}
                    <li>
                        <a className="linkOut" href="#" onClick={handleLogout}>
                            {/* {t('common:Sign_Out')} */}
                            Sign Out
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                {/* <LanguageSelect white /> */}
            </li>

            <style jsx>
                {`
                    ul {
                        margin: 0;
                        list-style: none;
                        padding: 0;
                        float: right;
                        font-size: 10px;
                        font-family: Montserrat !important;
                        position: fixed;
                        right: 50px;
                    }
                    li {
                        display: inline-block;
                        // padding: 5px 12px;
                        position: relative;
                        vertical-align: middle;
                        background-color:${WHITE};

                    }
                    li:hover > ul {
                        display: block;
                    }
                    ul ul {
                        position: absolute;
                        display: none;
                        margin: 0;
                        padding: 5px 10px;
                        z-index: 999;
                        background: ${WHITE};
                        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
                        right: 0;
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
                        color: ${BLACK};
                        text-decoration: none;
                        white-space: nowrap;
                        font-size: 14px;
                    }
                    a:hover {
                        border-bottom: 1px dashed ${WHITE};
                        color: ${PRIMARY};
                    }
                    .linkOut {
                        color: ${BLACK};
                    }
                    .viewMessage {
                        color: ${PRIMARY};
                        font-size: 10px;
                    }
                `}
            </style>
        </ul>
    );
};
export default RightToolbar;
