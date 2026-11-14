import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/booking/CreateAppointmentEmployee.css";

function getOptionId(option) {
    return typeof option === "object" && option !== null ? option.id : option;
}

function getOptionLabel(option) {
    if (typeof option !== "object" || option === null) {
        return String(option);
    }

    return option.label || option.name || String(option.id);
}

function getOption(options, selectedValue) {
    return options.find(
        (option) => String(getOptionId(option)) === selectedValue
    );
}

function getOptionValue(options, selectedValue) {
    const selectedOption = getOption(options, selectedValue);
    return selectedOption ? getOptionId(selectedOption) : null;
}

/**
 * Renders the accessible, props-driven appointment form in a centered dialog.
 * @param {Object} props Popup copy, lookup functions, options, and submit callback.
 * @param {boolean} [props.isOwner=true] Whether to show owner-only admin and approval fields.
 * @param {string|number} props.adminId The current admin ID used to load related options.
 * @param {{id: string|number, label?: string, name?: string}} props.ownerOption The owner option included in the admin list.
 * @param {Array<string|number|Object>} [props.startTimes=[]] Available start-time options; an input is shown when empty.
 * @param {Array<string|number|Object>} [props.endTimes=[]] Available end-time options; an input is shown when empty.
 * @param {Array<string|number|Object>} props.services Available service options.
 * @param {Object} props.copy All visible text used by the popup.
 * @param {string} props.copy.dialogTitle Dialog heading.
 * @param {string} props.copy.ownerDescription Instructions shown to an owner.
 * @param {string} props.copy.adminDescription Instructions shown to an admin.
 * @param {string} props.copy.closeButtonLabel Accessible close-button text.
 * @param {string} props.copy.adminLabel Admin field label.
 * @param {string} props.copy.adminPlaceholder Admin field placeholder.
 * @param {string} props.copy.approvalLegend Approval fieldset legend.
 * @param {string} props.copy.requireApproval Require Approval option text.
 * @param {string} props.copy.skipApproval Skip Approval option text.
 * @param {string} props.copy.dateLabel Date field label.
 * @param {string} props.copy.datePlaceholder Date field placeholder.
 * @param {string} props.copy.dateFormat Date display format.
 * @param {string} props.copy.startTimeLabel Start-time field label.
 * @param {string} props.copy.startTimePlaceholder Start-time placeholder.
 * @param {string} props.copy.endTimeLabel End-time field label.
 * @param {string} props.copy.endTimePlaceholder End-time placeholder.
 * @param {string} props.copy.serviceLabel Service field label.
 * @param {string} props.copy.servicePlaceholder Service placeholder.
 * @param {string} props.copy.customerLabel Customer field label.
 * @param {string} props.copy.customerPlaceholder Customer placeholder.
 * @param {string} props.copy.openBookingLabel Text used for appointments without an assigned customer.
 * @param {string} props.copy.petLabel Pet field label.
 * @param {string} props.copy.petPlaceholder Pet placeholder.
 * @param {string} props.copy.noteLabel Note field label.
 * @param {string} props.copy.notePlaceholder Note placeholder.
 * @param {string} props.copy.cancelButtonLabel Cancel-button text.
 * @param {string} props.copy.submitButtonLabel Submit-button text.
 * @param {string} props.copy.loadingText Loading status text.
 * @param {string} props.copy.lookupError Lookup error text.
 * @param {string} props.copy.submitError Submission error text.
 * @param {(adminId: string|number) => Array<Object>|Promise<Array<Object>>} props.getListOfAdmin Loads admin options for the current admin.
 * @param {() => Array<Object>|Promise<Array<Object>>} props.getListOfCustomer Loads all customer options.
 * @param {(customerId: string|number) => Array<Object>|Promise<Array<Object>>} props.getListOfPets Loads pets for the selected customer.
 * @param {(appointment: Object) => void|Promise<void>} props.onSubmit Called with the completed appointment data.
 * @param {() => void} props.onClose Called when the popup is dismissed.
 * @returns {JSX.Element} The appointment dialog.
 */
