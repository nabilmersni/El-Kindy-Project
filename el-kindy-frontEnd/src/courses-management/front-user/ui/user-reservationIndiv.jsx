import "../../../../public/assets/css/style.css";
import React, { useState } from "react";
import ReservationIndivAvailabilitiesCard from "./user-reservationIndiv-availabilities";
import availabilitiesService from "../../services/availabilitiesService";

const ReservationIndivCard = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [activeDay, setActiveDay] = useState(null);

  const fetchAvailabilitiesByDay = async (day) => {
    try {
      const response = await availabilitiesService.getAllAvailabilitiesByDay(
        day
      );
      setAvailabilities(response.data);
      setActiveDay(day);
    } catch (error) {
      console.error("Erreur lors du chargement des disponibilités :", error);
    }
  };

  return (
    <div className="resIndivContainer">
      <div className="days">
        <div
          className={`day ${activeDay === 0 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(0)}
        >
          Monday
        </div>
        <div
          className={`day ${activeDay === 1 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(1)}
        >
          Tuesday
        </div>
        <div
          className={`day ${activeDay === 2 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(2)}
        >
          Wednesday
        </div>
        <div
          className={`day ${activeDay === 3 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(3)}
        >
          Thursday
        </div>
        <div
          className={`day ${activeDay === 4 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(4)}
        >
          Friday
        </div>
        <div
          className={`day ${activeDay === 5 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(5)}
        >
          Saturday
        </div>
        <div
          className={`day ${activeDay === 6 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(6)}
        >
          Sunday
        </div>
      </div>
      <div className="divLine"></div>
      <ReservationIndivAvailabilitiesCard availabilities={availabilities} />
    </div>
  );
};

export default ReservationIndivCard;
