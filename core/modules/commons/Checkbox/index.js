import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from '@common_checkbox/style';

const CustomButton = ({
    checked,
    setChecked = () => {},
    name = 'checkbox',
    label = '',
    disabled,
    className,
    ...other
}) => {
    const classes = useStyles();

    return (
        <FormControlLabel
            name={name}
            control={(
                <Checkbox
                    checked={checked}
                    name={name}
                    onChange={(e) => setChecked(e)}
                />
            )}
            disabled={disabled}
            label={label}
            className={className || classes.controlLabel}
            {...other}
        />
    );
};

export default CustomButton;
