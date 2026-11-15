import { useState } from "react";
import { EMPTY_PET_FORM } from "../../../constants/customer/customer-forms";
import "../../../styles/customer-dashboard/manage-pet/AddPet.css";

function SectionHeading({ icon, title, subtitle }) {
  return (
    <div className="add-section-heading">
      <div className="add-section-icon">{icon}</div>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  placeholder,
  value,
  onChange,
  hint,
  textarea,
  rows = 3,
}) {
  return (
    <div className="add-field">
      <label>
        {label} {required && <span>*</span>}
      </label>

      {textarea ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}

      {hint && <small>{hint}</small>}
    </div>
  );
}

function Panel({ icon, title, subtitle, children, className = "" }) {
  return (
    <section className={`add-panel ${className}`}>
      <SectionHeading
        icon={icon}
        title={title}
        subtitle={subtitle}
      />
      {children}
    </section>
  );
}

function Modal({ title, message, onClose, onConfirm, confirmText = "OK" }) {
  return (
    <div className="add-overlay" onClick={onClose}>
      <div
        className="add-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="add-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="add-modal-icon">ⓘ</div>
        <h2>{title}</h2>
        <p>{message}</p>

        <div className="add-modal-actions">
          <button className="add-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="add-primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders the form for adding a pet to the customer's profile.
 * @param {Object} props Page navigation callback.
 * @param {Function} props.setCurrentView Changes the customer dashboard view.
 * @returns {JSX.Element} The add-pet form.
 */
export default function AddPet( { setCurrentView } ) {
  const [pet, setPet] = useState(() => ({ ...EMPTY_PET_FORM }));
  const [modal, setModal] = useState("");
  const [toast, setToast] = useState(false);

  const update = (field, value) => {
    setPet((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const required = [
    "name",
    "age",
    "breed",
    "diet",
    "instructions",
  ];

  const complete = required.every(
    (field) => pet[field].trim() !== ""
  );

  const hasChanges = Object.values(pet).some(
    (value) => value.trim() !== ""
  );

  const addPet = () => {
    if (!complete) {
      setModal("required");
      return;
    }

    setToast(true);
    window.setTimeout(() => setToast(false), 3500);
  };

  const cancel = () => {
    if (hasChanges) {
      setModal("leave");
    }
  };

  const reset = () => {
    setPet({ ...EMPTY_PET_FORM });
    setModal("");
  };

  return (
      <main className="add-main">
        <div className="add-breadcrumb">
          <a onClick={() => setCurrentView("main")}>← Back to Pet Overview</a>
          <span>/</span>
          <span>Add new pet</span>
        </div>

        <header className="add-header">
          <div>
            <h1>Add a new pet</h1>
            <p>
              Tell us about your pet so every visit feels familiar,
              safe, and thoughtfully prepared.
            </p>
          </div>
          <span className="add-chip">ⓘ New profile</span>
        </header>

        <div className="add-info-banner">
          <span>ⓘ</span>
          <div>
            <b>Before you add this pet</b>
            <p>
              Please complete all mandatory fields before adding the pet.
              Fields marked with an asterisk (*) are required.
            </p>
          </div>
        </div>

        <div className="add-layout">
          <div className="add-left-column">

            <Panel
              icon="♧"
              title="Basic details"
              subtitle="The essentials your Ethereal care team will use to identify your pet."
            >
              <div className="add-picture-area">
                <div className="add-picture-placeholder">
                  PUT IMAGE<br />HERE
                </div>

                <div>
                  <b>PET PICTURE</b>
                  <label className="add-upload">
                    ↑ Upload picture
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && file.size > 8 * 1024 * 1024) {
                          alert("Image must be 8 MB or smaller.");
                          e.target.value = "";
                        }
                      }}
                    />
                  </label>
                  <small>JPG or PNG · up to 8 MB</small>
                </div>
              </div>

              <div className="add-grid">
                <Field
                  label="NAME"
                  required
                  placeholder="Enter pet's name"
                  value={pet.name}
                  onChange={(e) => update("name", e.target.value)}
                />
                <Field
                  label="AGE"
                  required
                  placeholder="e.g. 4 years"
                  value={pet.age}
                  onChange={(e) => update("age", e.target.value)}
                  hint="Use years or months."
                />
                <div className="add-full">
                  <Field
                    label="BREED"
                    required
                    placeholder="Breed or Mix"
                    value={pet.breed}
                    onChange={(e) => update("breed", e.target.value)}
                  />
                </div>
                <div className="add-full">
                  <Field
                    label="MEDICATION"
                    placeholder="Medication, dosage, and timing"
                    value={pet.medication}
                    onChange={(e) => update("medication", e.target.value)}
                    hint="Include dosage, timing, and any handling notes."
                  />
                </div>
              </div>
            </Panel>

            <Panel
              icon="♨"
              title="Diet & care routine"
              subtitle="Share exact instructions so your pet's day stays familiar and consistent."
            >
              <Field
                label="DIET"
                required
                placeholder="Meal type, amount, and feeding schedule"
                value={pet.diet}
                onChange={(e) => update("diet", e.target.value)}
              />
              <Field
                label="ALLERGY"
                placeholder="List any known allergies"
                value={pet.allergy}
                onChange={(e) => update("allergy", e.target.value)}
                hint="List food, medication, and environmental allergies."
              />
              <Field
                label="PET CARE INSTRUCTION"
                required
                textarea
                placeholder="Add feeding, walking, comfort, and routine details"
                value={pet.instructions}
                onChange={(e) => update("instructions", e.target.value)}
              />
            </Panel>

            <Panel
              icon="♡"
              title="Behavior"
              subtitle="Describe the little things that help your pet feel safe, happy, and understood."
            >
              <div className="add-grid">
                <Field
                  label="LIKES"
                  textarea
                  placeholder="Favorite toys, activities, or comforts"
                  value={pet.likes}
                  onChange={(e) => update("likes", e.target.value)}
                />
                <Field
                  label="DISLIKES"
                  textarea
                  placeholder="Triggers, sensitivities, or situations to avoid"
                  value={pet.dislikes}
                  onChange={(e) => update("dislikes", e.target.value)}
                />
              </div>
            </Panel>

          </div>

          <div className="add-right-column">

            <section className="add-panel">
              <div className="add-glance-heading">
                <h2>New pet at a glance</h2>
                <span className="add-status beige">
                  {complete ? "Ready to add" : "Not started"}
                </span>
              </div>

              <div className="add-glance-pet">
                <div className="add-glance-icon">♧</div>
                <div>
                  <h3>{pet.name || "Your pet"}</h3>
                  <p>
                    {pet.name
                      ? `${pet.breed || "Breed not entered"} · ${pet.age || "Age not entered"}`
                      : "Name and age will appear here."}
                  </p>
                </div>
              </div>

              <div className="add-notice">
                ⓘ Required fields are marked with an asterisk.
              </div>
            </section>

            <Panel
              icon="✚"
              title="Primary vet"
              subtitle="The first clinic we should contact about your pet's care."
            >
              <Field
                label="VETERINARIAN"
                placeholder="Veterinarian's name"
                value={pet.veterinarian}
                onChange={(e) => update("veterinarian", e.target.value)}
              />
              <Field
                label="CLINIC"
                placeholder="Clinic or hospital name"
                value={pet.clinic}
                onChange={(e) => update("clinic", e.target.value)}
              />
              <Field
                label="PHONE"
                placeholder="(000) 000-0000"
                value={pet.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </Panel>

            <Panel
              icon="▤"
              title="Additional information"
              subtitle="Anything else the care team should keep in mind."
            >
              <Field
                label="NOTES"
                textarea
                rows={5}
                placeholder="Emergency contacts, comfort items, access notes, or anything else"
                value={pet.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </Panel>

          </div>
        </div>

        <footer className="add-footer">
          <p>You can update these care details anytime.</p>
          <div>
            <button className="add-cancel" onClick={cancel}>
              Cancel
            </button>
            <button className="add-primary" onClick={addPet}>
              Add pet
            </button>
          </div>
        </footer>
        {modal === "required" && (
        <Modal
          title="Complete required fields"
          message="Please complete all fields marked with an asterisk (*) before adding your pet."
          onClose={() => setModal("")}
          onConfirm={() => setModal("")}
        />
      )}

      {modal === "leave" && (
        <Modal
          title="Leave without saving?"
          message="You have unsaved changes. Are you sure you want to leave without saving?"
          onClose={() => setModal("")}
          onConfirm={reset}
          confirmText="Leave"
        />
      )}

      {toast && (
        <div className="add-toast">
          <b>✓ Pet profile ready</b>
          <p>Your pet information has been completed.</p>
          <button onClick={() => setToast(false)}>×</button>
        </div>
      )}

      </main>
  );
}