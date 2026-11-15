// Renders the auth layout component.
import BrandPanel from "./BrandPanel";
import BrandLogo from "../homepage/BrandLogo";
import { SUPPORT_PHONE } from "../../constants/shared/site-info";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import "../../styles/auth/AuthLayout.css";

// Shared split layout for Log In, Create Account and Forgot Password.
// Left: BrandPanel. Right: logo bar, the page's own content, help footer.
// children: the page content shown in the middle of the right half
// tagline, taglineEmphasis: passed to BrandPanel (defaults are the login text)
/**
 * Renders the shared authentication page layout with branding and a form area.
 * @param {Object} props - Layout content and tagline.
 * @param {import("react").ReactNode} props.children - The authentication form content.
 * @param {string} props.tagline - The first part of the branding tagline.
 * @param {string} props.taglineEmphasis - The emphasized ending of the tagline.
 * @returns {JSX.Element} The authentication page layout.
 */
function AuthLayout({ children, tagline, taglineEmphasis }) {
  return (
    <div className="auth-layout">
      <BrandPanel tagline={tagline} taglineEmphasis={taglineEmphasis} />

      <div className="auth-layout-panel">
        <header className="auth-layout-top-bar">
          <BrandLogo />

          <a href="/" className="auth-layout-back-link">
            <img src={arrowLeftIcon} alt="" />
            Back to home
          </a>
        </header>

        <main className="auth-layout-content">{children}</main>

        <footer className="auth-layout-footer">
          Need help? Call or text {SUPPORT_PHONE}
        </footer>
      </div>
    </div>
  );
}

export default AuthLayout;
