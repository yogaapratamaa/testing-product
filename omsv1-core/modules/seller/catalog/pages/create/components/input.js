import clsx from 'clsx';

import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import Switch from '@common_switch';

import InputLabel from '@material-ui/core/InputLabel';

import ImageUpload from '@sellermodules/catalog/pages/create/components/ImageUpload';
import useStyles from '@sellermodules/catalog/pages/create/components/style';

const FormInput = (props) => {
    const {
        formik, multiline, inputType, options = [], rows = 5, label = 'Label', labelPosition = 'center', disabled,
        name = '', primaryKey = 'value', labelKey = 'label', required = false, getBase64 = () => {}, formatFile = '.csv',
    } = props;
    const classes = useStyles();

    const renderComponent = () => {
        switch (inputType) {
        case 'select':
            return (
                <Autocomplete
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    onChange={(e) => formik.setFieldValue(name, e)}
                    options={options}
                    primaryKey={primaryKey}
                    labelKey={labelKey}
                    fullWidth
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(formik.touched[name] && formik.errors[name]) || ''}
                    disabled={disabled}
                    renderInput={(params) => (
                        <TextField
                            value={formik.values[name]}
                            className={classes.textInput}
                            {...params}
                        />
                    )}
                />
            );
        case 'switch':
            return (
                <Switch
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    disabled={disabled}
                />
            );
        case 'image':
            return (
                <ImageUpload
                    name={name}
                    formik={formik}
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(formik.touched[name] && formik.errors[name]) || ''}
                    getBase64={getBase64}
                    formatFile={formatFile}
                    {...props}
                />
            );
        default:
            return (
                <TextField
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    className={classes.textInput}
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(formik.touched[name] && formik.errors[name]) || ''}
                    multiline={multiline}
                    rows={rows}
                    disabled={disabled}
                />
            );
        }
    };
    return (
        <div className={clsx(classes.formFieldsGrid, labelPosition)}>
            <InputLabel htmlFor={name} className={[clsx(classes.label, disabled && 'disabled'), required && classes.required]}>
                {label}
            </InputLabel>
            {renderComponent()}
        </div>
    );
};

export default FormInput;
