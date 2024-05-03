import "../../../../public/assets/css/front-style.css";
import { useParams } from "react-router-dom";
import subCategoriesService from "../../services/subCategoriesService";
import reservationIndivService from "../../services/reservationIndivService";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UserLessonCard = ({ course }) => {
  const { user } = useSelector((state) => state.auth);
  const [reservation, setReservation] = useState([null]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          await reservationIndivService.getReservationsByUserIdAndCourseId(
            user._id,
            course._id
          );
        setReservation(response.data.length > 0);
      } catch (error) {
        console.error("Erreur lors du chargement des cours :", error);
      }
    };

    fetchData();
  }, [course._id, user._id]);

  return (
    <div className="subcategoriesLessons__card">
      <div className="subcategoriesLessons__card-img-container">
        <img
          src={`http://localhost:3000/${course.imageUrl}`}
          className="subcategoriesLessons__card-img"
        />
      </div>
      <div className="subcategoriesLessons__card-title">
        {course.courseTitle}
      </div>
      <div className="subcategoriesLessons__card-level">All levels</div>
      {reservation ? (
        <Link
          to={"/user-side"}
          className="subcategoriesLessons__card-inscriBtn"
        >
          My Courses
        </Link>
      ) : (
        <Link
          to={
            course.courseType === "Individual"
              ? `/lesson/indiv/${course._id}`
              : `/lesson/${course._id}`
          }
          className="subcategoriesLessons__card-inscriBtn"
        >
          Register
        </Link>
      )}
    </div>
  );
};
export default UserLessonCard;
