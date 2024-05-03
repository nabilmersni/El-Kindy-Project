import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import reservationIndivService from "../../services/reservationIndivService";
import algoService from "../../services/algoService";
import { useSelector } from "react-redux";
import Spinner from "../../../ui/Spinner";
import { toast } from "react-toastify";
import studentTrackingSheetService from "../../services/studentTrackingSheetService";

const DashTeacherSchedulesCalendar = () => {
  const { user } = useSelector((state) => state.auth);

  const [teacherSchedules, setTeacherSchedules] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [date, setDate] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [enteredCourseContent, setEnteredCourseContent] = useState("");
  const [enteredObservation, setEnteredObservation] = useState("");

  const courseContentChangeHandle = (event) => {
    setEnteredCourseContent(event.target.value);
  };

  const observationChangeHandle = (event) => {
    setEnteredObservation(event.target.value);
  };

  useEffect(() => {
    const fetchTeacherSchedules = async () => {
      try {
        const response =
          await reservationIndivService.getTeacherReservationIndiv(user._id);

        setTeacherSchedules(response.data);
        console.log(response.data);

        // console.log(teacherSchedules);
      } catch (error) {
        console.error("Error fetching teacher Schedules:", error);
      }
    };

    fetchTeacherSchedules();
  }, [user._id, showModal]);

  // Transformer les disponibilités de l'enseignant en un format compatible avec FullCalendar
  const formattedEvents = [
    ...teacherSchedules.map((res) => ({
      id: res.userId._id,
      title: res.userId.fullname,
      startTime: res.availabilityId.startTime,
      endTime: res.availabilityId.endTime,
      recurring: true,
      daysOfWeek: [res.availabilityId.day],
      // display: "background",
      // backgroundColor: "#3a87ad",
    })),
  ];
  //-----------------------------

  const handleEventClick = async (eventInfo) => {
    setSelectedEvent(eventInfo);
    console.log("clicked event id:", eventInfo.event.id);

    // console.log(eventInfo.event.start);
    const eventDate = new Date(eventInfo.event.start);
    const formattedDate = eventDate.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY

    console.log("Event start date:", formattedDate);
    setDate(eventDate);
    setUserId(eventInfo.event.id);
    setShowModal(true);
    // setLesson(getReservation.data);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const studentTrackingSheetData = {
      date: date,
      duration: "30min",
      courseContent: enteredCourseContent,
      observation: enteredObservation,
      userId: userId,
      teacherId: user._id,
    };

    try {
      // Set loading state or show a loading spinner here if needed
      setIsAdding(true);

      console.log(studentTrackingSheetData);
      // Make the API call
      const response =
        await studentTrackingSheetService.addStudentTrackingSheet(
          studentTrackingSheetData
        );

      // Handle the response (success or error)
      console.log("Student Tracking Sheet added successfully:", response.data);

      setIsAdding(false);

      toast.success("Student Tracking Sheet added successfully", {
        style: { fontSize: "2rem" },
      });

      // Clear the form or handle success as needed
    } catch (error) {
      console.error("Error adding subCategory:", error.message);
      setIsAdding(false);
      toast.error(error.response.data.message || "An error occurred", {
        style: { fontSize: "2rem" },
      });
    }

    setShowModal(false);
  };

  return (
    <div className="dash-calendar-container">
      {isAdding && <Spinner />}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        height="auto"
        selectable={false}
        editable={false}
        eventClick={handleEventClick}
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
          <form
            onSubmit={submitHandler}
            className="addAvailabilityModal-container"
          >
            <div className="addAvailabilityModal__title">
              Student tracking sheet
            </div>
            <hr className="model-hr" />
            <div className="course-add-form__input__group">
              <label
                htmlFor="courseName"
                className="course-add-form__input__label"
              >
                Course content <span>*</span>
              </label>
              <input
                id="courseName"
                name="courseName"
                type="text"
                className="course-add-form__input"
                placeholder="Course content"
                onChange={courseContentChangeHandle}
              />
            </div>

            <div className="course-add-form__input__group">
              <label
                htmlFor="courseName"
                className="course-add-form__input__label"
              >
                Observation <span>*</span>
              </label>
              <input
                id="courseName"
                name="courseName"
                type="text"
                className="course-add-form__input"
                placeholder="Observation"
                onChange={observationChangeHandle}
              />
            </div>
            <hr className="model-hr" />
            <div className="addAvailabilityModal__btns">
              <div
                className="addAvailabilityModal__addBtn"
                // onClick={addAvailability}
              >
                <button type="submit">Add</button>
              </div>
              <div
                className="addAvailabilityModal__cancelBtn"
                // onClick={handleCancel}
              >
                Cancel
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DashTeacherSchedulesCalendar;
