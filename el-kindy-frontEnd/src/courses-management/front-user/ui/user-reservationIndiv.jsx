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

  // 0 pour dimanche, 1 pour lundi, ...
  return (
    <div className="resIndivContainer">
      <div className="days">
        <div
          className={`day ${activeDay === 1 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(1)}
        >
          Monday
        </div>
        <div
          className={`day ${activeDay === 2 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(2)}
        >
          Tuesday
        </div>
        <div
          className={`day ${activeDay === 3 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(3)}
        >
          Wednesday
        </div>
        <div
          className={`day ${activeDay === 4 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(4)}
        >
          Thursday
        </div>
        <div
          className={`day ${activeDay === 5 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(5)}
        >
          Friday
        </div>
        <div
          className={`day ${activeDay === 6 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(6)}
        >
          Saturday
        </div>
        <div
          className={`day ${activeDay === 0 ? "active" : ""}`}
          onClick={() => fetchAvailabilitiesByDay(0)}
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
