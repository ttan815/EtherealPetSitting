// Renders the text field component.
import "../../styles/form/TextField.css";
import FieldMessage from "./FieldMessage";

// Labeled input with a leading icon, matching the Figma "Field" component.
// id, label: connect the <label> to the input (also used for screen readers)
// icon: image shown at the start of the input
// labelAction: optional element on the right of the label row (e.g. a link)
// trailing: optional element at the end of the input (e.g. a toggle button)
// error: message shown in red under the field; also turns the border red
// hint: help text shown under the field when there is no error
// Any other props (type, placeholder, autoComplete...) go straight to <input>.
/**
 * Renders a labeled text input with optional icons and feedback.
 * @param {Object} props - Input identity, decorations, feedback, and native properties.
 * @param {string} props.id - Input ID.
 * @param {string} props.label - Visible input label.
 * @param {string} [props.icon] - Leading icon source.
 * @param {import("react").ReactNode} [props.labelAction] - Optional action beside the label.
 * @param {import("react").ReactNode} [props.trailing] - Optional content after the input.
 * @param {string} [props.error] - Validation message for the input.
 * @param {string} [props.hint] - Supporting hint displayed with the input.
 * @returns {JSX.Element} The labeled text field.
 */
function TextField({ id, label, icon, labelAction, trailing, error, hint, ...inputProps }) {
  // An error replaces the hint, matching the Figma error screen
  const message = error || hint;
  const messageId = message ? `${id}-message` : undefined;

  return (
    <div className="text-field">
      <div className="text-field-label-row">
        <label htmlFor={id} className="text-field-label">
          {label}
        </label>
        {labelAction}
      </div>

      <div className={error ? "text-field-box text-field-box-error" : "text-field-box"}>
        {icon && <img className="text-field-icon" src={icon} alt="" />}
        <input
          id={id}
          className="text-field-input"
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          {...inputProps}
        />
        {trailing}
      </div>

      {message && (
        <FieldMessage id={messageId} variant={error ? "error" : "hint"}>
          {message}
        </FieldMessage>
      )}
    </div>
  );
}

export default TextField;
