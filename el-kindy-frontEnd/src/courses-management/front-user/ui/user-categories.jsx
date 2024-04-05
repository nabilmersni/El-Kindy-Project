import { Link } from "react-router-dom";
import "../../../../public/assets/css/front-style.css";
import React, { useState } from "react";

const UserCategoriesCard = ({ category }) => {
  const [bgLinearGradientHidden, setBgLinearGradientHidden] = useState(false);
  const [showMoreBtnHidden, setShowMoreBtnHidden] = useState(false);
  const [seeAllLessonsBtnHidden, setSeeAllLessonsBtnHidden] = useState(true);

  const handleShowMoreClick = () => {
    // Mettez ici la logique spécifique pour cette carte
    setBgLinearGradientHidden(true);
    setShowMoreBtnHidden(true);
    setSeeAllLessonsBtnHidden(false);
  };

  return (
    <div className="category-container">
      <div className="category__title">{category.categoryTitle}</div>
      <div className="category__discription">Discover your creative side.</div>
      <div className="subcategories-cards-container">
        {category.subCategories.map((subCategory, subIndex) => (
          <Link
            to={`/subcategory/lessons/${subCategory._id}`}
            className="subcategory-card-container"
            key={subCategory._id}
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
      </div>
      <div className="show-more-btn-container">
        <div className="show-more-btn" onClick={handleShowMoreClick}>
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
    </div>
  );
};

export default UserCategoriesCard;
