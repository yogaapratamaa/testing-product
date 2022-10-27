import React from 'react';
import Autocomplete from '@common_autocomplete';
import Table from '@common_table';
import useStyles from '@modules/shipment/pages/list/components/style';
import Link from 'next/link';
import Header from '@modules/shipment/pages/list/components/Header';

const ShippingContentList = (props) => {
    const {
        data,
        dataChannelStoreName,
        loading,
        loadingChannelStoreName,
        getShipmentList,
    } = props;

    const shipmentList = (data && data.shipmentList && data.shipmentList.items) || [];
    const channelStoreName = (dataChannelStoreName && dataChannelStoreName.channelStoreListFilter) || [];
    const [indexType, setIndexType] = React.useState({
        allocation_status: 0,
    });
    const [tab, setTab] = React.useState(0);
    const pagePrev = (data && data.shipmentList.page.prev) || '';
    const pageNext = (data && data.shipmentList.page.next) || '';
    const classes = useStyles();

    const handleClickRow = (event, row) => {
        if (event.target.tagName === 'TD') {
            window.open(`/shipment/edit/${row.orderId}?sid=${row.id}`, '_self');
        }
    };

    const optionsStatus = [
        { id: 'new', name: 'new' },
        { id: 'pick_in_progress', name: 'Pick in Progress' },
        { id: 'pick_uncomplete', name: 'Pick Uncomplete' },
        { id: 'sorting_in_progress', name: 'Sorting in Progress' },
        { id: 'pick_complete', name: 'Pick Complete' },
    ];

    const getClassByStatus = (status) => {
        if (status.toLowerCase() === 'draft'
        || status.toLowerCase() === 'allocated'
        || status.toLowerCase() === 'allocation_not_found') {
            return classes.statusDraft;
        }
        if (status.toLowerCase() === 'not_yet_shipped') {
            return classes.statusProcessing;
        }
        if (status.toLowerCase() === 'ready_to_ship') {
            return classes.statusReady;
        }
        if (status.toLowerCase() === 'shipped') {
            return classes.statusShipped;
        }
        if (status.toLowerCase() === 'failed') {
            return classes.statusFailed;
        }
        if (status.toLowerCase() === 'cancelled' || status.toLowerCase() === 'rejected') {
            return classes.statusCancelled;
        }
        if (status.toLowerCase() === 'delivered') {
            return classes.statusDelivered;
        }
        return classes.statusNotFound;
    };
    const findMyStoreName = (value) => {
        const store = channelStoreName.find((element) => element.id === value);
        if (store) {
            return `${store.name} - (${store.code})`;
        }
        return value;
    };

    const columns = [
        {
            field: 'shipment_id', headerName: 'Shipment ID', hideable: true,
        },
        {
            field: 'channel_order_number', headerName: 'Channel Order Number', hideable: true,
        },
        {
            field: 'channel_order_reference', headerName: 'Channel Order Reference', hideable: true,
        },
        {
            field: 'shipment_status', headerName: 'Status', hideable: true,
        },
        { field: 'marketplace_status', headerName: 'Marketplace Status', hideable: true },
        {
            field: 'allocation_status', headerName: 'Allocation Status', hideable: true,
        },
        {
            field: 'channel_order_date', headerName: 'Channel Order Date', hideable: true,
        },
        { field: 'recipient_name', headerName: 'Recipient Name', hideable: true },
        { field: 'shipping_method', headerName: 'Shipping Method', hideable: true },
        { field: 'channel_store_name', headerName: 'Channel Store Name', hideable: true },
        { field: 'location_code', headerName: 'Location Code', hideable: true },
        { field: 'airwaybill_number', headerName: 'Airwaybill Number', hideable: true },
        { field: 'return_order', headerName: 'Return Order', hideable: true },
        { field: 'shopbrand', headerName: 'Shopbrand', hideable: true },
        { field: 'port_code', headerName: 'Port Code', hideable: true },
        { field: 'action', headerName: 'Action' },
    ];

    const rows = shipmentList.map((row) => ({
        ...row,
        shipment_id: row.id,
        // channel_order_number: row.orderId,
        // marketplace_order_number: row.orderId,
        shipment_status: () => (
            <div className={getClassByStatus(row.state)}>
                {row.state}
            </div>
        ),
        // marketplace_status: row.state,
        // allocation_status:row.state,
        // channel_order_date: row.awbNumber,
        recipient_name: row.recipient.name,
        shipping_method: row.provider,
        channel_store_name: findMyStoreName(row.storeId),
        location_code: row.recipient.country,
        airwaybill_number: row.awbNumber,
        // return_order
        // shopbrand: row.tenantId,
        // port_code
        action: () => (
            <Link href={`/shipment/edit/${row.orderId}?sid=${row.id}`}>
                <a className={classes.linkButton}>View & Edit</a>
            </Link>
        ),
    }));

    const filters = [
        {
            field: 'shipment_number', name: 'shipment_number', type: 'like', label: 'Shipment Number', initialValue: '',
        },
        {
            field: 'order_number',
            name: 'order_number',
            type: 'like',
            label: 'Order Number',
            initialValue: '',
        },
        {
            field: 'channel_order_number',
            name: 'channel_order_number',
            type: 'like',
            label: 'Channel Order Number',
            initialValue: '',
        },
        {
            field: 'marketplace_order_number',
            name: 'marketplace_order_number',
            type: 'like',
            label: 'Marketplace Channel Number',
            initialValue: '',
        },
        {
            field: 'shipment_status',
            name: 'shipment_status',
            type: 'like',
            label: 'Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const options = optionsStatus.slice().map((item) => ({
                    name: item.name,
                    id: item.id,
                }));
                return (
                    <Autocomplete
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue.id);
                        }}
                        options={options}
                    />
                );
            },
        },
        {
            field: 'marketplace_status',
            name: 'marketplace_status',
            type: ['null', 'eq'],
            label: 'Marketplace Status',
            initialValue: tab !== 0 ? tab : '',
            component: ({ filterValue, setFilterValue }) => {
                const optionsAllocation = optionsStatus.slice(1).map((item) => ({
                    name: item.name,
                    id: item.id,
                }));
                // optionsAllocation.splice(1, 0, { name: t('allshipment:Confirmed'), id: 'confirmed' });
                optionsAllocation.splice(1, 0, { name: 'Confirmed', id: 'confirmed' });
                return (
                    <Autocomplete
                        value={optionsAllocation.find((e) => e.id === filterValue)}
                        onChange={(newValue) => {
                            if (newValue && newValue.id === 'true') {
                                setIndexType({ ...indexType, allocation_status: 0 });
                            } else {
                                setIndexType({ ...indexType, allocation_status: 1 });
                            }
                            setFilterValue(newValue && newValue.id);
                        }}
                        options={optionsAllocation}
                    />
                );
            },
        },
        {
            field: 'allocation_status',
            name: 'allocation_status',
            type: ['null', 'eq'],
            label: 'Allocation Status',
            initialValue: tab !== 0 ? tab : '',
            component: ({ filterValue, setFilterValue }) => {
                const optionsAllocation = optionsStatus.slice(1).map((item) => ({
                    name: item.name,
                    id: item.id,
                }));
                // optionsAllocation.splice(1, 0, { name: t('allshipment:Confirmed'), id: 'confirmed' });
                optionsAllocation.splice(1, 0, { name: 'Confirmed', id: 'confirmed' });
                return (
                    <Autocomplete
                        value={optionsAllocation.find((e) => e.id === filterValue)}
                        onChange={(newValue) => {
                            if (newValue && newValue.id === 'true') {
                                setIndexType({ ...indexType, allocation_status: 0 });
                            } else {
                                setIndexType({ ...indexType, allocation_status: 1 });
                            }
                            setFilterValue(newValue && newValue.id);
                        }}
                        options={optionsAllocation}
                    />
                );
            },
        },
        {
            field: 'recipient_name', name: 'recipient_name', type: 'like', label: 'Recipient Name', initialValue: '',
        },
        // {
        //     field: 'channel_code',
        //     name: 'channel_code',
        //     type: 'eq',
        //     label: 'Shop Brand',
        //     initialValue: '',
        //     component: ({ filterValue, setFilterValue }) => {
        //         const [getChannelList, getChannelListRes] = channelGqlService.getChannelList();
        //         const channelOptions = (getChannelListRes
        //           && getChannelListRes.data
        //           && getChannelListRes.data.getChannelList
        //           && getChannelListRes.data.getChannelList.items)
        //           || [];
        //         const primaryKey = 'channel_code';
        //         const labelKey = 'channel_name';
        //         return (
        //             <Autocomplete
        //                 mode="lazy"
        //                 getOptions={getChannelList}
        //                 value={channelOptions.find((e) => e[primaryKey] === filterValue)}
        //                 onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
        //                 options={channelOptions}
        //                 primaryKey={primaryKey}
        //                 labelKey={labelKey}
        //             />
        //         );
        //     },
        // },
        // {
        //     field: 'loc_name',
        //     name: 'loc_name',
        //     type: 'eq',
        //     label: 'Port Code',
        //     initialValue: '',
        //     component: ({ filterValue, setFilterValue }) => {
        //         const [getStoreLocationList, { data: dataLoc, loading: loadingLoc }] = locationGqlService.getStoreLocationList();
        //         const [optionsLoc, setOptionsLoc] = useState([]);
        //         const [searchLoc, setSearchLoc] = useState('');
        //         const primaryKey = 'loc_code';
        //         const labelKey = 'loc_name';

        //         useEffect(() => {
        //             const onChangeTimeOut = setTimeout(() => {
        //                 const isExist = searchLoc && optionsLoc.filter((elm) => elm?.[labelKey]?.toLowerCase().includes(searchLoc?.toLowerCase()));
        //                 if (searchLoc && isExist.length === 0) {
        //                     getStoreLocationList({
        //                         variables: {
        //                             search: searchLoc,
        //                             pageSize: 20,
        //                             currentPage: 1,
        //                         },
        //                     });
        //                 }
        //                 return null;
        //             }, 500);

        //             return () => clearTimeout(onChangeTimeOut);
        //         }, [searchLoc]);

        //         useEffect(() => {
        //             if (dataLoc && dataLoc.getStoreLocationList && dataLoc.getStoreLocationList.items) {
        //                 const ids = new Set(optionsLoc.map((d) => d[primaryKey]));
        //                 setOptionsLoc([...optionsLoc, ...dataLoc.getStoreLocationList.items.filter((d) => !ids.has(d[primaryKey]))]);
        //             }
        //         }, [dataLoc]);

        //         return (
        //             <Autocomplete
        //                 mode={loadingLoc.length > 0 ? 'default' : 'lazy'}
        //                 loading={loadingLoc}
        //                 getOptions={getStoreLocationList}
        //                 value={optionsLoc.find((e) => e[labelKey] === filterValue)}
        //                 onChange={(newValue) => {
        //                     setFilterValue(newValue && newValue[labelKey]);
        //                 }}
        //                 onInputChange={(e) => setSearchLoc(e && e.target && e.target.value)}
        //                 options={optionsLoc}
        //                 primaryKey={primaryKey}
        //                 labelKey={labelKey}
        //             />
        //         );
        //     },
        // },
        {
            field: 'shipment_number', name: 'shipment_number', type: 'like', label: 'Shop Brand', initialValue: '',
        },
        {
            field: 'shipment_number', name: 'shipment_number', type: 'like', label: 'Port Code', initialValue: '',
        },

    ];

    return (
        <div className={classes.shipmentContainer}>
            <Header {...props} />
            <Table
                filters={filters}
                hideActions
                hideColumns
                searchable
                // actions={actions}
                rows={rows}
                getRows={getShipmentList}
                showCheckbox
                loading={loading && loadingChannelStoreName}
                columns={columns}
                handleReset={() => setTab(0)}
                indexType={indexType}
                pagePrev={pagePrev}
                pageNext={pageNext}
                handleClickRow={handleClickRow}
            />
        </div>
    );
};

export default ShippingContentList;
