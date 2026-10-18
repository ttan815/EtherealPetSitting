{/* Used Ai to help me build and fix the code */}
import React from "react";

export default function AccountCreation() {
  return (
    <main className="page">
      {/* LEFT SIDE */}
      <section className="hero">
        {/* Decorative contour lines */}
        <div className="contour contour-top">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="contour contour-bottom">
          <span></span>
          <span></span> 
          <span></span>
        </div>
        {/* Logo / Pet illustration */}
        <div className="pet-logo">
          <div className="logo-inner">
            <div className="pet-name">Angelina -</div>
            <div className="pet-drawing">
              <div className="dog-head"></div>
              <div className="dog-ear left"></div>
              <div className="dog-ear right"></div>
              <div className="dog-body"></div> 
              <div className="dog-tail"></div>
              <div className="dog-leg leg-one"></div>
              <div className="dog-leg leg-two"></div>
            </div>
            <div className="brand-name">ETHEREAL</div>
            <div className="brand-subtitle">PET SITTING & CARE</div>
          </div>
        </div>
        <div className="hero-message">
          <h1>Care that feels</h1>
          <p>like home.</p>
        </div>
      </section>
      {/* RIGHT SIDE */}
      <section className="form-section">
        <div className="form-container">
          {/* Header */}
          <div className="form-header">
            <div className="brand">
              <div className="mini-logo">
                <div className="mini-dog"></div>
              </div>
              <div>
                <div className="brand-title">ETHEREAL</div>
                <div className="brand-tagline">PET SITTING &amp; CARE</div>
              </div>
            </div>
            <a className="home-link">
              <span>←</span>
              Back to home
            </a>
          </div>
          {/* Title */}
          <div className="heading">
            <h2>Create your account</h2>
            <p>
              Book care, add your pets, and manage visits in one
              place.
            </p>
          </div>
          {/* Registration Form */}
          <form id="signupForm">
            {/* First / Last name */}
            <div className="name-row">
              <div className="field">
                <label htmlFor="firstName">First name</label>
                <div className="input-wrapper">
                  <span className="input-icon user-icon">♙</span>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    autoComplete="given-name"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="lastName">Last name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    autoComplete="family-name"
                  />
                </div>
              </div>
            </div>
            {/* Email */}
            <div className="field">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">✉</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>
            {/* Phone */}
            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <div className="input-wrapper">
                <span className="input-icon">⌕</span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(555)555-5555"
                  autoComplete="tel"
                />
              </div>
            </div>
            {/* Password */}
            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">♧</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
              </div>
            </div>
            {/* Confirm password */}
            <div className="field">
              <label htmlFor="confirmPassword">
                Re-type password
              </label>
              <div className="input-wrapper">
                <span className="input-icon">♧</span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Type your password again"
                  autoComplete="new-password"
                />
              </div>
            </div>
            {/* Submit */}
            <button
              type="button"
              className="submit-button"
            >
              Create Account
            </button>
          </form>
          {/* Login divider */}
          <div className="login-section">
            <div className="divider">
              <span></span>
              <p>Already have an account?</p>
              <span></span>
            </div>
            <a className="login-button">
              Log in
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}