import React, { useState, useEffect } from "react";
import {
  checkPaymentStatus,
  getEventById,
  payement,
} from "../Services/apiEvent";
import { useParams } from "react-router-dom";

const Payement = ({ eventId }) => {
  const [form, setForm] = useState({ amount: "" });
  //const { eventId } = useParams();
  const [eventData, setEvent] = useState(null);

  useEffect(() => {
    console.log(eventId);
    // checkPaymentStatus(eventId).then((status) => {
    //   if (status === 'paid') {

    //   }
    // });
    getEventById(eventId)
      .then((eventData) => {
        setEvent(eventData);
        //console.log(eventData)
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await payement({ amount: form.amount }, eventId);
      console.log("Payment submitted for event ID:", eventId);
    } catch (error) {
      console.error("Payment submission error:", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4"> Complete your Payment</h2>
        {eventData && (
          <div className="text-center">
            <p className="mb-4">
              Confirm your Ticket payment of{" "}
              <span className="underline">{eventData.PriceTicket} Cent</span>
            </p>
          </div>
        )}
        <button
          className="px-4 py-2 bg-lightBlue text-nav text-md font-extrabold font-nunito rounded-[.8rem] hover:bg-secondaryLight capitalize my-[2rem]"
          size={"1rem"}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default Payement;
