// manage admins page, swapped in by the owner dashboard (no route of its own)
import { useEffect, useState } from "react";
import ManageAdminHeader from "./ManageAdminHeader";
import EmployeeList from "./EmployeeList";
import RolesPermissionInfo from "./RolesPermissionInfo";
import AutoAssign from "./AutoAssign";
import { AdminFormPopup, RemoveAdminPopup } from "./AdminPopups";
import {
    cancelInvite,
    getAdmins,
    getBackupSettings,
    inviteAdmin,
    removeAdmin,
    resendInvite,
    saveBackupSettings,
    updateAdmin,
} from "../../../services/owner-dashboard/admin-service";
import "../../../styles/owner-dashboard/manage-admins/ManageAdmins.css";

/**
 * Renders the manage admins page with the team list, roles info, backup card, and popups.
 * @returns {JSX.Element} The manage admins page.
 */
export default function ManageAdmins() {
    const [members, setMembers] = useState(getAdmins);
    const [backup, setBackup] = useState(getBackupSettings);
    const [formPopup, setFormPopup] = useState({ open: false, mode: "invite", member: null });
    const [removing, setRemoving] = useState(null);
    const [toast, setToast] = useState("");

    // hide the toast after a few seconds
    useEffect(() => {
        if (!toast) return undefined;
        const timer = setTimeout(() => setToast(""), 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    const activeAdmins = members.filter((m) => m.role === "admin" && m.status === "active");

    function closeFormPopup() {
        setFormPopup({ open: false, mode: "invite", member: null });
    }

    function handleFormSubmit(details) {
        if (formPopup.mode === "edit") {
            const id = formPopup.member.id;
            if (updateAdmin(id, details)) {
                setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, name: details.name, phone: details.phone } : m)));
                setToast("Changes saved");
            }
        } else {
            const created = inviteAdmin(details);
            setMembers((prev) => [...prev, created]);
            setToast(`Invite sent to ${details.email}`);
        }
        closeFormPopup();
    }

    function handleConfirmRemove() {
        const id = removing.id;
        if (removeAdmin(id)) {
            setMembers((prev) => prev.filter((m) => m.id !== id));
            // if the removed admin was the backup, clear it so nothing points at them
            if (backup.backupId === id) {
                const next = { enabled: false, backupId: "" };
                saveBackupSettings(next);
                setBackup(next);
            }
            setToast("Admin removed");
        }
        setRemoving(null);
    }

    function handleResend(member) {
        if (resendInvite(member.id)) setToast(`Invite sent to ${member.email}`);
    }

    function handleCancelInvite(member) {
        if (cancelInvite(member.id)) {
            setMembers((prev) => prev.filter((m) => m.id !== member.id));
            setToast("Invite cancelled");
        }
    }

    function handleBackupChange(next) {
        if (saveBackupSettings(next)) setBackup(next);
    }

    return (
        <section className="ma-page">
            <ManageAdminHeader onInvite={() => setFormPopup({ open: true, mode: "invite", member: null })} />

            <EmployeeList
                members={members}
                onEdit={(member) => setFormPopup({ open: true, mode: "edit", member })}
                onRemove={setRemoving}
                onResend={handleResend}
                onCancelInvite={handleCancelInvite}
            />

            <div className="ma-bottom-grid">
                <RolesPermissionInfo />
                <AutoAssign
                    admins={activeAdmins}
                    enabled={backup.enabled}
                    backupId={backup.backupId || activeAdmins[0]?.id || ""}
                    onChange={handleBackupChange}
                />
            </div>

            <AdminFormPopup
                open={formPopup.open}
                mode={formPopup.mode}
                member={formPopup.member}
                onClose={closeFormPopup}
                onSubmit={handleFormSubmit}
            />

            <RemoveAdminPopup
                open={Boolean(removing)}
                member={removing}
                onClose={() => setRemoving(null)}
                onConfirm={handleConfirmRemove}
            />

            {/* TODO: reusable toast component not available */}
            {toast && (
                <div className="ma-toast" role="status">{toast}</div>
            )}
        </section>
    );
}
