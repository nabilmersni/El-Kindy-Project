import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import AddNewCourseCard from "../ui/add-new-course-card";

const DashAdminAddNewCourse = () => {
  return (
    <DashLayout>
      <AddNewCourseCard />
    </DashLayout>
  );
};

export default DashAdminAddNewCourse;
