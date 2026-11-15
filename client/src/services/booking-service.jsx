import { BOOKING_SERVICES } from "../constants/booking-services";
import { NO_PREFERENCE_SITTER_ID } from "../constants/booking-sitters";
import dropInIcon from "../assets/icons/drop-in.svg";
import wholeDayIcon from "../assets/icons/whole-day.svg";
import overnightIcon from "../assets/icons/overnight.svg";
import dogWalkingIcon from "../assets/icons/dog-walking.svg";
import groomingIcon from "../assets/icons/grooming.svg";
import medicationIcon from "../assets/icons/medication.svg";

const BOOKING_SERVICE_PRICES = {
    "drop-in-care": 25,
    "whole-day-care": null,
    "overnight-stays": 85,
    "dog-walking": 30,
    "nail-trims": null,
    medication: 35,
};

const BOOKING_SITTERS = [
    {
        id: NO_PREFERENCE_SITTER_ID,
        name: "No preference",
        shortName: "No preference",
        initials: "Any",
        description: "Auto-assign an available sitter",
        serviceIds: null,
    },
    {
        id: "angelena-chantengco",
        name: "Angelena Chantengco",
        shortName: "Angelena C.",
        initials: "AC",
        description: "Owner · All services",
        serviceIds: null,
    },
    {
        id: "adrian-p",
        name: "Adrian P.",
        shortName: "Adrian P.",
        initials: "AP",
        description: "Sitter · Drop-in, Dog Walking",
        serviceIds: ["drop-in-care", "dog-walking"],
    },
];

const HOMEPAGE_SERVICES = [
    {
        id: "drop-in-care",
        name: "Drop-in Care",
        icon: dropInIcon,
        description: "Quick visits for feeding, potty breaks, and playtime while you're away during the day.",
        image: null,
        photoLabel: "Pet at home",
    },
    {
        id: "whole-day-care",
        name: "Whole Day Care",
        icon: wholeDayIcon,
        description: "Extended care throughout the day with meals, walks, and company, so your pet is never alone for long.",
        image: null,
        photoLabel: "Pet playing",
    },
    {
        id: "overnight-stays",
        name: "Overnight Stays",
        icon: overnightIcon,
        description: "In-home overnight care so your pet can sleep comfortably in their own environment.",
        image: null,
        photoLabel: "Pet sleeping",
    },
    {
        id: "dog-walking",
        name: "Dog Walking",
        icon: dogWalkingIcon,
        description: "Structured walks to keep your dog active, stimulated, and healthy. Choose your duration.",
        image: null,
        photoLabel: "Dog on a walk",
    },
    {
        id: "grooming-care",
        name: "Grooming Care",
        icon: groomingIcon,
        description: "Gentle, stress-free nail trims, ear cleaning, and anal gland expression to keep your pet comfortable and healthy.",
        image: null,
        photoLabel: "Pet being groomed",
    },
    {
        id: "medication",
        name: "Medication",
        icon: medicationIcon,
        description: "Safe and timely administration of medications, including pills, drops, and injections, following your care instructions.",
        image: null,
        photoLabel: "Pet being cared for",
    },
];

/**
 * Fetches booking services with their current temporary prices.
 * @returns {Object[]} Service types and starting prices.
 */
export function getBookingServices() {
    return BOOKING_SERVICES.map((service) => ({
        ...service,
        startingPrice: BOOKING_SERVICE_PRICES[service.id] ?? null,
    }));
}

/**
 * Fetches the temporary sitter options for booking.
 * @returns {Object[]} Sitter records.
 */
export function getBookingSitters() {
    return BOOKING_SITTERS.map((sitter) => ({
        ...sitter,
        serviceIds: sitter.serviceIds ? [...sitter.serviceIds] : null,
    }));
}

/**
 * Fetches the temporary service cards shown on the homepage.
 * @returns {Object[]} Homepage service offerings.
 */
export function getHomepageServices() {
    return HOMEPAGE_SERVICES.map((service) => ({ ...service }));
}
