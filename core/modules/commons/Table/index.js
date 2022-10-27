/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
import React from 'react';
import clsx from 'clsx';
import { useTranslation } from '@i18n';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import ConfirmDialog from 'core/modules/commons/ConfirmDialog';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

import TextField from '@common_textfield';
import MenuPopover from '@common_menupopover';
import Button from '@common_button';

import TableFilters from '@common_table/components/TableFilters';
import { breakPointsUp } from '@helper_theme';
import useStyles from '@common_table/style';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
    TABLE_HEADER,
} from '@theme_color';

// helpers
const getComponentOrString = (param) => {
    if (typeof param === 'function') {
        return param();
    }
    if (typeof param === 'string' || typeof param === 'number') {
        if (String(param) !== 'undefined') {
            return String(param);
        }
    }
    return param;
};

// custom hooks
const useColumns = (initialColumns) => {
    const _initialColumns = initialColumns.map((column) => ({
        ...column,
        hidden: column.hidden ? column.hidden : false,
    }));
    const [columns, setColumns] = React.useState(_initialColumns);
    const [hiddenColumns, setHiddenColumns] = React.useState(_initialColumns);

    const setHiddenColumn = (field, hidden) => {
        setHiddenColumns(
            hiddenColumns.map((column) => ({
                ...column,
                hidden: field == column.field ? hidden : column.hidden,
            })),
        );
    };

    const applyHiddenColumns = () => {
        setColumns(
            columns.map((column, i) => ({
                ...column,
                hidden: hiddenColumns[i].hidden,
            })),
        );
    };

    const applyHiddenColumnsMobile = () => {
        const mobileHiddenColumns = columns.map((column) => ({ ...column, hidden: column.hiddenMobile || column.hidden || false }));
        setHiddenColumns(mobileHiddenColumns);
        setColumns(mobileHiddenColumns);
    };

    const applyHiddenColumnsDesktop = () => {
        const desktopiddenColumns = _initialColumns.map((column) => ({ ...column, hidden: column.hidden || false }));
        setHiddenColumns(desktopiddenColumns);
        setColumns(desktopiddenColumns);
    };

    const resetHiddenColumn = () => {
        const resetedHiddenColumns = columns.map((column) => ({ ...column, hidden: false }));
        setHiddenColumns(resetedHiddenColumns);
        setColumns(resetedHiddenColumns);
    };

    return {
        columns,
        hiddenColumns,
        setHiddenColumn,
        applyHiddenColumns,
        applyHiddenColumnsDesktop,
        applyHiddenColumnsMobile,
        resetHiddenColumn,
    };
};

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handleTimeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handleTimeout);
        };
    }, [value]);

    return debouncedValue;
};

