// header for the audit log page, reuses the shared page header with an export button
import { Download } from "lucide-react";
import PageHeader from "../../parent-component/PageHeader";
import "../../../styles/owner-dashboard/audit-log/AuditLog.css";

/**
 * Renders the audit log title, owner badge, subtitle, bell, and export button.
 * @param {Function} onExport Called when the export button is clicked.
 * @param {boolean} exporting True while an export is running, disables the button.
 * @returns {JSX.Element} The audit log header.
 */
export default function AuditLogHeader({ onExport, exporting }) {
    return (
        <div className="al-header">
            <PageHeader
                title={
                    <>
                        Audit Log <span className="al-owner-badge">Owner</span>
                    </>
                }
                subtitle="A record of every change, so you always know who did what."
                actionLabel={
                    <>
                        <Download size={16} strokeWidth={1.75} aria-hidden="true" />
                        {exporting ? "Exporting…" : "Export"}
                    </>
                }
                onAction={onExport}
                actionDisabled={exporting}
            />
        </div>
    );
}
