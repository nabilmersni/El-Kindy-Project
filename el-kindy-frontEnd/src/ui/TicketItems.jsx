import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTicketsByEventId,
  getEventById,
  getTicketByIdAndEventId,
} from "../Event-Management/Services/apiEvent";
import DashAnimation from "../dashboard-layout/dash-animation";
import guitarAnimation from "../../public/lottieAnimations/guitar.json";
import speakerAnimation from "../../public/lottieAnimations/speaker.json";
import QRCode from "qrcode.react";
import Lottie from "react-lottie";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "react-toastify/dist/ReactToastify.css";

function TicketItems() {
  const { eventId, ticketId } = useParams(); // Get eventId and ticketId from URL params
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [eventId, ticketId]);

  const fetchTicket = async () => {
    try {
      const ticketData = await getTicketByIdAndEventId(eventId, ticketId);
      console.log("Ticket Data:", ticketData);
      setTicket(ticketData);
      console.log("Ticket Data:", ticketData);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };
  const handleExit = () => {
    navigate("/user-side/AllEvents");
  };
  //-----------------------------
  // const downloadPDF = () => {
  //   const ticketCards = document.querySelectorAll(".ticket-card");
  //   if (!ticketCards.length) {
  //     console.error("Ticket cards not found");
  //     return;
  //   }

  //   setLoader(true);

  //   const doc = new jsPDF("p", "mm", "a4");

  //   let yOffset = 10;

  //   ticketCards.forEach((ticketCard, index) => {
  //     const qrCodeCanvas = ticketCard.querySelector(".QRCode");
  //     if (!qrCodeCanvas) {
  //       console.error(`QR code canvas not found for ticket card `);
  //       return;
  //     }

  //     const qrCodeImgData = qrCodeCanvas.toDataURL("image/png");
  //     if (!qrCodeImgData) {
  //       console.error(`Failed to convert QR code to data URL for ticket card `);
  //       return;
  //     }

  //     doc.addImage(qrCodeImgData, "PNG", 10, yOffset, 50, 50);
  //     yOffset += 60; // QRCode display

  //     const ticketDetails = ticketCard.querySelector(".ticket-details");
  //     if (!ticketDetails) {
  //       console.error(`Ticket details not found for ticket card `);
  //       return;
  //     }

  //     const eventText = `Event Name: ${ticket.event.EventName}\nEvent Date: ${ticket.event.EventDate}\nTicket Price: ${ticket.event.PriceTicket} Tnd\nPurchased At: ${ticket.purchasedAt}`;
  //     doc.text(eventText, 10, yOffset);
  //     yOffset += ticketDetails.clientHeight + 10;

  //     if (index === ticketCards.length - 1) {
  //       setLoader(false);
  //       doc.save("ticket.pdf");
  //     }
  //   });
  // };
  const downloadPDF = () => {
    const ticketCards = document.querySelectorAll(".ticket-card");
    if (!ticketCards.length) {
      console.error("Ticket cards not found");
      return;
    }

    setLoader(true);

    const doc = new jsPDF("p", "mm", "a4");

    let yOffset = 10;

    ticketCards.forEach((ticketCard, index) => {
      const qrCodeCanvas = ticketCard.querySelector(".QRCode");
      if (!qrCodeCanvas) {
        console.error(`QR code canvas not found for ticket card `);
        return;
      }

      const qrCodeImgData = qrCodeCanvas.toDataURL("image/png");
      if (!qrCodeImgData) {
        console.error(`Failed to convert QR code to data URL for ticket card `);
        return;
      }

      // Calculate position X for the ticket details
      const textX = 70;

      // Draw QR code
      doc.addImage(qrCodeImgData, "PNG", 10, yOffset, 50, 50);

      // Draw ticket details next to the QR code
      const ticketDetails = ticketCard.querySelector(".ticket-details");
      if (!ticketDetails) {
        console.error(`Ticket details not found for ticket card `);
        return;
      }
      const eventText = `Event Name: ${ticket.event.EventName}\nEvent Place: ${ticket.event.EventPlace}\nEvent Date: ${ticket.event.EventDate}\nTicket Price: ${ticket.event.PriceTicket} Cent\nPurchased At: ${ticket.purchasedAt}`;
      doc.text(eventText, textX, yOffset + 25); // Adjust Y offset according to your needs

      // Add title
      const titleText = "Your Ticket";
      const textWidth =
        (doc.getStringUnitWidth(titleText) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const titleX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
      doc.text(titleText, titleX, yOffset - 10);

      yOffset += 60; // Increment Y offset for the next ticket card

      if (index === ticketCards.length - 1) {
        setLoader(false);
        doc.save("ticket.pdf");
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center w-full max-w-screen-lg">
        <h2 className="text-xl font-bold mb-4">Your Ticket</h2>

        <div className="ticket-container">
          {ticket ? (
            <div className="ticket-card flex relative border border-gray-300 p-4 mb-4">
              <div className="col-span-2 md:col-span-1">
                <div
                  className="Tickets__card--header-exitBTn absolute top-0 right-0 mr-4"
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
                <QRCode
                  className="QRCode"
                  value="https://www.facebook.com/elkindy.conservatoire"
                  size={150}
                />
                <button
                  className="receipt-modal-download-button block mt-4 mx-auto"
                  onClick={downloadPDF}
                  disabled={loader}
                >
                  {loader ? <span>Downloading</span> : <span>Download</span>}
                </button>
              </div>
              <div className="ticket-details flex-1 ml-4">
                <div className="mt-4">
                  <p className="text-lg font-semibold">
                    Event Name: {ticket.event.EventName}
                  </p>
                  <p className="text-base">
                    Event Date: {ticket.event.EventDate}
                  </p>
                  <p className="text-base">
                    Ticket Price: {ticket.event.PriceTicket} Cent
                  </p>
                  <p className="text-base">
                    Event Place: {ticket.event.EventPlace}
                  </p>
                  <p className="text-base">
                    Purchased At: {ticket.purchasedAt}
                  </p>
                </div>
              </div>
              <div className="logoImage-Ticket">
                <img
                  src="/assets/img/logo.png"
                  alt="el kindy logo"
                  className="pr-[15px] pb-[5px]"
                />
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default TicketItems;
