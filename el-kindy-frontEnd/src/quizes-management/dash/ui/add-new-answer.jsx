import React, { useEffect, useRef, useState } from "react";
import ManageParticipantsItem from "./manage-participants-item";
import {
  createAnswer,
  createQuestionForQuiz,
  getQuestionsForQuiz,
} from "../../services/apiQuiz";
import { Link, useParams } from "react-router-dom";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("id quiz est", quizId);
    console.log("id quiz est", data._id);

    try {
      await createAnswer(quizId, data._id, {
        answerText,
        isCorrect,
      });

      // Réinitialiser le formulaire
      setAnswerText("");
      setIsCorrect(false);
      onClose();
      //const newAnswer = response.data;
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

  //   const [image, setImage] = useState(null);
  //   const [selectedType, setSelectedType] = useState("");
  //   const handleTypeChange = (event) => {
  //     setSelectedType(event.target.value);
  //   };
  //   const inputRef = useRef(null);
  //   const handleImageClick = () => {
  //     inputRef.current.click();
  //   };

  //   const handleImageChange = () => {
  //     const file = event.target.files[0];
  //     setImage(file);
  //   };

  //   const handleSubmit = async () => {
  //     const formData = new FormData();
  //     formData.append("image", image);
  //     formData.append("questionText", questionText);
  //     formData.append("nbPoint", nbPoint);

  //     try {
  //       await createQuestionForQuiz(quizId, formData);
  //       onClose();
  //       const fetchedQuestions = await getQuestionsForQuiz(quizId);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

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
              <option value="true">true </option>
              <option value="false">false</option>
            </select>
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
