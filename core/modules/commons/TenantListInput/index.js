import { getCurrentUser, tenantListFilter } from '@common_tenantlistinput/services/graphql';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@common_textfield';
import React from 'react';

const TenantListInput = ({
    value, error, helperText, className, style, name, handleChange, placeholder, disabled = false,
}) => {
    const { data } = getCurrentUser();
    const [getTenantListFilter, { data: dataTenant }] = tenantListFilter();
    React.useEffect(() => {
        if (data) {
            const { getCurrentUser: { appMetadataTenantIDs } } = data;
            getTenantListFilter({ variables: { input: { ids: appMetadataTenantIDs } } });
        }
    }, [data]);
    return (
        <div style={{ display: 'grid' }}>
            <TextField
                style={style}
                disabled={disabled}
                placeholder={placeholder}
                className={className}
                variant="outlined"
                name={name}
                value={value}
                error={error}
                onChange={handleChange}
                helperText={helperText}
                select
            >
                { dataTenant?.tenantListFilter && dataTenant.tenantListFilter.map((el) => (
                    <MenuItem key={el.code} value={el.code}>
                        {el.name}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};

export default TenantListInput;
