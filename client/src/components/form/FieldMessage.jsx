// Renders the field message component.
import errorIcon from "../../assets/icons/error.svg";
import infoIcon from "../../assets/icons/info.svg";
import "../../styles/form/FieldMessage.css";

// Small line of text under a form field, with an icon in front.
// variant: "error" (red, e.g. a server error) | "hint" (brown help text)
// id: lets the field point to this message with aria-describedby
/**
 * Renders an inline field message such as validation feedback.
 * @param {Object} props - Message identity, style, and content.
 * @param {string} [props.id] - Optional DOM ID for the message.
 * @param {string} [props.variant] - Message visual variant.
 * @param {import("react").ReactNode} props.children - The message content.
 * @returns {JSX.Element} The inline field message.
 */
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
