import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import CourseCard from "../../../courses-management/dash-admin/ui/course-card";
import DashAdminCoursesHeader from "../../../courses-management/dash-admin/ui/dash-admin-courses__header";
import DashAdminEventHeader from "../ui/dashAdminEventHeader";
import EventCard from "../ui/eventCard";
import { useEffect, useState } from "react";
import { getallEvents } from "../../Services/apiEvent";

const DashAdminEvents = () => {
  const[eventList, setEventList] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResult = await getallEvents();

       
        if (Array.isArray(eventsResult)) {
          setEventList(eventsResult);
        } else {
          console.error("Error: eventsResult is not an array");

        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);


  return (
    <DashLayout>
      <DashAdminEventHeader />
      <div className="dash__content__container__courses-list">
        {eventList.map((items, index) => (
        <EventCard key={index} data={items}
         />
        ))}
      </div>
    </DashLayout>
  );
};

export default DashAdminEvents;
