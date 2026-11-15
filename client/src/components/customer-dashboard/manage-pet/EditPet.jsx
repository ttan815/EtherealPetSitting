import { useState } from "react";
import { getEditablePetProfile } from "../../../services/pet-service";
import "../../../styles/customer-dashboard/manage-pet/EditPet.css";

const initialPet = getEditablePetProfile();

function SectionHeading({ icon, title, subtitle }) {
  return (
    <div className="edit-section-heading">
      <div className="edit-section-icon">{icon}</div>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function Panel({ icon, title, subtitle, children }) {
  return (
    <section className="edit-panel">
      <SectionHeading
        icon={icon}
        title={title}
        subtitle={subtitle}
      />
      {children}
    </section>
  );
}

function Field({
  label,
  required,
  value,
  onChange,
  placeholder,
  textarea,
  rows = 3,
}) {
  return (
    <div className="edit-field">
      <label>
        {label} {required && <span>*</span>}
      </label>

      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
}

function Modal({ title, message, onClose, onConfirm, confirmText }) {
  return (
    <div className="edit-overlay" onClick={onClose}>
      <div
        className="edit-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="edit-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="edit-modal-icon">ⓘ</div>

        <h2>{title}</h2>
        <p>{message}</p>

        <div className="edit-modal-actions">
          <button className="edit-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className={
              confirmText === "Remove pet"
                ? "edit-danger-button"
                : "edit-primary"
            }
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders the form for editing or removing a pet from the customer's profile.
 * @param {Object} props Page navigation callback.
 * @param {Function} props.setCurrentView Changes the customer dashboard view.
 * @returns {JSX.Element} The edit-pet form.
 */
export default function EditPet( {setCurrentView} ) {
  const [pet, setPet] = useState(initialPet);
  const [modal, setModal] = useState("");
  const [toast, setToast] = useState(false);
  const [removed, setRemoved] = useState(false);

  const update = (field, value) => {
    setPet((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const hasChanges = Object.keys(initialPet).some(
    (field) => pet[field] !== initialPet[field]
  );

  const saveChanges = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), 3500);
  };

  const cancel = () => {
    if (hasChanges) {
      setModal("leave");
    }
  };

  const leavePage = () => {
    setPet(initialPet);
    setModal("");
  };

  const removePet = () => {
    setModal("");
    setRemoved(true);
  };

  if (removed) {
    return (
      <div className="edit-app">

        <main className="edit-main edit-removed">
          <div className="edit-removed-content">
            <div className="edit-success-icon">✓</div>
            <h1>Successfully removed</h1>
            <p>
              Mochi has been removed from your account and saved care details.
            </p>

            <button
              className="edit-primary"
              onClick={() => {
                setCurrentView("main");
                setRemoved(false);
                setPet(initialPet);
              }}
            >
              Back to Pet Overview
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
      <main className="edit-main">

        <div className="edit-breadcrumb">
          <a onClick={() => setCurrentView("main")}>← Back to Pet Overview</a>
          <span>/</span>
          <span>Edit {pet.name}</span>
        </div>

        <header className="edit-header">
          <div>
            <h1>Edit {pet.name}'s profile</h1>
            <p>
              Keep {pet.name}'s routine, preferences, and care contacts
              accurate for every visit.
            </p>
          </div>

          <span className="edit-chip">✎ Editing profile</span>
        </header>

        <div className="edit-layout">

          <div className="edit-left-column">

            <Panel
              icon="♧"
              title="Basic details"
              subtitle={`The essentials your Ethereal care team will use to identify ${pet.name}.`}
            >
              <div className="edit-picture-area">
                <div className="edit-picture-placeholder">
                  PUT IMAGE<br />HERE
                </div>

                <div className="edit-picture-actions">
                  <b>PICTURE</b>

                  <div className="edit-picture-buttons">
                    <label className="edit-upload">
                      ▣ Replace picture
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && file.size > 8 * 1024 * 1024) {
                            alert("Image must be 8 MB or smaller.");
                            e.target.value = "";
                          }
                        }}
                      />
                    </label>

                    <button
                      className="edit-remove-picture"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>

                  <small>JPG or PNG · up to 8 MB</small>
                </div>
              </div>

              <div className="edit-grid">
                <Field
                  label="NAME"
                  required
                  value={pet.name}
                  onChange={(e) => update("name", e.target.value)}
                />

                <Field
                  label="AGE"
                  required
                  value={pet.age}
                  onChange={(e) => update("age", e.target.value)}
                />

                <div className="edit-full">
                  <Field
                    label="MEDICATION"
                    value={pet.medication}
                    onChange={(e) => update("medication", e.target.value)}
                  />
                </div>
              </div>
            </Panel>

            <Panel
              icon="♨"
              title="Diet & care routine"
              subtitle={`Share exact instructions so ${pet.name}'s day stays familiar and consistent.`}
            >
              <Field
                label="DIET"
                required
                value={pet.diet}
                onChange={(e) => update("diet", e.target.value)}
              />

              <Field
                label="ALLERGY"
                value={pet.allergy}
                onChange={(e) => update("allergy", e.target.value)}
              />

              <Field
                label="PET CARE INSTRUCTION"
                required
                textarea
                rows={3}
                value={pet.instructions}
                onChange={(e) => update("instructions", e.target.value)}
              />
            </Panel>

            <Panel
              icon="♡"
              title="Behavior"
              subtitle={`Describe the little things that help ${pet.name} feel safe, happy, and understood.`}
            >
              <div className="edit-grid">
                <Field
                  label="LIKES"
                  textarea
                  rows={3}
                  value={pet.likes}
                  onChange={(e) => update("likes", e.target.value)}
                />

                <Field
                  label="DISLIKES"
                  textarea
                  rows={3}
                  value={pet.dislikes}
                  onChange={(e) => update("dislikes", e.target.value)}
                />
              </div>
            </Panel>

          </div>

          <div className="edit-right-column">

            <section className="edit-panel edit-glance">
              <div className="edit-glance-heading">
                <h2>{pet.name} at a glance</h2>
                <span className="edit-status green">
                  Profile complete
                </span>
              </div>

              <div className="edit-glance-pet">
                <div className="edit-picture-placeholder small-placeholder">
                  PUT IMAGE<br />HERE
                </div>

                <div>
                  <h3>{pet.name}</h3>
                  <p>{pet.breed} · {pet.age}</p>
                  <small>Last updated Sep 24</small>
                </div>
              </div>

              <div className="edit-complete-notice">
                ✓ All care details are ready for {pet.name}'s next visit.
              </div>
            </section>

            <Panel
              icon="✚"
              title="Primary vet"
              subtitle={`The first clinic we should contact about ${pet.name}'s care.`}
            >
              <Field
                label="VETERINARIAN"
                required
                value={pet.veterinarian}
                onChange={(e) => update("veterinarian", e.target.value)}
              />

              <Field
                label="CLINIC"
                value={pet.clinic}
                onChange={(e) => update("clinic", e.target.value)}
              />

              <Field
                label="PHONE"
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
                rows={4}
                value={pet.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </Panel>

            <section className="edit-danger-card">
              <h2>⚠ Remove pet</h2>
              <p>
                This removes {pet.name} and all saved care details
                from your account. This action can't be undone.
              </p>

              <button
                className="edit-danger-outline"
                onClick={() => setModal("remove")}
              >
                Remove pet
              </button>
            </section>

          </div>
        </div>

        <footer className="edit-footer">
          <p>Changes apply to future bookings and care visits.</p>

          <div>
            <button className="edit-cancel" onClick={() => setCurrentView("main")}>
              Cancel
            </button>

            <button className="edit-primary" onClick={saveChanges}>
              Save changes
            </button>
          </div>
        </footer>
        
        {modal === "leave" && (
        <Modal
          title="Leave without saving?"
          message="You have unsaved changes. Are you sure you want to leave without saving?"
          onClose={() => setModal("")}
          onConfirm={leavePage}
          confirmText="Leave"
        />
      )}

      {modal === "remove" && (
        <Modal
          title="Remove pet?"
          message={`Are you sure you want to remove ${pet.name}? This action cannot be undone.`}
          onClose={() => setModal("")}
          onConfirm={removePet}
          confirmText="Remove pet"
        />
      )}

      {toast && (
        <div className="edit-toast">
          <b>✓ Changes saved</b>
          <p>Your updates have been saved.</p>
          <button onClick={() => setToast(false)}>×</button>
        </div>
      )}
      </main>
  );
}