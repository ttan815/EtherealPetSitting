// dt28 terms of service and privacy policy consent
// the i agree checkbox for the create account page
// clicking either policy name opens a popup with that policy
//
// how the create account page can use it
// make a state value for agreed, then pass it in as checked
// pass the setter in as on change so the page knows when it is ticked
//
// error is optional, pass a message to show it under the checkbox

// bring in react state
import { useState } from 'react';
// bring in the popup
import PolicyModal from './PolicyModal';
// shared checkbox so it matches the other forms (and shows errors the same way)
import Checkbox from '../form/Checkbox';
// bring in the styles
import '../../styles/create-account/PolicyConsent.css';

// checked and on change come from the create account page
// error is an optional message shown under the checkbox
export default function PolicyConsent({ checked, onChange, error = '' }) {
  // backup checkbox state so it still works if the page does not pass one in
  const [localChecked, setLocalChecked] = useState(false);
  // use the page value if there is one, otherwise use the backup
  const isChecked = checked ?? localChecked;

  // which popup is open, either terms, privacy, or null for none
  const [openPolicy, setOpenPolicy] = useState(null);

  // runs when the checkbox is clicked
  function handleCheckboxChange(event) {
    // update the backup state
    setLocalChecked(event.target.checked);
    // tell the create account page if it is listening
    if (onChange) onChange(event.target.checked);
  }

  // what the checkbox looks like on the page
  return (
    <div className="policy-consent">
      {/* the checkbox with its text, the error shows under it when there is one */}
      <Checkbox
        id="policy-consent-checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        error={error}
        label={
          <span>
            I agree to the{' '}
            {/* opens the terms of service popup */}
            <button
              type="button"
              className="policy-consent__link"
              onClick={() => setOpenPolicy('terms')}
            >
              Terms of Service
            </button>{' '}
            and{' '}
            {/* opens the privacy policy popup */}
            <button
              type="button"
              className="policy-consent__link"
              onClick={() => setOpenPolicy('privacy')}
            >
              Privacy Policy
            </button>
          </span>
        }
      />

      {/* the popup, it only shows when a policy is picked */}
      <PolicyModal policy={openPolicy} onClose={() => setOpenPolicy(null)} />
    </div>
  ); // end of the checkbox area
} // end of policyconsent
