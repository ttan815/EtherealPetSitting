// Temporary availability data and service adapters.
import { formatDate, formatTime } from "../../components/owner-dashboard/availability/AvailabilityTable";

/**
 * Validates availability form values and checks for overlapping slots.
 * @param {Object} form Form fields including admin, service, date, start, end, booking, customerId, and petId.
 * @param {Object[]} slots Existing availability slots to check for overlaps.
 * @param {number|string|null} editingId ID of the slot being edited, or null when adding a slot.
 * @returns {Object<string, string>} Validation error messages keyed by field name; empty when valid.
 */
export function validateAvailability(form, slots, editingId) {
  const errors = {};
  if (!form.admin) errors.admin = "Choose an admin.";
  if (!form.service) errors.service = "Choose a service.";
  if (!form.date) errors.date = "Pick a date.";
  if (!form.start) errors.start = "Pick a start time.";
  if (!form.end) errors.end = "Pick an end time.";
  if (form.start && form.end && form.end <= form.start) errors.end = "End time must be after the start time.";
  if (form.booking === "customer" && !form.customerId) errors.customerId = "Choose a customer.";
  else if (form.booking === "customer" && !form.petId) errors.petId = "Choose a pet.";

  if (!errors.admin && !errors.date && !errors.start && !errors.end) {
    const clash = slots.find((slot) =>
      slot.id !== editingId &&
      slot.status !== "disapproved" &&
      slot.admin === form.admin &&
      slot.date === form.date &&
      form.start < slot.end && slot.start < form.end
    );
    if (clash) {
      errors.overlap = `Overlaps with ${clash.admin}'s ${formatTime(clash.start)} – ${formatTime(clash.end)} slot on ${formatDate(clash.date)}.`;
    }
  }
  return errors;
}

// workDays: 0 = Sunday ... 6 = Saturday
// times: start times in minutes after midnight (540 = 9:00 AM)
const WEEKLY_SCHEDULES = {
  "angelena-chantengco": { workDays: [1, 2, 3, 4, 5, 6], times: [540, 630, 720, 930, 1080] },
  "adrian-p": { workDays: [1, 2, 3, 4, 5], times: [480, 780, 1050] },
};

const AVAILABILITY_OPTIONS = {
  admins: ["Jamie Rivera", "Priya Shah", "Marcus Lee"],
  services: ["Dog Walking", "Drop-in Care", "Overnight Stay", "Pet Sitting"],
  customers: [
    { id: 1, name: "Maria G.", pets: [{ id: 11, name: "Coco", breed: "Poodle" }] },
    { id: 2, name: "Kevin P.", pets: [{ id: 21, name: "Max", breed: "Labrador" }] },
    { id: 3, name: "Lisa W.", pets: [{ id: 31, name: "Nala", breed: "Siamese Cat" }] },
    { id: 4, name: "Daniel K.", pets: [{ id: 41, name: "Biscuit", breed: "Corgi" }] },
  ],
};

let availabilitySlots = [
  { id: 1, admin: "Jamie Rivera", service: "Dog Walking", date: "2026-11-16", start: "08:00", end: "12:00", price: 25, customer: null, status: "pending" },
  { id: 2, admin: "Priya Shah", service: "Overnight Stay", date: "2026-11-18", start: "18:00", end: "23:00", price: 85, customer: null, status: "pending" },
  { id: 3, admin: "Marcus Lee", service: "Drop-in Care", date: "2026-11-17", start: "12:00", end: "15:00", price: 30, customer: { id: 3, name: "Lisa W." }, status: "pending" },
  { id: 4, admin: "Jamie Rivera", service: "Pet Sitting", date: "2026-11-19", start: "09:00", end: "13:00", price: 60, customer: null, status: "awaiting_admin" },
  { id: 5, admin: "Priya Shah", service: "Dog Walking", date: "2026-11-16", start: "13:00", end: "17:00", price: 25, customer: null, status: "approved" },
  { id: 6, admin: "Marcus Lee", service: "Overnight Stay", date: "2026-11-21", start: "18:00", end: "22:00", price: 85, customer: { id: 1, name: "Maria G." }, status: "approved" },
  { id: 7, admin: "Jamie Rivera", service: "Drop-in Care", date: "2026-11-20", start: "10:00", end: "12:00", price: 30, customer: null, status: "approved" },
  { id: 8, admin: "Marcus Lee", service: "Pet Sitting", date: "2026-11-22", start: "08:00", end: "11:00", price: 60, customer: null, status: "disapproved", reason: "Already booked that morning." },
];

// Treats some slots as already booked so every day doesn't look the same
function isPretendBooked(date, slotIndex) {
  return (date.getDate() + slotIndex) % 4 === 0;
}

// Open start times on this date for any of the given sitters, earliest first
/**
 * Gets the placeholder start times available from selected sitters on a date.
 * @param {Date} date The date to check.
 * @param {string[]} sitterIds IDs of sitters whose schedules should be combined.
 * @returns {number[]} Available start times in minutes after midnight, sorted earliest first.
 */
export function getAvailableTimes(date, sitterIds) {
  const times = new Set();

  sitterIds.forEach((sitterId) => {
    const schedule = WEEKLY_SCHEDULES[sitterId];
    if (!schedule || !schedule.workDays.includes(date.getDay())) {
      return;
    }

    schedule.times.forEach((time, slotIndex) => {
      if (!isPretendBooked(date, slotIndex)) {
        times.add(time);
      }
    });
  });

  return [...times].sort((a, b) => a - b);
}

