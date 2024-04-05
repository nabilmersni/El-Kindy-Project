import "../../../../public/assets/css/front-style.css";
import { Nav } from "../../../ui/Nav";
import { useParams } from "react-router-dom";
import courseService from "../../services/courseService";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UserAvailabilitie from "../ui/user-availabilities";
import UserSideLayout from "../../../dashboard-layout/UserSideLayout";

const UserLessonDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await courseService.getCourseById(id);
        setCourse(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du cours :", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {/* <Nav /> */}

      <UserSideLayout>
        <div className="userLesson-details__container">
          <UserAvailabilitie />

          <div className="userLesson-detils__card">
            <div className="userLesson-detils__card-name"></div>
            <div className="userLesson-detils__card-subcategory"></div>
            <div className="userLesson-detils__card-type"></div>
            <div className="userLesson-detils__card-prices"></div>
            <div className="userLesson-detils__card-desc"></div>
          </div>
        </div>
      </UserSideLayout>
    </div>
  );
};
export default UserLessonDetails;
