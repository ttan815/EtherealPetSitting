// Renders the download receipt button component.
import { useEffect, useRef, useState } from "react";
import "../../styles/customer-dashboard/view-appointment/DownloadReceiptButton.css";
import DownloadReceiptPopup from "../popup/DownloadReceiptPopup";

/**
 * Renders the action for downloading an appointment receipt and its dialog.
 * @returns {JSX.Element} The receipt-download button and conditional dialog.
 */
function DownloadReceiptButton() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="button-download-receipt"
        onClick={() => setIsOpen(true)}
      >
        Download Receipt
      </button>

      {isOpen && (
        <div
          className="receipt-popup__backdrop"
          onClick={() => setIsOpen(false)}
        >
          <div className="receipt-popup">
            <DownloadReceiptPopup />
          </div>
        </div>
      )}
    </>
  );
}

export default DownloadReceiptButton;
