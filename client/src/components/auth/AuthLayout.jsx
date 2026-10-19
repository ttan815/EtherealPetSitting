import BrandPanel from "./BrandPanel";
import BrandLogo from "../BrandLogo";
import { SUPPORT_PHONE } from "../../constants/site-info";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import "../../styles/AuthLayout.css";

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
