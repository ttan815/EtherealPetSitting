// Defines shared booking services data and settings.
import homeIcon from "../assets/booking/icon-home.svg";
import sunIcon from "../assets/booking/icon-sun.svg";
import moonIcon from "../assets/booking/icon-moon.svg";
import pawIcon from "../assets/booking/icon-paw.svg";
import scissorsIcon from "../assets/booking/icon-scissors.svg";
import pillIcon from "../assets/booking/icon-pill.svg";

// Services a customer can pick on step 1 of booking (Figma "Customer - Book a Service").
// id: used in the URL (/book-appointment?service=dog-walking) and later sent to the API
// Service IDs and presentation are stable. Prices are loaded by booking-service.
/**
 * Stable service IDs, display names, and icons used in the booking flow.
 * Dynamic service prices are supplied by the booking service.
 * @type {Array<Object>}
 */
export const BOOKING_SERVICES = [
  {
    id: "drop-in-care",
    name: "Drop-in Care",
    icon: homeIcon,
    description: "Quick visits for feeding, potty breaks, and playtime while you're away during the day.",
    priceUnit: "visit",
  },
  {
    id: "whole-day-care",
    name: "Whole Day Care",
    icon: sunIcon,
    description: "Extended care throughout the day with meals, walks, and company.",
    priceUnit: "day",
  },
  {
    id: "overnight-stays",
    name: "Overnight Stays",
    icon: moonIcon,
    description: "In-home overnight care so your pet sleeps comfortably in their own space.",
    priceUnit: "night",
  },
  {
    id: "dog-walking",
    name: "Dog Walking",
    icon: pawIcon,
    description: "Structured walks to keep your dog active, stimulated, and healthy.",
    priceUnit: "walk",
  },
  {
    id: "nail-trims",
    name: "Nail Trims",
    icon: scissorsIcon,
    description: "Gentle, stress-free nail trims for healthy, comfortable paws.",
    priceUnit: "trim",
  },
  {
    id: "medication",
    name: "Medication",
    icon: pillIcon,
    description: "Safe, timely administration of pills, drops, and injections.",
    priceUnit: "visit",
  },
];

/** @type {Object<string, number|null>} Default display prices pending the services API. */
export const BOOKING_SERVICE_PRICES = {
  "drop-in-care": 25,
  "whole-day-care": null,
  "overnight-stays": 85,
  "dog-walking": 30,
  "nail-trims": null,
  medication: 35,
};

/** @type {Array<Object>} Homepage service-card presentation, including local icon assets. */
export const HOMEPAGE_SERVICES = [
  { id: "drop-in-care", name: "Drop-in Care", icon: homeIcon, description: "Quick visits for feeding, potty breaks, and playtime while you're away during the day.", image: null, photoLabel: "Pet at home" },
  { id: "whole-day-care", name: "Whole Day Care", icon: sunIcon, description: "Extended care throughout the day with meals, walks, and company, so your pet is never alone for long.", image: null, photoLabel: "Pet playing" },
  { id: "overnight-stays", name: "Overnight Stays", icon: moonIcon, description: "In-home overnight care so your pet can sleep comfortably in their own environment.", image: null, photoLabel: "Pet sleeping" },
  { id: "dog-walking", name: "Dog Walking", icon: pawIcon, description: "Structured walks to keep your dog active, stimulated, and healthy. Choose your duration.", image: null, photoLabel: "Dog on a walk" },
  { id: "grooming-care", name: "Grooming Care", icon: scissorsIcon, description: "Gentle, stress-free nail trims, ear cleaning, and anal gland expression to keep your pet comfortable and healthy.", image: null, photoLabel: "Pet being groomed" },
  { id: "medication", name: "Medication", icon: pillIcon, description: "Safe and timely administration of medications, including pills, drops, and injections, following your care instructions.", image: null, photoLabel: "Pet being cared for" },
];
