// dt28 popup that shows the terms of service or the privacy policy
// closes with the close button, the x, the escape key, or a click outside the box

// bring in react tools for side effects and element references
import { useEffect, useRef } from 'react';
// bring in the policy text
import { POLICIES } from './policyContent';
// bring in the styles shared with the checkbox
import '../styles/PolicyConsent.css';

// policy is either terms, privacy, or null when nothing is open
// on close is the function that closes the popup
export default function PolicyModal({ policy, onClose }) {
  // reference to the close button so we can move keyboard focus to it
  const closeButtonRef = useRef(null);
  // look up the text for the policy that is open
  const content = POLICIES[policy];

  // runs when the popup opens or closes
  useEffect(() => {
    // do nothing if no popup is open
    if (!content) return undefined;

    // close the popup when the escape key is pressed
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    // start listening for key presses
    document.addEventListener('keydown', handleKeyDown);

    // remember the old scroll setting
    const previousOverflow = document.body.style.overflow;
    // stop the page behind the popup from scrolling
    document.body.style.overflow = 'hidden';

    // move keyboard focus into the popup
    closeButtonRef.current?.focus();

    // clean up when the popup closes
    return () => {
      // stop listening for key presses
      document.removeEventListener('keydown', handleKeyDown);
      // let the page scroll again
      document.body.style.overflow = previousOverflow;
    };
  }, [content, onClose]); // rerun only when these change

  // show nothing if no popup is open
  if (!content) return null;

  // what the popup looks like on the page
  return (
    // dark see through background, clicking it closes the popup
    <div className="policy-modal__backdrop" onClick={onClose}>
      {/* the white popup box */}
      <div
        className="policy-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-modal-title"
        onClick={(event) => event.stopPropagation()} // clicks inside the box do not close it
      >
        {/* top bar with the title and the x button */}
        <div className="policy-modal__header">
          {/* popup title */}
          <h2 id="policy-modal-title" className="policy-modal__title">
            {content.title}
          </h2>
          {/* x button in the corner */}
          <button
            type="button"
            className="policy-modal__x"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* scrollable area with the policy text */}
        <div className="policy-modal__body">
          {/* make one block for every section of the policy */}
          {content.sections.map((section) => (
            <div key={section.heading} className="policy-modal__section">
              {/* section heading */}
              <h3>{section.heading}</h3>
              {/* section text, only shows if there is any */}
              {section.body && <p>{section.body}</p>}
              {/* bullet list, only shows if the section has items */}
              {section.items && (
                <ul>
                  {/* make one bullet for every item */}
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* bottom bar with the close button */}
        <div className="policy-modal__footer">
          <button
            type="button"
            ref={closeButtonRef}
            className="policy-modal__close"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ); // end of the popup
} // end of policymodal
