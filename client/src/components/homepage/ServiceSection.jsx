// dt5 service section for the home page
// shows a title, a short overview, and one card for each service

// bring in the shared section title
import SectionHeading from './SectionHeading';

// bring in the styles for this section
import '../../styles/homepage/ServiceSection.css';

// bring in the camera and arrow icons used on every card
import cameraIcon from '../../assets/icons/camera.svg';
import arrowIcon from '../../assets/icons/arrow-right.svg';

// bring in the soft background shapes from the figma prototype
import shape1 from '../../assets/home/services-shape-1.svg';
import shape2 from '../../assets/home/services-shape-2.svg';
import shape3 from '../../assets/home/services-shape-3.svg';
import shape4 from '../../assets/home/services-shape-4.svg';
import shape5 from '../../assets/home/services-shape-5.svg';

import { getHomepageServices } from "../../services/booking-service";

// builds one service card
// service holds the card info and the logged in flag tells us if the user is a customer
function ServiceCard({ service, isLoggedIn }) {
  // customers go to the booking page with this service picked, visitors go to the login page
  const bookingLink = isLoggedIn ? `/book-appointment?service=${service.id}` : '/login';

  // what the card looks like on the page
  return (
    <article className="svc-card">
      {/* show the real picture if there is one, otherwise show a placeholder box */}
      {service.image ? (
        <img className="svc-card__image" src={service.image} alt={service.name} />
      ) : (
        <div className="svc-card__image svc-card__image--placeholder">
          {/* camera icon and caption until the admin uploads a picture */}
          <img src={cameraIcon} alt="" />
          <span>{service.photoLabel}</span>
        </div>
      )}

      {/* small icon for the service, hidden from screen readers since it is decoration */}
      <span className="svc-card__icon" aria-hidden="true">
        {/* the icon image, alt is empty because the name is already shown below */}
        <img src={service.icon} alt="" />
      </span>

      {/* service name */}
      <h3 className="svc-card__name">{service.name}</h3>

      {/* short description of the service */}
      <p className="svc-card__description">{service.description}</p>

      {/* clickable text that sends the user to booking or login */}
      <a className="svc-card__link" href={bookingLink}>
        Book this service
        {/* arrow is decoration, the text already says where the link goes */}
        <img src={arrowIcon} alt="" />
      </a>
    </article>
  ); // end of the card
} // end of servicecard

// the whole service section
// services can be passed in later from the admin, otherwise the default list is used
// the logged in flag is false by default so visitors get sent to login
/**
 * Renders the homepage pet-care service offerings and booking links.
 * @param {Object} props - Service records and visitor login state.
 * @param {Array<Object>} [props.services] - Service offerings to display.
 * @param {boolean} [props.isLoggedIn] - Whether the visitor has an active session.
 * @returns {JSX.Element} The homepage services section.
 */
export default function ServiceSection({ services, isLoggedIn = false }) {
  const serviceOptions = services ?? getHomepageServices();
  // what the section looks like on the page
  return (
    // id services lets the navigation bar scroll to this section
    <section id="services" className="svc-section" aria-labelledby="services-heading">
      {/* soft background shapes, hidden from screen readers since they are decoration */}
      <div className="svc-section__shapes" aria-hidden="true">
        <img className="svc-section__shape svc-section__shape--1" src={shape1} alt="" />
        <img className="svc-section__shape svc-section__shape--2" src={shape2} alt="" />
        <img className="svc-section__shape svc-section__shape--3" src={shape3} alt="" />
        <img className="svc-section__shape svc-section__shape--4" src={shape4} alt="" />
        <img className="svc-section__shape svc-section__shape--5" src={shape5} alt="" />
      </div>

      {/* keeps the content centered and not too wide */}
      <div className="svc-section__inner">
        {/* small label, title, and short overview */}
        <SectionHeading
          id="services-heading"
          eyebrow="What We Offer"
          title="Our Care Services"
          subtitle="Comprehensive pet care solutions designed to fit seamlessly into your schedule, ensuring your pets are happy, healthy, and safe."
        />

        {/* grid that holds all the service cards */}
        <div className="svc-grid">
          {/* make one card for every service in the list */}
          {serviceOptions.map((service) => (
            <ServiceCard key={service.id} service={service} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      </div>
    </section>
  ); // end of the section
} // end of servicesection
