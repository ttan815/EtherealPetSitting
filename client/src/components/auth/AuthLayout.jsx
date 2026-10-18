import BrandPanel from "./BrandPanel";
import { BUSINESS_NAME, BUSINESS_SUBTITLE, SUPPORT_PHONE } from "../../constants/site-info";
import logoDogMark from "../../assets/brand/logo-dog-mark.svg";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import "./AuthLayout.css";

// Shared split layout for Log In, Create Account and Forgot Password.
// Left: BrandPanel. Right: logo bar, the page's own content, help footer.
// children: the page content shown in the middle of the right half
// tagline, taglineEmphasis: passed to BrandPanel (defaults are the login text)
function AuthLayout({ children, tagline, taglineEmphasis }) {
  return (
    <div className="auth-layout">
      <BrandPanel tagline={tagline} taglineEmphasis={taglineEmphasis} />

      <div className="auth-layout-panel">
        <header className="auth-layout-top-bar">
          <div className="auth-layout-logo">
            <img src={logoDogMark} alt="" />
            <div>
              <p className="auth-layout-logo-name">{BUSINESS_NAME}</p>
              <p className="auth-layout-logo-subtitle">{BUSINESS_SUBTITLE}</p>
            </div>
          </div>

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
