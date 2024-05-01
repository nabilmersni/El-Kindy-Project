import "../../../../public/assets/css/front-style.css";
import { Nav } from "../../../ui/Nav";
import { useParams } from "react-router-dom";
import subCategoriesService from "../../services/subCategoriesService";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UserSideLayout from "../../../dashboard-layout/UserSideLayout";

const UserSubCategoryLessons = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await subCategoriesService.getCoursesBySubCategoryId(
          id
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des cours :", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {/* <Nav /> */}
      <UserSideLayout>
        <div className="subcategoriesLessonsContainer">
          <div className="subcategoriesLessons_header">
            <div className="subcategoriesLessons_header-title">
              Learn Piano your way with a El Kindy expert
            </div>
            <div className="subcategoriesLessons_header-video-container">
              <div
                className="relative z-10 -mt-1.5 ml-6 h-[16.375rem] overflow-hidden"
                style={{
                  clipPath:
                    "path('M247.466 0.0261278C242.777 -0.0378756 238.035 0.0158932 233.245 0.18541C147.012 8.61127 80.001 48.9241 55.8964 73.3058C45.2025 83.343 28.6469 102.723 18.6601 120.75C-14.1401 185.274 -15.9436 258.754 121.353 261.021C210.576 262.508 345.923 244.353 378.727 179.806C411.535 115.253 336.707 1.53576 247.466 0.0261278Z')",
                }}
              >
                <div className="subcategoriesLessons_header-video">
                  <video
                    src="../../../../public/assets/img/piano.mp4"
                    preload="auto"
                    autoPlay=""
                    loop=""
                    className="subcategoriesLessons_header-video"
                  ></video>
                </div>
              </div>

              <div
                className="full-mask z-0 bg-overlays-60-light"
                style={{
                  clipPath:
                    "path('M77.0247 252.668C81.6968 254.644 86.4971 256.528 91.4015 258.321C182.663 285.362 268.844 273.125 309.659 259.746C333.38 250.249 346.466 242.235 367.96 226.724C436.254 177.444 483.399 108.948 346.675 50.6543C257.833 12.761 111.885 -24.8968 43.5749 24.4001C-24.7432 73.7086 -11.8249 214.746 77.0247 252.668Z')",
                }}
              ></div>
            </div>
          </div>

          <div className="subcategoriesLessons__title">Private lessons</div>
          <div className="subcategoriesLessons__list">
            {courses.map((course, index) => (
              <div className="subcategoriesLessons__card" key={index}>
                <div className="subcategoriesLessons__card-img-container">
                  <img
                    src={`http://localhost:3000/${course.imageUrl}`}
                    className="subcategoriesLessons__card-img"
                  />
                </div>
                <div className="subcategoriesLessons__card-title">
                  {course.courseTitle}
                </div>
                <div className="subcategoriesLessons__card-level">
                  All levels
                </div>

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
              </div>
            ))}
          </div>
        </div>
      </UserSideLayout>
    </div>
  );
};
export default UserSubCategoryLessons;
