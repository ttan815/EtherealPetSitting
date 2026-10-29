import homeIcon from "../assets/booking/icon-home.svg";
import sunIcon from "../assets/booking/icon-sun.svg";
import moonIcon from "../assets/booking/icon-moon.svg";
import pawIcon from "../assets/booking/icon-paw.svg";
import scissorsIcon from "../assets/booking/icon-scissors.svg";
import pillIcon from "../assets/booking/icon-pill.svg";

// Services a customer can pick on step 1 of booking (Figma "Customer - Book a Service").
// id: used in the URL (/book-appointment?service=dog-walking) and later sent to the API
// startingPrice: lowest price in dollars per priceUnit.
//   PLACEHOLDER PRICES: these come from the Figma prototype, not the business owner.
//   null means there is no price yet, and the card shows "$—".
export const BOOKING_SERVICES = [
  {
    id: "drop-in-care",
    name: "Drop-in Care",
    icon: homeIcon,
    description: "Quick visits for feeding, potty breaks, and playtime while you're away during the day.",
    startingPrice: 25, // PLACEHOLDER
    priceUnit: "visit",
  },
  {
    id: "whole-day-care",
    name: "Whole Day Care",
    icon: sunIcon,
    description: "Extended care throughout the day with meals, walks, and company.",
    startingPrice: null, // PLACEHOLDER: price not set yet
    priceUnit: "day",
  },
  {
    id: "overnight-stays",
    name: "Overnight Stays",
    icon: moonIcon,
    description: "In-home overnight care so your pet sleeps comfortably in their own space.",
    startingPrice: 85, // PLACEHOLDER
    priceUnit: "night",
  },
  {
    id: "dog-walking",
    name: "Dog Walking",
    icon: pawIcon,
    description: "Structured walks to keep your dog active, stimulated, and healthy.",
    startingPrice: 30, // PLACEHOLDER
    priceUnit: "walk",
  },
  {
    id: "nail-trims",
    name: "Nail Trims",
    icon: scissorsIcon,
    description: "Gentle, stress-free nail trims for healthy, comfortable paws.",
    startingPrice: null, // PLACEHOLDER: price not set yet
    priceUnit: "trim",
  },
  {
    id: "medication",
    name: "Medication",
    icon: pillIcon,
    description: "Safe, timely administration of pills, drops, and injections.",
    startingPrice: 35, // PLACEHOLDER
    priceUnit: "visit",
  },
];
