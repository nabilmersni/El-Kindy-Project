import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import CourseCard from "../../../courses-management/dash-admin/ui/course-card";
import DashAdminCoursesHeader from "../../../courses-management/dash-admin/ui/dash-admin-courses__header";
import DashAdminEventHeader from "../ui/dashAdminEventHeader";
import EventCard from "../ui/eventCard";
import { useEffect, useState } from "react";
import { getallEvents } from "../../Services/apiEvent";

const DashAdminEvents = () => {
  const [eventList, setEventList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResult = await getallEvents();

        if (Array.isArray(eventsResult)) {
          setEventList(eventsResult);
          console.log("liste", eventsResult);
        } else {
          console.error("Error: eventsResult is not an array");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredEvents = eventList.filter(
    (event) =>
      event &&
      event.EventName &&
      event.EventName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDeleteEvent = (deletedEventId) => {
    setEventList((prevEventList) =>
      prevEventList.filter((event) => event._id !== deletedEventId)
    );
  };
  return (
    <DashLayout>
      <DashAdminEventHeader
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
      />
      <div className="dash__content__container__courses-list">
        {/* {eventList.map((items, index) => (
          <EventCard key={index} data={items} />
        ))} */}
        {filteredEvents.map((item, index) => (
          <EventCard
            key={index}
            data={item}
            onDeleteEvent={handleDeleteEvent}
          />
        ))}
      </div>
    </DashLayout>
  );
};

export default DashAdminEvents;
