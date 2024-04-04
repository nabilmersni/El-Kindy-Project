import React, { useEffect, useRef, useState } from "react";
import {
  addImageToCourse,
  getQuestionById,
  updateQuestionInQuiz,
} from "../../services/apiQuiz";
import { useNavigate } from "react-router-dom";

const UpdateQuestion = (props) => {
  const navigate = useNavigate();

  const { data, isOpen, isCloseQuiz, quizId } = props;
  const [questionText, setQuestionText] = useState("");
  const [nbPoint, setEnteredPrice] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const inputRef = useRef(null);
  const [nbPointError, setNbPointError] = useState("");
  const handleImageClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (isOpen && data && data._id) {
      getQuestionById(quizId, data._id)
        .then((question) => {
          setQuestionText(question.questionText);
          setEnteredPrice(question.nbPoint);
          setImage(question.image);
          setOldImage(question.image);

          console.log("Question récupérée:", question);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération de la question:",
            error
          );
        });
    }
  }, [isOpen, quizId, data]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleTitleChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setEnteredPrice(value);

    if (value < 0) {
      setNbPointError("Le nombre de points doit être un nombre positif.");
    } else {
      setNbPointError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedQuestionData = {
        questionText: questionText,
        nbPoint: nbPoint,
      };

      let imageData;
      if (image instanceof Blob) {
        imageData = image;
      } else {
        imageData = oldImage;
      }
      if (imageData !== oldImage) {
        const formData = new FormData();
        formData.append("image", image);

        const uploadResponse = await addImageToCourse(data._id, formData);
      }
      const result = await updateQuestionInQuiz(
        quizId,
        data._id,
        updatedQuestionData
      );
      navigate(`/dash-admin-questions/${quizId}/questions`);
      props.updateQuestions();
      isCloseQuiz();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la question:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div className="manage-participants-model">
        <div
          className="manage-Questions-model__card"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <div className="manage-participants-model__card--header">
            <div className="manage-participants-model__card--header-title">
              Update Question
            </div>
            <div
              className="manage-participants-model__card--header-exitBTn"
              onClick={isCloseQuiz}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0"
                y="0"
                viewBox="0 0 348.333 348.334"
                xmlSpace="preserve"
                className="manage-participants-model__card--header-exitBTn-svg"
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
          <hr className="model-hr" style={{ margin: "0" }} />
          <div className="modal">
            <div className="course-add-form__input__group">
              <label
                htmlFor="nbPoint"
                className="course-add-form__input__label"
              >
                Number of point
              </label>
              <input
                type="number"
                className="course-add-form__input"
                value={nbPoint}
                onChange={handlePriceChange}
              />
              {nbPointError && (
                <div className="error-message">{nbPointError}</div>
              )}
            </div>

            <div className="manage-participants-model__card--content">
              <div className="course-add-form__input__group">
                <label
                  htmlFor="questionText"
                  className="course-add-form__input__label"
                >
                  Question Text
                </label>
                <textarea
                  type="text"
                  value={questionText}
                  onChange={handleTitleChange}
                  className="course-add-form__input textarea"
                  placeholder="Question Text"
                ></textarea>
              </div>
            </div>
          </div>
          <div
            className="manage-participants-model__card--content"
            style={{ padding: "15px" }}
          >
            <div
              className="model__card--addNewPToQuiz__form"
              style={{ marginTop: "20px" }}
            ></div>
          </div>
          <div className="course-add-form__input__group">
            <label htmlFor="image" className="course-add-form__input__label">
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
                ></svg>
                {image && (
                  <img
                    className="course-add-form-image__img"
                    src={
                      image && typeof image === "string"
                        ? `http://localhost:3000/upload-directory/${image}`
                        : URL.createObjectURL(image)
                    }
                    style={!oldImage ? { display: "none" } : {}}
                  />
                )}
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
                      ></svg>
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
          <button onClick={handleSubmit} className="add-new-course__submit-btn">
            Update Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuestion;
