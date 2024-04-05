import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import CourseCard from "../ui/course-card";
import DashAdminCoursesHeader from "../ui/dash-admin-courses__header";
import courseService from "../../services/courseService";
import { useEffect, useState } from "react";

const DashAdminCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await courseService.getAllCourses();
        setCourses(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des cours :", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (deletedCourseId) => {
    // Update the courses list after deletion
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course._id !== deletedCourseId)
    );
  };

  return (
    <DashLayout>
      <DashAdminCoursesHeader />
      <div className="dash__content__container__courses-list">
        {courses.map((item, index) => (
          <CourseCard key={index} data={item} onDelete={handleDelete} />
        ))}
      </div>
    </DashLayout>
  );
};

export default DashAdminCourses;