// main component
const CustomTable = (props) => {
    const { t } = useTranslation(['common']);
    const {
        showCheckbox = false,
        primaryKey = 'id',
        rows,
        getRows,
        deleteRows,
        deleteLabel = t('common:Delete'),
        deleteTitle = t('common:Confirmation'),
        deleteMessage = t('common:Are_you_sure_want_to_delete_selected_items'),
        deleteMessageNoRecord = t('common:You_haven\'t_selected_any_items'),
        deleteEnableConfirm = true,
        allowActionZeroSelected = false,
        loading,
        filters: initialFilters = [],
        initialRowsPerPage = 25,
        actions,
        allowAppendExistingActions = false,
        hideActions = false,
        hideFilters = false,
        hideColumns = false,
        hideFooter = false,
        hideHeader = false,
        handleClickRow,
        // handleReset,
        handleExport,
        handleImport,
        varExport,
        setVarExport,
        exportWithId,
        indexType = 0,
        exports = [],
        recordName = t('common:record'),
        wrapHeader = false,
        doRefetch = null,
        setDoRefetch = () => { },
        handleChecked = () => { },
        defaultChecked = [],
        singleSelection = false,
        searchable = false,
        searchPlaceholder = t('common:Search'),
        showFilter,
        setShowFilter,
        getRowsFilter,
        errorSearch,
        setErrorSearch,
        pagePrev,
        pageNext,
    } = props;
    // hooks
    const desktop = breakPointsUp('sm');
    const classes = useStyles();
    const [pageString, setPageString] = React.useState('');
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [isCheckedAllRows, setIsCheckedAllRows] = React.useState(false);
    const [showMessageActions, setShowMessageActions] = React.useState(true);
    const [checkedRows, setCheckedRows] = React.useState(defaultChecked);
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const {
        columns,
        hiddenColumns,
        setHiddenColumn,
        applyHiddenColumns,
        applyHiddenColumnsDesktop,
        applyHiddenColumnsMobile,
        resetHiddenColumn,
    } = useColumns(props.columns);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [sorts, setSorts] = React.useState(
        props.columns.filter((column) => column.sortable).map(({ field, initialSort }) => ({ field, value: initialSort || undefined })),
    );
    const [activeAction, setActiveAction] = React.useState();
    const [search, setSearch] = React.useState();

    let variables = {
        input: {
            page: pageString,
            limit: rowsPerPage,
        },
    };
    const debouncedSearch = useDebounce(search, 500);

    // methods
    const handleChangePage = (event) => {
        let temp = '';
        temp = event;
        setPageString(temp);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPageString('');
    };
    const isEmpty = (value) => {
        if ([undefined, null, '', false].includes(value)) return true;
        if (value && value.length <= 0) return true;
        return false;
    };
    const filterField = filters
        .filter((e) => !isEmpty(e.value))
        .reduce((accumulator, currentValue) => {
            accumulator[currentValue.field] = currentValue.value;
            return accumulator;
        }, {});
    const fetchRows = () => {
        // if (searchable) {
        //     variables.search = search;
        // }
        const variablesExport = {
            filter: filters
                .filter((e) => !isEmpty(e.value))
                .reduce((accumulator, currentValue) => {
                    accumulator[currentValue.field] = {
                        ...accumulator[currentValue.field],
                        [typeof currentValue.type === 'object'
                            ? currentValue.type[indexType[currentValue.name]]
                            : currentValue.type]: currentValue.value,
                    };
                    return accumulator;
                }, {}),
            sort: sorts.reduce((accumulator, currentValue) => {
                accumulator[currentValue.field] = currentValue.value || undefined;
                return accumulator;
            }, {}),
        };
        if (setVarExport) {
            setVarExport(variablesExport);
        }
        if (showFilter) {
            const variablesInput = variables.input;
            variables = {
                input: {
                    ...variablesInput,
                    ...filterField,
                },
            }; 
            getRowsFilter({ variables });
        } else {
            getRows({ variables });
        }
        // setCheckedRows([]);
    };

    const setHiddenResponsive = () => {
        if (!desktop) {
            applyHiddenColumnsMobile();
        } else {
            applyHiddenColumnsDesktop();
        }
    };

    // effects
    React.useEffect(() => {
        if (getRows) {
            fetchRows();
        }
    }, [pageString, rowsPerPage, filters, sorts, debouncedSearch]);

    React.useEffect(() => {
        if (doRefetch !== null) {
            fetchRows();
            setDoRefetch(null);
        }
    }, [doRefetch]);

    React.useEffect(() => {
        if (defaultChecked.length) {
            setCheckedRows(defaultChecked);
        }
    }, [defaultChecked]);

    const cancelDeleteRowNotif = () => {
        setOpenConfirmDialog(false);
        window.toastMessage({
            open: true,
            text: t('common:Canceled'),
            variant: 'error',
        });
    };

    React.useEffect(() => {
        if (exportWithId === true) {
            const variable = checkedRows && checkedRows.map((checkedRow) => checkedRow.id);
            const prevState = varExport;
            prevState.id = variable;
            setVarExport(prevState);
        }
    }, [checkedRows]);

    React.useEffect(() => {
        setHiddenResponsive();
    }, [desktop]);

    const renderTableToolbar = () => {
        const defaultActionDelete = {
            title: checkedRows.length === 0 ? t('common:Attention') : deleteTitle,
            label: deleteLabel,
            message: !checkedRows.length ? deleteMessageNoRecord : deleteMessage,
            confirmDialog: deleteEnableConfirm,
            onClick: async (_checkedRows) => {
                const variable = { [primaryKey]: _checkedRows.map((checkedRow) => checkedRow[primaryKey]) };
                try {
                    await deleteRows({ variables: variable });
                    window.toastMessage({
                        open: true,
                        text: t('common:The_recordName_was_deleted', { recordName }),
                        variant: 'success',
                    });
                } catch (error) {
                    window.toastMessage({
                        open: true,
                        text: error?.message ?? t('common:failed_delete_action'),
                        variant: 'error',
                    });
                }
            },
        };

        let toolbarActions = [];

        if (allowAppendExistingActions || !actions) {
            toolbarActions = [defaultActionDelete];
        }
        if (actions) {
            toolbarActions = [...toolbarActions, ...actions];
        }

        return (
            <>
                {!hideHeader && (
                    <div className={classes.tableToolbar}>
                        <div className="top-buttons-wrapper">
                            {handleExport || handleImport 
                                ? (
                                    <div className="top-item import-export">
                                        {handleImport && (
                                            <div className="top-item">
                                                <Button
                                                    onClick={handleImport}
                                                    buttonType="secondary"
                                                >
                                                    {/* <img alt="icon_export" className="btnIcon" src="/assets/img/icon_export.svg" /> */}
                                                    {/* {desktop && t('common:import')} */}
                                                    {desktop && 'Import Orders'}
                                                </Button>
                                            </div>
                                        )}
                                        {exports.length ? (
                                            <>
                                                <button
                                                    id="clickConfirmExport"
                                                    className="hide"
                                                    type="submit"
                                                    onClick={() => {
                                                        activeAction.onClick(checkedRows);
                                                    }}
                                                >
                                                    {t('common:Auto_Confirm')}
                                                </button>
                                                <div className="top-item">
                                                    <MenuPopover
                                                        openButton={{ label: desktop && t('common:Exports') }}
                                                        className={clsx(classes.btn, 'filter')}
                                                        color="purple"
                                                        iconPosition="end"
                                                        icon={<img alt="icon_export" className="btnIcon" src="/assets/img/icon_export.svg" />}
                                                        menuItems={exports.map((action) => ({
                                                            label: action.label,
                                                            onClick: () => {
                                                                setActiveAction(action);
                                                                setTimeout(() => {
                                                                    document.getElementById('clickConfirmExport').click();
                                                                }, 100);
                                                            },
                                                        }))}
                                                    />
                                                </div>
                                            </>
                                        ) : null}

                                        {handleExport && (
                                            <div className="top-item">
                                                <Button
                                                    // className={clsx(classes.btn, 'filter')}
                                                    onClick={handleExport}
                                                    // variant="contained"
                                                    buttonType="secondary"
                                                >
                                                    {/* <img alt="icon_export" className="btnIcon" src="/assets/img/icon_export.svg" /> */}
                                                    {/* {desktop && t('common:export')} */}
                                                    {desktop && 'Export “No Allocation” Orders'}
                                                </Button>
                                            </div>
                                        )}
                                        {exports.length ? (
                                            <>
                                                <button
                                                    id="clickConfirmExport"
                                                    className="hide"
                                                    type="submit"
                                                    onClick={() => {
                                                        activeAction.onClick(checkedRows);
                                                    }}
                                                >
                                                    {t('common:Auto_Confirm')}
                                                </button>
                                                <div className="top-item">
                                                    <MenuPopover
                                                        openButton={{ label: desktop && t('common:Exports') }}
                                                        className={clsx(classes.btn, 'filter')}
                                                        color="purple"
                                                        iconPosition="end"
                                                        icon={<img alt="icon_export" className="btnIcon" src="/assets/img/icon_export.svg" />}
                                                        menuItems={exports.map((action) => ({
                                                            label: action.label,
                                                            onClick: () => {
                                                                setActiveAction(action);
                                                                setTimeout(() => {
                                                                    document.getElementById('clickConfirmExport').click();
                                                                }, 100);
                                                            },
                                                        }))}
                                                    />
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                )    
                                : null }                    
                            <div className="top-item records-found">
                                {searchable && (
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <TextField
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                            value={search}
                                            placeholder={searchPlaceholder}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                )}
                                {/* {!loading && (count
                                    ? (
                                        <div>
                                            {`${count} ${t('common:records_found')} `}
                                            {checkedRows.length ? ` (${checkedRows.length} ${t('common:selected')})` : null}
                                        </div>
                                    ) : null
                                )} */}
                            </div>
                            <div className="top-item hideable">
                                {!hideActions && (
                                    <div className="top-item">
                                        <ConfirmDialog
                                            open={openConfirmDialog}
                                            onTable
                                            onCancel={() => cancelDeleteRowNotif()}
                                            onConfirm={async () => {
                                                window.backdropLoader(true);
                                                if ((checkedRows && checkedRows.length) || allowActionZeroSelected) {
                                                    setOpenConfirmDialog(false);
                                                    await activeAction.onClick(checkedRows);
                                                    if (activeAction.refetch !== false) {
                                                        fetchRows();
                                                    }
                                                    if (showMessageActions) {
                                                        window.toastMessage({
                                                            open: true,
                                                            text: t('common:Success'),
                                                            variant: 'success',
                                                        });
                                                    }
                                                }
                                                setCheckedRows([]);
                                                setOpenConfirmDialog(false);
                                                window.backdropLoader(false);
                                            }}
                                            title={activeAction && activeAction.title}
                                            message={activeAction && activeAction.message}
                                            records={checkedRows.length}
                                        />
                                        {/* <button
                                        id="clickConfirm"
                                        className="hide"
                                        type="submit"
                                        onClick={async () => {
                                            if ((checkedRows && checkedRows.length) || allowActionZeroSelected) {
                                                await activeAction.onClick(checkedRows);
                                                if (activeAction.refetch !== false) {
                                                    fetchRows();
                                                }
                                                if (showMessageActions) {
                                                    window.toastMessage({
                                                        open: true,
                                                        text: t('common:Success'),
                                                        variant: 'success',
                                                    });
                                                }
                                                setCheckedRows([]);
                                                // window.location.reload();
                                            } else {
                                                window.toastMessage({
                                                    open: true,
                                                    text: t('common:You_haven\'t_selected_any_items'),
                                                    variant: 'error',
                                                });
                                            }
                                        }}
                                    >
                                        Auto Confirm
                                    </button> */}
                                        <MenuPopover
                                            // openButton={{ label: t('common:Actions') }}
                                            openButton={{ label: t('Actions') }}
                                            icon={<ExpandMoreIcon />}
                                            menuItems={toolbarActions.map((action) => ({
                                                label: action.label,
                                                hide: action.hide,
                                                onClick: () => {
                                                    const tempAction = { ...action };

                                                    if (allowActionZeroSelected && checkedRows?.length === 0) {
                                                        tempAction.confirmDialog = true;
                                                    }
                                                    setActiveAction(tempAction);
                                                    if (tempAction.showMessage !== null) {
                                                        setShowMessageActions(tempAction.showMessage);
                                                    } else {
                                                        setShowMessageActions(false);
                                                    }
                                                    if (tempAction.confirmDialog) {
                                                        setOpenConfirmDialog(true);
                                                    } else {
                                                        setTimeout(() => {
                                                            document.getElementById('clickConfirm').click();
                                                        }, 100);
                                                    }
                                                },
                                            }))}
                                        />
                                    </div>
                                )}
                                {!hideColumns && (
                                    <div className="top-item">
                                        <Button
                                            className={clsx(classes.btn, 'filter')}
                                            onClick={() => setExpandedToolbar(expandedToolbar != 'toggleColums' ? 'toggleColums' : '')}
                                            variant="contained"
                                            buttonType="primary-rounded"
                                        >
                                            <img alt="icon_column" className="btnIcon" src="/assets/img/icon_column.svg" />
                                            {desktop && t('common:columns')}
                                        </Button>
                                    </div>
                                )}
                                {!hideFilters && (
                                    <div className="top-item">
                                        <Button
                                            className={clsx(classes.filterBtn)}
                                            onClick={() => setExpandedToolbar(expandedToolbar != 'filters' ? 'filters' : '')}
                                            // variant="contained"
                                            buttonType="outlined"
                                        >
                                            {/* <img alt="icon_filter" className="btnIcon" src="/assets/img/icon_filter.svg" /> */}
                                            {/* {desktop && t('common:filters')} */}
                                            {desktop && t('Filters')}
                                        </Button>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className={classes.toogleColumn}>
                            <Collapse in={expandedToolbar === 'toggleColums'}>
                                <div style={{ padding: 12 }}>
                                    {hiddenColumns.find((c) => c.hideable) && (
                                        <div style={{ padding: 12 }}>
                                            {`${columns.filter((c) => !c.hidden).length} ${t('common:out_of')} ${columns.length
                                                } ${t('common:visible')}`}
                                        </div>
                                    )}
                                    {!hiddenColumns.find((c) => c.hideable)
                                        && <div style={{ padding: 12 }}>{t('common:Toggle_show_fields_is_empty')}</div>}
                                    {hiddenColumns
                                        .filter((c) => c.hideable)
                                        .map((column, index) => (
                                            <div key={index} style={{ maxHeight: 'inherit', paddingRight: 24 }} className="boxColumn">
                                                <Checkbox
                                                    checked={!column.hidden}
                                                    onChange={(e) => setHiddenColumn(column.field, !e.target.checked)}
                                                />
                                                {column.headerName}
                                            </div>
                                        ))}
                                    <div style={{ padding: 12 }}>
                                        <Button buttonType="primary-rounded" onClick={applyHiddenColumns}>
                                            {t('common:Apply')}
                                        </Button>
                                        <Button buttonType="link" onClick={resetHiddenColumn}>
                                            {t('common:Reset')}
                                        </Button>
                                    </div>
                                </div>
                            </Collapse>
                            <Collapse in={expandedToolbar === 'filters'}>
                                <TableFilters
                                    initialFilters={filters}
                                    setShowFilter={setShowFilter}
                                    setParentFilters={setFilters}
                                    setPageString={setPageString}
                                    setErrorSearch={setErrorSearch}
                                    // handleReset={handleReset}
                                    t={t}
                                />
                            </Collapse>
                        </div>
                    </div>
                )}
            </>
        );
    };
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: TABLE_HEADER,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(even)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const renderTableHeader = () => {
        const getIdsForExport = (newCheckedRows) => {
            const variable = newCheckedRows.map((checkedRow) => checkedRow.id);
            const prevState = varExport;
            prevState.id = variable;
            setVarExport(prevState);
        };

        const handleChangeCheckboxAllRows = (checked) => {
            const newCheckedRows = rows.reduce((accumulator, currentValue) => {
                const i = accumulator.findIndex((checkedRow) => checkedRow[primaryKey] === currentValue[primaryKey]);
                if (checked && i < 0) {
                    accumulator.push(currentValue);
                } else if (!checked && i >= 0) {
                    return accumulator.filter((checkedRow) => checkedRow[primaryKey] != currentValue[primaryKey]);
                }
                return accumulator;
            }, checkedRows);
            if (exportWithId === true) {
                getIdsForExport(newCheckedRows);
            }
            setCheckedRows(newCheckedRows);
            setIsCheckedAllRows(checked);
            handleChecked(newCheckedRows);
        };

        const setSortByField = (field) => {
            setSorts(
                sorts.map((sort) => ({
                    ...sort,
                    ...(sort.field === field && { value: sort.value === 'ASC' ? 'DESC' : 'ASC' }),
                    ...(sort.field != field && { value: undefined }),
                })),
            );
        };
        const getSortValue = (field) => {
            const sort = sorts.find((e) => e.field === field);
            return sort && sort.value;
        };
        const getArrowClass = (field) => (getSortValue(field) === 'ASC' ? classes.arrowDown : classes.arrowUp);
        return (
            <TableHead>
                <StyledTableRow>
                    {showCheckbox && (
                        <StyledTableCell>
                            {!singleSelection
                                && <Checkbox checked={isCheckedAllRows} onChange={(e) => handleChangeCheckboxAllRows(e.target.checked)} />}
                        </StyledTableCell>
                    )}
                    {columns.map((column, columnIndex) => (
                        <StyledTableCell
                            key={columnIndex}
                            className={clsx(column.hidden && 'hide')}
                            style={{ whiteSpace: wrapHeader ? 'unset' : 'nowrap', verticalAlign: wrapHeader ? 'top' : '' }}
                        >
                            {!column.sortable && getComponentOrString(column.headerName)}
                            {column.sortable && (
                                <Button
                                    onClick={() => setSortByField(column.field)}
                                    style={{ marginLeft: -16, textAlign: 'left' }}
                                    buttonType="link"
                                    endIcon={
                                        getSortValue(column.field) ? (
                                            <ArrowRightAltIcon className={getArrowClass(column.field)} />
                                        ) : (
                                            <ImportExportIcon style={{ opacity: 0.3 }} />
                                        )
                                    }
                                >
                                    {column.headerName}
                                </Button>
                            )}
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            </TableHead>
        );
    };

    const renderTableBody = () => {
        const handleChangeCheckboxRow = (checked, row) => {
            const i = checkedRows.findIndex((checkedRow) => checkedRow[primaryKey] === row[primaryKey]);
            if (singleSelection) {
                setCheckedRows([row]);
                handleChecked([row]);
            } else if (checked && i < 0) {
                setCheckedRows([...checkedRows, row]);
                handleChecked([...checkedRows, row]);
            } else if (!checked && i >= 0) {
                setCheckedRows(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
                handleChecked(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
            }
        };
        return (
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <StyledTableRow
                        key={rowIndex}
                        onClick={(e) => (handleClickRow ? handleClickRow(e, row) : null)}
                        style={{
                            cursor: handleClickRow ? 'pointer' : 'default',
                        }}
                    >
                        {showCheckbox && (
                            <StyledTableCell>
                                <Checkbox
                                    checked={!!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey])}
                                    onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                    disabled={!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey]) && row.disableCheck}
                                />
                            </StyledTableCell>
                        )}
                        {columns.map((column, columnIndex) => (
                            <StyledTableCell key={columnIndex} className={clsx(column.hidden && 'hide')}>
                                {getComponentOrString(row[column.field]) || '-'}
                            </StyledTableCell>
                        ))}
                    </StyledTableRow>
                ))}
                {loading && <div>Loading...</div>}
            </TableBody>
        );
    };

    const renderTableFooter = () => {
        return (
            <div size="small" className={classes.tablePagination}>
                <InputLabel>Row per page</InputLabel>
                <FormControl>
                    <NativeSelect
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                        name="row per page"
                        className={classes.selectEmpty}
                    >
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </NativeSelect>
                </FormControl>
                <Button buttonType="link" disabled={!pagePrev} style={{ margin: '0 10px' }} onClick={() => handleChangePage(pagePrev)}>Prev</Button>
                <Button buttonType="link" disabled={!pageNext} onClick={() => handleChangePage(pageNext)}>Next</Button>
            </div>
        );
    };

    return (
        <>
            {renderTableToolbar()}
            {!hideFooter && renderTableFooter()}
            <TableContainer component={Paper} className={classes.tableContainer}>
                {/* <div className={classes.mainTable}> */}
                <Table size="small">
                    {renderTableHeader()}
                    {loading || errorSearch ? (
                        null
                    ) : (!errorSearch && rows.length) ? (
                        renderTableBody()
                    ) : (
                        null
                    )}
                </Table>
                {loading || errorSearch || !rows.length
                    ? (
                        <Table size="small">
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell>
                                        {loading ? (
                                            <div className={classes.loading}>Loading . . .</div>
                                        ) : !rows.length || errorSearch ? (
                                            <div className={classes.loading}>{t('common:No_records_to_display')}</div>
                                        ) : (
                                            null
                                        )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    )
                    : null}
                {/* </div> */}
            </TableContainer>
            {!hideFooter && renderTableFooter()}
        </>
    );
};

export default CustomTable;
