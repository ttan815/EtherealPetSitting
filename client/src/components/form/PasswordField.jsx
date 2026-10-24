import { useState } from "react";
import TextField from "./TextField";
import lockIcon from "../../assets/icons/lock.svg";
import eyeIcon from "../../assets/icons/eye.svg";
import eyeOffIcon from "../../assets/icons/eye-off.svg";
import "../../styles/form/PasswordField.css";

// TextField with a lock icon and a show/hide password toggle.
// Takes the same props as TextField.
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
