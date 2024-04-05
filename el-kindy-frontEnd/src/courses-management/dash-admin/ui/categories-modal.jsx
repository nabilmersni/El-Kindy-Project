import "../../../../public/assets/css/style.css";
import { useEffect, useState } from "react";
import categoriesService from "../../services/categoriesService";
import { Link } from "react-router-dom";
import AddNewCategoryCard from "./add-new-category-card";
import CategoryCard from "./category-card";
const CategoriesModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoriesService.getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des categories :", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (deletedCategoryId) => {
    // Update the categories list after deletion
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category._id !== deletedCategoryId)
    );
  };
  return (
    <div className="admin-dash__Modal">
      <div
        className="admin-dash__Modal__container"
        style={{ width: "90rem", height: "80rem" }}
      >
        <div className="admin-dash__Modal__container--header">
          <div className="admin-dash__Modal__title">Categories</div>
          <div className="admin-dash__Modal__exitBtn" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 348.333 348.334"
              xmlSpace="preserve"
              className="admin-dash_Modal__ecitBtn-svg"
            >
              <g>
                <path
                  d="M336.559 68.611 231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z"
                  opacity="1"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <hr className="model-hr" />
        <div className="addNewSubCateg-Modal__container--content">
          {/* add new categ */}
          <AddNewCategoryCard />

          <div className="Categories-list-title">Categories List</div>
          <div className="categories-list-container">
            {categories.map((item, index) => (
              <CategoryCard key={index} data={item} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;
