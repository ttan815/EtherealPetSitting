const REGEX_SYMBOL = /[^A-Za-z0-9]/;
const REGEX_CAPITAL = /[A-Z]/;
const REGEX_NUMBER = /[0-9]/;
const REGEX_LETTER = /[A-Za-z]/
const REGEX_ONLY_LETTER = /^[a-zA-Z]+$/
const REGEX_PHONE_CHARACTERS = /^\+?[\d\s().-]+$/
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

/**
 * Normalize a Phone Number
 * Accepts any common format: 5555555555, 555-555-5555, (555) 555-5555, +1 555 555 5555
 *
 * @param {String} input
 * @returns {String|null} "(555)555-5555" (the stored format), or null if not a 10 digit number
 */
export function normalizePhoneNumber(input) {
    if (!REGEX_PHONE_CHARACTERS.test(input))
        return null;

    let digits = input.replace(/\D/g, "");
    if (digits.length === 11 && digits.startsWith("1"))
        digits = digits.slice(1); // drop the US country code

    if (digits.length !== 10)
        return null;
    return `(${digits.slice(0, 3)})${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function hasPhoneFormat(input) {
    return normalizePhoneNumber(input) !== null;
}

export function hasEmailFormat(input) {
    return REGEX_EMAIL_FORMAT.test(input);
}