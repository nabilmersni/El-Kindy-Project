import "../../../../public/assets/css/style.css";
import React, { useRef, useState } from "react";
import categoriesService from "../../services/categoriesService";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../ui/Spinner";

const AddNewCategoryCard = () => {
  const [isAddCategVisible, setIsAddCategVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState("");
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleToggleCategFormVisible = () => {
    setIsAddCategVisible(!isAddCategVisible);
  };

  //--------------------------------
  const titleChangeHandle = (event) => {
    setEnteredTitle(event.target.value);
    setError("");
  };

  //------------------------------
  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);
    setImage(file);
  };

  //----------------------------
  const submitHandler = async (event) => {
    event.preventDefault();

    if (!enteredTitle.trim()) {
      // Vérifier si le champ est vide ou contient uniquement des espaces
      setError("Please enter a category name."); // Définir un message d'erreur approprié
      return; // Empêcher la soumission du formulaire
    }

    const categData = {
      categoryTitle: enteredTitle,
    };

    try {
      // Set loading state or show a loading spinner here if needed
      setIsAdding(true);

      // Make the API call
      const response = await categoriesService.addCategory(categData);

      // Handle the response (success or error)
      console.log("Category added successfully:", response.data);

      // Vérifier si le Category a été ajouté avec succès
      if (response.status === 201) {
        // Extraire l'ID du Category nouvellement ajouté
        const categoryId = response.data._id;

        // Ajouter l'image au category nouvellement ajouté
        const formData = new FormData();
        formData.append("image", image);
        const uploadResponse = await categoriesService.addImageToCategory(
          categoryId,
          formData
        );

        console.log(
          "Category and image added successfully:",
          uploadResponse.data
        );
        setIsAdding(false);
        navigate("/dash-admin-subcategories");
        // onClose;

        // Effacer le formulaire ou gérer le succès comme nécessaire
      } else {
        console.error("Error adding subCategory:", response.data.error);
        setIsAdding(false);
      }

      // Clear the form or handle success as needed
    } catch (error) {
      console.error("Error adding subCategory:", error.message);
      setIsAdding(false);
    }
  };
  return (
    <div>
      <div
        className="addNewCategory-btn"
        onClick={handleToggleCategFormVisible}
      >
        Add New Category
      </div>
      <form
        onSubmit={submitHandler}
        className={`addNewCategoryForm ${isAddCategVisible ? "" : "hidden"}`}
      >
        {isAdding && <Spinner />}
        <div className="course-add-form__input__group">
          <label htmlFor="courseName" className="course-add-form__input__label">
            Name <span>*</span>
          </label>
          <input
            id="categoryName"
            name="categoryName"
            type="text"
            className="course-add-form__input categoryM"
            placeholder="Name"
            onChange={titleChangeHandle}
          />
          {error && <p className="error-message text-red">{error}</p>}
        </div>

        <div className="course-add-form__input__group">
          <label
            htmlFor="courseImage"
            className="course-add-form__input__label"
          >
            Image <span>*</span>
          </label>
          <div className="course-add-form-image">
            <div className="course-add-form-image__container categoryM">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                xmlSpace="preserve"
                className="course-add-form-image__container-svg"
              >
                <g>
                  <g fillRule="evenodd" clipRule="evenodd">
                    <path
                      d="M12 7c-1.957 0-3.584 1.197-4.167 2.807a1 1 0 0 1-.813.652C5.277 10.683 4 12.09 4 13.714 4 15.484 5.52 17 7.5 17a1 1 0 1 1 0 2C4.509 19 2 16.679 2 13.714c0-2.514 1.81-4.57 4.181-5.132C7.2 6.45 9.438 5 12 5c3.174 0 5.872 2.24 6.331 5.234 2.066.412 3.669 2.164 3.669 4.337C22 17.063 19.894 19 17.4 19a1 1 0 1 1 0-2c1.482 0 2.6-1.133 2.6-2.429 0-1.295-1.117-2.428-2.6-2.428a1 1 0 0 1-1-1C16.4 8.9 14.477 7 12 7z"
                      opacity="1"
                    ></path>
                    <path
                      d="M12 19a1 1 0 0 1-1-1v-6a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1z"
                      opacity="1"
                    ></path>
                    <path
                      d="M9.293 14.707a1 1 0 0 1 0-1.414l2-2a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1-1.414 1.414L12 13.414l-1.293 1.293a1 1 0 0 1-1.414 0z"
                      opacity="1"
                    ></path>
                  </g>
                </g>
              </svg>
              <img
                className="course-add-form-image__img"
                src={image && URL.createObjectURL(image)}
                alt=""
                style={!image ? { display: "none" } : {}}
              />
            </div>
            <div className="course-add-form-image__description">
              <div style={{ display: "flex" }}>
                <div
                  className="course-add-form-image__add"
                  onClick={handleImageClick}
                >
                  <label className="course-add-form-image__addBtn categoryM">
                    Choose a photo
                  </label>
                  <input
                    name="course-add-form-image__file-btn"
                    type="file"
                    className="course-add-form-image__file-btn"
                    ref={inputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="admin-dash__Modal-submit-btn">Add New Category</button>
        <hr className="model-hr" />
      </form>
    </div>
  );
};

export default AddNewCategoryCard;
