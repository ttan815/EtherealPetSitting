import "../../../src/styles/customer-dashboard/CustomerList.css";
import { useState } from "react";

function CustomerList({ getCustomer, getCustomerById }) {
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    return (
        <div className="customerListContainer">
            <input
                className="customerSearch"
                placeholder="Search customers or pets"
            />

            <div
                className={`customerContainer ${selectedCustomer === 1 ? "selected" : ""}`}
                onClick={() => setSelectedCustomer(1)}
            >
                <span className="profilePic">TT</span>
                <div>
                    <p className="customerName">Tony T.</p>
                    <p className="customerPetNameType">Oreo (Tuxedo Cat)</p>
                </div>
            </div>

            <div
                className={`customerContainer ${selectedCustomer === 2 ? "selected" : ""}`}
                onClick={() => setSelectedCustomer(2)}
            >
                <span className="profilePic">WE</span>
                <div>
                    <p className="customerName">Wilson E.</p>
                    <p className="customerPetNameType">Void (Black Cat)</p>
                </div>
            </div>

            <div
                className={`customerContainer ${selectedCustomer === 3 ? "selected" : ""}`}
                onClick={() => setSelectedCustomer(3)}
            >
                <span className="profilePic">BT</span>
                <div>
                    <p className="customerName">Bob T.</p>
                    <p className="customerPetNameType">Orange (Orange Cat)</p>
                </div>
            </div>

            <div
                className={`customerContainer ${selectedCustomer === 4 ? "selected" : ""}`}
                onClick={() => setSelectedCustomer(4)}
            >
                <span className="profilePic">CT</span>
                <div>
                    <p className="customerName">Cathleen T.</p>
                    <p className="customerPetNameType">Bean (Tuxedo Cat)</p>
                </div>
            </div>
        </div>
    );
}

export default CustomerList;