// audit log page, swapped in by the owner dashboard (no route of its own)
import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import AuditLogHeader from "./AuditLogHeader";
import AuditLogFilters, { DEFAULT_FILTERS, getAuditLog } from "./AuditLogFilters";
import ActivityTable from "./ActivityTable";
import useExportButton from "./ExportButton";
import "../../../styles/owner-dashboard/audit-log/AuditLog.css";

const PAGE_SIZE = 8;

/**
 * Renders the audit log page with filters, the grouped activity table, load more, and an empty state.
 * @returns {JSX.Element} The audit log page.
 */
export default function AuditLog() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const entries = useMemo(() => getAuditLog(filters), [filters]);
    const visible = entries.slice(0, visibleCount);
    const { exporting, handleExport } = useExportButton(filters, entries);

    // go back to the first page whenever the filters change
    function handleFilterChange(next) {
        setFilters(next);
        setVisibleCount(PAGE_SIZE);
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
                        <button type="button" className="al-outline-button" onClick={() => handleFilterChange(DEFAULT_FILTERS)}>
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <>
                        <ActivityTable entries={visible} />
                        <div className="al-footer">
                            <span className="al-count">Showing {visible.length} of {entries.length}</span>
                            {visible.length < entries.length && (
                                <button
                                    type="button"
                                    className="al-outline-button"
                                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
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
