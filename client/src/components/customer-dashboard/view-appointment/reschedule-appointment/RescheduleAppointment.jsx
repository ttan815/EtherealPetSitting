import { useState } from "react";
import "../../../../styles/customer-dashboard/view-appointment/RescheduleAppointment.css";
import RescheduleConfirmation from "../../../popup/RescheduleConfirmation";
import RescheduleHeader from "./RescheduleHeader";
import CurrentSlotBanner from "./CurrentSlotBanner";
import DatePicker from "./DataPicker";
import TimePicker from "./TimePicker";
import ActionRow from "./ActionRow";

function RescheduleAppointment({ appointmentId, onKeepAppointment, onViewAppointment }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (isConfirmed) {
    return (
      <RescheduleConfirmation
        appointmentId={appointmentId}
        onViewAppointment={onViewAppointment}
      />
    );
  }

  return (
    <section className="modal-reschedule-appointment" aria-labelledby="reschedule-title">
      <RescheduleHeader onKeepAppointment={onKeepAppointment} />
      <CurrentSlotBanner />
      <div className="pickers-grid">
        <DatePicker />
        <TimePicker />
      </div>
      <ActionRow
        onKeepAppointment={onKeepAppointment}
        onConfirm={() => setIsConfirmed(true)}
      />
    </section>
  );
}

export default RescheduleAppointment;
