/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    DateRangePicker,
    LocalizationProvider,
    DateRangeDelimiter,
} from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import EventIcon from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@common_button';
import Tabs from '@common_tabsseller';
import TextField from '@common_textfield';
import Checkbox from '@common_checkbox';

import formatDate from '@helper_date';
import { useDebounce, isEmpty } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import useStyles from '@sellermodules/income/pages/list/components/Table/style';

const filterField = {
    created_at: [{
        field: 'created_at',
        name: 'created_at_from',
        type: 'from',
        value: '',
        format: 'date',
    }, {
        field: 'created_at',
        name: 'created_at_to',
        type: 'to',
        value: '',
        format: 'date',
    }],
    status: {
        field: 'status',
        name: 'status',
        type: 'in',
        format: 'tab',
        value: [],
    },
};

const TabsHeader = (props) => {
    const {
        header = '', searchPlaceholder = '', filters = [], setFilters,
        search, setSearch, t, dataTabs, tab,
        selectedDate, setSelectedDate,
    } = props;

    const router = useRouter();
    const statusFilter = [
        { label: t('sellerincome:Queued'), value: 'queued' },
        { label: t('sellerincome:Approved'), value: 'approved' },
        { label: t('sellerincome:Rejected'), value: 'rejected' },
    ];

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [filterStatus, setFilterStatus] = React.useState([]);
    const debouncedFilterStatus = useDebounce(filterStatus, 100);

    const handleClickOpenButton = (event, set) => {
        set(event.currentTarget);
    };

    const insertFilter = (field, array = []) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        const temp = [...array];
        if (index >= 0) {
            temp.splice(index, 1, field);
        } else {
            temp.push(field);
        }
        return temp;
    };

    const handleDateChange = async (e) => {
        setSelectedDate(e);
        const fields = [{
            ...filterField.created_at[0],
            value: formatDate(e[0], 'YYYY-MM-DD 00:00:00'),
        }, {
            ...filterField.created_at[1],
            value: formatDate(e[1], 'YYYY-MM-DD 23:59:59'),
        }];
        let temp = [...filters];
        temp = insertFilter(fields[0], temp);
        temp = insertFilter(fields[1], temp);

        setFilters([...temp]);
    };

    const handleDateClose = () => {
        if (selectedDate.some((date) => date === null)) {
            handleDateChange(selectedDate);
        }
    };

    const handleChecked = (check, v) => {
        if (check) {
            setFilterStatus((prev) => [...prev, v]);
        } else {
            setFilterStatus((prev) => prev.filter((p) => p !== v));
        }
    };

    const handleReset = () => {
        setSelectedDate([null, null]);
        setSearch('');
        setFilterStatus([]);
        setFilters([]);
    };

    const onChangeTab = (e, v) => {
        const routeParams = `/${v}`;
        router.replace(`/seller/income${routeParams}`, undefined, { shallow: true });
    };

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);

    const renderFilterDateText = () => {
        let res = '';
        if (selectedDate.every((date) => date !== null)) {
            res = `${formatDate(selectedDate[0], 'DD MMM YYYY')} - ${formatDate(selectedDate[1], 'DD MMM YYYY')}`;
        } else if (selectedDate[0] !== null) {
            res = formatDate(selectedDate[0], 'DD MMM YYYY');
        } else {
            res = formatDate(selectedDate[1], 'DD MMM YYYY');
        }
        return res;
    };

    React.useEffect(() => {
        const statusTemp = { ...filterField.status };
        let temp = [...filters];

        filterStatus.forEach((stat) => {
            statusTemp.value = [...statusTemp.value, stat];
        });
        temp = insertFilter(statusTemp, temp);

        setFilters([...temp]);
    }, [debouncedFilterStatus]);

    return (
        <Paper className={classes.paperHead}>
            <div className={clsx(classes.header, 'nopad')}>
                {header}
            </div>
            <Tabs data={dataTabs} onChange={onChangeTab} value={tab} allItems={false} />

            <div className={classes.tableToolbar}>
                <div className="top-buttons-wrapper nopad">
                    <div className="top-item-left">
                        {tab === 'balance'
                            && (
                                <div className="top-item">
                                    <TextField
                                        name="email"
                                        placeholder={searchPlaceholder}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className={clsx(classes.textInput, 'full')}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <img alt="" src="/assets/img/search.svg" className={classes.iconImg} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            )}
                    </div>
                    <div className="top-item-right">
                        {tab === 'withdraw'
                            && (
                                <div className="top-item">
                                    <Button
                                        className={clsx(classes.btnFilter, 'gray')}
                                        onClick={(e) => handleClickOpenButton(e, setAnchorEl)}
                                        endIcon={
                                            <KeyboardArrowRightIcon className={getArrowClass(anchorEl)} />
                                        }
                                    >
                                        {t('sellercatalog:Filter')}
                                    </Button>
                                    <Menu
                                        elevation={1}
                                        getContentAnchorEl={null}
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                        className={classes.menuAction}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        {statusFilter.map((status, i) => (
                                            <MenuItem key={i} className={classes.menuItem}>
                                                <Checkbox
                                                    label={status.label}
                                                    checked={filterStatus.includes(status.value)}
                                                    setChecked={(e) => handleChecked(e.target.checked, status.value)}
                                                    className={classes.checkboxOption}
                                                />
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                            )}
                        <div className="top-item">
                            <LocalizationProvider dateAdapter={DateFnsUtils}>
                                <DateRangePicker
                                    startText=""
                                    endText=""
                                    allowSameDateSelection
                                    value={selectedDate}
                                    inputFormat="dd MMM yyyy"
                                    onChange={setSelectedDate}
                                    toolbarPlaceholder="-"
                                    onAccept={(date) => handleDateChange(date)}
                                    clearable
                                    onClose={handleDateClose}
                                    renderInput={(startProps, endProps) => (
                                        <div className={classes.dateContainer}>
                                            <EventIcon />
                                            <TextField className={classes.inputDate} {...startProps.inputProps} placeholder="From" />
                                            <DateRangeDelimiter> - </DateRangeDelimiter>
                                            <TextField className={classes.inputDate} {...endProps.inputProps} placeholder="To" />
                                        </div>
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <div className={classes.expandContainer}>
                    <Collapse in={search || !filters.filter((filt) => filt.name !== 'status').every((field) => isEmpty(field.value))}>
                        <div className={classes.expandGrid}>
                            {(!!search || !filters.every((field) => isEmpty(field.value)))
                                && (
                                    <Button
                                        className={classes.btnFilterText}
                                        onClick={handleReset}
                                    >
                                        {t('common:Reset_Filter')}
                                    </Button>
                                )}
                            <Grid
                                container
                                spacing={3}
                                alignContent="center"
                                alignItems="center"
                                style={{ marginTop: 17 }}
                            >
                                {!!search
                                    && (
                                        <Grid item className="filter-item">
                                            {search}
                                            <IconButton className={classes.closeButton} onClick={() => setSearch('')}>
                                                <CloseIcon className={classes.closeIcon} />
                                            </IconButton>
                                        </Grid>
                                    )}
                                {selectedDate.some((date) => date !== null)
                                    ? (
                                        <Grid item className="filter-item" xs="auto">
                                            {renderFilterDateText()}
                                            <IconButton className={classes.closeButton} onClick={() => handleDateChange([null, null])}>
                                                <CloseIcon className={classes.closeIcon} />
                                            </IconButton>
                                        </Grid>
                                    )
                                    : null}
                            </Grid>
                        </div>
                    </Collapse>
                </div>
            </div>
        </Paper>
    );
};

export default TabsHeader;
