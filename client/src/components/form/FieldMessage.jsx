import errorIcon from "../../assets/icons/error.svg";
import infoIcon from "../../assets/icons/info.svg";
import "../../styles/form/FieldMessage.css";

// Small line of text under a form field, with an icon in front.
// variant: "error" (red, e.g. a server error) | "hint" (brown help text)
// id: lets the field point to this message with aria-describedby
function FieldMessage({ id, variant = "error", children }) {
  const icon = variant === "error" ? errorIcon : infoIcon;

  return (
    <p id={id} className={`field-message field-message-${variant}`}>
      <img src={icon} alt="" />
      {children}
    </p>
  );
}

export default FieldMessage;
