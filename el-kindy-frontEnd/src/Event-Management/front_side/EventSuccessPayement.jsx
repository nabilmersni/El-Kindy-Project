import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { createTicketAndAssociateWithEvent, getEventById, getTicketByIdAndEventId, getallEvents, verifyPayment } from '../Services/apiEvent';
import { useSelector } from 'react-redux';
import Title1 from '../../ui/Title1';
import Lottie from 'react-lottie';
import guitarAnimation from "../../../public/lottieAnimations/guitar.json";
import speakerAnimation from "../../../public/lottieAnimations/speaker.json";
import ButtonPrimary from '../../ui/ButtonPrimary';

const Success = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
   

    const [events, setEvents] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const { eventId, ticketId } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPaymentId = async () => {
          try {
            const paymentId = searchParams.get("payment_id");
            const result = await verifyPayment(paymentId);
            if (result.result.status === "SUCCESS") {
              setSuccess(true);
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
          } finally {
            setLoading(false);
          }
        };
    
        verifyPaymentId();
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
    
 
      const handleShowTicket = async (eventId) => {
        try {
          const userId = user._id;
          const ticketData = await createTicketAndAssociateWithEvent(eventId, userId);
          const createdTicketId = ticketData.ticket._id; // Use a different variable name
          const url = `/events/${eventId}/${createdTicketId}`;
          navigate(url); 
        } catch (error) {
          console.error('Error creating ticket:', error);
        }
      };
  
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
          {events.map((event, index) => (
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
                  <ButtonPrimary size={"1rem"}>more info</ButtonPrimary>
                  <span className="w-[.5rem] h-[.5rem] bg-primary rounded-full"></span>
                  <img src="img/pepole-icon.svg" alt="" className="max-w-[4rem] " />
                  <button
  className={` px-4 py-2 bg-lightBlue text-nav text-md font-extrabold font-nunito rounded-[.8rem] hover:bg-secondaryLight capitalize my-[2rem]`}
  onClick={() => handleShowTicket(event._id, ticketId)}
>
  Show Ticket
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
      </div>
    );
  }
  
  

export default Success;
