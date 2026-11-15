// export logic for the audit log header button, saves the filtered log as a csv file
import { useState } from "react";

/**
 * Asks the server for an export of the audit log.
 * @param {Object} filters The { search, person, area, range } filters in use.
 * @returns {boolean} True when the export is ready.
 */
export function exportAuditLog(filters) {
    // TODO: replace with backend call
    const temp = Boolean(filters);
    return temp;
}

/**
 * Builds csv text from log entries.
 * @param {Array} entries The log entries to save.
 * @returns {string} The csv text with a header row.
 */
export function buildCsv(entries) {
    const quote = (value) => `"${String(value).replace(/"/g, '""')}"`;
    const rows = entries.map((entry) => [
        new Date(entry.time).toLocaleString("en-US"),
        entry.parts.map((p) => p.text).join(""),
        entry.area,
    ].map(quote).join(","));
    return ["Date,Activity,Area", ...rows].join("\n");
}

/**
 * Handles the export button: calls the temp export method and downloads a csv.
 * @param {Object} filters The filters in use.
 * @param {Array} entries The entries currently matching the filters.
 * @returns {Object} The { exporting, handleExport } values for the button.
 */
export default function useExportButton(filters, entries) {
    const [exporting, setExporting] = useState(false);

    function handleExport() {
        if (entries.length === 0) return;
        setExporting(true);
        if (exportAuditLog(filters)) {
            const blob = new Blob([buildCsv(entries)], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "audit-log.csv";
            link.click();
            URL.revokeObjectURL(url);
        }
        setExporting(false);
    }

    return { exporting, handleExport };
}
