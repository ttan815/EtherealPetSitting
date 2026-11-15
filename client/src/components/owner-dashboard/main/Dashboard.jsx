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
import { OWNER_OVERVIEW_CARDS } from "../../../constants/owner-overview-items";
import { acceptBookingRequest, declineBookingRequest, getInitialBookingRequests } from "../../../services/appointment-service";
import { getOwnerOverviewMetrics } from "../../../services/dashboard-service";
import "../../../styles/owner-dashboard/Dashboard.css";
import NewAppointmentButton from "../../action-button/NewAppointmentButton";
import { useNewAppointment } from "../../../context/NewAppointmentContext";

export default function Dashboard({ onNavigate }) {
    const { visits, markAppointmentComplete } = useNewAppointment();
    const [requests, setRequests] = useState(getInitialBookingRequests);
    const [decliningRequest, setDecliningRequest] = useState(null); // request shown in the Decline popup\
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

    function removeRequest(id) {
        setRequests((current) => current.filter((request) => request.id !== id));
    }

    // Temporary: only updates the page.
    // BACKEND: also tell the API the booking is accepted.
    function acceptBooking(id) {
        if (acceptBookingRequest(id).ok) removeRequest(id);
    }

    // Temporary: only updates the page.
    // BACKEND: also tell the API the booking is declined, and send the popup's
    // optional message to the customer.
    function declineBooking(id) {
        if (declineBookingRequest(id).ok) removeRequest(id);
        setDecliningRequest(null);
    }

    // Temporary: opens the Calendar so the owner can pick a new time.
    // BACKEND: the Calendar should load this request (bookingRequestId) to reschedule it.
    function rescheduleBooking(id) {
        onNavigate("calender", { bookingRequestId: id });
    }

    return (
        <section>
            {/* Add New Appointment */}
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
                        onAccept={acceptBooking}
                        onDecline={setDecliningRequest}
                        onReschedule={rescheduleBooking}
                    />
                </div>

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
                    onCancel={() => setDecliningRequest(null)}
                    onConfirm={() => declineBooking(decliningRequest.id)}
                />
            )}
        </section>

            
    );
}
