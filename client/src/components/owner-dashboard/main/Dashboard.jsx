import PageHeader from "../../parent-component/PageHeader";
import OverviewHeader from "../../parent-component/OverviewHeader";
import OverviewCard from "../../parent-component/OverviewCard";
import { useState } from "react";
import TodaysSchedule from "./TodaysSchedule";
import BookingRequests from "./BookingRequests";
import RevenuePanel from "./RevenuePanel";
import ReviewsToApprove from "./ReviewsToApprove";
import PetCareAlerts from "./PetCareAlerts";
import ReasonPopup from "../../popup/ReasonPopup";
import declineIcon from "../../../assets/owner-dashboard/decline-icon.svg";
import { OWNER_OVERVIEW_CARDS } from "../../../constants/owner/owner-overview-items";
import { acceptBooking, declineBookingRequest, getInitialBookingRequests } from "../../../services/owner-dashboard/appointment-service";
import { getOwnerOverviewMetrics } from "../../../services/owner-dashboard/dashboard-service";
import "../../../styles/owner-dashboard/Dashboard.css";
import NewAppointmentButton from "../../action-button/NewAppointmentButton";
import { useNewAppointment } from "../../../context/NewAppointmentContext";

/**
 * Renders the owner overview, schedule, and pending dashboard actions.
 * @param {Object} props Dashboard navigation callback.
 * @param {Function} props.onNavigate Navigates to an owner dashboard section.
 * @returns {JSX.Element} The owner dashboard overview.
 */
export default function Dashboard({ onNavigate }) {
    const { visits, markAppointmentComplete } = useNewAppointment();
    const [requests, setRequests] = useState(getInitialBookingRequests);
    const [decliningRequest, setDecliningRequest] = useState(null); // request shown in the Decline popup\
    const [requestActionError, setRequestActionError] = useState("");
    const metrics = getOwnerOverviewMetrics();
    const overviewValues = {
        todayVisits: {
            number: metrics.completedVisits + metrics.upcomingVisits,
            subtitle: `${metrics.completedVisits} complete - ${metrics.upcomingVisits} upcoming`,
        },
        pendingRequests: { number: metrics.pendingRequests },
        weeklyEarnings: {
            number: `$${metrics.weeklyEarnings}`,
            subtitle: `${metrics.weeklyEarningsChange}% vs last week`,
        },
        unpaidBalance: {
            number: `$${metrics.unpaidBalance}`,
            subtitle: `${metrics.unpaidVisits} visits unpaid`,
        },
    };

    const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    // Temporary: opens the Calendar so the owner can pick a new time.
    // BACKEND: the Calendar should load this request (bookingRequestId) to reschedule it.
    function rescheduleBooking(id) {
        onNavigate("calender", { bookingRequestId: id });
    }

    return (
        <section>
            <PageHeader
                title="Welcome, Owner"
                subtitle={`${formattedDate} —  here's today at a glance`}
                actionButton={<NewAppointmentButton />}
            />
            <OverviewHeader>
                {OWNER_OVERVIEW_CARDS.map(({ key, ...card }) => (
                    <OverviewCard
                        key={key}
                        {...card}
                        {...overviewValues[key]}
                    />
                ))}
            </OverviewHeader>

            <br/>

            <div className="owner-dashboard-home">
                <PetCareAlerts onNavigate={onNavigate} />
                <div className="owner-dashboard-row">
                    <TodaysSchedule
                        visits={visits}
                        onMarkComplete={markAppointmentComplete}
                        onViewCalendar={() => onNavigate("calender")}
                    />
                    <BookingRequests
                        requests={requests}
                        onAccept={(id) => {
                            setRequestActionError("");
                            const result = acceptBooking(id);
                            if (result.ok) {
                                setRequests(result.requests);
                            } else {
                                setRequestActionError("This booking request is no longer available. Refresh and try again.");
                            }
                        }}
                        onDecline={(request) => {
                            setRequestActionError("");
                            setDecliningRequest(request);
                        }}
                        onReschedule={rescheduleBooking}
                    />
                </div>
                {requestActionError && <p role="alert">{requestActionError}</p>}

                <RevenuePanel onNavigate={onNavigate} />
                <ReviewsToApprove />
            </div>

            {decliningRequest && (
                <ReasonPopup
                    icon={declineIcon}
                    title={`Decline ${decliningRequest.petName}’s booking request?`}
                    description={`${decliningRequest.customerName} will be notified${
                        decliningRequest.isDepositPaid
                            ? `, and their $${decliningRequest.depositAmount} deposit will be refunded.`
                            : "."
                    }`}
                    fieldLabel="Message to the customer"
                    placeholder="e.g. Sorry, we’re fully booked that weekend."
                    confirmLabel="Decline request"
                    onCancel={() => {
                        setDecliningRequest(null);
                        setRequestActionError("");
                    }}
                    onConfirm={(message) => {
                        setRequestActionError("");
                        const result = declineBookingRequest(decliningRequest.id, message);
                        if (result.ok) {
                            setRequests(result.requests);
                            setDecliningRequest(null);
                        } else {
                            setRequestActionError("This booking request is no longer available. Refresh and try again.");
                        }
                    }}
                />
            )}
        </section>

            
    );
}
