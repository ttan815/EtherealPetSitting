import "../../../styles/customer-dashboard/Dashboard.css";
import { useNavigate } from "react-router";
import PageHeader from "../../parent-component/PageHeader";
import {
  APPOINTMENT_DATE_LOCALE,
  APPOINTMENT_DAY_FORMAT_OPTIONS,
  APPOINTMENT_MONTH_FORMAT_OPTIONS,
  APPOINTMENT_WEEKDAY_FORMAT_OPTIONS,
} from "../../../constants/appointments/appointment-copy";

const Icon = ({ name, size = 16 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.55,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    grid: <>
      <rect x="4" y="4" width="6" height="6" rx="1"/>
      <rect x="14" y="4" width="6" height="6" rx="1"/>
      <rect x="4" y="14" width="6" height="6" rx="1"/>
      <rect x="14" y="14" width="6" height="6" rx="1"/>
    </>,
    calendar: <>
      <rect x="3.5" y="5" width="17" height="15" rx="2"/>
      <path d="M7.5 3.5v3M16.5 3.5v3M3.5 9h17"/>
    </>,
    paw: <>
      <ellipse cx="12" cy="15.5" rx="5.5" ry="4.2"/>
      <ellipse cx="5.5" cy="9" rx="2" ry="2.8"/>
      <ellipse cx="10" cy="5.8" rx="2" ry="2.7"/>
      <ellipse cx="15" cy="5.8" rx="2" ry="2.7"/>
      <ellipse cx="19" cy="9" rx="2" ry="2.8"/>
    </>,
    user: <>
      <circle cx="12" cy="7.5" r="3.5"/>
      <path d="M5 20c.5-4 3-6 7-6s6.5 2 7 6"/>
    </>,
    clipboard: <>
      <rect x="5" y="5" width="14" height="16" rx="2"/>
      <path d="M9 5V3.5h6V5M8.5 10h7M8.5 14h7M8.5 18h4"/>
    </>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>,
    dollar: <>
      <circle cx="12" cy="12" r="9"/>
      <path d="M15.5 8.5c-.6-.8-1.6-1.2-3-1.2-1.7 0-2.8.8-2.8 2s1 1.8 2.8 2.2 2.8 1 2.8 2.2-1.1 2.1-2.9 2.1c-1.3 0-2.5-.5-3.2-1.4M12.4 5.5v13"/>
    </>,
    bell: <>
      <path d="M18 9a6 6 0 0 0-12 0c0 7-2 7-2 8.5h16C20 16 18 16 18 9ZM10 21h4"/>
    </>,
    clock: <>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </>,
    arrow: <path d="M4 12h15M13 6l6 6-6 6"/>,
    list: <>
      <path d="m4 7 2 2 3-3M11 8h9M4 16l2 2 3-3M11 17h9"/>
    </>,
    id: <>
      <rect x="4" y="3.5" width="16" height="17" rx="2"/>
      <circle cx="12" cy="9" r="2.3"/>
      <path d="M7.5 17c.8-2 2.2-3 4.5-3s3.7 1 4.5 3"/>
    </>,
    image: <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2"/>
      <circle cx="9" cy="9" r="1.5"/>
      <path d="m5 17 5-5 3 3 2-2 4 4"/>
    </>,
    logout: <>
      <path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10"/>
    </>,
  };

  return <svg {...common}>{paths[name] || paths.grid}</svg>;
};

const ArrowLink = ({ children, onClick }) => (
  <button type="button" className="text-link" onClick={onClick}>
    {children}
    <Icon name="arrow" size={14}/>
  </button>
);

const Badge = ({ children, tone = "green" }) => (
  <span className={`badge ${tone}`}>{children}</span>
);

function PetCard({ name, detail }) {
  return (
    <div className="pet-row">
      <div className="pet-placeholder">
        <span>
          PUT IMAGE
          <br/>
          HERE
        </span>
      </div>

      <div className="pet-copy">
        <b>{name}</b>
        <span>{detail}</span>
      </div>
    </div>
  );
}

