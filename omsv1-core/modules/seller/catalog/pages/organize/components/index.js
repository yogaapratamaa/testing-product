/* eslint-disable max-len */
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

import Tabs from '@common_tabsseller';
import Button from '@common_button';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import DropFile from '@sellermodules/catalog/pages/organize/components/dropfile';
import useStyles from '@sellermodules/catalog/pages/organize/components/style';

const CatalogOrganizeContent = (props) => {
    const { t, formik, handleDropFile } = props;
    const router = useRouter();
    const classes = useStyles();

    const { type } = router.query;

    const tab = type === 'add' ? 0 : 1;
    const dataTab = [
        { label: t('sellercatalog:Add_at_Once'), value: 0 },
        { label: t('sellercatalog:Change_at_Once'), value: 1 },
    ];

    const onChangeTab = (e, v) => {
        router.replace(`/seller/catalog/organize/${v ? 'change' : 'add'}`, undefined, { shallow: true });
    };

    return (
        <div style={{ paddingBottom: 10 }}>
            <Paper className={classes.container}>
                <div className={classes.title}>
                    {t('sellercatalog:Organize_Products_at_Once')}
                </div>
                <Tabs data={dataTab} onChange={onChangeTab} value={tab} allItems={false} />
                <div className={classes.text}>
                    {t('storesetting:An_easy_way_to_add_multiple_products_at_once_See')}
                    {' '}
                    <span className={clsx(classes.text, 'primary')}>
                        <Link href="/seller/catalog/organize_guide">
                            <a>{t('storesetting:User’s_Guide')}</a>
                        </Link>
                    </span>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.box}>
                            <div className={classes.title}>
                                {t('sellercatalog:Download__fill_in_CSV_files')}
                            </div>
                            <div className={classes.text}>
                                {t('storesetting:Add_products_without_variants_in_various_categories_Templates_can_only_be_filled_with_MS_Excel_2007_and_above_or_Libre_Office')}
                            </div>
                            <div style={{ height: 10 }} />
                            <Button className={classes.btn} buttonType="outlined">
                                {t('sellercatalog:Download_Template')}
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.box}>
                            <div className={classes.title}>
                                {t('sellercatalog:Upload_file_CSV')}
                            </div>
                            <div className={classes.text}>
                                {t('storesetting:Select_or_drop_your_CSV_file_here_Max_300_products_in_one_file')}
                            </div>
                            <div style={{ height: 20 }} />
                            <Grid container spacing={3}>
                                <Grid item sm={12} md={7}>
                                    <DropFile
                                        name="binary"
                                        error={!!(formik.touched.binary && formik.errors.binary)}
                                        helperText={(formik.touched.binary && formik.errors.binary) || ''}
                                        getBase64={handleDropFile}
                                        formatFile=".csv"
                                        t={t}
                                    />
                                </Grid>
                                <Grid item sm={12} md={5}>
                                    <Button className={classes.btn} buttonType="outlined" onClick={formik.handleSubmit}>
                                        {t('sellercatalog:Select_File')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default CatalogOrganizeContent;
