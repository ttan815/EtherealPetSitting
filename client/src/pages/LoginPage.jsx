import AuthLayout from "../components/auth/AuthLayout";
import TextField from "../components/form/TextField";
import PasswordField from "../components/form/PasswordField";
import Checkbox from "../components/form/Checkbox";
import Button from "../components/form/Button";
import mailIcon from "../assets/icons/mail.svg";
import "../styles/LoginPage.css";

// Visitor log in screen. UI only: nothing is sent to the server yet.
function LoginPage() {
  // Stop the browser from reloading the page until login is wired up
  function handleSubmit(event) {
    event.preventDefault();
  }

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
          />
          <PasswordField
            id="login-password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            labelAction={
              <a href="/forgot-password" className="login-page-link">
                Forgot password?
              </a>
            }
          />
        </div>

        <Checkbox id="login-remember" label="Keep me logged in" />

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
