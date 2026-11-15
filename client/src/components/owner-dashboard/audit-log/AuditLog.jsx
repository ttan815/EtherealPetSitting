// audit log page, swapped in by the owner dashboard (no route of its own)
import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import AuditLogHeader from "./AuditLogHeader";
import AuditLogFilters from "./AuditLogFilters";
import ActivityTable from "./ActivityTable";
import useExportButton from "../../action-button/ExportButton";
import { AUDIT_LOG_PAGE_SIZE, DEFAULT_AUDIT_LOG_FILTERS } from "../../../constants/audit-log";
import { getAuditLog, getAuditLogDetails, getAuditLogPeople } from "../../../services/audit-log-service";
import "../../../styles/owner-dashboard/audit-log/AuditLog.css";

/**
 * Renders the audit log page with filters, the grouped activity table, load more, and an empty state.
 * @returns {JSX.Element} The audit log page.
 */
export default function AuditLog() {
    const [filters, setFilters] = useState(DEFAULT_AUDIT_LOG_FILTERS);
    const [visibleCount, setVisibleCount] = useState(AUDIT_LOG_PAGE_SIZE);
    const [people] = useState(getAuditLogPeople);
    const [openEntryId, setOpenEntryId] = useState(null);
    const [details, setDetails] = useState(null);

    const entries = useMemo(() => getAuditLog(filters), [filters]);
    const visible = entries.slice(0, visibleCount);
    const { exporting, handleExport } = useExportButton(filters, entries);

    // go back to the first page whenever the filters change
    function handleFilterChange(next) {
        setFilters(next);
        setVisibleCount(AUDIT_LOG_PAGE_SIZE);
        setOpenEntryId(null);
        setDetails(null);
    }

    function handleToggleEntry(id) {
        if (openEntryId === id) {
            setOpenEntryId(null);
            setDetails(null);
            return;
        }
        setDetails(getAuditLogDetails(id));
        setOpenEntryId(id);
    }

    return (
        <section className="al-page">
            <AuditLogHeader onExport={handleExport} exporting={exporting || entries.length === 0} />
            <AuditLogFilters filters={filters} onChange={handleFilterChange} />

            <div className="al-card">
                {entries.length === 0 ? (
                    <div className="al-empty">
                        <span className="al-empty-icon" aria-hidden="true">
                            <FileText size={22} strokeWidth={1.75} />
                        </span>
                        <p className="al-empty-title">No activity found</p>
                        <p className="al-empty-text">Try a different search or a longer date range.</p>
                        <button type="button" className="al-outline-button" onClick={() => handleFilterChange(DEFAULT_AUDIT_LOG_FILTERS)}>
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <>
                        <ActivityTable
                            entries={visible}
                            people={people}
                            openId={openEntryId}
                            details={details}
                            onToggleRow={handleToggleEntry}
                        />
                        <div className="al-footer">
                            <span className="al-count">Showing {visible.length} of {entries.length}</span>
                            {visible.length < entries.length && (
                                <button
                                    type="button"
                                    className="al-outline-button"
                                    onClick={() => setVisibleCount((count) => count + AUDIT_LOG_PAGE_SIZE)}
                                >
                                    Load more
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
