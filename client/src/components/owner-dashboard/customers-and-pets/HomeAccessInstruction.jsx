import "../../../styles/owner-dashboard/mannage-customer-and-pet/HomeAccessInstruction.css";

/**
 * Shows the selected customer's home note and extra-task checklist.
 * @param {{customer: Object, onToggleTask: Function}} props Customer and checklist update handler.
 * @returns {JSX.Element} The home access details panel.
 */
function HomeAccessInstruction({ customer, onToggleTask }) {
    return (
        <div className="homeAccessContainer">
            <div className="homeAccessHeader">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="7.5" cy="15.5" r="4.5" />
                    <path d="M10.7 12.3 21 2" />
                    <path d="m17 6 3 3" />
                    <path d="m14 9 2 2" />
                </svg>

                <h3>Home access <span><svg
                    width="20"
                    height="20"
                    viewBox="0 0 90 88"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="31" cy="35" r="4" fill="#2F1F04" />
                    <circle cx="44" cy="37" r="2.8" fill="#2F1F04" />

                    <path
                        d="
            M64 31
            C70 31 72 37 68 40
            C64 44 56 44 49 45
            C39 46 32 49 28 55
            C24 61 25 69 31 73
            C39 79 53 78 59 69
            C63 63 62 55 56 51
            C51 48 43 48 37 51
            C32 54 30 60 33 65
            C36 70 43 72 49 70
            C54 69 57 65 57 61
            C57 58 56 55 53 53
            C50 50 46 49 43 47
            C39 45 37 41 38 37
            C39 32 43 29 48 29
            C53 29 57 31 60 34
        "
                        stroke="#2F1F04"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg></span> instructions</h3>
            </div>

            <div className="homeAccessCustomerNote">
                <p className="homeAccessNoteLabel">
                    From the customer
                </p>

                <p className="homeAccessNote">
                    {customer.homeAccessNote || "No home access instructions provided."}
                </p>
            </div>

            <div className="homeAccessTasks">
                <h4>Extra tasks</h4>
                {customer.tasks.map((task) => (
                    <label className="homeAccessTask" key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.checked}
                            onChange={(event) => onToggleTask(customer.id, task.id, event.target.checked)}
                        />
                        <span>{task.label}</span>
                    </label>
                ))}
                {customer.tasks.length === 0 && <p>No extra tasks for this customer.</p>}
            </div>
        </div>
    );
}

/**
 * Exports the HomeAccessInstruction component.
 * @returns {Function} The home access instructions component.
 */
export default HomeAccessInstruction;
