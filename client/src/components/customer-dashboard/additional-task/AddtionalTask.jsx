import "../../../styles/customer-dashboard/additional-task/AdditionalTask.css"
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import checkMark from "../../../assets/icons/Minimal Green Checkmark Icon.png";
import calendar from "../../../assets/icons/Calendar Clock Icon.png";
import checkList from "../../../assets/icons/Warm Brown Checklist Icon.png";
import information from "../../../assets/icons/Brown Spiral Notebook and Pencil Icon.png";
import PageHeader from "../PageHeader";
function AdditionalTask() {
  const { user, loading } = useAuth();
  const [additionalInfo, setAdditionalInfo] = useState("");
  let role = user?.role;
  if (role == null) {
    role = "visitor";
  }

  return (
    <section>
      <PageHeader 
      title={"Additional task"} 
      subtitle={"Add the small household chores that help every care visit feel complete."} 
      actionLabel={"Book Appointment"} 
      onAction={() => navigate("/book-appointment")}
      />
        <div className="summaryContainer">
          <div className="individualSummaryContainer">
            <span>
              <img className="summaryIcon" src={checkList} alt="" />
            </span>
            <div>
              <p className="summaryTitle">5 tasks</p>
              <p className="summaryDesc">For the next appointment</p>
            </div>
          </div>
          <div className="individualSummaryContainer">
            <span>
              <img className="summaryIcon-complete" src={checkMark} alt="" />
            </span>
            <div>
              <p className="summaryTitle">2 Complete</p>
              <p className="summaryDesc">Updated by your caregiver</p>
            </div>
          </div>
          <div className="individualSummaryContainer">
            <span>
              <img className="summaryIcon" src={calendar} alt="" />
            </span>
            <div>
              <p className="summaryTitle">Oct 03</p>
              <p className="summaryDesc">Next Drop-in care visit</p>
            </div>
          </div>
        </div>

        <div className="taskForSitterAndAdditionalInfoContainer">
          <div className="taskForSitterContainer">
            <div className="taskTitleContainer">
              <div className="summaryContainer">
                <div className="taskInputIndividualSummaryContainer">
                  <span>
                    <img className="summaryIcon" src={checkList} alt="" />
                  </span>
                  <div>
                    <p className="summaryTitle">Tasks for your sitter</p>
                    <p className="summaryDesc">
                      What your sitter needs to do and what they've already
                      completed.
                    </p>
                  </div>
                </div>
              </div>
              <div className="totalNumberOfTasks">5 tasks</div>
            </div>
            <div className="taskForSitter">
              <div className="flex-info">
                <p>ADD IN TASK REQUEST</p>
              </div>
              <div className="task-input-container">
                <input className="taskInputField"></input>
                <button className="pay-deposit-confirm-btn">Request</button>
              </div>
              <div className="flex-info">
                <p>PENDING</p>
                <p className="flex-desc">3 tasks</p>
              </div>
              <div className="task-line-overlay"></div>
              <div className="flex-info-task">
                {/* Insert a map here, that'll go ahead and put them into where task 1 would be*/}
                <p>Task 1</p>
              </div>
              <div className="flex-info">
                <p>COMPLETED BY SITTER</p>
                <p className="flex-desc">5 tasks</p>
              </div>
              <div className="task-line-overlay"></div>
              <div className="flex-info-task">
                {/* Insert a map here, that'll go xrtahead and put them into where task 1 would be*/}
                <p className="strike-through">Task 3</p>
              </div>
            </div>
          </div>
          <div className="additionalInfoContainer">
            <div className="taskInputIndividualSummaryContainer">
              <span>
                <img className="summaryIcon" src={information} alt="" />
              </span>
              <div>
                <p className="summaryTitle">Additional Information</p>
                <p className="summaryDesc">
                  A flexible note for the entire visit.
                </p>
              </div>
            </div>
            <div className="additionalInfoTextAreaContainer">
              <textarea
                id="additionalInfoTextArea"
                maxLength={1000}
                rows={4}
                placeholder="Type here..."
                className="additionalInfoInput"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />

              <span className="characterCount">
                {additionalInfo.length}/1000
              </span>
            </div>
            <div className="bookingNoteContainer">
              <span className="bookingNoteIcon">ⓘ</span>
              <p className="bookingNoteText">
                This note and every open task will be attached to the Oct 03
                booking.
              </p>
            </div>
            <p className="lastUpdateText">Last saved today at 9:42 AM</p>
          </div>
        </div>
    </section>
  );
}

export default AdditionalTask;
