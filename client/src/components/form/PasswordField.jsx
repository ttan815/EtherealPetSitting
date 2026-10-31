// Renders the password field component.
import { useState } from "react";
import TextField from "./TextField";
import lockIcon from "../../assets/icons/lock.svg";
import eyeIcon from "../../assets/icons/eye.svg";
import eyeOffIcon from "../../assets/icons/eye-off.svg";
import "../../styles/form/PasswordField.css";

// TextField with a lock icon and a show/hide password toggle.
// Takes the same props as TextField.
/**
 * Renders a password input with the shared text-field styling and behavior.
 * @param {Object} props - Password input props forwarded to the text field.
 * @param {string} props.id - Input ID.
 * @param {string} props.label - Visible input label.
 * @returns {JSX.Element} The password field.
 */
function PasswordField(props) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleButton = (
    <button
      type="button"
      className="password-field-toggle"
      aria-label={isVisible ? "Hide password" : "Show password"}
      onClick={() => setIsVisible(!isVisible)}
    >
      <img src={isVisible ? eyeOffIcon : eyeIcon} alt="" />
    </button>
  );

  return (
    <TextField
      {...props}
      type={isVisible ? "text" : "password"}
      icon={lockIcon}
      trailing={toggleButton}
    />
  );
}

export default PasswordField;
