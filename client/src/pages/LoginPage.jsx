import AuthLayout from "../components/auth/AuthLayout";
import AuthHeading from "../components/auth/AuthHeading";
import AuthDivider from "../components/auth/AuthDivider";
import TextField from "../components/form/TextField";
import PasswordField from "../components/form/PasswordField";
import Checkbox from "../components/form/Checkbox";
import Button from "../components/form/Button";
import FieldMessage from "../components/form/FieldMessage";
import mailIcon from "../assets/icons/mail.svg";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL, NETWORK_ERROR_MESSAGE, GENERIC_ERROR_MESSAGE } from "../constants/api";
import "../styles/LoginPage.css";

// Visitor log in screen. Sends the email and password to the server and shows
// an error under the password field if login fails.
function LoginPage() {
  // Stop the browser from reloading the page until login is wired up
  const navigate = useNavigate()
  const { refreshSession } = useAuth()
  async function handleSubmit(event) {
    event.preventDefault();
    setLoginError("");
    try {
      const response = await fetch(`${API_BASE_URL}/login-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email, password, rememberMe
          }),
        })

      if (!response.ok) {
        // 401 = wrong email or password. We don't say which one, so the
        // message can't reveal whether an email has an account.
        setLoginError(response.status === 401
          ? "Invalid email or password."
          : GENERIC_ERROR_MESSAGE);
        return;
      }
      const valid = await refreshSession()
      if (valid) {
        navigate("/")
      }
    }
    catch {
      setLoginError(NETWORK_ERROR_MESSAGE);
    }
  }
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  // Shown under the password field; cleared as soon as the visitor edits either field
  const [loginError, setLoginError] = useState("")
  return (
    <AuthLayout>
      <form className="login-page-form" onSubmit={handleSubmit}>
        <AuthHeading title="Welcome back" subtitle="Log in to your account." />

        <div className="login-page-fields">
          <TextField
            id="login-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            icon={mailIcon}
            onChange={(event) => { setEmail(event.target.value); setLoginError(""); }}
          />
          <div className="login-page-password">
            <PasswordField
              id="login-password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              onChange={(event) => { setPassword(event.target.value); setLoginError(""); }}
              labelAction={
                <a href="/forgot-password" className="login-page-link">
                  Forgot password?
                </a>
              }
            />
            {/* Not passed as the field's error, so the boxes don't turn red */}
            {loginError && (
              <div role="alert">
                <FieldMessage>{loginError}</FieldMessage>
              </div>
            )}
          </div>
        </div>

        <Checkbox onChange={(e) => setRememberMe(e.target.checked)} id="login-remember" label="Keep me logged in" />

        <Button type="submit" className="login-page-submit">
          Log in
        </Button>

        <AuthDivider className="login-page-divider">New here?</AuthDivider>

        <Button variant="outline" href="/create-account">
          Create an account
        </Button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