export default function NewAppointmentPopup({
    isOwner = true,
    adminId,
    ownerOption,
    startTimes = [],
    endTimes = [],
    services,
    copy,
    getListOfAdmin,
    getListOfCustomer,
    getListOfPets,
    onSubmit,
    onClose,
}) {
    const dialogId = useId();
    const dialogRef = useRef(null);
    const closeButtonRef = useRef(null);
    const lookupRequestId = useRef(0);
    const initialAdminId = isOwner ? getOptionId(ownerOption) : adminId;
    const [adminOptions, setAdminOptions] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [petOptions, setPetOptions] = useState([]);
    const [selectedAdminId, setSelectedAdminId] = useState(String(initialAdminId));
    const [selectedCustomerId, setSelectedCustomerId] = useState("");
    const [selectedPetId, setSelectedPetId] = useState("");
    const [approvalChoice, setApprovalChoice] = useState("");
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [service, setService] = useState("");
    const [note, setNote] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lookupError, setLookupError] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    useEffect(() => {
        const triggerElement = document.activeElement;
        closeButtonRef.current?.focus();

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (event.key !== "Tab" || !dialogRef.current) {
                return;
            }

            const focusableElements = dialogRef.current.querySelectorAll(
                'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement?.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement?.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            triggerElement?.focus();
        };
    }, [onClose]);

    useEffect(() => {
        let isCurrent = true;
        const requestId = lookupRequestId.current + 1;
        lookupRequestId.current = requestId;

        async function loadOptions() {
            try {
                let loadedAdmins = [];
                if (isOwner) {
                    loadedAdmins = await getListOfAdmin(adminId);
                    if (!Array.isArray(loadedAdmins)) {
                        throw new TypeError("getListOfAdmin must return an array.");
                    }
                }

                if (!isCurrent) {
                    return;
                }

                if (isOwner) {
                    const ownerId = String(getOptionId(ownerOption));
                    const otherAdmins = loadedAdmins.filter(
                        (option) => String(getOptionId(option)) !== ownerId
                    );
                    setAdminOptions([ownerOption, ...otherAdmins]);
                }

                const loadedCustomers = await getListOfCustomer();
                if (!Array.isArray(loadedCustomers)) {
                    throw new TypeError("getListOfCustomer must return an array.");
                }

                if (isCurrent && requestId === lookupRequestId.current) {
                    setCustomerOptions(loadedCustomers);
                }
            } catch {
                if (isCurrent) {
                    setLookupError(true);
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        }

        loadOptions();
        return () => {
            isCurrent = false;
            lookupRequestId.current += 1;
        };
    }, [adminId, getListOfAdmin, getListOfCustomer, isOwner, ownerOption]);

    function handleAdminChange(event) {
        setSelectedAdminId(event.target.value);
        setSelectedCustomerId("");
        setSelectedPetId("");
        setPetOptions([]);
        setLookupError(false);
    }

    async function handleCustomerChange(event) {
        const nextCustomerId = event.target.value;
        const requestId = lookupRequestId.current + 1;
        lookupRequestId.current = requestId;

        setSelectedCustomerId(nextCustomerId);
        setSelectedPetId("");
        setPetOptions([]);
        setLookupError(false);
        if (!nextCustomerId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const customerId = getOptionValue(customerOptions, nextCustomerId);
            const loadedPets = await getListOfPets(customerId);
            if (!Array.isArray(loadedPets)) {
                throw new TypeError("getListOfPets must return an array.");
            }

            if (requestId === lookupRequestId.current) {
                setPetOptions(loadedPets);
            }
        } catch {
            if (requestId === lookupRequestId.current) {
                setLookupError(true);
            }
        } finally {
            if (requestId === lookupRequestId.current) {
                setIsLoading(false);
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError(false);

        const selectedAdmin = isOwner ? getOption(adminOptions, selectedAdminId) : null;
        const selectedService = getOption(services, service);
        const selectedCustomer = getOption(customerOptions, selectedCustomerId);
        const selectedPet = getOption(petOptions, selectedPetId);
        const startTimeOption = getOption(startTimes, startTime);
        const endTimeOption = getOption(endTimes, endTime);
        const formatTimeLabel = (value, option) => {
            if (option) {
                return getOptionLabel(option);
            }

            const [hours, minutes] = value.split(":").map(Number);
            const time = new Date();
            time.setHours(hours, minutes, 0, 0);
            return time.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
            });
        };

        const appointment = {
            adminId: selectedAdmin ? getOptionId(selectedAdmin) : adminId,
            adminName: selectedAdmin ? getOptionLabel(selectedAdmin) : null,
            approvalRequired: approvalChoice === "require",
            date,
            startTime: startTimes.length ? getOptionId(startTimeOption) : startTime,
            startTimeLabel: formatTimeLabel(startTime, startTimeOption),
            endTime: endTimes.length ? getOptionId(endTimeOption) : endTime,
            endTimeLabel: formatTimeLabel(endTime, endTimeOption),
            service: selectedService ? getOptionId(selectedService) : null,
            serviceLabel: selectedService ? getOptionLabel(selectedService) : null,
            customerId: selectedCustomer ? getOptionId(selectedCustomer) : null,
            customerName: selectedCustomer ? getOptionLabel(selectedCustomer) : null,
            petId: selectedPet ? getOptionId(selectedPet) : null,
            petName: selectedPet ? selectedPet.name || getOptionLabel(selectedPet) : null,
            petBreed: selectedPet && typeof selectedPet === "object" ? selectedPet.breed || "" : "",
            note,
        };

        try {
            await onSubmit(appointment);
            onClose();
        } catch {
            setSubmitError(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    return createPortal(
        <div className="blurBackground">
            <section
                ref={dialogRef}
                id={dialogId}
                className="requestAvailabilityContainer"
                role="dialog"
                aria-modal="true"
                aria-busy={isLoading || isSubmitting}
                aria-labelledby={`${dialogId}-title`}
                aria-describedby={`${dialogId}-description`}
            >
                <div className="appointment-dialog-header">
                    <div>
                        <h2 id={`${dialogId}-title`} className="requestAvailTitle">
                            {copy.dialogTitle}
                        </h2>
                        <p id={`${dialogId}-description`} className="instructionsTime">
                            {isOwner ? copy.ownerDescription : copy.adminDescription}
                        </p>
                    </div>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        className="appointment-close-button"
                        onClick={onClose}
                    >
                        {copy.closeButtonLabel}
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {isOwner && (
                        <div className="form-field">
                            <label htmlFor={`${dialogId}-admin`}>{copy.adminLabel}</label>
                            <select
                                id={`${dialogId}-admin`}
                                className="select-element"
                                value={selectedAdminId}
                                onChange={handleAdminChange}
                                required
                            >
                                <option value="">{copy.adminPlaceholder}</option>
                                {adminOptions.map((option) => (
                                    <option
                                        key={String(getOptionId(option))}
                                        value={String(getOptionId(option))}
                                    >
                                        {getOptionLabel(option)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {isOwner && (
                        <fieldset className="appointment-approval">
                            <legend>{copy.approvalLegend}</legend>
                            <label className="appointment-approval-option">
                                <input
                                    type="radio"
                                    name={`${dialogId}-approval`}
                                    value="require"
                                    checked={approvalChoice === "require"}
                                    onChange={(event) => setApprovalChoice(event.target.value)}
                                    required
                                />
                                <span>{copy.requireApproval}</span>
                            </label>
                            <label className="appointment-approval-option">
                                <input
                                    type="radio"
                                    name={`${dialogId}-approval`}
                                    value="skip"
                                    checked={approvalChoice === "skip"}
                                    onChange={(event) => setApprovalChoice(event.target.value)}
                                    required
                                />
                                <span>{copy.skipApproval}</span>
                            </label>
                        </fieldset>
                    )}

                    <div className="form-field date-container">
                        <label htmlFor={`${dialogId}-date`}>{copy.dateLabel}</label>
                        <DatePicker
                            id={`${dialogId}-date`}
                            selected={date}
                            onChange={setDate}
                            dateFormat={copy.dateFormat}
                            placeholderText={copy.datePlaceholder}
                            className="select-element"
                            calendarClassName="appointment-calendar"
                            popperPlacement="bottom-start"
                            minDate={new Date()}
                            showPopperArrow={false}
                            required
                        />
                    </div>

                    <div className="form-field-container">
                        <div className="form-field">
                            <label htmlFor={`${dialogId}-start-time`}>{copy.startTimeLabel}</label>
                            {startTimes.length > 0 ? (
                                <select
                                    id={`${dialogId}-start-time`}
                                    className="select-element"
                                    value={startTime}
                                    onChange={(event) => setStartTime(event.target.value)}
                                    required
                                >
                                    <option value="">{copy.startTimePlaceholder}</option>
                                    {startTimes.map((option) => (
                                        <option
                                            key={String(getOptionId(option))}
                                            value={String(getOptionId(option))}
                                        >
                                            {getOptionLabel(option)}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    id={`${dialogId}-start-time`}
                                    className="select-element"
                                    type="time"
                                    value={startTime}
                                    onChange={(event) => setStartTime(event.target.value)}
                                    required
                                />
                            )}
                        </div>
                        <div className="form-field">
                            <label htmlFor={`${dialogId}-end-time`}>{copy.endTimeLabel}</label>
                            {endTimes.length > 0 ? (
                                <select
                                    id={`${dialogId}-end-time`}
                                    className="select-element"
                                    value={endTime}
                                    onChange={(event) => setEndTime(event.target.value)}
                                    required
                                >
                                    <option value="">{copy.endTimePlaceholder}</option>
                                    {endTimes.map((option) => (
                                        <option
                                            key={String(getOptionId(option))}
                                            value={String(getOptionId(option))}
                                        >
                                            {getOptionLabel(option)}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    id={`${dialogId}-end-time`}
                                    className="select-element"
                                    type="time"
                                    value={endTime}
                                    onChange={(event) => setEndTime(event.target.value)}
                                    required
                                />
                            )}
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor={`${dialogId}-service`}>{copy.serviceLabel}</label>
                        <select
                            id={`${dialogId}-service`}
                            className="select-element"
                            value={service}
                            onChange={(event) => setService(event.target.value)}
                            required
                        >
                            <option value="">{copy.servicePlaceholder}</option>
                            {services.map((option) => (
                                <option
                                    key={String(getOptionId(option))}
                                    value={String(getOptionId(option))}
                                >
                                    {getOptionLabel(option)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field-container">
                        <div className="form-field">
                            <label htmlFor={`${dialogId}-customer`}>{copy.customerLabel}</label>
                            <select
                                id={`${dialogId}-customer`}
                                className="select-element"
                                value={selectedCustomerId}
                                onChange={handleCustomerChange}
                                disabled={isLoading}
                            >
                                <option value="">{copy.customerPlaceholder}</option>
                                {customerOptions.map((option) => (
                                    <option
                                        key={String(getOptionId(option))}
                                        value={String(getOptionId(option))}
                                    >
                                        {getOptionLabel(option)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor={`${dialogId}-pet`}>{copy.petLabel}</label>
                            <select
                                id={`${dialogId}-pet`}
                                className="select-element"
                                value={selectedPetId}
                                onChange={(event) => setSelectedPetId(event.target.value)}
                                disabled={!selectedCustomerId || isLoading}
                                required={Boolean(selectedCustomerId)}
                            >
                                <option value="">{copy.petPlaceholder}</option>
                                {petOptions.map((option) => (
                                    <option
                                        key={String(getOptionId(option))}
                                        value={String(getOptionId(option))}
                                    >
                                        {getOptionLabel(option)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="note-field">
                        <label htmlFor={`${dialogId}-note`}>{copy.noteLabel}</label>
                        <textarea
                            id={`${dialogId}-note`}
                            value={note}
                            onChange={(event) => setNote(event.target.value)}
                            placeholder={copy.notePlaceholder}
                        />
                    </div>

                    {isLoading && <p className="appointment-status" role="status">{copy.loadingText}</p>}
                    {lookupError && <p className="appointment-error" role="alert">{copy.lookupError}</p>}
                    {submitError && <p className="appointment-error" role="alert">{copy.submitError}</p>}

                    <div className="appointment-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            {copy.cancelButtonLabel}
                        </button>
                        <button
                            type="submit"
                            className="send-request-button"
                            disabled={isLoading || isSubmitting}
                        >
                            {copy.submitButtonLabel}
                        </button>
                    </div>
                </form>
            </section>
        </div>,
        document.body
    );
}
