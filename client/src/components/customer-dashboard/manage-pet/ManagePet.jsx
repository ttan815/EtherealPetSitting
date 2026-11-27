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
// Add Page Header
import PageHeader from "../../parent-component/PageHeader";
import { getCustomerPets } from "../../../services/customer-dashboard/pet-service";


function MainContent( {pets, petCountLabel, setCurrentView} ) {
  return (
    <section className="manage-pet-page" aria-labelledby="manage-pet-title">
      {/* top of the page with the title on the left and the buttons on the right */}
      <PageHeader 
      title={"Manage pet information"} 
      subtitle={"Review each pet's summary, keep care instructions up to date, and edit details when you need to."} 
      actionLabel={"Add a Pet"} 
      onAction={() => setCurrentView("add")}
      />

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
function ManagePet({ pets = getCustomerPets() }) {
  // shows 1 pet or 2 pets in the badge
  const petCountLabel = `${pets.length} ${pets.length === 1 ? "pet" : "pets"}`;
  // Initialize Views Content
  const [currentView, setCurrentView] = useState("main");
  const [petList, setPetList] = useState(pets);
  const [editing, setEditing] = useState(false);

  function handlePetAdded() {
    setPetList(getCustomerPets());
    setCurrentView("main");
  }

  function openEditor() {
    setEditing(true);
    setCurrentView("edit");
  }

  function closeEditor() {
    setEditing(false);
    setPetList(getCustomerPets());
    setCurrentView("main");
  }

  // what the page looks like
  if(currentView === "main")
    return <MainContent pets={petList} petCountLabel={`${petList.length} ${petList.length === 1 ? "pet" : "pets"}`} setCurrentView={openEditor}/>;
  else if(currentView === "add")
    return <AddPet setCurrentView={handlePetAdded}/>
  else if(currentView === "edit")
    return <EditPet key={editing ? "editing" : "view"} setCurrentView={closeEditor}/>
}

export default ManagePet;
