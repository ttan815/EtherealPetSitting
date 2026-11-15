export const CALENDAR_START_HOUR = 8;
export const CALENDAR_END_HOUR = 20;
export const CALENDAR_HOUR_HEIGHT = 53;

export const CALENDAR_HOURS = Array.from(
  { length: CALENDAR_END_HOUR - CALENDAR_START_HOUR },
  (_, index) => CALENDAR_START_HOUR + index
);

export const CALENDAR_WEEKDAY_LABELS = [
  "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
];

export const CALENDAR_SITTERS = [
  { id: "all", name: "All sitters" },
  { id: "me", name: "You" },
  { id: "adrian", name: "Adrian" }
];

export const CALENDAR_VIEWS = ["day", "week", "month"];
/**
 * Mock appointment data used by the owner calendar until backend data is available.
 * @type {Array<Object>} Appointment event records
 */
export const MOCK_EVENTS = [
  {
    id: "1",
    date: "2026-09-28",
    start: "2026-09-28T08:00:00",
    end: "2026-09-28T08:30:00",
    petName: "Biscuit",
    service: "Dog Walking",
    sitterId: "me",
    status: "booked"
  },
  {
    id: "2",
    date: "2026-09-28",
    start: "2026-09-28T10:30:00",
    end: "2026-09-28T11:10:00",
    petName: "Luna",
    service: "Drop-in Care",
    sitterId: "adrian",
    status: "booked"
  },
  {
    id: "3",
    date: "2026-09-28",
    start: "2026-09-28T13:00:00",
    end: "2026-09-28T13:30:00",
    petName: "Mochi",
    service: "Dog Walking",
    sitterId: "me",
    status: "booked"
  },
  {
    id: "4",
    date: "2026-09-28",
    start: "2026-09-28T15:30:00",
    end: "2026-09-28T16:20:00",
    petName: "Pepper",
    service: "Whole Day Care",
    sitterId: "adrian",
    status: "booked"
  },
  {
    id: "5",
    date: "2026-09-28",
    start: "2026-09-28T18:00:00",
    end: "2026-09-28T20:00:00",
    petName: "Oliver",
    service: "Overnight Stay",
    sitterId: "me",
    status: "booked"
  },

  {
    id: "6",
    date: "2026-09-29",
    start: "2026-09-29T09:00:00",
    end: "2026-09-29T09:30:00",
    petName: "Max",
    service: "Dog Walking",
    sitterId: "me",
    status: "booked"
  },
  {
    id: "7",
    date: "2026-09-29",
    start: "2026-09-29T12:00:00",
    end: "2026-09-29T12:30:00",
    petName: "Nala",
    service: "Drop-in Care",
    sitterId: "adrian",
    status: "booked"
  },

  {
    id: "8",
    date: "2026-09-30",
    start: "2026-09-30T08:00:00",
    end: "2026-09-30T09:00:00",
    petName: "Biscuit",
    service: "Dog Walking",
    sitterId: "me",
    status: "booked"
  },
  {
    id: "9",
    date: "2026-09-30",
    start: "2026-09-30T14:00:00",
    end: "2026-09-30T14:30:00",
    petName: "Coco",
    service: "Drop-in Care",
    sitterId: "me",
    status: "booked"
  },

  {
    id: "10",
    date: "2026-10-01",
    start: "2026-10-01T09:00:00",
    end: "2026-10-01T09:30:00",
    petName: "Max",
    service: "Dog Walking",
    sitterId: "me",
    status: "booked"
  },
  {
    id: "11",
    date: "2026-10-01",
    start: "2026-10-01T13:00:00",
    end: "2026-10-01T13:30:00",
    petName: "Mochi",
    service: "Dog Walking",
    sitterId: "me",
    status: "booked"
  },

  {
    id: "12",
    date: "2026-10-02",
    start: "2026-10-02T12:00:00",
    end: "2026-10-02T12:30:00",
    petName: "Nala",
    service: "Drop-in Care",
    sitterId: "adrian",
    status: "booked"
  },
  {
    id: "13",
    date: "2026-10-02",
    start: "2026-10-02T15:30:00",
    end: "2026-10-02T16:30:00",
    petName: "Pepper",
    service: "Whole Day Care",
    sitterId: "adrian",
    status: "booked"
  },

  {
    id: "14",
    date: "2026-10-03",
    start: "2026-10-03T10:00:00",
    end: "2026-10-03T10:30:00",
    petName: "Luna",
    service: "Drop-in Care",
    sitterId: "adrian",
    status: "booked"
  },
  {
    id: "15",
    date: "2026-10-03",
    start: "2026-10-03T18:00:00",
    end: "2026-10-03T18:45:00",
    petName: "Coco",
    service: "Dog Walking",
    sitterId: "me",
    status: "booked"
  }
];
