// dt41 manage pet information page
// shows the page title, a bell icon, an add a pet button,
// a your pets heading with a count badge, and a two column grid of pet cards
// this is only the page content, it goes inside the customer dashboard sidebar layout

// useState Logic
import { useState } from "react"
// link lets the add a pet button change pages without reloading the site
import { Link } from "react-router";
// one card for each pet
import PetCard from "./PetCard";
// bell icon for notifications
import bellIcon from "../../../assets/icons/bell.svg";
// styles for this page
import "../../../styles/customer-dashboard/manage-pet/ManagePetPage.css";
// Add Pet
import AddPet from "./AddPet"
// Edit Pet
import EditPet from "./EditPet"

// sample pets from the figma until real pets come from the server
const SAMPLE_PETS = [
  // first sample pet
  {
    id: 1,
    name: "Mochi",
    breed: "Golden Retriever",
    age: "4 years",
    diet: "2 cups sensitive-stomach kibble · twice daily",
    careInstructions: "Breakfast at 7:30 AM, dinner at 6:00 PM, and a 25-minute evening walk.",
    lastUpdated: "Sep 24",
    profileComplete: true,
    photo: null,
  },
  // second sample pet
  {
    id: 2,
    name: "Pepper",
    breed: "Domestic Shorthair",
    age: "2 years",
    diet: "Grain-free dry food · fresh water refreshed daily",
    careInstructions: "Feed twice daily, refresh water, and keep the sunroom window open.",
    lastUpdated: "Sep 18",
    profileComplete: true,
    photo: null,
  },
]; // end of sample pets


function MainContent( {pets, petCountLabel, setCurrentView} ) {
  return (
    <section className="manage-pet-page" aria-labelledby="manage-pet-title">
      {/* top of the page with the title on the left and the buttons on the right */}
      <header className="manage-pet-header">
        <div>
          {/* page title */}
          <h1 id="manage-pet-title" className="manage-pet-title">Manage pet information</h1>
          {/* short line under the title */}
          <p className="manage-pet-subtitle">
            Review each pet&apos;s summary, keep care instructions up to date, and edit details when you need to.
          </p>
        </div>

        {/* bell and add a pet button */}
        <div className="manage-pet-actions">
          {/* bell for notifications, it will open the notifications popup later */}
          <button type="button" className="manage-pet-bell" aria-label="Notifications">
            <img src={bellIcon} alt="" />
          </button>
          {/* goes to the add new pet page, styled like the team button */}
          <button className="button button-primary manage-pet-add" onClick={() => setCurrentView("add")}>
            Add a pet
          </button>
        </div>
      </header>

      {/* your pets heading row with the count badge */}
      <div className="manage-pet-section-heading">
        <div>
          {/* section title */}
          <h2 className="manage-pet-section-title">Your pets</h2>
          {/* short line under the section title */}
          <p className="manage-pet-section-subtitle">
            A quick overview of every pet in your care space, with a clear path to edit each one.
          </p>
        </div>
        {/* how many pets there are */}
        <span className="manage-pet-count">{petCountLabel}</span>
      </div>

      {/* show the cards, or a friendly message if there are no pets yet */}
      {pets.length > 0 ? (
        // two column grid that wraps to new rows
        <div className="manage-pet-grid">
          {/* make one card for every pet */}
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} setCurrentView={setCurrentView} />
          ))}
        </div>
      ) : (
        // message when the customer has not added any pets
        <p className="manage-pet-empty">You have not added any pets yet. Click add a pet to get started.</p>
      )}
    </section>
  );
}

// pets can be passed in later from the server, otherwise the sample pets show
// the add pet path is where the add a pet button goes
/**
 * Renders the customer's saved-pet list and the link for adding a pet.
 * @param {Object} props - Pet records and the add-pet route.
 * @param {Array<Object>} [props.pets] - Pets to display in the management list.
 * @returns {JSX.Element} The saved-pet management page.
 */
function ManagePet({ pets = SAMPLE_PETS}) {
  // shows 1 pet or 2 pets in the badge
  const petCountLabel = `${pets.length} ${pets.length === 1 ? "pet" : "pets"}`;
  // Initialize Views Content
  const [currentView, setCurrentView] = useState("main");

  // what the page looks like
  if(currentView === "main")
    return <MainContent pets={pets} petCountLabel={petCountLabel} setCurrentView={setCurrentView}/>;
  else if(currentView === "add")
    return <AddPet/>
  else if(currentView === "edit")
    return <EditPet/>
}

export default ManagePet;
