import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import userAvailabilitiesService from "../../services/userAvailabilitiesService";
import algoService from "../../services/algoService";
import { useSelector } from "react-redux";
import Spinner from "../../../ui/Spinner";
import { toast } from "react-toastify";
import groupService from "../../services/groupService";
import groupAvailabilitiesService from "../../services/groupAvailabilitiesService";

const UserAvailabilitie = () => {
  const { user } = useSelector((state) => state.auth);

  const [userAvailabilities, setUserAvailabilities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [recizedAvailability, setRecizedAvailability] = useState(null);
  const [availabilityId, setAvailabilityId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

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
    // Charger les disponibilités de l 'etudiant au montage du composant
    const fetchUserAvailabilities = async () => {
      try {
        const response =
          await userAvailabilitiesService.getUserAvailabilitiesByUserId(
            user._id
          );

        setUserAvailabilities(response.data);
        console.log(userAvailabilities);
      } catch (error) {
        console.error("Error fetching user availabilities:", error);
      }
    };

    fetchUserAvailabilities();
  }, [showModal, showDeleteModal]);

  // Transformer les disponibilités de l'etudiant en un format compatible avec FullCalendar
  const formattedEvents = userAvailabilities.map((availability) => {
    return {
      id: availability._id,
      title: "Available",
      startTime: availability.startTime,
      endTime: availability.endTime,
      recurring: true,
      daysOfWeek: [availability.day],
    };
  });
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
      userAvailabilitiesService.updateUserAvailability(
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
    const availabilityData = {
      startTime:
        selectedSlot.start.getHours().toString().padStart(2, "0") +
        ":" +
        selectedSlot.start.getMinutes().toString().padStart(2, "0"),
      endTime:
        selectedSlot.end.getHours().toString().padStart(2, "0") +
        ":" +
        selectedSlot.end.getMinutes().toString().padStart(2, "0"),
      day: selectedSlot.start.getDay(), // 0 pour dimanche, 1 pour lundi, ...
      userId: user._id,
      level: 2,
    };
    try {
      setIsAdding(true);
      // Appel à la fonction pour ajouter la disponibilité avec les détails requis
      await userAvailabilitiesService.createUserAvailability(availabilityData);
      console.log("Availability added successfully");
      //step 1 : on va executer l'lgorithme pour grouper user av data

      const response2 =
        await userAvailabilitiesService.getAllUserAvailabilities();

      console.log("lkooooooooool");

      // console.log(response2.data);
      const preparedDate = algoService.regrouperParUserID(response2.data);

      //step 2 : found best common group
      const bestCommonTimeSlots =
        algoService.findBestCommonTimeSlots(preparedDate);
      //fusionner maintenant les heures du mm jour
      const plagesFusionnees =
        algoService.fusionnerPlagesHoraires(bestCommonTimeSlots);
      console.log(plagesFusionnees);

      //step 3 maintenant on va tester si le nombre du group = 5
      // si nbUsers == 5 donc on va créer un nouveau group : le nom commence par le niveau
      // puis on va jouter une lettre si le group existe !!
      if (plagesFusionnees.length == 2) {
        //créer new group

        const groupData = {
          name: "2",
          users: plagesFusionnees[0].userIDs,
        };
        console.log("new group" + groupData.users);

        const responseG = await groupService.createGroup(groupData);
        const groupId = responseG.data._id; // Récupérer l'ID du groupe créé
        console.log("ID du groupe créé : ", groupId);

        // Maintenant, on ajouter les disponibilités du group
        for (const plage of plagesFusionnees) {
          const groupAvailabilityData = {
            startTime: plage.startTime,
            endTime: plage.endTime,
            day: plage.day,
            level: "2",
            groupId: groupId,
          };

          const responseGA =
            await groupAvailabilitiesService.createGroupAvailabilities(
              groupAvailabilityData
            );
          console.log(responseGA.status);
        }
      }
      //--------------------end algo
      setIsAdding(false);
      setShowModal(false);
      toast.success("Availability added successfully", {
        style: { fontSize: "2rem" },
      });
    } catch (error) {
      console.error("Error adding availability:", error);
    }
  };

  const deleteAvailability = async () => {
    setIsAdding(true);

    try {
      await userAvailabilitiesService.deleteUserAvailabilityById(
        availabilityId
      );
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

  return (
    <div className="dash-calendar-container userSide">
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
        <div className="addAvailabilityModal userSide">
          <div className="addAvailabilityModal-container userSide">
            <div className="addAvailabilityModal__title userSide">
              Availability
            </div>
            <hr className="model-hr" />
            <div className="addAvailabilityModal__time userSide">
              <b>StartTime: </b>{" "}
              {selectedSlot.start.getHours().toString().padStart(2, "0")}:
              {selectedSlot.start.getMinutes().toString().padStart(2, "0")}
            </div>
            <div className="addAvailabilityModal__time userSide">
              <b>EndTime: </b>{" "}
              {selectedSlot.end.getHours().toString().padStart(2, "0")}:
              {selectedSlot.end.getMinutes().toString().padStart(2, "0")}
            </div>
            <div className="addAvailabilityModal__day userSide">
              <b>Day: </b>{" "}
              {selectedSlot.start.toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </div>
            <hr className="model-hr userSide" />
            <div className="addAvailabilityModal__btns userSide">
              <div
                className="addAvailabilityModal__addBtn userSide"
                onClick={addAvailability}
              >
                Add
              </div>
              <div
                className="addAvailabilityModal__cancelBtn userSide"
                onClick={handleCancel}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="addAvailabilityModal delete userSide">
          <div className="addAvailabilityModal-container userSide delete ">
            <div className="deleteAvailabilityModal__title userSide">
              Are you sure you want to delete this availability?
            </div>
            <div className="addAvailabilityModal__btns userSide">
              <div
                className="addAvailabilityModal__addBtn delete userSide"
                onClick={handleCancelDelete}
              >
                No, cancel
              </div>
              <div
                className="addAvailabilityModal__cancelBtn delete userSide"
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

export default UserAvailabilitie;
