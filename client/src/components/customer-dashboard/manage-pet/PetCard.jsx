// dt92 pet card for the manage pet information page
// shows one pet: name, breed and age, a round photo, breed and age, diet,
// care instructions, when it was last updated, and an edit info button

// link lets the edit info button change pages without reloading the site
import { Link } from "react-router";
// icons for the three info rows
import pawIcon from "../../../assets/icons/paw.svg";
import dietIcon from "../../../assets/icons/diet.svg";
import careIcon from "../../../assets/icons/care-instruction.svg";
// styles for this card
import "../../../styles/customer-dashboard/manage-pet/PetCard.css";

// pet holds the info for one pet
// the edit path is where the edit info button goes, it defaults to a guess until
// the edit pet page route is decided
/**
 * Renders a saved pet's summary and its edit action.
 * @param {Object} props - Pet record and edit destination.
 * @param {Object} props.pet - The pet details shown in the card.
 * @param {string} [props.editPath] - Destination for editing this pet.
 * @returns {JSX.Element} The saved-pet card.
 */
function PetCard({ pet, editPath = `/manage-pets/${pet.id}/edit` }) {
  // breed and age shown together, for example golden retriever · 4 years
  const breedAndAge = `${pet.breed} · ${pet.age}`;

  // the three info rows, kept in a list so they all look the same
  const infoRows = [
    { label: "Breed & age", value: breedAndAge, icon: pawIcon }, // breed and age row
    { label: "Diet", value: pet.diet, icon: dietIcon }, // diet row
    { label: "Care instruction", value: pet.careInstructions, icon: careIcon }, // care row
  ];

  // what the card looks like on the page
  return (
    <article className="pet-card">
      {/* top row with the name on the left and the profile badge on the right */}
      <div className="pet-card-header">
        <div>
          {/* pet name */}
          <h3 className="pet-card-name">{pet.name}</h3>
          {/* breed and age under the name */}
          <p className="pet-card-subtitle">{breedAndAge}</p>
        </div>
        {/* only show the badge when the profile is filled out */}
        {pet.profileComplete && <span className="pet-card-badge">Profile complete</span>}
      </div>

      {/* round pet photo, or a paw placeholder if there is no photo yet */}
      <div className="pet-card-photo">
        {pet.photo ? (
          <img src={pet.photo} alt={`Photo of ${pet.name}`} />
        ) : (
          <img className="pet-card-photo-placeholder" src={pawIcon} alt="" />
        )}
      </div>

      {/* list of info rows */}
      <ul className="pet-card-info">
        {/* make one row for each item in the list above */}
        {infoRows.map((row) => (
          <li key={row.label} className="pet-card-info-row">
            {/* round icon on the left, hidden from screen readers since it is decoration */}
            <span className="pet-card-info-icon" aria-hidden="true">
              <img src={row.icon} alt="" />
            </span>
            <div>
              {/* small label, for example diet */}
              <p className="pet-card-info-label">{row.label}</p>
              {/* the actual info */}
              <p className="pet-card-info-value">{row.value}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* bottom row with the last updated date and the edit button */}
      <div className="pet-card-footer">
        {/* when this pet was last changed */}
        <p className="pet-card-updated">Last updated {pet.lastUpdated}</p>
        {/* goes to the edit page for this pet, styled like the team button */}
        <Link to={editPath} className="button button-primary pet-card-edit">
          Edit info
        </Link>
      </div>
    </article>
  );
}

export default PetCard;
