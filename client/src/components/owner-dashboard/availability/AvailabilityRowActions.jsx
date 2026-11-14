// Renders the per-row buttons and "⋯" menu for the owner's Availability table (DT-324).
import { useEffect, useRef, useState } from "react";

/**
 * Temporary method that approves an admin's availability request.
 * @param {number} id The availability slot id.
 * @returns {Object} The backend result.
 */
export function approveAvailability(id) {
    const temp = { ok: true, id, status: "approved" }; // Result from fetch(`/api/availability/${id}/approve`)
    return temp;
}

/**
 * Temporary method that disapproves an admin's availability request.
 * @param {number} id The availability slot id.
 * @param {string} reason Why the owner disapproved it; sent to the admin.
 * @returns {Object} The backend result.
 */
export function disapproveAvailability(id, reason) {
    const temp = { ok: true, id, status: "disapproved", reason }; // Result from fetch(`/api/availability/${id}/disapprove`)
    return temp;
}

/**
 * Temporary method that saves the owner's edits to an availability slot.
 * @param {number} id The availability slot id.
 * @param {Object} data The updated admin, service, date, times, price and customer.
 * @returns {Object} The updated slot.
 */
export function updateAvailability(id, data) {
    const temp = { ...data, id, status: "awaiting_admin", reason: undefined }; // Result from fetch(`/api/availability/${id}`, { method: "PUT" })
    return temp;
}

/**
 * Temporary method that deletes an availability slot.
 * @param {number} id The availability slot id.
 * @returns {Object} The backend result.
 */
export function removeAvailability(id) {
    const temp = { ok: true, id }; // Result from fetch(`/api/availability/${id}`, { method: "DELETE" })
    return temp;
}

/**
 * Renders the action buttons for one availability row.
 * Pending rows get Approve/Disapprove; every other status gets Edit/Remove. All rows get the "⋯" menu.
 * @param {Object} slot The availability slot for this row.
 * @param {Function} onApprove Called with the slot when Approve is clicked.
 * @param {Function} onDisapprove Called with the slot to open the Disapprove Request popup.
 * @param {Function} onEdit Called with the slot to open Edit Availability.
 * @param {Function} onRemove Called with the slot to open the Remove Availability confirmation.
 * @param {Function} onAssign Called with the slot to open Assign Customer.
 * @returns {JSX.Element} The row actions.
 */
export default function AvailabilityRowActions({ slot, onApprove, onDisapprove, onEdit, onRemove, onAssign }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close the "⋯" menu when clicking anywhere else
    useEffect(() => {
        if (!menuOpen) return undefined;
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    function pick(action) {
        setMenuOpen(false);
        action(slot);
    }

    const isPending = slot.status === "pending";

    return (
        <div className="av-row-actions">
            {isPending ? (
                <>
                    <button type="button" className="av-btn av-btn-primary av-btn-sm" onClick={() => onApprove(slot)}>Approve</button>
                    <button type="button" className="av-btn av-btn-outline av-btn-sm" onClick={() => onDisapprove(slot)}>Disapprove</button>
                </>
            ) : (
                <>
                    <button type="button" className="av-btn av-btn-outline av-btn-sm" onClick={() => onEdit(slot)}>Edit</button>
                    <button type="button" className="av-btn av-btn-outline av-btn-sm" onClick={() => onRemove(slot)}>Remove</button>
                </>
            )}

            <div className="av-menu" ref={menuRef}>
                <button
                    type="button"
                    className="av-menu-trigger"
                    aria-label="More actions"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    ⋯
                </button>
                {menuOpen && (
                    <div className="av-menu-list" role="menu">
                        <button type="button" role="menuitem" onClick={() => pick(onEdit)}>Edit</button>
                        <button type="button" role="menuitem" onClick={() => pick(onAssign)}>Assign customer</button>
                    </div>
                )}
            </div>
        </div>
    );
}
