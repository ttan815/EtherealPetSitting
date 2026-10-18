import { QRCodeSVG } from "qrcode.react";
import "./Footer.css";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Services", href: "#services" },
  { label: "About Angelena", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Log In", href: "/login" },
  { label: "Create Account", href: "/create-account" },
];
// TODO: replace with the product owner's real social media pages
const SOCIAL_LINKS = {
  instagram: "#",
  facebook: "#",
};

const CONTACT_EMAIL = "etherealpetsitting@gmail.com";
const CONTACT_PHONE = "(510) 461-6392";

function Footer() {
  // The QR code points to the booking page on whatever domain the site runs on
  const bookingUrl = `${window.location.origin}/book-appointment`;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <svg className="footer-curves" viewBox="0 0 260 160" aria-hidden="true">
        <path d="M0 160 C10 70 80 10 170 6 C205 4 235 8 260 14" />
        <path d="M100 160 C112 108 150 72 200 68 C225 66 245 70 260 74" />
        <path d="M180 160 C188 136 208 124 232 124 C244 124 254 126 260 128" />
      </svg>

      <div className="footer-inner">
        <div className="footer-columns">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <img src="/logo-light.svg" alt="Ethereal Pet Sitting & Care" />
            </a>
            <p className="footer-description">
              Independent pet sitting based locally, caring for your pets like
              our own.
            </p>
            <div className="footer-social">
              <a href={SOCIAL_LINKS.instagram} aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="4" width="16" height="16" rx="4.5" />
                  <circle cx="12" cy="12" r="3.6" />
                  <circle cx="16.6" cy="7.4" r="0.6" className="filled" />
                </svg>
              </a>
              <a href={SOCIAL_LINKS.facebook} aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.5 20v-7h2.4l.4-2.8h-2.8V8.6c0-.8.3-1.4 1.4-1.4h1.5V4.7c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2H8.4V13h2.4v7" />
                </svg>
              </a>
            </div>
          </div>

          <nav className="footer-section" aria-label="Quick links">
            <h2 className="footer-heading">Quick Links</h2>
            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-section">
            <h2 className="footer-heading">Contact Us</h2>
            <ul className="footer-contact">
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.6 4.5h2.6l1.3 3.6-1.8 1.2a10 10 0 0 0 4 4l1.2-1.8 3.6 1.3v2.6a1.5 1.5 0 0 1-1.6 1.5A13.5 13.5 0 0 1 5 6.1a1.5 1.5 0 0 1 1.6-1.6Z" />
                </svg>
                <a href={`tel:${CONTACT_PHONE.replace(/\D/g, "")}`}>
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-qr-card">
            <div className="footer-qr">
              <QRCodeSVG
                value={bookingUrl}
                size={56}
                bgColor="#f9efed"
                fgColor="#2f1f04"
                title="QR code to book an appointment"
              />
            </div>
            <p>
              Scan the QR code to
              <br />
              book care for your pet!
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Ethereal Pet Sitting &amp; Care. All rights reserved.</p>
          <div className="footer-legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;