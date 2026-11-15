// Renders the pet care alerts card on the owner dashboard.
import { OWNER_PET_CARE_ALERT_TYPES } from "../../../constants/owner/owner-dashboard";
import { getPetCareAlerts } from "../../../services/owner-dashboard/dashboard-service";
import "../../../styles/owner-dashboard/PetCareAlerts.css";

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
          const alertType = OWNER_PET_CARE_ALERT_TYPES[alert.type];

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
