// Renders the Add / Edit / Assign / Remove / Disapprove popups for the owner's Availability section (DT-325).
import { useEffect, useState } from "react";
import { formatDate, formatTime } from "../owner-dashboard/availability/AvailabilityTable";
import { AVAILABILITY_EMPTY_FORM, AVAILABILITY_ICON_PROPS } from "../../constants/availability/availability";
import { validateAvailability } from "../../services/owner-dashboard/availability-service";

const CalendarIcon = () => <svg {...AVAILABILITY_ICON_PROPS}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>;
const UserIcon = () => <svg {...AVAILABILITY_ICON_PROPS}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>;
const XCircleIcon = () => <svg {...AVAILABILITY_ICON_PROPS}><circle cx="12" cy="12" r="9" /><path d="m15 9-6 6M9 9l6 6" /></svg>;


// Shared popup frame: icon, title, subtitle and close button.
// TODO: reusable <Modal> component not available
function PopupShell({ icon, tone = "default", title, subtitle, onClose, children }) {
    return (
        <div className="av-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className="av-popup" role="dialog" aria-modal="true" aria-label={title}>
                <div className="av-popup-head">
                    <span className={`av-popup-icon av-popup-icon-${tone}`} aria-hidden="true">{icon}</span>
                    <div className="av-popup-heading">
                        <h2 className="av-popup-title">{title}</h2>
                        {subtitle && <p className="av-popup-subtitle">{subtitle}</p>}
                    </div>
                    <button type="button" className="av-popup-close" aria-label="Close" onClick={onClose}>×</button>
                </div>
                {children}
            </div>
        </div>
    );
}

function Field({ label, optional, error, children, wide }) {
    return (
        <label className={`av-field ${wide ? "av-field-wide" : ""}`}>
            <span className="av-field-label">
                {label} {optional && <span className="av-optional">Optional</span>}
            </span>
            {children}
            {error && <span className="av-error">{error}</span>}
        </label>
    );
}

function normalizeCustomerPets(customer) {
    return Array.isArray(customer?.pets) ? customer.pets : [];
}

