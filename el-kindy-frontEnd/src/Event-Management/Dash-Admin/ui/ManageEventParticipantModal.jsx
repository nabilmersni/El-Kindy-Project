import { useEffect, useState } from "react";
import "../../../../public/assets/css/style.css";
import ManageEventParticipantItems from "./ManageEventParticipantItems";
import { assignUserToEvent, getEventByUserId } from "../../Services/apiEvent";

const ManageEventParticipantModal = ({ isOpen, onClose, event }) => {
  if (!isOpen) {
    return null;
  }

  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const eventId = event._id;
  const fetchUsers = async (eventId) => {
    try {
      const data = await getEventByUserId(eventId);
      setUsers(data);
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    fetchUsers(eventId);
  }, [eventId]);

  const handleAssign = async () => {
    try {
      const response = await assignUserToEvent(eventId, email);
      console.log(response);
      fetchUsers(eventId);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); 
      } else {
        alert("An error occurred. Please try again."); 
      }
    }
  };

  return (
    <div className="manage-participants-model ">
      <div className="manage-participants-model__card">
        <div className="manage-participants-model__card--header">
          <div className="manage-participants-model__card--header-title">
            Manage participants
    
          </div>
          <div
            className="manage-participants-model__card--header-exitBTn"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 348.333 348.334"
              xmlSpace="preserve"
              className="manage-participants-model__card--header-exitBTn-svg"
            >
              <g>
                <path
                  d="M336.559 68.611 231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z"
                  opacity="1"
                ></path>
              </g>
            </svg>
          </div>
        </div>

        <hr className="model-hr" />

        <div className="manage-participants-model__card--content">
          <div className="model__card--addNewPToQuiz__form">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="pToQuiz-add-form__input"
              placeholder="ali.braiek@esprit.tn"
              // type="text"
            />
            <div onClick={handleAssign} className="model__card--addNewP__btn">
              Assign
            </div>
          </div>

          <div className="model__card--students-list__container">
            <div className="model__card--students-list__header">
              <div className="model__card--students-list__header-fullname">
                Fullname
              </div>
              <div className="model__card--students-list__header-email">
                Email
              </div>
              <div className="model__card--students-list__header-level">
                Level
              </div>
              <div className="model__card--students-list__header-grade">
                Grade
              </div>
              <div className="model__card--students-list__header-status">
                Status
              </div>

              <div className="model__card--students-list__header-delete">#</div>
            </div>
            <div className="model__card--students-list">
              {users.map((item, index) => (
                <ManageEventParticipantItems
                  key={index}
                  data={item}
                  fetchUsers={fetchUsers}
                  eventId={eventId}
                />
              ))}
              {/* {participants.map((item, index) => (
                <ManageParticipantsItem key={index} data={item} />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEventParticipantModal;
