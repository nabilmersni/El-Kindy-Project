import React, { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { getTicketsByEventId, getEventById } from '../Event-Management/Services/apiEvent'; // Import the function to fetch event data
import "./../../public/assets/css/style.css"

function TicketItems() {
  const { eventId } = useParams(); 
  const navigate = useNavigate(); 
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, [eventId]); 
  const fetchTickets = async () => {
    try {
      const ticketsData = await getTicketsByEventId(eventId);
      setTickets(ticketsData);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleExit = () => {
    navigate('/user-side/AllEvents'); 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Your Tickets</h2>
        <div className="flex">
          
          {tickets.map(ticket => (
            
            <div key={ticket._id} className="bg-white pb-[200px] rounded-lg shadow-md p-4 mb-4 mx-2">
              <div className='pb-[35px]'>
              <div
            className="Tickets__card--header-exitBTn"
            onClick={handleExit}
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
      
              <p className="text-lg font-semibold pt-[30px]">Event Name: {ticket.event.EventName}</p>
              <br></br>
              <p className="text-base">Event Date: {ticket.event.EventDate}</p>
              <p className="text-base">Ticket Price: {ticket.event.PriceTicket} Tnd</p>
              <p className="text-base">Purchased At: {ticket.purchasedAt}</p>
            </div>
          ))}
        </div>
    
        
      </div>
    </div>
  );
          }  

export default TicketItems;
