import Core from '@modules/orders/plugins/AddressFormDialog/core';
import Content from '@modules/orders/plugins/AddressFormDialog/components';

const DefaultAddressForm = (props) => (
    <Core {...props} Content={Content} />
);

export default DefaultAddressForm;
