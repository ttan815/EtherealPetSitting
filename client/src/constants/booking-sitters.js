// Sitter choices on step 2 of booking (Figma "Choose your sitter").
// PLACEHOLDER: hardcoded until sitters come from the server.
// serviceIds: services this sitter offers; null means every service
// shortName: shown in the sitter dropdown and the "Available Times" summary

export const NO_PREFERENCE_SITTER_ID = "no-preference";

export const BOOKING_SITTERS = [
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
