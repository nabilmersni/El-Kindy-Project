import React, { useEffect, useRef, useState } from "react";
import {
  getAnswerByIdAndQuestionId,
  updateAnswer,
} from "../../services/apiQuiz";
import { useNavigate } from "react-router-dom";

const UpdateAnswer = (props) => {
  const { data, isOpen, onClose, Idquestion } = props;
  const [answerText, setAnswerText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  useEffect(() => {
    if (isOpen && data && data._id) {
      getAnswerByIdAndQuestionId(Idquestion, data._id)
        .then((answer) => {
          setAnswerText(answer.answerText);
          setIsCorrect(answer.isCorrect);

          if (answer.image) {
            setImage(answer.image);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération de la réponse:", error);
        });
    }
  }, [isOpen, Idquestion, data]);

  const updateAnswerData = async () => {
    try {
      await updateAnswer(Idquestion, data._id, answerText, isCorrect, image);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  const handleTitleChange = (e) => {
    setAnswerText(e.target.value);
  };

  const handlePriceChange = (e) => {
    setIsCorrect(e.target.value === "true");
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
              Update Answer
            </div>
            <div
              className="manage-participants-model__card--header-exitBTn"
              onClick={onClose}
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
                htmlFor="answerText"
                className="course-add-form__input__label"
              >
                Answer text
              </label>
              <textarea
                type="text"
                className="course-add-form__input textarea"
                value={answerText}
                onChange={handleTitleChange}
              ></textarea>
            </div>

            <div className="manage-participants-model__card--content">
              <div className="course-add-form__input__group">
                <label
                  htmlFor="isCorrect"
                  className="course-add-form__input__label"
                >
                  It is correct ?
                </label>

                <select
                  name="isCorrect"
                  className="course-add-form__input"
                  value={isCorrect}
                  onChange={handlePriceChange}
                >
                  <option value="true">true </option>
                  <option value="false">false</option>
                </select>
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
          <button
            onClick={updateAnswerData}
            className="add-new-course__submit-btn"
          >
            Update Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAnswer;
