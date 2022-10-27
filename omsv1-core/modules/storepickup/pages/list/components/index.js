/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Table from '@common_table';
import CustomList from '@common_customlist';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import Tabs from '@common_tabs';
import { dataTab, optionsAllocation } from '@modules/storepickup/helpers';
import Header from '@modules/storepickup/pages/list/components/Header';
import useStyles from '@modules/storepickup/pages/list/components/style';
import TextField from '@common_textfield';
import clsx from 'clsx';
import { breakPointsUp } from '@helper_theme';

const StorePickupListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getStoreShipmentList, confirmShipment, pickShipment, packShipment, optionsStatus, t } = props;
    const [tab, setTab] = React.useState('process_for_shipping');
    const [indexType, setIndexType] = React.useState({
        allocation_status: 0,
    });
    const [load, setLoad] = React.useState(false);
    const desktop = breakPointsUp('sm');

    const storeShipmentList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const storeShipmentTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: t('storepickup:Shipment_Number'), sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_order_increment_id', headerName: t('storepickup:Channel_Order_Number'), sortable: true, hideable: true },
        { field: 'status', headerName: 'Status', sortable: true, hideable: true },
        { field: 'channel_order_date', headerName: t('storepickup:Channel_Order_Date'), hideable: true },
        { field: 'shipping_name', headerName: t('storepickup:Recipient_Name'), hideable: true },
        { field: 'channel_name', headerName: t('storepickup:Channel_Name'), sortable: true, hideable: true },
        { field: 'location', headerName: t('storepickup:Location'), sortable: true, hideable: true },
        { field: 'allocation_status', headerName: t('storepickup:Allocation_Status'), sortable: true, hideable: true, hidden: true },
        { field: 'email', headerName: t('storepickup:EmailMobile'), hideable: true, hidden: true },
        { field: 'action', headerName: t('storepickup:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'increment_id', name: 'increment_id', type: 'like', label: t('storepickup:Shipment_Number'), initialValue: '' },
        {
            field: 'channel_order_increment_id',
            name: 'channel_order_increment_id',
            type: 'like',
            label: t('storepickup:Channel_Order_Number'),
            initialValue: '',
        },
        {
            field: 'status',
            name: 'status',
            type: 'like',
            label: t('storepickup:Status'),
            initialValue: tab !== 0 ? tab : '',
            component: ({ filterValue, setFilterValue }) => {
                const options = optionsStatus.slice().map((item) => ({
                    name: item.label,
                    id: item.value,
                }));
                return (
                    <Autocomplete
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => {
                            setTab(dataTab.find((e) => e.value === newValue && newValue.id) || 0);
                            setFilterValue(newValue && newValue.id);
                        }}
                        options={options}
                    />
                );
            },
        },
        {
            field: 'channel_order_date',
            name: 'channel_order_date_from',
            type: 'from',
            label: t('storepickup:Channel_Order_Date_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),

        },
        {
            field: 'channel_order_date',
            name: 'channel_order_date_to',
            type: 'to',
            label: t('storepickup:Channel_Order_Date_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),

        },
        { field: 'shipping_name', name: 'shipping_name', type: 'like', label: t('storepickup:Recipient_Name'), initialValue: '' },
        {
            field: 'channel_code',
            name: 'channel_code',
            type: 'eq',
            label: t('storepickup:Channel_Name'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getChannelList, getChannelListRes] = channelGqlService.getChannelList();
                const channelOptions = (getChannelListRes
                    && getChannelListRes.data
                    && getChannelListRes.data.getChannelList
                    && getChannelListRes.data.getChannelList.items)
                    || [];
                const primaryKey = 'channel_code';
                const labelKey = 'channel_name';
                return (
                    <Autocomplete
                        mode="lazy"
                        getOptions={getChannelList}
                        value={channelOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={channelOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'loc_name',
            name: 'loc_name',
            type: 'eq',
            label: t('storepickup:Location'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getStoreLocationList, { data: dataLoc, loading: loadingLoc }] = locationGqlService.getStoreLocationList();
                const [optionsLoc, setOptionsLoc] = useState([]);
                const [searchLoc, setSearchLoc] = useState('');
                const primaryKey = 'loc_code';
                const labelKey = 'loc_name';

                useEffect(() => {
                    const onChangeTimeOut = setTimeout(() => {
                        const isExist = searchLoc && optionsLoc.filter((elm) => elm?.[labelKey]?.toLowerCase().includes(searchLoc?.toLowerCase()));
                        if (searchLoc && isExist.length === 0) {
                            getStoreLocationList({
                                variables: {
                                    search: searchLoc,
                                    pageSize: 20,
                                    currentPage: 1,
                                },
                            });
                        }
                        return null;
                    }, 500);

                    return () => clearTimeout(onChangeTimeOut);
                }, [searchLoc]);

                useEffect(() => {
                    if (dataLoc && dataLoc.getStoreLocationList && dataLoc.getStoreLocationList.items) {
                        const ids = new Set(optionsLoc.map((d) => d[primaryKey]));
                        setOptionsLoc([...optionsLoc, ...dataLoc.getStoreLocationList.items.filter((d) => !ids.has(d[primaryKey]))]);
                    }
                }, [dataLoc]);

                return (
                    <Autocomplete
                        mode={loadingLoc.length > 0 ? 'default' : 'lazy'}
                        loading={loadingLoc}
                        getOptions={getStoreLocationList}
                        value={optionsLoc.find((e) => e[labelKey] === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue[labelKey]);
                        }}
                        onInputChange={(e) => setSearchLoc(e && e.target && e.target.value)}
                        options={optionsLoc}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'allocation_status',
            name: 'allocation_status',
            type: ['in', 'null'],
            label: t('storepickup:Allocation_Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    value={optionsAllocation.find((e) => e.id === filterValue)}
                    onChange={(newValue) => {
                        if (newValue && newValue.id === 'true') {
                            setIndexType({ ...indexType, allocation_status: 1 });
                        } else {
                            setIndexType({ ...indexType, allocation_status: 0 });
                        }
                        setFilterValue(newValue && newValue.id);
                    }}
                    options={optionsAllocation}
                />
            ),
        },
        { field: 'is_pickup', name: 'is_pickup', type: 'eq', label: 'is Pickup', class: 'fixed', initialValue: '1', hidden: true },
        { field: 'pickup_id', name: 'pickup_id', type: 'null', label: 'Pickup Id', class: 'fixed', initialValue: 'true', hidden: true },
    ];

    const getIconByStatus = (status) => {
        if (status.value === 'process_for_pack' || status.value === 'process_for_shipping'
            || status.value === 'pick_in_progress') {
            if (status.label === 'Cannot Fulfill') {
                return '/assets/img/order_status/cannotfulfill.svg';
            }
            return '/assets/img/order_status/processforpack.svg';
        }
        if (status.value === 'cannot_fulfill' || status.value === 'closed' || status.value === 'canceled') {
            return '/assets/img/order_status/cannotfulfill.svg';
        }
        if (status.value === 'ready_for_pack' || status.value === 'pick_uncomplete') {
            return '/assets/img/order_status/readyforpack.svg';
        }
        if (status.value === 'ready_for_pickup') {
            return '/assets/img/order_status/readyforpickup.svg';
        }
        if (status.value === 'customer_picked_up' || status.value === 'customer_waiting') {
            return '/assets/img/order_status/customerpicked.svg';
        }
        return '/assets/img/order_status/customerpicked.svg';
    };

    const rows = storeShipmentList.map((storepickup) => ({
        ...storepickup,
        id: storepickup.entity_id,
        email: `${storepickup.shipping_email} ${storepickup.shipping_telephone}`,
        channel_name: `${storepickup.channel.channel_name}`,
        action: () => (
            <Link href={`/shipment/storepickup/edit/${storepickup.entity_id}`}>
                <a className="link-button">{t('storepickup:View')}</a>
            </Link>
        ),
        status: () => (
            <div className={classes.statusRow}>
                <img src={getIconByStatus(storepickup.status)} alt="" className={classes.statusIcon} />
                {storepickup.status.label}
            </div>
        ),
        allocation_status: () => (
            <div
                className={clsx(classes.statusRow, 'unbold')}
                style={{
                    textTransform: 'capitalize',
                }}
            >
                {storepickup.allocation_status?.split('_').join(' ') || t('storepickup:Unconfirmed')}
            </div>
        ),
        location: storepickup?.location?.loc_name || '-',
        track_number: storepickup?.track_number || '-',
    }));

    const actions = [
        {
            label: t('storepickup:Print_Pick_List'),
            message: t('storepickup:Ready_for_print_'),
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/pick/${idPrint.toString().replace(/,/g, '/')}`);
            },
            showMessage: false,
        },
        {
            label: t('storepickup:Print_Pack_List'),
            message: t('storepickup:Ready_for_print_'),
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/pack/${idPrint.toString().replace(/,/g, '/')}`);
            },
            showMessage: false,
        },
        {
            label: t('storepickup:Mark_Confirm_Complete'),
            message: t('storepickup:Are_you_sure_to_confirm_'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                window.backdropLoader(true);
                await confirmShipment({ variables });
            },
        },
        {
            label: t('storepickup:Mark_Pick_Complete'),
            message: t('storepickup:Are_you_sure_to_confirm_'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                window.backdropLoader(true);
                await pickShipment({ variables });
            },
        },
        {
            label: t('storepickup:Mark_Pack_Complete'),
            message: t('storepickup:Are_you_sure_to_confirm_'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                window.backdropLoader(true);
                await packShipment({ variables });
            },
        },
    ];

    const onChangeTab = async (e, v) => {
        setLoad(true);
        await setTab(v);
        setLoad(false);
    };

    const handleReset = () => {
        setIndexType({
            allocation_status: 0,
        });
        setTab(0);
    };

    return (
        <>
            <Header t={t} />
            <Tabs data={dataTab} onChange={onChangeTab} value={tab} allItems={false} />
            {!load && (
                desktop
                    ? (
                        <Table
                            filters={filters}
                            actions={actions}
                            rows={rows}
                            getRows={getStoreShipmentList}
                            loading={loading}
                            columns={columns}
                            count={storeShipmentTotal}
                            showCheckbox
                            handleReset={() => handleReset()}
                            indexType={indexType}
                        />
                    )
                    : (
                        <CustomList
                            filters={filters}
                            actions={actions}
                            rows={rows}
                            getRows={getStoreShipmentList}
                            loading={loading}
                            columns={columns}
                            count={storeShipmentTotal}
                            showCheckbox
                            handleReset={() => handleReset()}
                            indexType={indexType}
                            hideActions={false}
                            hideColumn={false}
                            checkboxAll
                            twoColumns
                            handleClickRow={(id) => Router.push(`/shipment/storepickup/edit/${id}`)}
                            recordName="shipment(s)"
                            usePagination
                        />
                    )
            )}
        </>
    );
};

export default StorePickupListContent;
