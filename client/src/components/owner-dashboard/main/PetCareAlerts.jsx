// Renders the pet care alerts card on the owner dashboard.
import pillIcon from "../../../assets/owner-dashboard/alert-pill.svg";
import warningIcon from "../../../assets/owner-dashboard/alert-warning.svg";
import calendarIcon from "../../../assets/owner-dashboard/alert-calendar.svg";
import "../../../styles/owner-dashboard/PetCareAlerts.css";

// Icon and destination for each alert type:
// pet alerts open the pet's profile, reschedule requests open the appointment
const ALERT_TYPES = {
  medication: { icon: pillIcon, iconClassName: "pet-care-alert-icon-pill", section: "customers_and_pets" },
  allergy: { icon: warningIcon, section: "customers_and_pets" },
  "reschedule-request": { icon: calendarIcon, section: "appointments" },
};

// Temporary placeholder alerts (Figma "Admin — Dashboard").
// BACKEND: replace with the owner's pet care alerts from the API, in the same shape.
// petId / appointmentId: the record a click should open
function getPetCareAlerts() {
  return [
    {
      id: "mochi-medication",
      type: "medication",
      headline: "Mochi — medication at 1:00 PM",
      detail: "1 pill with food · see pet profile",
      petId: "mochi",
    },
    {
      id: "oliver-allergy",
      type: "allergy",
      headline: "Oliver — allergic to chicken",
      detail: "Check treats before overnight stay",
      petId: "oliver",
    },
    {
      id: "pepper-reschedule",
      type: "reschedule-request",
      headline: "Pepper — reschedule requested",
      detail: "Customer asked to move Oct 4 → Oct 6",
      appointmentId: "pepper-oct-4",
    },
  ];
}

/**
 * Renders the owner's pet care alerts; clicking one opens its pet profile or appointment.
 * @param {{onNavigate: Function}} props - Called with (section, { petId, appointmentId }) when an alert is clicked.
 * @returns {JSX.Element} The pet care alerts card.
 */
export default function PetCareAlerts({ onNavigate }) {
  const alerts = getPetCareAlerts();

  return (
    <section className="pet-care-alerts" aria-labelledby="pet-care-alerts-title">
      <h2 id="pet-care-alerts-title" className="pet-care-alerts-title">
        Pet Care Alerts
      </h2>

      <ul className="pet-care-alerts-list">
        {alerts.map((alert) => {
          const alertType = ALERT_TYPES[alert.type];

          return (
            <li key={alert.id}>
              <button
                type="button"
                className="pet-care-alert"
                onClick={() =>
                  onNavigate(alertType.section, { petId: alert.petId, appointmentId: alert.appointmentId })
                }
              >
                <span className="pet-care-alert-badge">
                  <img className={alertType.iconClassName} src={alertType.icon} alt="" />
                </span>

                <span className="pet-care-alert-text">
                  <span className="pet-care-alert-headline">{alert.headline}</span>
                  <span className="pet-care-alert-detail">{alert.detail}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
