import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import CourseCard from "../ui/course-card";
import DashAdminCoursesHeader from "../ui/dash-admin-courses__header";

const DashAdminCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to Sketching and Shading",
      type: "In Groupe",
      price: 60,
      category: "Drawing",
    },
    {
      id: 2,
      title: "Introduction to Sketching and Shading",
      type: "In Groupe",
      price: 60,
      category: "Drawing",
    },
    {
      id: 3,
      title: "Introduction to Sketching and Shading",
      type: "In Groupe",
      price: 60,
      category: "Drawing",
    },
    {
      id: 4,
      title: "Introduction to Sketching and Shading",
      type: "In Groupe",
      price: 60,
      category: "Drawing",
    },
  ];
  return (
    <DashLayout>
      <DashAdminCoursesHeader />
      <div className="dash__content__container__courses-list">
        {courses.map((item, index) => (
          <CourseCard key={index} data={item} />
        ))}
      </div>
    </DashLayout>
  );
};

export default DashAdminCourses;
