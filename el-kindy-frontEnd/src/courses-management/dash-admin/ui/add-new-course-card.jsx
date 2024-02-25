import "../../../../public/assets/css/style.css";
import React, { useRef, useState } from "react";

const AddNewCourseCard = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // -------------
  const [selectedType, setSelectedType] = useState("");
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  // -------------
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = () => {
    const file = event.target.files[0];
    // console.log(file);
    setImage(file);
  };

  // -------------
  const [enteredTitle, setEnteredTitle] = useState("");
  const titleChangeHandle = (event) => {
    setEnteredTitle(event.target.value);
  };

  // -------------
  const [enteredDescription, setEnteredDescription] = useState("");
  const descriptionChangeHandle = (event) => {
    setEnteredDescription(event.target.value);
  };

  // -------------
  const [enteredPrice, setEnteredPrice] = useState("");
  const priceChangeHandle = (event) => {
    setEnteredPrice(event.target.value);
  };

  //--------------
  const submitHandler = (event) => {
    event.preventDefault();

    const courseData = {
      title: enteredTitle,
      description: enteredDescription,
      category: selectedCategory,
      price: enteredPrice,
      type: selectedType,
      image: image,
    };

    console.log(courseData);
  };

  return (
    <div className="dash-card__container">
      <form onSubmit={submitHandler} className="dash-card">
        <div className="dash-card__header">
          <div className="dash-card__header-title">Course details</div>
          <div className="dash-card__header-icon">
            <svg
              id="course-add-card__header-icon-svg"
              className="course-add-card__header-icon-svg"
              viewBox="0 0 24 24"
              fill="#006bbe"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="8"
                className="course-add-card__header-icon-svg-circle"
                stroke="none"
                strokeWidth="1.5"
              ></circle>
              <path
                fill="#fff"
                d="M14.325 9.956c0 .298-.103.605-.308.924a3.726 3.726 0 01-.68.786c-.657.566-.987.983-.987 1.252 0 .595-.233.892-.7.892a.688.688 0 01-.531-.233c-.135-.156-.202-.365-.202-.627s.064-.506.191-.732c.135-.234.294-.44.478-.616.184-.184.368-.361.552-.531.453-.41.68-.782.68-1.115a.627.627 0 00-.277-.53.957.957 0 00-.615-.213.943.943 0 00-.606.212c-.17.135-.332.273-.488.414a.738.738 0 01-.51.202.614.614 0 01-.467-.19.68.68 0 01-.18-.468c0-.333.23-.669.69-1.009a2.47 2.47 0 011.518-.52c.722 0 1.31.202 1.763.605.452.404.679.903.679 1.497zm-2.697 4.449c.248 0 .443.081.584.244.142.156.213.35.213.584a.959.959 0 01-.245.637.787.787 0 01-.615.276.721.721 0 01-.574-.244.903.903 0 01-.201-.595c0-.234.078-.442.233-.626a.776.776 0 01.605-.276z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="dash-card__description"></div>
        <hr className="dash-card__hr-border" />

        <div className="course-add-form__input__group">
          <label htmlFor="courseName" className="course-add-form__input__label">
            Name <span>*</span>
          </label>
          <input
            type="text"
            className="course-add-form__input"
            placeholder="Title"
            onChange={titleChangeHandle}
          />
        </div>

        <div className="course-add-form__input__group">
          <label
            htmlFor="courseDescription"
            className="course-add-form__input__label"
          >
            Description <span>*</span>
          </label>
          <textarea
            className="course-add-form__input textarea"
            placeholder="Description"
            onChange={descriptionChangeHandle}
          ></textarea>
        </div>

        <div className="course-add-form__input__group">
          <label
            htmlFor="courseCategory"
            className="course-add-form__input__label"
          >
            Category <span>*</span>
          </label>
          <select
            id="categorySelect"
            className="course-add-form__input"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" disabled hidden>
              Category
            </option>
            <option value="individual">Danse</option>
            <option value="inGroup">Music</option>
            <option value="inGroup">Arduino</option>
          </select>
        </div>

        <div className="course-add-form__input__group-row">
          <div className="course-add-form__input__group">
            <label
              htmlFor="coursePrice"
              className="course-add-form__input__label"
            >
              Price <span>*</span>
            </label>
            <input
              type="number"
              className="course-add-form__input course-add-form__input__label-Price"
              placeholder="Price"
              onChange={priceChangeHandle}
            />
          </div>

          <div className="course-add-form__input__group">
            <label
              htmlFor="courseNumber"
              className="course-add-form__input__label"
            >
              Type <span>*</span>
            </label>
            <select
              id="categorySelect"
              className="course-add-form__input"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="" disabled hidden>
                Type
              </option>
              <option value="individual">Individual</option>
              <option value="inGroup">In Group</option>
            </select>
          </div>
        </div>

        <hr className="dash-card__hr-border" />

        <div className="course-add-form__input__group">
          <label
            htmlFor="courseImage"
            className="course-add-form__input__label"
          >
            Image <span>*</span>
          </label>
          <div className="course-add-form-image">
            <div className="course-add-form-image__container">
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
                  <label className="course-add-form-image__addBtn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0"
                      y="0"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                      className="course-add-form-image__addBtn-svg"
                    >
                      <g>
                        <path
                          d="M512 480c0 17.673-14.327 32-32 32H32c-17.673 0-32-14.327-32-32s14.327-32 32-32h448c17.673 0 32 14.326 32 32zM142.623 177.378c8.189 0 16.379-3.124 22.627-9.373l58.75-58.75v246.746c0 17.673 14.327 32 32 32s32-14.327 32-32V109.255l58.75 58.75c12.497 12.497 32.758 12.497 45.255 0s12.497-32.758 0-45.255L278.627 9.373c-12.497-12.497-32.758-12.497-45.255 0L119.995 122.75c-12.497 12.497-12.497 32.758 0 45.255 6.249 6.249 14.438 9.373 22.628 9.373z"
                          opacity="1"
                        ></path>
                      </g>
                    </svg>
                    Choose a photo
                  </label>
                  <input
                    name="course-add-form-image__file-btn"
                    type="file"
                    className="course-add-form-image__file-btn"
                    ref={inputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="dash-card__hr-border hr-border-2" />

        <button type="submit" className="add-new-course__submit-btn">
          Add New Course
        </button>
      </form>
    </div>
  );
};

export default AddNewCourseCard;
