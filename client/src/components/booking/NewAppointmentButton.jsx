import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../src/styles/booking/CreateAppointmentEmployee.css";
import { useState, useEffect } from "react";

function NewAppointmentButton({ isOwner = true, startTimes, endTimes, services, getListOfAdmin, getListOfCustomer, getListOfPets }) {
    const [newEmployeeAppointment, setNewEmployeeAppointment] = useState(false)
    const [service, setService] = useState("")
    const [note, setNote] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [customer, setCustomer] = useState("");
    const [pet, setPet] = useState("");
    const [date, setDate] = useState(new Date());
    const [whoFor, setWhoFor] = useState("");
    function toggleAppointment() {
        setNewEmployeeAppointment(!newEmployeeAppointment)
    }
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setNewEmployeeAppointment(false);
            }
        };

        if (newEmployeeAppointment) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [newEmployeeAppointment]);
    return (<>
        {newEmployeeAppointment ?
            isOwner ? (<div className="blurBackground">
                <div className="requestAvailabilityContainer">
                    <h5 className="requestAvailTitle">Request availability</h5>
                    <h5 className="instructionsTime">Update this slot for the admin. Saved changes go back to them for approval.</h5>
                    <div className="form-field">
                        <label htmlFor="whoFor">Who is this for?</label>

                        <select
                            id="whoFor"
                            name="whoFor"
                            className="select-element labels"
                            value={whoFor}
                            onChange={(event) => setWhoFor(event.target.value)}
                        >
                            <option value="Sylas">Sylas</option>
                            <option value="Amy">Amy</option>
                            <option value="Rapunzel">Rapunzel</option>
                        </select>
                    </div>
                    <div className="form-field date-container">
                        <label htmlFor="appointment-date">Date</label>

                        <DatePicker
                            id="appointment-date"
                            selected={date}
                            onChange={(date) => setDate(date)}
                            dateFormat="EEE, MMM d, yyyy"
                            placeholderText="Select a date"
                            className="select-element"
                            calendarClassName="appointment-calendar"
                            popperPlacement="bottom-start"
                            minDate={new Date()}
                            showPopperArrow={false}
                        />
                    </div>
                    <div className="appointment-actions-approval">
                        <button type="button" className="cancel-button">
                            Require Approval
                        </button>
                        <button type="button" className="send-request-button">
                            Skip Approval
                        </button>
                    </div>
                    <div className="form-field-container">
                        <div className="form-field">
                            <label htmlFor="start-time">Start time</label>

                            <select
                                id="start-time"
                                name="start-time"
                                className="select-element labels"
                                value={startTime}
                                onChange={(event) => setStartTime(event.target.value)}
                            >
                                <option value="">Start Time</option>
                                <option value="09:00">9:00 AM</option>
                                <option value="14:00">2:00 PM</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="end-time">End time</label>

                            <select
                                id="end-time"
                                name="end-time"
                                className="select-element labels"
                                value={endTime}
                                onChange={(event) => setEndTime(event.target.value)}
                            >
                                <option value="">End time</option>
                                <option value="09:00">9:00 AM</option>
                                <option value="14:00">2:00 PM</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <p className="labels">Type of service</p>
                        <div className="serviceContainer">
                            {service == "Dog walking" ? <button onClick={() => setService("Dog walking")} className="service-button-selected">Dog walking</button> : <button onClick={() => setService("Dog walking")} className="service-button">Dog walking</button>}
                            {service == "Drop-in visits" ? <button onClick={() => setService("Drop-in visits")} className="service-button-selected">Drop-in visits</button> : <button onClick={() => setService("Drop-in visits")} className="service-button">Drop-in visits</button>}
                        </div>
                    </div>

                    <div className="form-field-container">
                        <div className="form-field">
                            <label className="labels" htmlFor="customer">Customer (optional)</label>

                            <select
                                id="customer"
                                name="customer"
                                className="select-element"
                                value={customer}
                                onChange={(event) => {
                                    setCustomer(event.target.value);
                                    setPet("");
                                }}
                            >
                                <option value="">None - open booking</option>
                                <option value="1">Bob</option>
                                <option value="2">Amy</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <label className="labels" htmlFor="pet">Pet</label>

                            <select
                                id="pet"
                                name="pet"
                                className="select-element pet-select-element"
                                value={pet}
                                onChange={(event) => setPet(event.target.value)}
                                disabled={!customer}
                            >
                                <option value="">Select a customer first</option>
                                <option value="1">Oreo</option>
                                <option value="2">Beans</option>
                            </select>
                        </div>
                    </div>
                    <p className="leaveAsNote">Leave as None and customers pick this slot themselves when booking. Select a customer to reserve it for them.</p>
                    <div className="note-field">
                        <label className="labels" htmlFor="appointment-note">Note (optional)</label>

                        <textarea
                            id="appointment-note"
                            value={note}
                            onChange={(event) => setNote(event.target.value)}
                            placeholder="Add anything the owner should know..."
                        />
                    </div>
                    <div className="appointment-actions">
                        <button type="button" className="cancel-button">
                            Cancel
                        </button>
                        <button type="button" className="send-request-button">
                            Send request
                        </button>
                    </div>
                </div>
            </div>) : (<>

                <div className="blurBackground">
                    <div className="requestAvailabilityContainer">
                        <h5 className="requestAvailTitle">Request availability</h5>
                        <h5 className="instructionsTime">Offer a time slot. The owner reviews it before it appears on the booking page.</h5>
                        <div className="form-field">
                            <label htmlFor="appointment-date">Date</label>

                            <DatePicker
                                id="appointment-date"
                                selected={date}
                                onChange={(date) => setDate(date)}
                                dateFormat="EEE, MMM d, yyyy"
                                placeholderText="Select a date"
                                className="select-element"
                                calendarClassName="appointment-calendar"
                                popperPlacement="bottom-start"
                                minDate={new Date()}
                                showPopperArrow={false}
                            />
                        </div>
                        <div className="form-field-container">
                            <div className="form-field">
                                <label htmlFor="start-time">Start time</label>

                                <select
                                    id="start-time"
                                    name="start-time"
                                    className="select-element labels"
                                    value={startTime}
                                    onChange={(event) => setStartTime(event.target.value)}
                                >
                                    <option value="">Start Time</option>
                                    <option value="09:00">9:00 AM</option>
                                    <option value="14:00">2:00 PM</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label htmlFor="end-time">End time</label>

                                <select
                                    id="end-time"
                                    name="end-time"
                                    className="select-element labels"
                                    value={endTime}
                                    onChange={(event) => setEndTime(event.target.value)}
                                >
                                    <option value="">End time</option>
                                    <option value="09:00">9:00 AM</option>
                                    <option value="14:00">2:00 PM</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <p className="labels">Type of service</p>
                            <div className="serviceContainer">
                                {service == "Dog walking" ? <button onClick={() => setService("Dog walking")} className="service-button-selected">Dog walking</button> : <button onClick={() => setService("Dog walking")} className="service-button">Dog walking</button>}
                                {service == "Drop-in visits" ? <button onClick={() => setService("Drop-in visits")} className="service-button-selected">Drop-in visits</button> : <button onClick={() => setService("Drop-in visits")} className="service-button">Drop-in visits</button>}
                            </div>
                        </div>

                        <div className="form-field-container">
                            <div className="form-field">
                                <label className="labels" htmlFor="customer">Customer (optional)</label>

                                <select
                                    id="customer"
                                    name="customer"
                                    className="select-element"
                                    value={customer}
                                    onChange={(event) => {
                                        setCustomer(event.target.value);
                                        setPet("");
                                    }}
                                >
                                    <option value="">None - open booking</option>
                                    <option value="1">Bob</option>
                                    <option value="2">Amy</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label className="labels" htmlFor="pet">Pet</label>

                                <select
                                    id="pet"
                                    name="pet"
                                    className="select-element pet-select-element"
                                    value={pet}
                                    onChange={(event) => setPet(event.target.value)}
                                    disabled={!customer}
                                >
                                    <option value="">Select a customer first</option>
                                    <option value="1">Oreo</option>
                                    <option value="2">Beans</option>
                                </select>
                            </div>
                        </div>
                        <p className="leaveAsNote">Leave as None and customers pick this slot themselves when booking. Select a customer to reserve it for them.</p>
                        <div className="note-field">
                            <label className="labels" htmlFor="appointment-note">Note (optional)</label>

                            <textarea
                                id="appointment-note"
                                value={note}
                                onChange={(event) => setNote(event.target.value)}
                                placeholder="Add anything the owner should know..."
                            />
                        </div>
                        <div className="appointment-actions">
                            <button type="button" className="cancel-button">
                                Cancel
                            </button>
                            <button type="button" className="send-request-button">
                                Send request
                            </button>
                        </div>
                    </div>
                </div></>)
            :
            <>
                <button type="button" className="new-appointment-button" onClick={toggleAppointment}>
                    <span aria-hidden="true">+</span>
                    New Appointment
                </button>
            </>}
    </>)
}

export default NewAppointmentButton