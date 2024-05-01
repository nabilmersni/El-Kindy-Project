import React, { useEffect, useState } from 'react';
import { getallEvents, createTicketAndAssociateWithEvent, getTicketsByEventId, getEventById, verifyPayment } from '../Event-Management/Services/apiEvent'; // Import the required functions
import { useNavigate, useSearchParams } from 'react-router-dom';
import Title1 from './Title1';
import Lottie from 'react-lottie';
import guitarAnimation from "../../public/lottieAnimations/guitar.json";
import speakerAnimation from "../../public/lottieAnimations/speaker.json";
import ButtonPrimary from './ButtonPrimary';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modal from "@mui/material/Modal";
import Payement from '../Event-Management/front_side/Payement';

function ViewAllEvents() {
  const { user } = useSelector((state) => state.auth);

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
 

  const eventsPerPage = 6;
const paginate = (pageNumber) => setCurrentPage(pageNumber);
const [currentPage, setCurrentPage] = useState(1);
const indexOfLastEvent = currentPage * eventsPerPage;
const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);


  useEffect(() => {

 
    fetchEvents();
  }, [searchParams]);

  const fetchEvents = async () => {
    try {
      const allEvents = await getallEvents();
      setEvents(allEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleJoinEvent = async (eventId) => {
    try {




    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  const handleShowTicket = async (eventId) => {
    try {
      const userId = user._id;
      const ticketData = await createTicketAndAssociateWithEvent(eventId, userId);
      console.log('Ticket Data:', ticketData); // Log ticketData
      const createdTicketId = ticketData.ticket._id;// Access the ticket _id property
      console.log('Ticket id:', createdTicketId)
      if (!createdTicketId) {
        throw new Error('Ticket ID not found in response');
      }
      const url = `/events/${eventId}/${createdTicketId}`;
      navigate(url);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [openEvent, setOpenEvent] = useState(null);


  const openModalHandler = (eventId)=>{
    setOpenModal(true);
    setOpenEvent(eventId);
  }

  const closeModalHandler = ()=>{
    setOpenModal(false);
    setOpenEvent(null);
  }


  return (
    <div className="container mx-auto px-8 px-[1rem] lg:pl-28 pl-[1rem] pb-[5rem]">
      <Title1>Event</Title1>
      <div className="flex justify-center items-center mt-5 mb-8">
        <p className="text-black font-normal text-center max-w-[40rem] ">
          <span className="text-primary font-extrabold">El Kindy Band</span>{" "}
          is a competition open to amateur ensembles comprising 2 to 10
          musicians capable of playing any style of music. Free program
          lasting 10 to 20 minutes, consisting of one to three pieces.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {currentEvents.map((event, index) => (
          <div key={event.id} className="event-container">
            <div className="event-content p-[1rem] border-primary border-[.3rem] rounded-[2rem] flex flex-col justify-between items-center h-full">
              <div className="rounded-[2rem] w-full">
                <img
                  src={`http://localhost:3000/upload-directory/${event.EventImage}`}
                  alt=""
                  className="w-full h-auto object-cover rounded-[2rem]"
                />
              </div>
              <h1 className="text-[1.5rem] text-primary font-extrabold my-[1.4rem]">
                {event.EventName}
              </h1>
              <div className="flex justify-between items-center w-full">
                <div className="flex justify-between items-center">
                  <img
                    src="/img/location-icon.svg"
                    alt=""
                    className="w-[1.3rem] mr-[.5rem]"
                  />
                  <p>{event.EventPlace}</p>
                </div>
                <span className="w-[.5rem] h-[.5rem] bg-primary rounded-full"></span>
                <div className="flex justify-between items-center">
                  <img
                    src="/img/calendar-icon.svg"
                    alt=""
                    className="w-[1.3rem] mr-[.5rem]"
                  />
                  <p>{event.EventDate}</p>
                </div>
              </div>
              <div className="flex justify-evenly items-center w-full -mb-[2rem]">
                <button
                  className={`px-4 py-2 text-md font-extrabold font-nunito rounded-[.8rem] capitalize my-[2rem] ${event.PaymentStatus === 0 ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-lightBlue text-nav hover:bg-secondaryLight'}`} size={"1rem"}
                  onClick={() => handleShowTicket(event._id, event.PaymentStatus)}
                  disabled={event.PaymentStatus === 0}
                >
                  Show Ticket
                </button>
                <span className="w-[.5rem] h-[.5rem] bg-primary rounded-full"></span>
                <img src="img/pepole-icon.svg" alt="" className="max-w-[4rem] " />
                {/* <Link to={`/events/payement/${event._id}`}>
                  <button
                   className={`px-4 py-2 text-md font-extrabold font-nunito rounded-[.8rem] capitalize my-[2rem] ${event.PaymentStatus === 1 ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-lightBlue text-nav hover:bg-secondaryLight'}`}
                   onClick={() => handleJoinEvent(event._id)}
                   disabled={event.PaymentStatus === 1}
                  >
                    Join
                  </button>
                </Link> */}


                <button
                  className={`px-4 py-2 text-md font-extrabold font-nunito rounded-[.8rem] capitalize my-[2rem] ${event.PaymentStatus === 1 ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-lightBlue text-nav hover:bg-secondaryLight'}`}
                  onClick={() => openModalHandler(event._id)}
                  disabled={event.PaymentStatus === 1}
                >
                  Join
                </button>




              </div>
            </div>
          </div>
        ))}
        <div className="hidden lg:block">
          <div className="max-w-[11rem] absolute pt-[8rem] top-[-3rem] left-0">
            <Lottie options={{ animationData: guitarAnimation }} />
          </div>
          <div className="max-w-[11rem] absolute top-[3rem] right-0">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: speakerAnimation }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] bg-transparent">
                  <Modal
                    open={openModal}
                    onClose={closeModalHandler}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                      borderRadius: "2rem",
                      backgroundColor: "transparent"
                    }}
                  >
                    <div className=" absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] ">
                      <Payement eventId={openEvent} />
                    </div>
                  </Modal>
                </div>
     {/* Pagination buttons */}
     <div className="flex justify-center items-center mt-5">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 text-[#223698] rounded"
        >
          Previous
        </button>
        {[...Array(Math.ceil(events.length / eventsPerPage))].map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 mx-1 text-[#223698] rounded ${
                currentPage === index + 1 ? "border border-blue-500" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(events.length / eventsPerPage)}
          className="px-3 py-1 mx-1 border-blue-500 text-[#223698] rounded"
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default ViewAllEvents;