/**
 * Renders the customer dashboard overview and upcoming appointment.
 * @param {Object} props Dashboard data and navigation callback.
 * @param {Function} props.onNavigateSection Navigates to a customer dashboard section.
 * @param {Object} props.dashboardData Customer, pet, appointment, and activity data.
 * @returns {JSX.Element} The customer dashboard overview.
 */
export default function Dashboard({ onNavigateSection, dashboardData }) {
  const navigate = useNavigate();
  const { customer, pets, upcomingAppointment, requests, caregiverNote, payment, review } = dashboardData;
  const appointmentDate = upcomingAppointment
    ? new Date(`${upcomingAppointment.scheduledDate}T00:00:00`)
    : null;
  return (
      <main className="main-content">

        {/* HEADER */}
        <PageHeader 
        title={`Good Morning, ${customer.preferredName}`}
        subtitle={"Everything for pet's care, all in one calm place"} 
        actionLabel={"Book Appointment"} 
        onAction={() => navigate("/book-appointment")}
        />

        {/* TOP SECTION */}
        <section className="top-grid">

          {/* UPCOMING APPOINTMENT */}
          <article className="panel appointment-card">
            <div className="panel-heading">
              <div className="heading-icon">
                <Icon name="calendar"/>
              </div>

              <div className="heading-copy">
                <h2>Upcoming appointment</h2>
                <p>Your next visit is confirmed and ready</p>
              </div>

              {upcomingAppointment && <Badge>{upcomingAppointment.status}</Badge>}
            </div>

            {upcomingAppointment ? (
              <>
                <div className="appointment-detail">
                  <div className="date-tile">
                    <span>{appointmentDate.toLocaleDateString(APPOINTMENT_DATE_LOCALE, APPOINTMENT_MONTH_FORMAT_OPTIONS).toUpperCase()}</span>
                    <strong>{appointmentDate.toLocaleDateString(APPOINTMENT_DATE_LOCALE, APPOINTMENT_DAY_FORMAT_OPTIONS)}</strong>
                    <small>{appointmentDate.toLocaleDateString(APPOINTMENT_DATE_LOCALE, APPOINTMENT_WEEKDAY_FORMAT_OPTIONS)}</small>
                  </div>

                  <div className="visit-info">
                    <div className="visit-title">
                      <h3>{upcomingAppointment.service}</h3>
                      <strong>{upcomingAppointment.balance}</strong>
                    </div>

                    <div className="detail-line">
                      <Icon name="clock"/>
                      <span>Time</span>
                      <b>{upcomingAppointment.time}</b>
                    </div>

                    <div className="detail-line">
                      <Icon name="paw"/>
                      <span>Pet</span>
                      <b>{upcomingAppointment.petName}</b>
                    </div>

                    <div className="detail-line">
                      <Icon name="user"/>
                      <span>Caregiver</span>
                      <b>{upcomingAppointment.sitterName}</b>
                    </div>
                  </div>
                </div>

                <div className="appointment-footer">
                  <span>{upcomingAppointment.reminder ? `Reminder set for ${upcomingAppointment.reminder}` : ""}</span>
                  <ArrowLink onClick={() => onNavigateSection("appointments")}>View appointment</ArrowLink>
                </div>
              </>
            ) : (
              <p>No upcoming appointments.</p>
            )}
          </article>

          {/* YOUR PETS */}
          <article className="panel pets-card">
            <div className="panel-heading">
              <div className="heading-icon">
                <Icon name="paw"/>
              </div>

              <div className="heading-copy">
                <h2>Your Pets</h2>
                <p>Quick access to edit each pet’s information</p>
              </div>
            </div>

            <div className="pet-list">
              {pets.map((pet) => (
                <PetCard
                  key={pet.id}
                  name={pet.name}
                  detail={`${pet.breed} · ${pet.age}`}
                />
              ))}
            </div>

            <div className="card-link">
              <ArrowLink onClick={() => onNavigateSection("pets")}>Manage Pet Information</ArrowLink>
            </div>
          </article>

        </section>

        {/* MIDDLE SECTION */}
        <section className="middle-grid">

          {/* SITTER REQUESTS */}
          <article className="panel requests-card">
            <div className="panel-heading">
              <div className="heading-icon">
                <Icon name="list"/>
              </div>

              <div className="heading-copy">
                <h2>Requests for your sitter</h2>
                <p>Tasks you’d like us to handle during the visit</p>
              </div>

              <Badge tone="sand">{requests.filter((request) => !request.completed).length} requested</Badge>
            </div>

            <ul className="request-list">
              {requests.map((request) => (
                <li key={request.id} className={request.completed ? "done" : ""}>{request.label}</li>
              ))}
            </ul>

            <ArrowLink onClick={() => onNavigateSection("tasks")}>Add another request</ArrowLink>
          </article>

          {/* PERSONAL INFORMATION */}
          <article className="panel personal-card">
            <div className="panel-heading">
              <div className="heading-icon">
                <Icon name="id"/>
              </div>

              <div className="heading-copy">
                <h2>Personal information</h2>
                <p>Contact and home details</p>
              </div>

              <Badge>Verified</Badge>
            </div>

            <div className="personal-details">
              <div>
                <label>EMAIL</label>
                <span>{customer.email}</span>
              </div>

              <div>
                <label>MOBILE</label>
                <span>{customer.phone}</span>
              </div>

              <div>
                <label>SERVICE ADDRESS</label>
                <span>{customer.address}</span>
              </div>
            </div>

            <ArrowLink onClick={() => onNavigateSection("profile")}>Manage Personal Information</ArrowLink>
          </article>

        </section>

        {/* CAREGIVER NOTE */}
        <section className="panel note-card">
          <div className="caregiver-avatar">{caregiverNote.caregiverInitials}</div>

          <div className="note-copy">
            <div className="note-meta">
              <b>A note from {caregiverNote.caregiverName}</b>
              <span>{caregiverNote.timestamp}</span>
            </div>

            <p>
              “{caregiverNote.message}”
            </p>
          </div>

          <span className="photo-pill">
            <Icon name="image" size={13}/>
            {caregiverNote.photoCount} photos
          </span>
        </section>

        {/* ONLINE PAYMENT */}
        <section className="panel payment-card">
          {payment && <div className="payment-heading">
            <div>
              <h2>Make Online Payment</h2>
              <p>
                Pay securely for your upcoming or completed care visit.
              </p>
            </div>

            <Badge tone="peach">Due {payment.dueDate}</Badge>
          </div>}

          {payment && <div className="payment-content">
            <div className="payment-labels">
              <span>Outstanding amount</span>
              <span>Related service</span>
              <span>Payment status</span>
              <small>Pay now to confirm your booking.</small>
            </div>

            <div className="payment-values">
              <strong>{payment.amount}</strong>
              <b>{payment.service}</b>
              <span>{payment.status}</span>
              <button className="primary-button" onClick={() => onNavigateSection("payment")}>
                Make a payment
              </button>
            </div>
          </div>
          }
        </section>

        {/* WRITE A REVIEW */}
        <section className="panel review-card">
          {review && <div className="payment-heading">
            <div>
              <h2>Write a review</h2>
              <p>
                Share your experience with {review.sitterName}’s recent {review.service}.
              </p>
            </div>

            <Badge>{review.status} visit</Badge>
          </div>}

          {review && <div className="review-visit">
            <div className="caregiver-avatar">{review.sitterName.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>

            <div>
              <b>{review.service}</b>
              <span>with {review.sitterName} · {review.date}</span>
            </div>
          </div>}

          {review && <div className="review-footer">
            <span>
              Your feedback helps other pet parents choose the right sitter.
            </span>

            <button className="primary-button" onClick={() => onNavigateSection("review")}>
              Write a review
            </button>
          </div>}
        </section>

      </main>
  );
}