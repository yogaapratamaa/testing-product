import clsx from 'clsx';

import Button from '@common_button';

import Paper from '@material-ui/core/Paper';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import FormInput from '@sellermodules/catalog/pages/create/components/input';
import useStyles from '@sellermodules/catalog/pages/create/components/style';

const CatalogOrganizeContent = (props) => {
    const { t, handleDropFile } = props;
    const classes = useStyles();

    const shippingOptions = [
        { value: 'jne', label: 'JNE' },
        { value: 'anteraja', label: 'Anteraja' },
        { value: 'gosend', label: 'GO-SEND' },
        { value: 'j&t', label: 'J&T' },
    ];
    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <div className="left">
                    <IconButton aria-label="back">
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <h2 className={classes.title}>{t('storesetting:Add_Product')}</h2>
                </div>
                <Button className={classes.btn} startIcon={<SaveOutlinedIcon />}>
                    {t('common:Save')}
                </Button>
            </div>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('storesetting:Product_Information')}</h2>
                <FormInput name="name" label="Product Name" required disabled {...props} />
                <FormInput name="sku" label="SKU" required {...props} />
                <FormInput name="price" label="Price" required {...props} />
                <FormInput name="stock" label="Stock" required {...props} />
                <FormInput name="enable" label="Enable" inputType="switch" required {...props} />
                <FormInput name="disable" label="Disable" inputType="switch" disabled required {...props} />
            </Paper>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('storesetting:Product_Details')}</h2>
                <FormInput name="description" label="Product Description" labelPosition="start" multiline rows={8} {...props} />
                <FormInput name="info" label="Important Information" labelPosition="start" multiline rows={5} {...props} />
            </Paper>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('storesetting:Product_Photo')}</h2>
                <FormInput
                    name="input_image"
                    label="Product Photos"
                    labelPosition="start"
                    inputType="image"
                    getBase64={(e) => handleDropFile(e, 'input_image')}
                    formatFile=".jpg, .jpeg, .png, .gif"
                    required
                    {...props}
                />
                <div className={clsx(classes.formFieldsGrid, 'start')}>
                    <div />
                    <div className={classes.helper}>
                        {t('storesetting:Minimum_photo_size')}
                        <span className="primary"> 500 x 500px </span>
                        {t('storesetting:with_format')}
                        <span className="primary"> JPG, JPEG, </span>
                        {t('storesetting:and')}
                        <span className="primary"> PNG. (</span>
                        {t('storesetting:For_optimal_images_use_a_minimum_size_of')}
                        <span className="primary"> 700 x 700px</span>
                        )
                    </div>
                </div>
            </Paper>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('storesetting:Weight__Shipping')}</h2>
                <FormInput
                    name="shipping"
                    label="Shipping"
                    inputType="select"
                    options={shippingOptions}
                    primaryKey="value"
                    labelKey="label"
                    {...props}
                />
                <FormInput name="dimension" label="Dimension" {...props} />
                <FormInput name="weight" label="Weight" {...props} />
            </Paper>
        </div>
    );
};

export default CatalogOrganizeContent;
