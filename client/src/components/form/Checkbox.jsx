// Renders the checkbox component.
import "../../styles/form/Checkbox.css";
import FieldMessage from "./FieldMessage";

// Native checkbox restyled to match Figma, with its label beside it.
// label: text or elements (e.g. links) shown next to the box
// error: message shown in red under the label; also turns the box red
// Any other props (name, checked, onChange...) go straight to <input>.
/**
 * Renders a labeled checkbox with an optional validation message.
 * @param {Object} props - Checkbox identity, label, error, and input properties.
 * @param {string} props.id - Checkbox input ID.
 * @param {string|import("react").ReactNode} props.label - Visible checkbox label.
 * @param {string} [props.error] - Validation message associated with the checkbox.
 * @returns {JSX.Element} The checkbox, label, and optional error.
 */
function Checkbox({ id, label, error, ...inputProps }) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="checkbox-field">
      <label htmlFor={id} className="checkbox">
        <input
          id={id}
          type="checkbox"
          className={error ? "checkbox-input checkbox-input-error" : "checkbox-input"}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          {...inputProps}
        />
        {label}
      </label>

      {error && (
        <div className="checkbox-message">
          <FieldMessage id={errorId}>{error}</FieldMessage>
        </div>
      )}
    </div>
  );
}

export default Checkbox;
