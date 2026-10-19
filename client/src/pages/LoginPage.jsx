import AuthLayout from "../components/auth/AuthLayout";
import TextField from "../components/form/TextField";
import PasswordField from "../components/form/PasswordField";
import Checkbox from "../components/form/Checkbox";
import Button from "../components/form/Button";
import mailIcon from "../assets/icons/mail.svg";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL, NETWORK_ERROR_MESSAGE, GENERIC_ERROR_MESSAGE } from "../constants/api";
import "../styles/LoginPage.css";

// Visitor log in screen. UI only: nothing is sent to the server yet.
function LoginPage() {
  // Stop the browser from reloading the page until login is wired up
  const navigate = useNavigate()
  const { refreshSession } = useAuth()
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5002/api/login-account",
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
        console.log(response.status)
        return;
      }
      const valid = await refreshSession()
      if (valid) {
        navigate("/")
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
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

        <Checkbox onChange={(e) => setRememberMe(e.target.checked)} id="login-remember" label="Keep me logged in" />

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
