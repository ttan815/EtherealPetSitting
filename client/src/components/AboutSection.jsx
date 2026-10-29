// dt6 about section for the home page
// tells visitors the purpose and goal of the business
// shows the owner photo, a description, a quote from the owner, and a booking button

// bring in the shared section title and button
import SectionHeading from './SectionHeading';
import Button from './form/Button';

// bring in the styles for this section
import '../styles/AboutSection.css';

// bring in the camera icon for the photo placeholder
import cameraIcon from '../assets/icons/camera-large.svg';

// bring in the soft background shapes from the figma prototype
import shape1 from '../assets/home/about-shape-1.svg';
import shape2 from '../assets/home/about-shape-2.svg';
import shape3 from '../assets/home/about-shape-3.svg';
import shape4 from '../assets/home/about-shape-4.svg';

// the whole about section
// the logged in flag is false by default so visitors get sent to login
// the owner photo can be passed in later, otherwise a placeholder box shows
export default function AboutSection({ isLoggedIn = false, ownerPhoto = null }) {
  // customers go to the booking page, visitors go to the login page
  const bookingLink = isLoggedIn ? '/book-appointment' : '/login';

  // what the section looks like on the page
  return (
    // id about lets the navigation bar scroll to this section
    <section id="about" className="about-section" aria-labelledby="about-heading">
      {/* soft background shapes, hidden from screen readers since they are decoration */}
      <div className="about-section__shapes" aria-hidden="true">
        <img className="about-section__shape about-section__shape--1" src={shape1} alt="" />
        <img className="about-section__shape about-section__shape--2" src={shape2} alt="" />
        <img className="about-section__shape about-section__shape--3" src={shape3} alt="" />
        <img className="about-section__shape about-section__shape--4" src={shape4} alt="" />
      </div>

      {/* keeps the content centered and splits it into two columns */}
      <div className="about-section__inner">
        {/* left column with the owner photo */}
        <div className="about-section__photo-wrap">
          {/* thin arch outline behind the photo, offset like in the prototype */}
          <div className="about-section__arch" aria-hidden="true" />

          {/* show the real photo if there is one, otherwise show a placeholder box */}
          {ownerPhoto ? (
            <img
              className="about-section__photo"
              src={ownerPhoto}
              alt="Angelena Chantengco, owner of Ethereal Pet Sitting"
            />
          ) : (
            <div className="about-section__photo about-section__photo--placeholder">
              {/* camera icon and caption until a real photo is added */}
              <img src={cameraIcon} alt="" />
              <span>Photo of Angelena</span>
            </div>
          )}
        </div>

        {/* right column with the text */}
        <div className="about-section__content">
          {/* small label and title */}
          <SectionHeading
            id="about-heading"
            align="left"
            className="about-section__heading"
            eyebrow="About Angelena"
            title="Caring for your pets like our own."
          />

          {/* description of the business */}
          <p className="about-section__description">
            Ethereal Pet Sitting is an independent, locally based pet sitting business run by
            Angelena Chantengco. From drop-in visits and dog walks to feedings, medication, and
            overnight stays, Angelena cares for your pets at home while you&apos;re at work or
            away, so they can stay comfortable in the place they know best.
          </p>

          {/* quote from the owner */}
          <blockquote className="about-section__quote">
            {/* the quote itself */}
            <p>
              &ldquo;Our goal is to ensure that while you are away, your pets feel as loved and
              comfortable as they do when you&apos;re home.&rdquo;
            </p>
            {/* who said the quote */}
            <cite>Angelena Chantengco &middot; Owner</cite>
          </blockquote>

          {/* button that sends the user to booking or login */}
          <Button href={bookingLink} className="about-section__button">
            Book an Appointment
          </Button>
        </div>
      </div>
    </section>
  ); // end of the section
} // end of aboutsection