/**
 * Returns temporary admin, service, and customer options for availability forms.
 * @returns {{admins: string[], services: string[], customers: Object[]}} Availability form options.
 */
export function getAvailabilityOptions() {
  return {
    admins: [...AVAILABILITY_OPTIONS.admins],
    services: [...AVAILABILITY_OPTIONS.services],
    customers: AVAILABILITY_OPTIONS.customers.map((customer) => ({
      ...customer,
      pets: customer.pets.map((pet) => ({ ...pet })),
    })),
  };
}

/**
 * Returns copies of the temporary availability slots.
 * @param {Object} [filters={}] Query filters reserved for the availability API.
 * @returns {Object[]} Copies of the current availability slots.
 */
export function getAvailability(filters = {}) {
  void filters;
  return availabilitySlots.map((slot) => ({
    ...slot,
    customer: slot.customer ? { ...slot.customer } : null,
  }));
}

/**
 * Creates and stores a temporary availability slot.
 * @param {Object} data Availability slot values to create.
 * @returns {Object} A copy of the created slot, including its ID and status.
 */
export function addAvailability(data) {
  const slot = { ...data, id: Date.now(), status: "awaiting_admin" };
  availabilitySlots = [slot, ...availabilitySlots];
  return { ...slot };
}

/**
 * Assigns a temporary customer and pet to an availability slot.
 * @param {number|string} id Availability slot ID.
 * @param {number|string} customerId Customer ID.
 * @param {number|string} petId Pet ID to assign to the slot.
 * @returns {{ok: boolean, id: number|string, customerId: number|string, petId: number|string}} Whether the assignment succeeded and the assigned identifiers.
 */
export function assignCustomer(id, customerId, petId) {
  const slot = availabilitySlots.find((item) => String(item.id) === String(id));
  const customer = AVAILABILITY_OPTIONS.customers.find((item) => String(item.id) === String(customerId));
  if (!slot || !customer) {
    return { ok: false, id, customerId, petId };
  }
  const pet = customer.pets.find((item) => String(item.id) === String(petId));
  slot.customer = {
    id: customer.id,
    name: customer.name,
    pet: pet ? { id: pet.id, name: pet.name } : null,
  };
  return { ok: true, id, customerId, petId: pet ? pet.id : petId };
}

/**
 * Approves a temporary availability request.
 * @param {number|string} id Availability slot ID.
 * @returns {{ok: boolean, id: number|string, status?: string}} Whether the slot was found and its resulting status when found.
 */
export function approveAvailability(id) {
  const slot = availabilitySlots.find((item) => String(item.id) === String(id));
  if (!slot) {
    return { ok: false, id };
  }
  slot.status = "approved";
  delete slot.reason;
  return { ok: true, id, status: slot.status };
}

/**
 * Disapproves a temporary availability request with a reason.
 * @param {number|string} id Availability slot ID.
 * @param {string} reason Reason provided by the owner.
 * @returns {{ok: boolean, id: number|string, status?: string, reason?: string}} Whether the slot was disapproved and its resulting status and reason when successful.
 */
export function disapproveAvailability(id, reason) {
  const slot = availabilitySlots.find((item) => String(item.id) === String(id));
  if (!slot || !reason?.trim()) {
    return { ok: false, id };
  }
  slot.status = "disapproved";
  slot.reason = reason;
  return { ok: true, id, status: slot.status, reason };
}

/**
 * Updates a temporary availability slot and returns its updated value.
 * @param {number|string} id Availability slot ID.
 * @param {Object} data Updated availability slot values.
 * @returns {Object|null} A copy of the updated slot, or null when the slot was not found.
 */
export function updateAvailability(id, data) {
  const index = availabilitySlots.findIndex((slot) => String(slot.id) === String(id));
  if (index < 0) {
    return null;
  }
  const updated = { ...availabilitySlots[index], ...data, id, status: "awaiting_admin" };
  delete updated.reason;
  availabilitySlots[index] = updated;
  return { ...updated, customer: updated.customer ? { ...updated.customer } : null };
}


/**
 * Removes a temporary availability slot.
 * @param {number|string} id Availability slot ID.
 * @returns {{ok: boolean, id: number|string}} Whether a slot was removed and its ID.
 */
export function removeAvailability(id) {
  const previousCount = availabilitySlots.length;
  availabilitySlots = availabilitySlots.filter((slot) => String(slot.id) !== String(id));
  return { ok: availabilitySlots.length < previousCount, id };
}

/**
 * Returns temporary employee availability for the selected date.
 * @param {string} dateKey Selected date in YYYY-MM-DD format.
 * @returns {Promise<Object[]>} A promise resolving to employees and their available times.
 */
export async function getEmployeesWithAvailability(dateKey) {
  return [
    {
      id: "employee-1",
      name: "Jordan Lee",
      availability: [{ date: dateKey, times: ["8:00 AM", "10:00 AM", "12:00 PM"] }],
    },
    {
      id: "employee-2",
      name: "Taylor Morgan",
      availability: [{ date: dateKey, times: ["9:00 AM", "1:00 PM", "3:00 PM"] }],
    },
  ];
}
