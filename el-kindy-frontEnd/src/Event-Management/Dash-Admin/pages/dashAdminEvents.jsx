import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import CourseCard from "../../../courses-management/dash-admin/ui/course-card";
import DashAdminCoursesHeader from "../../../courses-management/dash-admin/ui/dash-admin-courses__header";
import DashAdminEventHeader from "../ui/dashAdminEventHeader";
import EventCard from "../ui/eventCard";

const DashAdminEvents = () => {
  
  
  return (
    <DashLayout>
      <DashAdminEventHeader />
      <div className="dash__content__container__courses-list">
        <EventCard />
      </div>
    </DashLayout>
  );
};

export default DashAdminEvents;
