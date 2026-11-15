// Renders the owner's Availability section inside /employee-dashboard (DT-320).
// Owners review admin availability requests and add, edit, assign or remove times.
// Only approved times appear on the booking page.
import { useCallback, useEffect, useState } from "react";
import PageHeader from "../../parent-component/PageHeader";
import OverviewHeader from "../../parent-component/OverviewHeader";
import OverviewCard from "../../parent-component/OverviewCard";
import AvailabilityFilter, { filterAvailability } from "./AvailabilityFilter";
import AvailabilityTable from "./AvailabilityTable";
import AvailabilityPopup from "./AvailabilityPopup";
import NewAppointmentButton from "../../action-button/NewAppointmentButton";
import {
    addAvailability,
    approveAvailability,
    assignCustomer,
    disapproveAvailability,
    getAvailability,
    getAvailabilityOptions,
    removeAvailability,
    updateAvailability,
} from "../../../services/availability-service";
import { DEFAULT_OWNER_AVAILABILITY_FILTERS } from "../../../constants/availability";
import "../../../styles/owner-dashboard/availability/Availability.css";

const DEFAULT_FILTERS = { search: "", admin: "all", service: "all" };

function hoursBetween(start, end) {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    return (eh * 60 + em - (sh * 60 + sm)) / 60;
}

/**
 * Renders the Availability section: header, summary cards, filters, table, popups and toast.
 * @returns {JSX.Element} The Availability section.
 */
export default function Availability() {
    const [options] = useState(getAvailabilityOptions);
    const [slots, setSlots] = useState([]);
    const [activeChip, setActiveChip] = useState("requests");
    const [filters, setFilters] = useState(DEFAULT_OWNER_AVAILABILITY_FILTERS);
    const [popup, setPopup] = useState(null); // { mode, slot }
    const [toast, setToast] = useState("");

    // Load availability once on render
    useEffect(() => {
        setSlots(getAvailability({ chip: "all" }));
    }, []);

    // Hide the toast after a few seconds
    useEffect(() => {
        if (!toast) return undefined;
        const timer = setTimeout(() => setToast(""), 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    const closePopup = useCallback(() => setPopup(null), []);

    function replaceSlot(updated) {
        setSlots((list) => list.map((s) => (s.id === updated.id ? { ...s, ...updated } : s)));
    }

    // Row actions
    const handlers = {
        onApprove(slot) {
            const result = approveAvailability(slot.id);
            if (!result.ok) return;
            replaceSlot({ id: slot.id, status: "approved", reason: undefined });
            setToast("Availability approved");
        },
        onDisapprove: (slot) => setPopup({ mode: "disapprove", slot }),
        onEdit: (slot) => setPopup({ mode: "edit", slot }),
        onRemove: (slot) => setPopup({ mode: "remove", slot }),
        onAssign: (slot) => setPopup({ mode: "assign", slot }),
    };

    // Popup results
    function handleSave(data) {
        if (popup.mode === "add") {
            setSlots((list) => [addAvailability(data), ...list]);
            setToast("Availability added · admin notified");
        } else {
            replaceSlot(updateAvailability(popup.slot.id, data));
            setToast("Availability updated · admin notified");
        }
        closePopup();
    }

    function handleAssign(customer, pet) {
     const result = assignCustomer(popup.slot.id, customer.id, pet.id);
        if (!result.ok) return;
        replaceSlot({ id: popup.slot.id, customer: { id: customer.id, name: customer.name, pet: { id: pet.id, name: pet.name } } });
        setToast("Customer assigned · admin notified");
        closePopup();
    }

    function handleRemove() {
        const result = removeAvailability(popup.slot.id);
        if (!result.ok) return;
        setSlots((list) => list.filter((s) => s.id !== popup.slot.id));
        setToast("Availability removed");
        closePopup();
    }

    function handleDisapprove(reason) {
        const result = disapproveAvailability(popup.slot.id, reason);
        if (!result.ok) return;
        replaceSlot({ id: popup.slot.id, status: "disapproved", reason });
        setToast("Availability disapproved");
        closePopup();
    }

    const visibleSlots = filterAvailability(slots, activeChip, filters);
    const approved = slots.filter((s) => s.status === "approved");
    const summary = [
        { label: "Requests to review", value: slots.filter((s) => s.status === "pending").length, note: "Sent by your admins" },
        { label: "Awaiting admin", value: slots.filter((s) => s.status === "awaiting_admin").length, note: "Your changes, not confirmed yet" },
        { label: "Approved hours", value: approved.reduce((sum, s) => sum + hoursBetween(s.start, s.end), 0), note: "Showing on the booking page" },
        { label: "Open for booking", value: approved.filter((s) => !s.customer).length, note: "Approved slots with no customer" },
    ];

    return (
        <section className="av-page">
            {/* DT-321 Header: reuses PageHeader (title, subtitle, bell, New Appointment) */}
            <PageHeader
                title="Availability"
                subtitle="Review the times your admins send. Only approved times appear on the booking page."
                actionButton={<NewAppointmentButton />}
            >
                <button type="button" className="av-btn av-btn-outline av-btn-header" onClick={() => setPopup({ mode: "add", slot: null })}>
                    + Add availability
                </button>
            </PageHeader>

            <OverviewHeader>
                {summary.map(({ label, note, value }) => (
                    <OverviewCard
                        key={label}
                        icon={""}
                        title={label}
                        subtitle={note}
                        number={value}
                    />
                ))}
            </OverviewHeader>

            <AvailabilityFilter
                slots={slots}
                activeChip={activeChip}
                onChipChange={setActiveChip}
                filters={filters}
                onFiltersChange={setFilters}
                admins={options.admins}
                services={options.services}
            />

            <AvailabilityTable slots={visibleSlots} handlers={handlers} />

            {popup && (
                <AvailabilityPopup
                    mode={popup.mode}
                    slot={popup.slot}
                    slots={slots}
                    options={options}
                    onClose={closePopup}
                    onSave={handleSave}
                    onAssign={handleAssign}
                    onRemove={handleRemove}
                    onDisapprove={handleDisapprove}
                />
            )}

            {/* TODO: reusable <Toast> component not available */}
            {toast && (
                <div className="av-toast" role="status">
                    <span className="av-toast-check" aria-hidden="true">✓</span>
                    {toast}
                </div>
            )}
        </section>
    );
}
