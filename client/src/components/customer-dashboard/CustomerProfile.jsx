import "../../../src/styles/customer-dashboard/CustomerProfile.css";
import phoneIcon from "../../assets/icons/phone.svg"
import { useState } from "react";
function CustomerProfile({ avatar, name, month, year, visits, phone, email, address }) {
    const [editStatus, setEditStatus] = useState(false)
    const [deleteStatus, setDeleteStatus] = useState(false)
    return (
        <>
            {editStatus ? <>
                <div className="editCustomerOverlay">
                    <div className="editCustomerModal">

                        <div className="editCustomerHeader">
                            <div className="editCustomerIcon"><svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="8" r="3.5" />
                                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                            </svg></div>

                            <div>
                                <h2>Edit Customer</h2>
                                <p>Update Priya K.'s contact details and home notes.</p>
                            </div>

                            <button className="editCustomerClose" type="button" onClick={() => setEditStatus(false)}>
                                ×
                            </button>
                        </div>

                        <form className="editCustomerForm">

                            <div className="editCustomerFormRow">
                                <div className="editCustomerField">
                                    <label>First name</label>
                                    <input type="text" defaultValue="Priya" />
                                </div>

                                <div className="editCustomerField">
                                    <label>Last name</label>
                                    <input type="text" defaultValue="K." />
                                </div>
                            </div>

                            <div className="editCustomerFormRow">
                                <div className="editCustomerField">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        defaultValue="priya.k@email.com"
                                    />
                                </div>

                                <div className="editCustomerField">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        defaultValue="(510) 555-0142"
                                    />
                                </div>
                            </div>

                            <div className="editCustomerField">
                                <label>Address</label>
                                <input
                                    type="text"
                                    defaultValue="1450 Maple Ave, Apt 3B"
                                />
                            </div>

                            <div className="editCustomerField">
                                <label>
                                    Home access notes
                                    <span className="editCustomerOptional">
                                        Optional
                                    </span>
                                </label>

                                <textarea
                                    defaultValue="Side gate code 4821. Spare key in the lockbox by the back door (0917)."
                                />
                            </div>

                            <div className="editCustomerPets">
                                <label>Pets</label>

                                <span className="editCustomerPetTag">
                                    Mochi · Shiba Inu
                                </span>

                                <button
                                    className="editCustomerAddPet"
                                    type="button"
                                >
                                    + Add pet
                                </button>
                            </div>

                            <div className="editCustomerActions">
                                <button
                                    className="editCustomerCancel"
                                    type="button"
                                    onClick={() => setEditStatus(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="editCustomerSave"
                                    type="button"
                                >
                                    Save changes
                                </button>
                            </div>

                        </form>
                    </div>
                </div></> : <></>}
            {deleteStatus ? <>
                <div className="deleteCustomerOverlay">
                    <div className="deleteCustomerModal">

                        <div className="deleteCustomerHeader">
                            <div className="deleteCustomerIcon">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 6h18" />
                                    <path d="M9 6V3h6v3" />
                                    <path d="M6 6l1 15h10l1-15" />
                                    <path d="M10 10v7M14 10v7" />
                                </svg>
                            </div>

                            <div className="deleteCustomerText">
                                <h2>Delete Priya K.?</h2>
                                <p>
                                    This permanently removes their profile,
                                    pets, and visit history. Any upcoming
                                    appointments will be cancelled.
                                </p>
                            </div>

                            <button
                                className="deleteCustomerClose"
                                type="button"
                                onClick={() => setDeleteStatus(false)}
                            >
                                ×
                            </button>
                        </div>

                        <div className="deleteCustomerActions">
                            <button
                                className="deleteCustomerCancel"
                                type="button"
                                onClick={() => setDeleteStatus(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="deleteCustomerConfirm"
                                type="button"
                            >
                                Delete customer
                            </button>
                        </div>

                    </div>
                </div>
            </> : <></>}
            <div className="customerInformationContainer">
                <div className="customerInformationHeader">
                    <div className="customerIdentity">
                        <span className="customerAvatar">PK</span>

                        <div>
                            <h2 className="customerFullName">Priya K.</h2>
                            <p className="customerSince">
                                Customer since March 2026 · 6 visits
                            </p>
                        </div>
                    </div>

                    <div className="customerActions">
                        <span className="customerRole">OWNER</span>
                        <button className="customerEditButton" onClick={() => setEditStatus(true)}>
                            Edit
                        </button>
                        <button className="customerDeleteButton" onClick={() => setDeleteStatus(true)}>
                            Delete
                        </button>
                    </div>
                </div>

                <div className="customerContactInformation">
                    <div className="customerContactItem">
                        <span className="customerContactIcon"><svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2
        A19.79 19.79 0 0 1 3.09 5.18
        A2 2 0 0 1 5.08 3h3
        a2 2 0 0 1 2 1.72l.5 3
        a2 2 0 0 1-.57 2.11L8.73 11.1
        a16 16 0 0 0 4.17 4.17l1.27-1.28
        a2 2 0 0 1 2.11-.57l3 .5
        A2 2 0 0 1 22 16.92z"
                            />
                        </svg></span>
                        <div>
                            <p className="customerContactLabel">Phone</p>
                            <p className="customerContactValue">
                                (510) 555-0142
                            </p>
                        </div>
                    </div>

                    <div className="customerContactItem">
                        <span className="customerContactIcon">✉</span>
                        <div>
                            <p className="customerContactLabel">Email</p>
                            <p className="customerContactValue">
                                priya.k@email.com
                            </p>
                        </div>
                    </div>

                    <div className="customerContactItem">
                        <span className="customerContactIcon"><svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg></span>
                        <div>
                            <p className="customerContactLabel">Address</p>
                            <p className="customerContactValue">
                                1450 Maple Ave, Apt 3B
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerProfile;