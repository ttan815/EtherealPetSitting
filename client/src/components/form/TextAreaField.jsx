import "../../styles/form/TextField.css";
import "../../styles/TextAreaField.css";
import FieldMessage from "./FieldMessage";

// Labeled multi-line text box; the <textarea> version of TextField, with the same look.
// id, label: connect the <label> to the textarea
// hint: help text shown under the field
// Any other props (value, onChange, placeholder, rows...) go straight to <textarea>.
function TextAreaField({ id, label, hint, ...textareaProps }) {
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className="text-field">
      <label htmlFor={id} className="text-field-label">
        {label}
      </label>

      <div className="text-field-box">
        <textarea id={id} className="text-field-input text-area-field-input" aria-describedby={hintId} {...textareaProps} />
      </div>

      {hint && (
        <FieldMessage id={hintId} variant="hint">
          {hint}
        </FieldMessage>
      )}
    </div>
  );
}

export default TextAreaField;