function AvailabilityForm({ slot, slots, options, onClose, onSave, isRequest = false }) {
    const isEdit = Boolean(slot);
    const [form, setForm] = useState(() =>
        isEdit
            ? { ...AVAILABILITY_EMPTY_FORM, ...slot, booking: slot.customer ? "customer" : "open", customerId: slot.customer ? String(slot.customer.id) : "", petId: slot.customer?.pet ? String(slot.customer.pet.id) : "" }
            : { ...AVAILABILITY_EMPTY_FORM, admin: isRequest ? options.currentAdmin ?? "" : "", booking: "open" }
    );
    const [errors, setErrors] = useState({});

    const selectedCustomer = (options.customers ?? []).find((c) => String(c.id) === form.customerId) ?? null;
    const selectedPets = normalizeCustomerPets(selectedCustomer);
    const price = Number(options.servicePrices?.[form.service] ?? 0);

    function update(field, value) {
        // Changing the customer clears the pet, since pets belong to one customer
        setForm((f) => ({ ...f, [field]: value, ...(field === "customerId" ? { petId: "" } : {}) }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const found = validateAvailability(form, slots, slot?.id ?? null);
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        const customer = form.booking === "customer" ? selectedCustomer : null;
        const pet = customer ? selectedPets.find((pt) => String(pt.id) === String(form.petId)) : null;
        onSave({
            admin: form.admin,
            service: form.service,
            date: form.date,
            start: form.start,
            end: form.end,
            price,
            customer: customer ? { id: customer.id, name: customer.name, pet: pet ? { id: pet.id, name: pet.name } : null } : null,
        });
    }

    return (
        <PopupShell
            icon={<CalendarIcon />}
            title={isEdit ? "Edit Availability" : "Add Availability"}
            subtitle={isEdit ? "Changes go back to the admin to confirm." : "Add a time customers can book. The admin will be notified."}
            onClose={onClose}
        >
            <form className="av-form" onSubmit={handleSubmit} noValidate>
                <Field label="Admin" error={errors.admin}>
                    <select className="av-input" value={form.admin} onChange={(e) => update("admin", e.target.value)}>
                        <option value="">Choose an admin</option>
                        {options.admins.map((name) => <option key={name} value={name}>{name}</option>)}
                    </select>
                </Field>
                <Field label="Service" error={errors.service}>
                    <select className="av-input" value={form.service} onChange={(e) => update("service", e.target.value)}>
                        <option value="">Choose a service</option>
                        {options.services.map((name) => <option key={name} value={name}>{name}</option>)}
                    </select>
                </Field>
                <Field label="Date" error={errors.date} wide>
                    <input className="av-input" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
                </Field>
                <Field label="Start time" error={errors.start}>
                    <input className="av-input" type="time" value={form.start} onChange={(e) => update("start", e.target.value)} />
                </Field>
                <Field label="End time" error={errors.end}>
                    <input className="av-input" type="time" value={form.end} onChange={(e) => update("end", e.target.value)} />
                </Field>
                {form.service && (
                    <p className="av-price-note av-field-wide">
                        Price: <strong>${price}</strong> · set automatically in Settings
                    </p>
                )}

                <fieldset className="av-field av-field-wide av-radio-group">
                    <legend className="av-field-label">Who can book it</legend>
                    <label className="av-radio">
                        <input type="radio" name="booking" checked={form.booking === "open"} onChange={() => update("booking", "open")} />
                        Open for booking
                    </label>
                    <label className="av-radio">
                        <input type="radio" name="booking" checked={form.booking === "customer"} onChange={() => update("booking", "customer")} />
                        Specific customer
                    </label>
                </fieldset>

                {form.booking === "customer" && (
                    <Field label="Customer" error={errors.customerId} wide>
                        <select className="av-input" value={form.customerId} onChange={(e) => update("customerId", e.target.value)}>
                            <option value="">Choose a customer</option>
                            {options.customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </Field>
                )}

                {form.booking === "customer" && selectedCustomer && (
                    <Field label="Pet" error={errors.petId} wide>
                        <select className="av-input" value={form.petId} onChange={(e) => update("petId", e.target.value)}>
                            <option value="">Choose a pet</option>
                            {selectedPets.map((pt) => <option key={pt.id} value={pt.id}>{pt.name} · {pt.breed}</option>)}
                        </select>
                    </Field>
                )}

                {errors.overlap && <p className="av-error av-error-banner av-field-wide">{errors.overlap}</p>}

                <div className="av-popup-actions av-field-wide">
                    <button type="button" className="av-btn av-btn-outline" onClick={onClose}>Cancel</button>
                    <button type="submit" className="av-btn av-btn-primary">{isRequest ? "Send request" : isEdit ? "Save changes" : "Add availability"}</button>
                </div>
            </form>
        </PopupShell>
    );
}

function AssignCustomer({ slot, options, onClose, onAssign }) {
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState(slot.customer?.id ?? null);
    const [petId, setPetId] = useState(slot.customer?.pet?.id ?? null);
    const [error, setError] = useState("");

    const matches = (options.customers ?? []).filter((c) => c.name.toLowerCase().includes(search.trim().toLowerCase()));
    const selected = (options.customers ?? []).find((c) => String(c.id) === String(selectedId)) ?? null;
    const selectedPets = normalizeCustomerPets(selected);

    function pickCustomer(id) {
        setSelectedId(id);
        // Preselect the pet when the customer only has one
        const customer = (options.customers ?? []).find((c) => String(c.id) === String(id)) ?? null;
        const pets = normalizeCustomerPets(customer);
        setPetId(pets.length === 1 ? pets[0].id : null);
        setError("");
    }

    function handleAssign() {
        const pet = selectedPets.find((pt) => String(pt.id) === String(petId));
        if (!selected) {
            setError("Choose a customer to assign.");
            return;
        }
        if (!pet) {
            setError("Choose which pet this visit is for.");
            return;
        }
        onAssign(selected, pet);
    }

    return (
        <PopupShell
            icon={<UserIcon />}
            title="Assign Customer"
            subtitle={`${slot.service} · ${formatDate(slot.date)}, ${formatTime(slot.start)} – ${formatTime(slot.end)}`}
            onClose={onClose}
        >
            <label className="av-search av-search-block">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                </svg>
                <input type="search" placeholder="Search customers" value={search} onChange={(e) => setSearch(e.target.value)} autoFocus />
            </label>
            <ul className="av-customer-list">
                {matches.length === 0 && <li className="av-cell-muted">No customers found.</li>}
                {matches.map((c) => (
                    <li key={c.id}>
                        <button
                            type="button"
                            className={`av-customer ${String(selectedId) === String(c.id) ? "av-customer-selected" : ""}`}
                            onClick={() => pickCustomer(c.id)}
                        >
                            <span className="av-avatar">{c.name[0]}</span>
                            <span>
                                <span className="av-cell-main">{c.name}</span>
                                <span className="av-cell-sub">{normalizeCustomerPets(c).map((pt) => pt.name).join(", ")}</span>
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
            {selected && (
                <div className="av-field">
                    <span className="av-field-label">Pet</span>
                    <div className="av-pet-chips">
                        {selectedPets.map((pt) => (
                            <button
                                key={pt.id}
                                type="button"
                                className={`av-chip ${String(petId) === String(pt.id) ? "av-chip-active" : ""}`}
                                onClick={() => { setPetId(pt.id); setError(""); }}
                            >
                                {pt.name} · {pt.breed}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {error && <p className="av-error">{error}</p>}
            <div className="av-popup-actions">
                <button type="button" className="av-btn av-btn-outline" onClick={onClose}>Cancel</button>
                <button type="button" className="av-btn av-btn-primary" onClick={handleAssign}>Assign customer</button>
            </div>
        </PopupShell>
    );
}

function RemoveConfirm({ slot, onClose, onRemove }) {
    return (
        <PopupShell
            icon={<XCircleIcon />}
            tone="danger"
            title="Remove this availability?"
            subtitle={`${slot.admin}'s ${slot.service} on ${formatDate(slot.date)}, ${formatTime(slot.start)} – ${formatTime(slot.end)} will no longer appear on the booking page.`}
            onClose={onClose}
        >
            <div className="av-popup-actions">
                <button type="button" className="av-btn av-btn-outline" onClick={onClose}>Cancel</button>
                <button type="button" className="av-btn av-btn-danger" onClick={onRemove}>Remove availability</button>
            </div>
        </PopupShell>
    );
}

function DisapproveRequest({ slot, onClose, onDisapprove }) {
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    function handleSubmit() {
        if (!reason.trim()) {
            setError("Add a reason so the admin knows what to change.");
            return;
        }
        onDisapprove(reason.trim());
    }

    return (
        <PopupShell
            icon={<XCircleIcon />}
            tone="danger"
            title={`Disapprove ${slot.admin}'s request?`}
            subtitle={`${slot.service} · ${formatDate(slot.date)}, ${formatTime(slot.start)} – ${formatTime(slot.end)}. The admin will be notified.`}
            onClose={onClose}
        >
            <Field label="Reason" error={error} wide>
                <textarea
                    className="av-input av-textarea"
                    placeholder="e.g. We already have someone covering that morning."
                    value={reason}
                    onChange={(e) => { setReason(e.target.value); setError(""); }}
                    autoFocus
                />
            </Field>
            <div className="av-popup-actions">
                <button type="button" className="av-btn av-btn-outline" onClick={onClose}>Cancel</button>
                <button type="button" className="av-btn av-btn-danger" onClick={handleSubmit}>Disapprove request</button>
            </div>
        </PopupShell>
    );
}

/**
 * Renders whichever availability popup is open.
 * @param {string} mode One of "add", "edit", "assign", "remove" or "disapprove".
 * @param {Object|null} slot The slot the popup acts on; null when adding.
 * @param {Array<Object>} slots All slots, used for overlap validation.
 * @param {Object} options Admin, service and customer lists for the form.
 * @param {Function} onClose Closes the popup without changes.
 * @param {Function} onSave Called with form data when Add/Edit is saved.
 * @param {Function} onAssign Called with the chosen customer and pet.
 * @param {Function} onRemove Called when removal is confirmed.
 * @param {Function} onDisapprove Called with the reason when disapproval is confirmed.
 * @returns {JSX.Element|null} The open popup, or nothing.
 */
export default function AvailabilityPopup({ mode, slot, slots, options, onClose, onSave, onAssign, onRemove, onDisapprove }) {
    // Close on Escape
    useEffect(() => {
        function handleKey(e) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    switch (mode) {
        case "add":
        case "edit":
            return <AvailabilityForm slot={mode === "edit" ? slot : null} slots={slots} options={options} onClose={onClose} onSave={onSave} />;
        case "assign":
            return <AssignCustomer slot={slot} options={options} onClose={onClose} onAssign={onAssign} />;
        case "remove":
            return <RemoveConfirm slot={slot} onClose={onClose} onRemove={onRemove} />;
        case "disapprove":
            return <DisapproveRequest slot={slot} onClose={onClose} onDisapprove={onDisapprove} />;
        default:
            return null;
    }
}

