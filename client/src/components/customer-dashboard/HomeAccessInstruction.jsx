import "../../../src/styles/customer-dashboard/HomeAccessInstruction.css";

function HomeAccessInstruction({ toggleExtraTask }) {
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
                    Side gate code is 4821. Spare key is in the lockbox
                    by the back door (code 0917). Please lock the
                    deadbolt when you leave.
                </p>
            </div>

            <div className="homeAccessTasks">
                <h4>Extra tasks</h4>

                <label className="homeAccessTask">
                    <input type="checkbox" />
                    <span>Bring in the mail</span>
                </label>

                <label className="homeAccessTask">
                    <input type="checkbox" />
                    <span>Water the plants on the patio</span>
                </label>

                <label className="homeAccessTask">
                    <input type="checkbox" />
                    <span>Turn on the porch light after 6 PM</span>
                </label>
            </div>
        </div>
    );
}

export default HomeAccessInstruction;
