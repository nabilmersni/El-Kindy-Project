import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import DashAdminCoursesHeader from "../ui/dash-admin-courses__header";

const DashAdminCourses = () => {
  return (
    <DashLayout>
      <DashAdminCoursesHeader />
      <div class="dash__content__container__courses-list"></div>
    </DashLayout>
  );
};

export default DashAdminCourses;
