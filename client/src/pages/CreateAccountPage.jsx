/* Used Ai to help me build and fix the code */

import { useState } from "react";
import "../styles/CreateAccount.css";

// Shared with the Log In page (run download-assets.sh first)
import iconArrowL from "./assets/icon-arrow-left.svg";
import topoTopRight from "./assets/topo-top-right.svg";
import topoBottomLeft from "./assets/topo-bottom-left.svg";
import glow from "./assets/glow.svg";
import ring from "./assets/ring.svg";
import innerCircle from "./assets/inner-circle.svg";
import logoScriptDog from "./assets/logo-angelena-script-dog.svg";
import logoDogMark from "./assets/logo-dog-mark.svg";
import iconMail from "./assets/icon-mail.svg";
import iconLock from "./assets/icon-lock.svg";
import iconEye from "./assets/icon-eye.svg";
// Specific to this page (run download-assets-create-account.sh)
import iconUser from "./assets/icon-user.svg";
import iconPhone from "./assets/icon-phone.svg";
import iconInfo from "./assets/icon-info.svg";
import checkboxTick from "./assets/checkbox-tick.svg";

const DEFAULT_API_URL = "http://localhost:5002/api/create-account";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  retypedPassword: "",
  hasAcceptTerm: false,
};

export default function CreateAccount({
  apiUrl = DEFAULT_API_URL,
  onSuccess,
  onBackToHome,
  onLogIn,
  onTermsClick,
  onPrivacyClick,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetyped, setShowRetyped] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", text }
  const [submitting, setSubmitting] = useState(false);

  const setField = (name) => (e) =>
    setForm((f) => ({
      ...f,
      [name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);

    // Same payload shape as the backend sample
    const accountData = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phoneNumber: form.phone,
      password: form.password,
      retypedPassword: form.retypedPassword,
      hasAcceptTerm: form.hasAcceptTerm,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountData),
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        /* non-JSON response */
      }

      if (!response.ok) {
        throw new Error(result.Message || "Something went wrong. Please try again.");
      }

      setStatus({ type: "success", text: result.Message || "Account created." });
      setForm(EMPTY_FORM);
      setShowPassword(false);
      setShowRetyped(false);
      onSuccess?.(result);
    } catch (error) {
      const networkFailure = error instanceof TypeError;
      setStatus({
        type: "error",
        text: networkFailure
          ? "Couldn't reach the server. Please try again."
          : error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const linkClick = (handler) => (e) => {
    e.preventDefault();
    handler?.();
  };

  return (
    <div className="signup">
      {/* Brand panel */}
      <section className="signup__brand">
        <img className="signup__topo signup__topo--top-right" src={topoTopRight} alt="" />
        <img className="signup__topo signup__topo--bottom-left" src={topoBottomLeft} alt="" />

        <div className="signup-medallion">
          <div className="signup-medallion__glow">
            <img src={glow} alt="" />
          </div>
          <div className="signup-medallion__ring">
            <img src={ring} alt="" />
          </div>
          <img className="signup-medallion__inner" src={innerCircle} alt="" />
          <div className="signup-medallion__content">
            <img className="signup-medallion__logo" src={logoScriptDog} alt="Angelena's Ethereal" />
            <p className="signup-medallion__name">ETHEREAL</p>
            <p className="signup-medallion__tagline">Pet Sitting &amp; Care</p>
          </div>
        </div>

        <h2 className="signup__headline">
          Care that feels
          <em>like home.</em>
        </h2>
      </section>

      {/* Form panel */}
      <section className="signup__panel">
        <header className="signup-topbar">
          <div className="signup-topbar__logo">
            <img className="signup-topbar__mark" src={logoDogMark} alt="" />
            <div className="signup-topbar__text">
              <span className="signup-topbar__name">ETHEREAL</span>
              <span className="signup-topbar__tag">Pet Sitting &amp; Care</span>
            </div>
          </div>
          <button type="button" className="signup-back" onClick={onBackToHome}>
            <img src={iconArrowL} alt="" />
            <span>Back to home</span>
          </button>
        </header>

        <div className="signup__center">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h1 className="signup-form__title">Create your account</h1>
            <p className="signup-form__subtitle">
              Book care, add your pets, and manage visits in one place.
            </p>

            <div className="signup-row">
              <div className="signup-field signup-field--half">
                <label className="signup-label" htmlFor="signup-first-name">First name</label>
                <div className="signup-input">
                  <img src={iconUser} alt="" />
                  <input
                    id="signup-first-name"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    autoComplete="given-name"
                    required
                    value={form.firstName}
                    onChange={setField("firstName")}
                  />
                </div>
              </div>
              <div className="signup-field signup-field--half">
                <label className="signup-label" htmlFor="signup-last-name">Last name</label>
                <div className="signup-input">
                  <input
                    id="signup-last-name"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    autoComplete="family-name"
                    required
                    value={form.lastName}
                    onChange={setField("lastName")}
                  />
                </div>
              </div>
            </div>

            <div className="signup-group">
              <label className="signup-label" htmlFor="signup-email">Email</label>
              <div className="signup-input">
                <img src={iconMail} alt="" />
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={setField("email")}
                />
              </div>
            </div>

            <div className="signup-group">
              <label className="signup-label" htmlFor="signup-phone">Phone number</label>
              <div className="signup-input">
                <img src={iconPhone} alt="" />
                <input
                  id="signup-phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 555-5555"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={setField("phone")}
                />
              </div>
            </div>

            <div className="signup-field signup-field--password">
              <label className="signup-label" htmlFor="signup-password">Password</label>
              <div className="signup-input">
                <img src={iconLock} alt="" />
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={setField("password")}
                />
                <button
                  type="button"
                  className="signup-input__toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  <img src={iconEye} alt="" />
                </button>
              </div>
              <div className="signup-help">
                <img src={iconInfo} alt="" />
                <p>At least 8 characters</p>
              </div>
            </div>

            <div className="signup-group">
              <label className="signup-label" htmlFor="signup-retyped">Re-enter password</label>
              <div className="signup-input">
                <img src={iconLock} alt="" />
                <input
                  id="signup-retyped"
                  name="retypedPassword"
                  type={showRetyped ? "text" : "password"}
                  placeholder="Type your password again"
                  autoComplete="new-password"
                  required
                  value={form.retypedPassword}
                  onChange={setField("retypedPassword")}
                />
                <button
                  type="button"
                  className="signup-input__toggle"
                  aria-label={showRetyped ? "Hide password" : "Show password"}
                  onClick={() => setShowRetyped((v) => !v)}
                >
                  <img src={iconEye} alt="" />
                </button>
              </div>
            </div>

            <label className="signup-terms">
              <span className="signup-checkbox">
                <input
                  type="checkbox"
                  name="hasAcceptTerm"
                  checked={form.hasAcceptTerm}
                  onChange={setField("hasAcceptTerm")}
                />
                {form.hasAcceptTerm && (
                  <span className="signup-checkbox__tick" aria-hidden="true">
                    <img src={checkboxTick} alt="" />
                  </span>
                )}
              </span>
              <span className="signup-terms__text">
                I agree to the{" "}
                <a href="#terms" onClick={linkClick(onTermsClick)}>Terms of Service</a>
                {" "}and{" "}
                <a href="#privacy" onClick={linkClick(onPrivacyClick)}>Privacy Policy</a>
              </span>
            </label>

            {status && (
              <p
                className={`signup-status signup-status--${status.type}`}
                role={status.type === "error" ? "alert" : "status"}
              >
                {status.text}
              </p>
            )}

            <button type="submit" className="signup-btn signup-btn--primary" disabled={submitting}>
              {submitting ? "Creating account…" : "Create account"}
            </button>

            <div className="signup-divider">
              <span className="signup-divider__line" />
              <span className="signup-divider__text">Already have an account?</span>
              <span className="signup-divider__line" />
            </div>

            <button type="button" className="signup-btn signup-btn--outline" onClick={onLogIn}>
              Log in
            </button>
          </form>
        </div>

        <footer className="signup__footer">
          <p>Need help? Call or text (510) 461-6392</p>
        </footer>
      </section>
    </div>
  );
}
