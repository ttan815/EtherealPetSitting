import { useState } from "react";
import { useNavigate } from "react-router";
import AuthLayout from "../components/auth/AuthLayout";
import AuthHeading from "../components/auth/AuthHeading";
import AuthDivider from "../components/auth/AuthDivider";
import TextField from "../components/form/TextField";
import PasswordField from "../components/form/PasswordField";
import Button from "../components/form/Button";
import FieldMessage from "../components/form/FieldMessage";
import PolicyConsent from "../components/create-account/PolicyConsent";
import userIcon from "../assets/icons/user.svg";
import mailIcon from "../assets/icons/mail.svg";
import phoneIcon from "../assets/icons/phone.svg";
import { API_BASE_URL, NETWORK_ERROR_MESSAGE, GENERIC_ERROR_MESSAGE } from "../constants/api";
import "../styles/create-account/CreateAccountPage.css";

const DEFAULT_API_URL = `${API_BASE_URL}/create-account`;

// Keys match what the server expects in the request body
const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  retypedPassword: "",
  hasAcceptTerm: false,
};

// Visitor sign up screen. All checks happen on the server; this page only
// shows what the server sends back.
function CreateAccountPage({ apiUrl = DEFAULT_API_URL, onSuccess }) {
  const [form, setForm] = useState(EMPTY_FORM);
  // Field errors, keyed like EMPTY_FORM, e.g. { email: "Please enter your email address." }
  const [errors, setErrors] = useState({});
  // Error that isn't tied to one field, e.g. the server couldn't be reached
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear that field's error once the visitor starts fixing it
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  // Props shared by every text input: current value and change handler
  function getFieldProps(name) {
    return {
      name,
      value: form[name],
      error: errors[name],
      onChange: (event) => updateField(name, event.target.value),
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    setFormError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // keep the session cookie from the auto login
        body: JSON.stringify(form),
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        /* non-JSON response */
      }

      if (!response.ok) {
        // { errors: { field: message } } goes under each field; anything
        // else (e.g. a server error) shows above the button.
        setErrors(result.errors ?? {});
        if (result.Message || !result.errors) {
          setFormError(result.Message || GENERIC_ERROR_MESSAGE);
        }
        return;
      }

      // The server logs the visitor in after creating the account
      onSuccess?.(result);
      navigate("/");
    } catch {
      setFormError(NETWORK_ERROR_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout tagline="Care that feels" taglineEmphasis="like home.">
      <form className="create-account-page-form" onSubmit={handleSubmit} noValidate>
        <AuthHeading
          title="Create your account"
          subtitle="Book care, add your pets, and manage visits in one place."
        />

        <div className="create-account-page-fields">
          <div className="create-account-page-name-row">
            <TextField
              id="signup-first-name"
              label="First name"
              placeholder="First name"
              autoComplete="given-name"
              icon={userIcon}
              {...getFieldProps("firstName")}
            />
            <TextField
              id="signup-last-name"
              label="Last name"
              placeholder="Last name"
              autoComplete="family-name"
              {...getFieldProps("lastName")}
            />
          </div>
          <TextField
            id="signup-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            icon={mailIcon}
            {...getFieldProps("email")}
          />
          <TextField
            id="signup-phone"
            label="Phone number"
            type="tel"
            placeholder="(555) 555-5555"
            autoComplete="tel"
            icon={phoneIcon}
            {...getFieldProps("phoneNumber")}
          />
          <PasswordField
            id="signup-password"
            label="Password"
            placeholder="Create a password"
            autoComplete="new-password"
            hint="8+ characters with a capital letter, a number and a symbol"
            {...getFieldProps("password")}
          />
          <PasswordField
            id="signup-retyped-password"
            label="Re-enter password"
            placeholder="Type your password again"
            autoComplete="new-password"
            {...getFieldProps("retypedPassword")}
          />
        </div>

        <PolicyConsent
          checked={form.hasAcceptTerm}
          onChange={(checked) => updateField("hasAcceptTerm", checked)}
          error={errors.hasAcceptTerm}
        />

        {formError && (
          <div className="create-account-page-status" role="alert">
            <FieldMessage>{formError}</FieldMessage>
          </div>
        )}

        <Button type="submit" className="create-account-page-submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>

        <AuthDivider className="create-account-page-divider">Already have an account?</AuthDivider>

        <Button variant="outline" href="/login">
          Log in
        </Button>
      </form>
    </AuthLayout>
  );
}

export default CreateAccountPage;
