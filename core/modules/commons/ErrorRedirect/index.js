/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import Layout from '@layout';
import dynamic from 'next/dynamic';
// import { useState } from 'react';
import { useTranslation } from '@i18n';
import { PRIMARY_DARK } from '@theme_color';

const Message = dynamic(() => import('@common_toast'), { ssr: false });

const ErrorRedirect = (props) => {
    const { t } = useTranslation(['common']);
    const { errMsg, redirect, pageConfig = null } = props;
    const router = useRouter();
    // const [isOpen, setIsOpen] = useState(true);

    const backBtn = () => {
        if (router && redirect) {
            setTimeout(() => {
                router.push(redirect);
            }, 1000);
        }
    };

    return (
        <>
            {/* <Message open={isOpen} setOpen={(stat) => setTimeout(() => setIsOpen(stat), 5000)} variant="error" message={errMsg} /> */}
            <Layout pageConfig={pageConfig}>
                <div
                    style={{
                        display: 'grid',
                        color: PRIMARY_DARK,
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    <h2>{errMsg}</h2>
                </div>
            </Layout>
        </>
    );
};

export default ErrorRedirect;
