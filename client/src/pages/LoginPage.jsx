// Renders the login page page.
import AuthLayout from "../components/auth/AuthLayout";
import TextField from "../components/form/TextField";
import PasswordField from "../components/form/PasswordField";
import Button from "../components/form/Button";
import mailIcon from "../assets/icons/mail.svg";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/login/LoginPage.css";

// Visitor log in screen. UI only: nothing is sent to the server yet.
/**
 * Renders the customer login form and supporting authentication layout.
 * @returns {JSX.Element} The login page.
 */
function LoginPage() {
  // Stop the browser from reloading the page until login is wired up
  const navigate = useNavigate()
  const location = useLocation()
  const { loginTempAccount } = useAuth()
  function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = loginTempAccount({ email, password });
      if (!result.ok) {
        console.error("Login failed:", result.status)
        return;
      }
      const redirect = new URLSearchParams(location.search).get("redirect")
      navigate(redirect?.startsWith("/") ? redirect : result.route)
    }
    catch (error) {
      console.log(error)
    }
  }
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <AuthLayout>
      <form className="login-page-form" onSubmit={handleSubmit}>
        <h1 className="login-page-title">Welcome back</h1>
        <p className="login-page-subtitle">Log in to your account.</p>

        <div className="login-page-fields">
          <TextField
            id="login-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            icon={mailIcon}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordField
            id="login-password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            labelAction={
              <a href="/forgot-password" className="login-page-link">
                Forgot password?
              </a>
            }
          />
        </div>

        <Button type="submit" className="login-page-submit">
          Log in
        </Button>

        <div className="login-page-divider">
          <span>New here?</span>
        </div>

        <Button variant="outline" href="/create-account">
          Create an account
        </Button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
