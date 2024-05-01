import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import availabilitiesService from "../../services/availabilitiesService";
import algoService from "../../services/algoService";
import groupAvailabilitiesService from "../../services/groupAvailabilitiesService";
import reservationIndivService from "../../services/reservationIndivService";
import { useSelector } from "react-redux";
import Spinner from "../../../ui/Spinner";
import { toast } from "react-toastify";

const DashAdminCalendar = () => {
  const { user } = useSelector((state) => state.auth);

  const [teacherAvailabilities, setTeacherAvailabilities] = useState([]);
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
    // Charger les disponibilités de l'enseignant au montage du composant
    const fetchTeacherAvailabilities = async () => {
      try {
        const response =
          await groupAvailabilitiesService.getAllGroupAvailabilitiesFilter();

        const groupedById = algoService.regrouperParGroupId([response.data]);
        // console.log(groupedById);
        const dividedPlagesHoraires =
          algoService.dividePlagesHoraires(groupedById);
        // console.log("Plages Horaires Divisées :", dividedPlagesHoraires);

        const groupes = Object.keys(dividedPlagesHoraires);
        const finalAssignments = await algoService.matchingStable(
          dividedPlagesHoraires,
          groupes
        );

        // console.log("Meilleure affectation :", finalAssignments[0]);

        setTeacherAvailabilities(finalAssignments[0]);
        // console.log(finalAssignments[0]);

        console.log(Object.keys(teacherAvailabilities).length);

        // console.log(teacherAvailabilities);
      } catch (error) {
        console.error("Error fetching teacher availabilities:", error);
      }
    };

    fetchTeacherAvailabilities();
  }, []);

  // Transformer les disponibilités de l'enseignant en un format compatible avec FullCalendar
  const formattedEvents = Object.keys(teacherAvailabilities).map(
    (plageString) => {
      console.log(plageString);
      const plage = JSON.parse(plageString);
      const { day, start, end } = plage;
      console.log(plage.startTime);

      return {
        id: teacherAvailabilities[plageString],
        title: plage.level,
        startTime: plage.startTime,
        endTime: plage.endTime,
        recurring: true,
        daysOfWeek: [day],
      };
    }
  );
  //-----------------------------

  return (
    <div className="dash-calendar-container">
      {isAdding && <Spinner />}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        height="auto"
        editable={false}
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
    </div>
  );
};

export default DashAdminCalendar;
