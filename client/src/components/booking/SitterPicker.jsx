import "../../styles/SitterPicker.css";

// "Choose your sitter" radio cards. Each card is a <label> around a real radio,
// so it works with the keyboard (arrow keys) and screen readers.
function SitterPicker({ sitters, selectedSitterId, onSelect }) {
  return (
    <fieldset className="booking-panel sitter-picker">
      <legend className="booking-panel-title sitter-picker-title">Choose your sitter</legend>
      <p className="sitter-picker-description">Pick who cares for your pet, or let us assign an available sitter.</p>

      <div className="sitter-picker-options">
        {sitters.map((sitter) => {
          const isSelected = sitter.id === selectedSitterId;
          return (
            <label key={sitter.id} className={`sitter-option ${isSelected ? "is-selected" : ""}`.trim()}>
              <span className="sitter-option-avatar" aria-hidden="true">
                {sitter.initials}
              </span>
              <span className="sitter-option-details">
                <span className="sitter-option-name">{sitter.name}</span>
                <span className="sitter-option-description">{sitter.description}</span>
              </span>
              <input
                type="radio"
                name="sitter"
                className="sitter-option-input"
                value={sitter.id}
                checked={isSelected}
                onChange={() => onSelect(sitter.id)}
              />
              <span className="sitter-option-radio" aria-hidden="true" />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default SitterPicker;
