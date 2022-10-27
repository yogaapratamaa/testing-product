export const moneyFormat = (value, currency) => {
    if (currency === '') {
        // eslint-disable-next-line no-param-reassign
        currency = 'IDR';
    }
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(value || 0);

    return price;
};

export const formatPriceNumber = (value) => {
    const price = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(value);
    // // eslint-disable-next-line no-restricted-globals
    // if (isNaN(price)) {
    //     return value;
    // }

    return price;
};

export const formatNumber = (curr) => curr?.replace(/[^0-9.-]+/g, '');

export default { moneyFormat, formatPriceNumber, formatNumber };
