// Renders the download receipt popup component.
import "../../styles/popup/DownloadReceiptPopup.css"
import { useState } from "react"
import DownloadIcon from "../../assets/icons/download.svg"
import Cross from "../../assets/icons/x.svg"

/**
 * Renders the receipt-download dialog.
 * @returns {JSX.Element} The receipt-download dialog.
 */
function DownloadReceiptPopup() {
  return (
    <div className="toast-receipt-downloaded">
      <div className="icon">
        <img className="icon-download" src={DownloadIcon} alt="Download" />
      </div>
      <div className="receipt-downloaded">Receipt downloaded</div>
      <img className="icon-x" src={Cross} alt="Close" />
    </div>
  );
}

export default DownloadReceiptPopup;
