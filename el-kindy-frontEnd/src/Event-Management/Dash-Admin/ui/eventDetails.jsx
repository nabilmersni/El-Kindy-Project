import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../Services/apiEvent';

const EventDetailsCard = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDetails = await getEventById(id);
        setEvent(eventDetails);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [id]);

  return (
    <div>
      {event ? (
        <div>
          <h2>{event.EventName}</h2>
          <p>{event.EventDescription}</p>
          <p>{event.PriceTicket}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>No event details available.</p>
      )}
    </div>
  );
};

export default EventDetailsCard;

