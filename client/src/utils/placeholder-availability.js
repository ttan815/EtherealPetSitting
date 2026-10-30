// PLACEHOLDER: fake sitter schedules so the Date & Time step has something to show.
// BACKEND: replace getAvailableTimes with a call to the availability API once it exists.

// workDays: 0 = Sunday ... 6 = Saturday
// times: start times in minutes after midnight (540 = 9:00 AM)
const WEEKLY_SCHEDULES = {
  "angelena-chantengco": { workDays: [1, 2, 3, 4, 5, 6], times: [540, 630, 720, 930, 1080] },
  "adrian-p": { workDays: [1, 2, 3, 4, 5], times: [480, 780, 1050] },
};

// Treats some slots as already booked so every day doesn't look the same
function isPretendBooked(date, slotIndex) {
  return (date.getDate() + slotIndex) % 4 === 0;
}

// Open start times on this date for any of the given sitters, earliest first
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
