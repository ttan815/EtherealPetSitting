// PLACEHOLDER: the logged-in customer's saved pets and home-access notes,
// taken from the Figma prototype.
// BACKEND: replace getSavedPets and getSavedHouseEntry with calls to the pets /
// customer profile API (e.g. GET /api/pets for the logged-in customer).

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

export function getSavedPets() {
  return SAVED_PETS;
}

export function getSavedHouseEntry() {
  return "Side gate code 4821. Spare key in the lockbox by the back door (code 0917).";
}
