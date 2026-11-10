import { useState } from "react";
import StatCard from "./StatCard";
import TodaysSchedule from "./TodaysSchedule";
import BookingRequests from "./BookingRequests";
import RevenuePanel from "./RevenuePanel";
import PetCareAlerts from "./PetCareAlerts";
import DeclineBookingPopup from "../../popup/DeclineBookingPopup";
import pawIcon from "../../../assets/owner-dashboard/stat-paw.svg";
import clipboardIcon from "../../../assets/owner-dashboard/stat-clipboard.svg";
import "../../../styles/owner-dashboard/Dashboard.css";

// Temporary placeholder visits (Figma "Admin — Dashboard").
// BACKEND: replace with today's appointments from the API, in the same shape.
// status: "completed" | "in-progress" | "upcoming"
function getTodaySchedule() {
    return [
        { id: "visit-biscuit", time: "8:00 AM", duration: "30 min", petName: "Biscuit", breed: "Golden Retriever", service: "Dog Walking", customerName: "Sarah M.", sitterName: "You", status: "completed" },
        { id: "visit-luna", time: "10:30 AM", duration: "45 min", petName: "Luna", breed: "Tabby Cat", service: "Drop-in Care", customerName: "James T.", sitterName: "Adrian", status: "completed" },
        { id: "visit-mochi", time: "1:00 PM", duration: "30 min", petName: "Mochi", breed: "Shiba Inu", service: "Medication", customerName: "Priya K.", sitterName: "You", status: "in-progress" },
        { id: "visit-pepper", time: "3:30 PM", duration: "1 hr", petName: "Pepper", breed: "Beagle", service: "Whole Day Care", customerName: "Daniel R.", sitterName: "Adrian", status: "upcoming" },
        { id: "visit-oliver", time: "6:00 PM", duration: "Overnight", petName: "Oliver", breed: "Maine Coon", service: "Overnight Stay", customerName: "Emma L.", sitterName: "You", status: "upcoming" },
    ];
}

// Temporary placeholder booking requests (Figma "Admin — Dashboard").
// BACKEND: replace with the pending booking requests from the API, in the same shape.
function getBookingRequests() {
    return [
        { id: "request-coco", petName: "Coco", breed: "Poodle", customerName: "Maria G.", service: "Overnight Stay", dateLabel: "Oct 3 – Oct 5", isDepositPaid: true, depositAmount: 20 },
        { id: "request-max", petName: "Max", breed: "Labrador", customerName: "Kevin P.", service: "Dog Walking", dateLabel: "Oct 1 · 9:00 AM", isDepositPaid: true, depositAmount: 20 },
        { id: "request-nala", petName: "Nala", breed: "Siamese Cat", customerName: "Lisa W.", service: "Drop-in Care", dateLabel: "Oct 2 · 12:00 PM", isDepositPaid: false, depositAmount: 20 },
    ];
}

export default function Dashboard({ onNavigate }) {
    // Each list is shared by a card and its stat, so both update together
    const [visits, setVisits] = useState(getTodaySchedule);
    const [requests, setRequests] = useState(getBookingRequests);
    const [decliningRequest, setDecliningRequest] = useState(null); // request shown in the Decline popup

    const completedVisitCount = visits.filter((visit) => visit.status === "completed").length;
    const upcomingVisitCount = visits.length - completedVisitCount; // includes the visit in progress

    // Temporary: only updates the page.
    // BACKEND: also tell the API this appointment is complete.
    function markAppointmentComplete(id) {
        setVisits((current) => current.map((visit) => (visit.id === id ? { ...visit, status: "completed" } : visit)));
    }

    function removeRequest(id) {
        setRequests((current) => current.filter((request) => request.id !== id));
    }

    // Temporary: only updates the page.
    // BACKEND: also tell the API the booking is accepted.
    function acceptBooking(id) {
        removeRequest(id);
    }

    // Temporary: only updates the page.
    // BACKEND: also tell the API the booking is declined, and send the popup's
    // optional message to the customer.
    function declineBooking(id) {
        removeRequest(id);
        setDecliningRequest(null);
    }

    // Temporary: opens the Calendar so the owner can pick a new time.
    // BACKEND: the Calendar should load this request (bookingRequestId) to reschedule it.
    function rescheduleBooking(id) {
        onNavigate("calender", { bookingRequestId: id });
    }

    return (
        <>
            <p>Dashboard</p>
            <div className="owner-dashboard-home">
                <div className="owner-dashboard-stats">
                    <StatCard
                        icon={pawIcon}
                        value={visits.length}
                        label="Today’s visits"
                        detail={`${completedVisitCount} completed · ${upcomingVisitCount} upcoming`}
                    />
                    <StatCard
                        icon={clipboardIcon}
                        value={requests.length}
                        label="Pending requests"
                        detail="Waiting for your reply"
                    />
                </div>

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
                <PetCareAlerts onNavigate={onNavigate} />
            </div>

            {decliningRequest && (
                <DeclineBookingPopup
                    request={decliningRequest}
                    onCancel={() => setDecliningRequest(null)}
                    onConfirm={() => declineBooking(decliningRequest.id)}
                />
            )}
        </>
    );
}
