import "../../../../public/assets/css/front-style.css";
import { Nav } from "../../../ui/Nav";
import { useParams } from "react-router-dom";
import courseService from "../../services/courseService";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UserAvailabilitie from "../ui/user-availabilities";
import UserSideLayout from "../../../dashboard-layout/UserSideLayout";
import ReservationIndivCard from "../ui/user-reservationIndiv";

const UserLessonIndivDetails = () => {
  const customStyle = `
  html {
     font-size: 100%;
  }
  .fc table {
    font-size: 1em;
  }
  
  .fc-toolbar-chunk{
    font-size: 0.7em
  }
  .fc .fc-button {
    padding: 0.3rem 0.4rem;
    font-size: 1.1em;
    font-weight: 700;
    font-family: "nunito";
  }
  
  
  
`;

  const { id } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await courseService.getCourseById(id);
        setCourse(response.data);
        // console.log(response.data.subCategoryId.subCategoryTitle);
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
          <ReservationIndivCard />

          <div className="userLesson-detils__card">
            <div className="userLesson-detils__card-image">
              <img
                src={`http://localhost:3000/${course.imageUrl}`}
                className="userLesson-detils__card-img"
              />
            </div>
            <div className="userLesson-detils__card-name">
              {course.courseTitle}
            </div>
            <div className="divLine"></div>
            <div className="userLesson-detils__card-subcategory">
              <div>Instrument:</div>
              <div>
                <b>Piano</b>
              </div>
            </div>
            <div className="divLine"></div>
            <div className="userLesson-detils__card-type">
              <div>Type:</div>
              <div>
                <b>{course.courseType} </b>
              </div>
            </div>
            <div className="divLine"></div>
            <div className="userLesson-detils__card-level">
              <div>Level:</div>
              <div>
                <b>2nd</b>
              </div>
            </div>
            <div className="divLine"></div>
            <div className="userLesson-detils__card-prices">
              <div>Price:</div>
              <div>
                <b> {course.coursePrice}TND</b>
              </div>
            </div>
            <div className="divLine"></div>

            <div className="submitGroupLessonBtn">Submit</div>

            {/* fix the font size style  */}
            <style dangerouslySetInnerHTML={{ __html: customStyle }} />
          </div>
        </div>
      </UserSideLayout>
    </div>
  );
};
export default UserLessonIndivDetails;
