const REGEX_SYMBOL = /[^A-Za-z0-9]/;
const REGEX_CAPITAL = /[A-Z]/;
const REGEX_NUMBER = /[0-9]/;
const REGEX_LETTER = /[A-Za-z]/
const REGEX_ONLY_LETTER = /^[a-zA-Z]+$/
const REGEX_PHONE_FORMAT = /^\(\d{3}\)\d{3}-\d{4}$/
const REGEX_EMAIL_FORMAT = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export function hasSymbol(input) {
    return REGEX_SYMBOL.test(input);
}

export function hasCapital(input) {
    return REGEX_CAPITAL.test(input);
}

export function hasNumber(input) {
    return REGEX_NUMBER.test(input);
}

export function hasLetter(input) {
    return REGEX_LETTER.test(input);
}

export function hasOnlyLetter(input) {
    return REGEX_ONLY_LETTER.test(input);
}

export function hasPhoneFormat(input) {
    return REGEX_PHONE_FORMAT.test(input);
}

export function hasEmailFormat(input) {
    return REGEX_EMAIL_FORMAT.test(input);
}