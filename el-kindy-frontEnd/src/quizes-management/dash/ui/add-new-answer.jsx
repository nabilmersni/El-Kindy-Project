import React, { useRef, useState } from "react";

import { createAnswer } from "../../services/apiQuiz";

export default function AddNewAnswer({
  isOpen,
  onClose,
  quizId,
  data,
  setAnswers,
  fetchAnswers,
}) {
  if (!isOpen) {
    return null;
  }

  const [answerText, setAnswerText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [image, setImage] = useState();
  const inputRef = useRef(null);
  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answerText) {
      console.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("answerText", answerText);
      formData.append("isCorrect", isCorrect);
      formData.append("image", image);

      await createAnswer(quizId, data._id, formData);
      console.log(answerText, isCorrect, image);
      setAnswerText("");
      setIsCorrect(false);
      onClose();

      setAnswers((prev) => [
        ...prev,
        {
          text: answerText,
        },
      ]);

      fetchAnswers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="manage-participants-model ">
      <div
        className="manage-Questions-model__card"
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        <div className="manage-participants-model__card--header">
          <div className="manage-participants-model__card--header-title">
            Add new answer
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

        <hr className="model-hr" />

        <div className="course-add-form__input__group">
          <label htmlFor="answerText" className="course-add-form__input__label">
            Answer text <span>*</span>
          </label>
          <textarea
            name="answerText"
            type="text"
            className="course-add-form__input textarea"
            placeholder="answerText"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          ></textarea>
          {!answerText && (
            <div className="error-message">answerText is required.</div>
          )}
        </div>

        <div className="manage-participants-model__card--content">
          <div className="course-add-form__input__group">
            <label
              htmlFor="isCorrect"
              className="course-add-form__input__label"
            >
              It is correct ? <span>*</span>
            </label>

            <select
              name="isCorrect"
              className="course-add-form__input"
              value={isCorrect ? "true" : "false"}
              onChange={(e) => setIsCorrect(e.target.value === "true")}
            >
              <option value={true}>true </option>
              <option value={false}>false</option>
            </select>
          </div>
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
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="add-new-course__submit-btn quiz "
          onClick={handleSubmit}
        >
          Add Question
        </button>
      </div>
    </div>
  );
}
