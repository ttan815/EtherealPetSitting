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

// bring in the icon image for each service
import dropInIcon from '../../assets/icons/drop-in.svg';
import wholeDayIcon from '../../assets/icons/whole-day.svg';
import overnightIcon from '../../assets/icons/overnight.svg';
import dogWalkingIcon from '../../assets/icons/dog-walking.svg';
import groomingIcon from '../../assets/icons/grooming.svg';
import medicationIcon from '../../assets/icons/medication.svg';

// list of services ethereal pet sitting provides
// image is null for now so a placeholder box shows until the admin adds pictures
const DEFAULT_SERVICES = [
  // first service card
  {
    id: 'drop-in-care', // unique id used in the booking link
    name: 'Drop-in Care', // service name shown on the card
    icon: dropInIcon, // icon image shown in the small circle
    description:
      "Quick visits for feeding, potty breaks, and playtime while you're away during the day.", // short description
    image: null, // picture set by the admin later
    photoLabel: 'Pet at home', // what the placeholder says until there is a picture
  },
  // second service card
  {
    id: 'whole-day-care', // unique id used in the booking link
    name: 'Whole Day Care', // service name shown on the card
    icon: wholeDayIcon, // icon image shown in the small circle
    description:
      'Extended care throughout the day with meals, walks, and company, so your pet is never alone for long.', // short description
    image: null, // picture set by the admin later
    photoLabel: 'Pet playing', // what the placeholder says until there is a picture
  },
  // third service card
  {
    id: 'overnight-stays', // unique id used in the booking link
    name: 'Overnight Stays', // service name shown on the card
    icon: overnightIcon, // icon image shown in the small circle
    description:
      'In-home overnight care so your pet can sleep comfortably in their own environment.', // short description
    image: null, // picture set by the admin later
    photoLabel: 'Pet sleeping', // what the placeholder says until there is a picture
  },
  // fourth service card
  {
    id: 'dog-walking', // unique id used in the booking link
    name: 'Dog Walking', // service name shown on the card
    icon: dogWalkingIcon, // icon image shown in the small circle
    description:
      'Structured walks to keep your dog active, stimulated, and healthy. Choose your duration.', // short description
    image: null, // picture set by the admin later
    photoLabel: 'Dog on a walk', // what the placeholder says until there is a picture
  },
  // fifth service card groups the small grooming services together
  {
    id: 'grooming-care', // unique id used in the booking link
    name: 'Grooming Care', // service name shown on the card
    icon: groomingIcon, // icon image shown in the small circle
    description:
      'Gentle, stress-free nail trims, ear cleaning, and anal gland expression to keep your pet comfortable and healthy.', // short description
    image: null, // picture set by the admin later
    photoLabel: 'Pet being groomed', // what the placeholder says until there is a picture
  },
  // sixth service card
  {
    id: 'medication', // unique id used in the booking link
    name: 'Medication', // service name shown on the card
    icon: medicationIcon, // icon image shown in the small circle
    description:
      'Safe and timely administration of medications, including pills, drops, and injections, following your care instructions.', // short description
    image: null, // picture set by the admin later
    photoLabel: 'Pet being cared for', // what the placeholder says until there is a picture
  },
]; // end of the services list

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
export default function ServiceSection({ services = DEFAULT_SERVICES, isLoggedIn = false }) {
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
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      </div>
    </section>
  ); // end of the section
} // end of servicesection
