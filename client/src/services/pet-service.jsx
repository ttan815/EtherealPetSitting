// Temporary pet and customer-home data and service adapters.

const SAVED_PETS = [
  {
    id: "mochi",
    isNew: false,
    name: "Mochi",
    breed: "Shiba Inu",
    age: "4 years",
    medication: "Allergy tablet — 1 daily at 1:00 PM, given with food.",
    diet: "1 cup dry food at 8:00 AM and 6:00 PM. No table scraps.",
    allergies: "Chicken — please check treats and food labels.",
    careInstructions: "Nervous around loud noises. Loves the red ball.",
  },
  {
    id: "luna",
    isNew: false,
    name: "Luna",
    breed: "Tabby Cat",
    age: "2 years",
    medication: "",
    diet: "1/4 cup wet food at 8:00 AM and 6:00 PM. Fresh water daily.",
    allergies: "",
    careInstructions: "Shy at first — give her a few minutes. Loves chin scratches.",
  },
  {
    id: "biscuit",
    isNew: false,
    name: "Biscuit",
    breed: "Golden Retriever",
    age: "6 years",
    medication: "Joint supplement — 1 chew with breakfast.",
    diet: "2 cups grain-free kibble at 7:00 AM and 5:00 PM.",
    allergies: "Grains — grain-free food and treats only.",
    careInstructions: "Loves fetch. Pulls on the leash near squirrels.",
  },
];

/**
 * Returns the placeholder saved-pet records for the current customer.
 * @returns {Array<Object>} The customer's saved pets and care details.
 */
export function getSavedPets() {
  return SAVED_PETS;
}

/**
 * Returns the placeholder home-entry notes for the current customer.
 * @returns {string} The saved home-access instructions.
 */
export function getSavedHouseEntry() {
  return "Side gate code 4821. Spare key in the lockbox by the back door (code 0917).";
}

const CUSTOMER_DASHBOARD_PETS = [
  {
    id: 1,
    name: "Mochi",
    breed: "Golden Retriever",
    age: "4 years",
    diet: "2 cups sensitive-stomach kibble · twice daily",
    careInstructions: "Breakfast at 7:30 AM, dinner at 6:00 PM, and a 25-minute evening walk.",
    lastUpdated: "Sep 24",
    profileComplete: true,
    photo: null,
  },
  {
    id: 2,
    name: "Pepper",
    breed: "Domestic Shorthair",
    age: "2 years",
    diet: "Grain-free dry food · fresh water refreshed daily",
    careInstructions: "Feed twice daily, refresh water, and keep the sunroom window open.",
    lastUpdated: "Sep 18",
    profileComplete: true,
    photo: null,
  },
];

const EDITABLE_PET_PROFILE = {
  name: "Mochi",
  age: "4 years",
  breed: "Golden Retriever",
  medication: "Apoquel - 16 mg with breakfast during allergy flare-ups",
  diet: "2 cups sensitive-stomach kibble · twice daily",
  allergy: "Chicken protein and seasonal grass pollen",
  instructions:
    "Breakfast at 7:30 AM, dinner at 6:00 PM, and a 25-minute evening walk. Wipe paws after outdoor play and leave fresh water by the kitchen door.",
  likes: "Tennis balls, chest scratches, slow introductions, and sniffing walks.",
  dislikes: "Thunder, vacuum cleaners, and dogs approaching quickly during meals.",
  veterinarian: "Dr. Lena Cho",
  clinic: "Juniper Veterinary Center",
  phone: "(503) 555-0148",
  notes:
    "Mochi settles best with his blue blanket nearby. His emergency contact is Daniel Rivera at (503) 555-0182.",
};

/**
 * Fetches the temporary pet profile used by the edit-pet form.
 * @returns {Object} Pet profile data.
 */
export function getEditablePetProfile() {
  return { ...EDITABLE_PET_PROFILE };
}

/**
 * Fetches the temporary pet profiles shown in the customer dashboard.
 * @returns {Object[]} Pet records.
 */
export function getCustomerPets() {
  return CUSTOMER_DASHBOARD_PETS.map((pet) => ({ ...pet }));
}
