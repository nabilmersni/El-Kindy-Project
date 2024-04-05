import "../../../../public/assets/css/front-style.css";
import React, { useState, useEffect } from "react";
import { Nav } from "../../../ui/Nav";
import DashAnimation from "../../../dashboard-layout/dash-animation";
import categoriesService from "../../services/categoriesService";
import { Link } from "react-router-dom";
import UserSideLayout from "../../../dashboard-layout/UserSideLayout";

const UserCategories = () => {
  const [isSubcategoriesOpened, setIsSubcategoriesOpened] = useState(false);
  const [bgLinearGradientHidden, setBgLinearGradientHidden] = useState(false);
  const [showMoreBtnHidden, setShowMoreBtnHidden] = useState(false);
  const [seeAllLessonsBtnHidden, setSeeAllLessonsBtnHidden] = useState(true);

  const handleShowMoreClick = () => {
    setIsSubcategoriesOpened(true);
    setBgLinearGradientHidden(true);
    setShowMoreBtnHidden(true);
    setSeeAllLessonsBtnHidden(false);
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoriesService.getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des cours :", error);
      }
    };

    fetchData();
  }, [isSubcategoriesOpened]);

  return (
    <div>
      {/* <Nav /> */}
      <UserSideLayout>
        <div className="content-container">
          <div className="header-container">
            <DashAnimation
              className="notesFly-animation"
              path="../../public/assets/json/guitar.json"
            />
            <div className="search-input-container">
              <input
                className="search-input"
                type="text"
                placeholder="Search ..."
              />
              <button className="search-btn">
                <div className="search-svg-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0"
                    y="0"
                    viewBox="0 0 56.966 56.966"
                    xmlSpace="preserve"
                    className="search-svg"
                  >
                    <g>
                      <path
                        d="M55.146 51.887 41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z"
                        opacity="1"
                      ></path>
                    </g>
                  </svg>
                </div>
              </button>
            </div>
            <DashAnimation
              className="notesFly-animation"
              path="../../public/assets/json/guitar.json"
            />
          </div>

          <div className="categories-items">
            {categories.map((category, index) => (
              <div className="category-item">{category.categoryTitle}</div>
            ))}
          </div>

          <div className="bg-border-divider-light"></div>

          <div className="categoriesList__container">
            {/* --------------- */}
            {categories.map((category, index) => (
              <div className="category-container">
                <div className="category__title">Music</div>
                <div className="category__discription">
                  Discover your creative side.
                </div>
                <div
                  className={`subcategories-cards-container ${
                    isSubcategoriesOpened ? "isOpened" : ""
                  }`}
                >
                  {category.subCategories.map((subCategory, subIndex) => (
                    <Link
                      to={`/subcategory/lessons/${subCategory._id}`}
                      className="subcategory-card-container"
                    >
                      <img
                        src={`http://localhost:3000/uploads/${subCategory.imageUrl}`}
                        className="subcategory-card__img"
                        alt=""
                      />
                      <div className="subcategory-card__overlay"></div>
                      <div className="subcategory-card__title">
                        {subCategory.subCategoryTitle}
                      </div>
                    </Link>
                  ))}

                  <div
                    className={`bg-linear-gradient ${
                      bgLinearGradientHidden ? "hide" : ""
                    }`}
                  ></div>
                </div>

                {category.subCategories.length > 0 && (
                  <div
                    className={`show-more-btn-container ${
                      showMoreBtnHidden ? "hide" : ""
                    }`}
                  >
                    <div
                      className="show-more-btn"
                      onClick={handleShowMoreClick}
                    >
                      <div className="show-more-btn__text">Show more</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0"
                        y="0"
                        viewBox="0 0 451.847 451.847"
                        xmlSpace="preserve"
                        className="show-more-btn__svg"
                      >
                        <g>
                          <path
                            d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"
                            opacity="1"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                )}

                {/* <div
                className={`see-all-lessons-btn-container ${
                  seeAllLessonsBtnHidden ? "hide" : ""
                }`}
              >
                <div className="see-all-lessons-btn">See all music lessons</div>
              </div> */}
              </div>
            ))}
          </div>
        </div>
      </UserSideLayout>
    </div>
  );
};

export default UserCategories;
