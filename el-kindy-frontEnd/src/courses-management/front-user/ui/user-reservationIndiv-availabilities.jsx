import "../../../../public/assets/css/style.css";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import reservationIndivService from "../../services/reservationIndivService";
import { useNavigate } from "react-router-dom";

const ReservationIndivAvailabilitiesCard = ({ availabilities }) => {
  console.log(availabilities);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();

  const checkAvailability = (startTime) => {
    const availability = availabilities.find(
      (availability) => availability.startTime === startTime
    );
    return availability ? availability : null;
  };

  const handleReservation = async (availability) => {
    const resData = {
      userId: user._id,
      courseId: id,
      availabilityId: availability._id,
      teacherId: availability.userId,
    };
    try {
      const response = await reservationIndivService.addReservationIndiv(
        resData
      );

      const checkoutData = {
        amout: 5000,
      };
      const checkoutResponse =
        await reservationIndivService.checkoutReservationIndiv(checkoutData);
      // console.log(checkoutResponse.data.result.link);
      window.location.href = checkoutResponse.data.result.link;
      // navigate("/user-side");
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
    }
  };

  return (
    <div className="day-availabilities">
      <div
        className={`plage ${checkAvailability("08:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("08:00"))}
      >
        08:00 - 08:30
      </div>
      <div
        className={`plage ${checkAvailability("08:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("08:30"))}
      >
        08:30 - 09:00
      </div>
      <div
        className={`plage ${checkAvailability("09:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("09:00"))}
      >
        09:00 - 09:30
      </div>
      <div
        className={`plage ${checkAvailability("09:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("09:30"))}
      >
        09:30 - 10:00
      </div>
      <div
        className={`plage ${checkAvailability("10:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("10:00"))}
      >
        10:00 - 10:30
      </div>
      <div
        className={`plage ${checkAvailability("10:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("10:30"))}
      >
        10:30 - 11:00
      </div>
      <div
        className={`plage ${checkAvailability("11:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("11:00"))}
      >
        11:00 - 11:30
      </div>
      <div
        className={`plage ${checkAvailability("11:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("11:30"))}
      >
        11:30 - 12:00
      </div>
      <div
        className={`plage ${checkAvailability("12:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("12:00"))}
      >
        12:00 - 12:30
      </div>
      <div
        className={`plage ${checkAvailability("12:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("12:30"))}
      >
        12:30 - 13:00
      </div>
      <div
        className={`plage ${checkAvailability("13:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("13:00"))}
      >
        13:00 - 13:30
      </div>
      <div
        className={`plage ${checkAvailability("13:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("13:30"))}
      >
        13:30 - 14:00
      </div>
      <div
        className={`plage ${checkAvailability("14:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("14:00"))}
      >
        14:00 - 14:30
      </div>
      <div
        className={`plage ${checkAvailability("14:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("14:30"))}
      >
        14:30 - 15:00
      </div>
      <div
        className={`plage ${checkAvailability("15:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("15:00"))}
      >
        15:00 - 15:30
      </div>
      <div
        className={`plage ${checkAvailability("15:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("15:30"))}
      >
        15:30 - 16:00
      </div>
      <div
        className={`plage ${checkAvailability("16:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("16:00"))}
      >
        16:00 - 16:30
      </div>
      <div
        className={`plage ${checkAvailability("16:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("16:30"))}
      >
        16:30 - 17:00
      </div>
      <div
        className={`plage ${checkAvailability("17:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("17:00"))}
      >
        17:00 - 17:30
      </div>
      <div
        className={`plage ${checkAvailability("17:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("17:30"))}
      >
        17:30 - 18:00
      </div>
      <div
        className={`plage ${checkAvailability("18:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("18:00"))}
      >
        18:00 - 18:30
      </div>
      <div
        className={`plage ${checkAvailability("18:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("18:30"))}
      >
        18:30 - 19:00
      </div>
      <div
        className={`plage ${checkAvailability("19:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("19:00"))}
      >
        19:00 - 19:30
      </div>
      <div
        className={`plage ${checkAvailability("19:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("19:30"))}
      >
        19:30 - 20:00
      </div>
      <div
        className={`plage ${checkAvailability("20:00") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("20:00"))}
      >
        20:00 - 20:30
      </div>
      <div
        className={`plage ${checkAvailability("20:30") ? "" : "disabled"}`}
        onClick={() => handleReservation(checkAvailability("20:30"))}
      >
        20:30 - 21:00
      </div>
    </div>
  );
};

export default ReservationIndivAvailabilitiesCard;
