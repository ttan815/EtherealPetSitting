import { User, Sparkles, Mail, Phone, PhoneCall, MapPin } from "lucide-react";

/**
 * Customer personal-information fields and their display metadata.
 * @type {Array<Object>}
 */
export const PERSONAL_DETAILS_FIELDS = [
    { name: "fullName", label: "Full name", icon: User, type: "text" },
    { name: "preferredName", label: "Preferred name", icon: Sparkles, type: "text" },
    { name: "email", label: "Gmail", icon: Mail, type: "email" },
    { name: "phone", label: "Phone number", icon: Phone, type: "tel" },
    { name: "address", label: "Address", icon: MapPin, type: "text" },
    { name: "emergencyContact", label: "Emergency number", icon: PhoneCall, type: "text" },
];

/** @type {string[]} Names of the customer personal-information fields. */
export const PERSONAL_DETAILS_FIELD_NAMES = PERSONAL_DETAILS_FIELDS.map((field) => field.name);
