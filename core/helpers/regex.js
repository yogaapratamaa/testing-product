/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
// phone format for 62XXXXXX
// export const regexPhone = new RegExp(/^[1-9]{1,3}[0-9]{8,16}$/);
// phone format accept 08XXXXX
export const regexPhone = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[0-9]{8,16}$/);
export const regexPhoneDial = (dial) => new RegExp(`^${dial}[0-9]{8,16}$`);
export const regexEmail = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);
export const regexMultipleEmail = new RegExp(
    /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/g,
);
