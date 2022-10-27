import React from 'react';
import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Switch from '@common_switch';

import useStyles from '@sellermodules/storesetting/pages/default/components/Card/style';

const ShippingCard = (props) => {
    const {
        formik, options = [], provider, service, shipping_method_logo_url,
    } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const isError = formik.touched?.[provider]?.selected && !!formik.errors?.[provider]?.selected;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChange = (event, val) => {
        const temp = [...formik.values[provider].selected];
        if (!event.target.checked) {
            formik.setFieldValue(`${provider}.selected`, temp.filter((el) => el !== val));
        } else {
            temp.push(val);
            formik.setFieldValue(`${provider}.selected`, temp);
        }
        return 0;
    };

    React.useEffect(() => {
        if (isError) {
            setExpanded(true);
        }
    });

    return (
        <Card className={clsx(classes.root, isError && 'errors')}>
            <CardContent className={classes.content}>
                <div
                    className={classes.imgBack}
                    style={{
                        backgroundImage: `url(${shipping_method_logo_url || '/assets/img/placeholder_image.jpg'})`,
                    }}
                />
                <Switch
                    id={provider}
                    name={`${provider}.value`}
                    trueLabel=""
                    falseLabel=""
                    value={formik.values[provider].value}
                    onChange={formik.handleChange}
                />
            </CardContent>
            <CardActions disableSpacing>
                <div>
                    <span className={classes.name}>{provider}</span>
                    <br />
                    <span className={classes.method}>{service}</span>
                </div>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Divider />
                <CardContent className={classes.collapseContent}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                            {options.map((opt) => (
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            checked={formik.values[provider].selected.includes(opt.entity_id)}
                                            onChange={(e) => handleChange(e, opt.entity_id)}
                                            name="REG"
                                        />
                                    )}
                                    className={classes.controlLabel}
                                    classes={{ root: classes.rootLabel }}
                                    label={opt.service}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                    {isError
                    && (
                        <div className={classes.error}>
                            {formik.errors?.[provider]?.selected}
                        </div>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ShippingCard;
