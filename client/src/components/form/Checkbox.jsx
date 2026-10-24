import "../../styles/form/Checkbox.css";
import FieldMessage from "./FieldMessage";

// Native checkbox restyled to match Figma, with its label beside it.
// label: text or elements (e.g. links) shown next to the box
// error: message shown in red under the label; also turns the box red
// Any other props (name, checked, onChange...) go straight to <input>.
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
