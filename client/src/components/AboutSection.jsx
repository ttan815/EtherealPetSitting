// dt6 about section for the home page
// tells visitors the purpose and goal of the business
// shows the owner photo, a description, a quote from the owner, and a booking button

// bring in the styles for this section
import './AboutSection.css';

// the whole about section
// the logged in flag is false by default so visitors get sent to login
// the owner photo can be passed in later, otherwise a placeholder box shows
export default function AboutSection({ isLoggedIn = false, ownerPhoto = null }) {
  // customers go to the booking page, visitors go to the login page
  const bookingLink = isLoggedIn ? '/booking' : '/login';

  // what the section looks like on the page
  return (
    // id about lets the navigation bar scroll to this section
    <section id="about" className="about-section">
      {/* keeps the content centered and splits it into two columns */}
      <div className="about-section__inner">
        {/* left column with the owner photo */}
        <div className="about-section__photo-wrap">
          {/* show the real photo if there is one, otherwise show a placeholder box */}
          {ownerPhoto ? (
            <img
              className="about-section__photo"
              src={ownerPhoto}
              alt="Angelena Chantengco, owner of Ethereal Pet Sitting"
            />
          ) : (
            <div className="about-section__photo about-section__photo--placeholder">
              {/* placeholder text until a real photo is added */}
              <span>Photo of Angelena</span>
            </div>
          )}
        </div>

        {/* right column with the text */}
        <div className="about-section__content">
          {/* small label above the title */}
          <p className="about-section__eyebrow">About Angelena</p>

          {/* section title */}
          <h2 className="about-section__title">Caring for your pets like our own.</h2>

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
          <a className="about-section__button" href={bookingLink}>
            Book an Appointment
          </a>
        </div>
      </div>
    </section>
  ); // end of the section
} // end of aboutsection
