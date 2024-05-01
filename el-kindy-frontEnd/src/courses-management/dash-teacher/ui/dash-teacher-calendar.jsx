import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import availabilitiesService from "../../services/availabilitiesService";
import algoService from "../../services/algoService";
import reservationIndivService from "../../services/reservationIndivService";
import { useSelector } from "react-redux";
import Spinner from "../../../ui/Spinner";
import { toast } from "react-toastify";

const DashTeacherCalendar = () => {
  const { user } = useSelector((state) => state.auth);

  const [teacherAvailabilities, setTeacherAvailabilities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [recizedAvailability, setRecizedAvailability] = useState(null);
  const [availabilityId, setAvailabilityId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [teacherReservations, setTeacherReservations] = useState([]);

  // const initialEvents = [
  //   {
  //     id: "1",
  //     title: "Event 1",
  //     startTime: "10:00",
  //     endTime: "12:00",
  //     recurring: true,
  //     daysOfWeek: [1], // Lundi
  //   },
  //   {
  //     id: "2",
  //     title: "Event 2",
  //     startTime: "14:00",
  //     endTime: "16:00",
  //     recurring: true,
  //     daysOfWeek: [2], // Mardi
  //   },
  //   {
  //     id: "3",
  //     title: "Event 3",
  //     startTime: "08:00",
  //     endTime: "10:00",
  //     recurring: true,
  //     daysOfWeek: [6], // Dimanche et Samedi
  //   },
  // ];

  useEffect(() => {
    // Charger les disponibilités de l'enseignant au montage du composant
    const fetchTeacherAvailabilities = async () => {
      try {
        const response = await availabilitiesService.getTeacherAvailabilities(
          user._id
        );

        setTeacherAvailabilities(
          algoService.fusionnerPlagesHoraires(response.data)
        );

        // console.log(teacherAvailabilities);
      } catch (error) {
        console.error("Error fetching teacher availabilities:", error);
      }
    };

    const fetchTeacherReservations = async () => {
      try {
        const response =
          await availabilitiesService.getTeacherAvailabilitiesReserved(
            user._id
          );
        setTeacherReservations(response.data);
      } catch (error) {
        console.error("Error fetching teacher reservations:", error);
      }
    };

    fetchTeacherAvailabilities();
    fetchTeacherReservations();
  }, [showModal, showDeleteModal]);

  // Transformer les disponibilités de l'enseignant en un format compatible avec FullCalendar
  const formattedEvents = [
    ...teacherAvailabilities.map((availability) => ({
      id: availability._id,
      title: "Available",
      startTime: availability.startTime,
      endTime: availability.endTime,
      recurring: true,
      daysOfWeek: [availability.day],
      // backgroundColor: "#3a87ad",
    })),
    ...teacherReservations.map((reservation) => ({
      id: reservation._id,
      title: "Reserved",
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      recurring: true,
      daysOfWeek: [reservation.day],
      backgroundColor: "#555",
    })),
  ];
  //-----------------------------
  const [eventDetails, setEventDetails] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelect = (dateInfo) => {
    setEventDetails(dateInfo);
    console.log("selected date details:", dateInfo.start);

    // Obtenir l'heure et les minutes de la date de début
    const startHour = dateInfo.start.getHours();
    const startMinutes = dateInfo.start.getMinutes();

    // Afficher les détails de la date de début dans la console
    console.log(
      "startTime:",
      startHour.toString().padStart(2, "0") +
        ":" +
        startMinutes.toString().padStart(2, "0")
    );

    // Obtenir l'heure et les minutes de la date de fin
    const endHour = dateInfo.end.getHours();
    const endMinutes = dateInfo.end.getMinutes();

    // Afficher les détails de la date de fin dans la console
    console.log(
      "endTime:",
      endHour.toString().padStart(2, "0") +
        ":" +
        endMinutes.toString().padStart(2, "0")
    );

    console.log("day:", dateInfo.start.getDay());
    setSelectedSlot(dateInfo);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false); // Masquer le modal lorsque vous appuyez sur "Cancel"
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEventClick = (eventInfo) => {
    setSelectedEvent(eventInfo);
    // console.log("selected event details:", eventInfo);
    console.log("clicked event id:", eventInfo.event.id);
    setShowDeleteModal(true);
    setAvailabilityId(eventInfo.event.id);
  };

  const handleEventResize = (eventInfo) => {
    // setRecizedAvailability(eventInfo);
    console.log("Resized event details:", eventInfo.event.end);
    updateAvailability(eventInfo);
  };

  const updateAvailability = (eventInfo) => {
    const resizedAvailabilityData = {
      startTime:
        eventInfo.event.start.getHours().toString().padStart(2, "0") +
        ":" +
        eventInfo.event.start.getMinutes().toString().padStart(2, "0"),
      endTime:
        eventInfo.event.end.getHours().toString().padStart(2, "0") +
        ":" +
        eventInfo.event.end.getMinutes().toString().padStart(2, "0"),
      day: eventInfo.event.start.getDay(), // 0 pour dimanche, 1 pour lundi, ...
      userId: user._id,
    };
    try {
      setIsAdding(true);
      // Appel à la fonction pour ajouter la disponibilité avec les détails requis
      availabilitiesService.updateAvailability(
        eventInfo.event.id,
        resizedAvailabilityData
      );
      setIsAdding(false);
      toast.success("Availability updated successfully", {
        style: { fontSize: "2rem" },
      });
      console.log("Availability added successfully");
    } catch (error) {
      console.error("Error adding availability:", error);
    }
  };

  const handleEventDrop = (eventDropInfo) => {
    // setEventDetails(eventDropInfo.oldEvent);
    console.log("Dropped event details:", eventDropInfo);
    updateAvailability(eventDropInfo);
  };

  const addAvailability = async () => {
    const startTime = selectedSlot.start;
    const endTime = selectedSlot.end;
    const day = selectedSlot.start.getDay();

    // Fonction pour diviser une plage horaire en intervalles de 30 minutes
    const divideTimeRange = (start, end) => {
      const intervals = [];
      let current = new Date(start);

      while (current < end) {
        const next = new Date(current);
        next.setMinutes(current.getMinutes() + 30);
        intervals.push({ startTime: current, endTime: next });
        current = next;
      }

      return intervals;
    };

    const dividedIntervals = divideTimeRange(startTime, endTime);

    try {
      setIsAdding(true);

      // Ajouter chaque intervalle de 30 minutes dans la base de données
      for (const interval of dividedIntervals) {
        const availabilityData = {
          startTime:
            interval.startTime.getHours().toString().padStart(2, "0") +
            ":" +
            interval.startTime.getMinutes().toString().padStart(2, "0"),
          endTime:
            interval.endTime.getHours().toString().padStart(2, "0") +
            ":" +
            interval.endTime.getMinutes().toString().padStart(2, "0"),
          day: day,
          userId: user._id,
        };

        // Appel à la fonction pour ajouter la disponibilité avec les détails requis
        await availabilitiesService.addAvailability(availabilityData);
      }

      setIsAdding(false);
      setShowModal(false);
      toast.success("Availability added successfully", {
        style: { fontSize: "2rem" },
      });
      console.log("Availability added successfully");
    } catch (error) {
      console.error("Error adding availability:", error);
    }
  };

  const deleteAvailability = async () => {
    setIsAdding(true);

    try {
      await availabilitiesService.deleteAvailability(availabilityId);
      setIsAdding(false);
      setShowDeleteModal(false);
      toast.success("Availability deleted successfully", {
        style: { fontSize: "2rem" },
      });
    } catch (error) {
      console.error("Error adding availability:", error);
    }
  };

  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function removeOverlappingRanges(tab1, tab2) {
    let result = [...tab1]; // Copie de tab1 dans un nouveau tableau

    for (let i = 0; i < result.length; i++) {
      const plage1 = result[i];

      for (let j = 0; j < tab2.length; j++) {
        const plage2 = tab2[j];

        if (
          plage1.day === plage2.day &&
          plage1.startTime <= plage2.startTime &&
          plage1.endTime >= plage2.endTime
        ) {
          // La plage2 est entièrement incluse dans la plage1
          // On la divise en deux plages

          // Première partie de la plage2
          const nouvellePlage1 = {
            ...plage1,
            endTime: plage2.startTime,
          };

          // Deuxième partie de la plage2
          const nouvellePlage2 = {
            ...plage1,
            _id: generateUniqueId(),
            startTime: plage2.endTime,
          };

          result.splice(i, 1, nouvellePlage1, nouvellePlage2);
        } else if (
          plage1.day === plage2.day &&
          plage1.startTime <= plage2.endTime &&
          plage1.endTime >= plage2.startTime
        ) {
          // La plage2 chevauche partiellement la plage1
          // On adapte les heures de début et de fin de plage1

          if (plage1.startTime < plage2.startTime) {
            plage1.endTime = plage2.startTime;
          } else {
            plage1.startTime = plage2.endTime;
          }
        }
      }
    }

    // Supprimer les plages où startTime est égal à endTime
    result = result.filter((plage) => plage.startTime !== plage.endTime);

    return result;
  }

  function testALgo() {}
  return (
    <div className="dash-calendar-container">
      {isAdding && <Spinner />}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        height="auto"
        selectable={true}
        editable={true}
        select={handleSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        events={formattedEvents.map((event) => ({
          ...event,
          start: `2024-04-01T${event.startTime}:00`,
          end: `2024-04-01T${event.endTime}:00`,
        }))}
        // Affichage des jours de la semaine avec leur nom complet
        dayHeaderContent={(arg) =>
          arg.date.toLocaleDateString("en-US", { weekday: "long" })
        }
        // Affichage des heures de 8:00 à 21:00
        slotMinTime="08:00:00"
        slotMaxTime="21:00:00"
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: false,
        }}

        // events={formattedEvents}
      />
      {showModal && (
        <div className="addAvailabilityModal">
          <div className="addAvailabilityModal-container">
            <div className="addAvailabilityModal__title">Availability</div>
            <hr className="model-hr" />
            <div className="addAvailabilityModal__time">
              <b>StartTime: </b>{" "}
              {selectedSlot.start.getHours().toString().padStart(2, "0")}:
              {selectedSlot.start.getMinutes().toString().padStart(2, "0")}
            </div>
            <div className="addAvailabilityModal__time">
              <b>EndTime: </b>{" "}
              {selectedSlot.end.getHours().toString().padStart(2, "0")}:
              {selectedSlot.end.getMinutes().toString().padStart(2, "0")}
            </div>
            <div className="addAvailabilityModal__day">
              <b>Day: </b>{" "}
              {selectedSlot.start.toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </div>
            <hr className="model-hr" />
            <div className="addAvailabilityModal__btns">
              <div
                className="addAvailabilityModal__addBtn"
                onClick={addAvailability}
              >
                Add
              </div>
              <div
                className="addAvailabilityModal__cancelBtn"
                onClick={handleCancel}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="addAvailabilityModal delete">
          <div className="addAvailabilityModal-container delete">
            <div className="deleteAvailabilityModal__title">
              Are you sure you want to delete this availability?
            </div>
            <div className="addAvailabilityModal__btns">
              <div
                className="addAvailabilityModal__addBtn delete"
                onClick={handleCancelDelete}
              >
                No, cancel
              </div>
              <div
                className="addAvailabilityModal__cancelBtn delete"
                onClick={deleteAvailability}
              >
                Yes, delete
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashTeacherCalendar;
