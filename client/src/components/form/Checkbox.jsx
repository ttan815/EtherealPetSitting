import "./Checkbox.css";

// Native checkbox restyled to match Figma, with its label beside it.
// Any other props (name, checked, onChange...) go straight to <input>.
function Checkbox({ id, label, ...inputProps }) {
  return (
    <label htmlFor={id} className="checkbox">
      <input id={id} type="checkbox" className="checkbox-input" {...inputProps} />
      {label}
    </label>
  );
}

export default Checkbox;
