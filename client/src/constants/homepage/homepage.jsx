import instagramIcon from "../../assets/icons/instagram.svg";
import facebookIcon from "../../assets/icons/facebook.svg";

/**
 * Navigation links to sections on the homepage.
 * @type {Array<Object>}
 */
export const HOMEPAGE_SECTION_LINKS = [
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Reviews", href: "/#reviews" },
];

/**
 * Quick links shown in the homepage footer.
 * @type {Array<Object>}
 */
export const HOMEPAGE_QUICK_LINKS = [
    { label: "Home", href: "#home" },
    { label: "Our Services", href: "#services" },
    { label: "About Angelena", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Log In", href: "/login" },
    { label: "Create Account", href: "/create-account" },
];

/**
 * Social-media links displayed on the homepage.
 * @type {Array<Object>}
 */
export const HOMEPAGE_SOCIAL_LINKS = [
    { label: "Instagram", href: "#", icon: instagramIcon },
    { label: "Facebook", href: "#", icon: facebookIcon },
];

/** @type {string[]} Background tone classes used by the homepage pet avatars. */
export const HOMEPAGE_AVATAR_TONES = ["ring", "blush", "tan"];
