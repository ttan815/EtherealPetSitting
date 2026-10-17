import "./TextField.css";

// Labeled input with a leading icon, matching the Figma "Field" component.
// id, label: connect the <label> to the input (also used for screen readers)
// icon: image shown at the start of the input
// labelAction: optional element on the right of the label row (e.g. a link)
// trailing: optional element at the end of the input (e.g. a toggle button)
// Any other props (type, placeholder, autoComplete...) go straight to <input>.
function TextField({ id, label, icon, labelAction, trailing, ...inputProps }) {
  return (
    <div className="text-field">
      <div className="text-field-label-row">
        <label htmlFor={id} className="text-field-label">
          {label}
        </label>
        {labelAction}
      </div>

      <div className="text-field-box">
        {icon && <img className="text-field-icon" src={icon} alt="" />}
        <input id={id} className="text-field-input" {...inputProps} />
        {trailing}
      </div>
    </div>
  );
}

export default TextField;
