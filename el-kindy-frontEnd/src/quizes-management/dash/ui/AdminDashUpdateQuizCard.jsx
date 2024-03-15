import React, { useRef, useState, useEffect } from "react";
import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";

import { useParams } from "react-router-dom";
import { getQuizById, updateQuiz } from "../../services/apiQuiz";

const AdminDashUpdateQuizCard = (props) => {
  const {
    quizName,
    description,
    nbQuestions,
    level,
    quizDuration,
    quizStartDate,
    quizEndDate,
    handleTitleChange,
    handleDescriptionChange,
    handlePriceChange,
    handleAvailablePlacesChange,
    handleEventPlaceChange,
    handleDatePlaceChange,
    handleEventChange,
    handleSubmit,
    errors,
  } = props;
  // Vérifier si nbQuestions est défini avant d'y accéder

  return (
    <DashLayout>
      <div className="dash-card__container">
        <form className="dash-card">
          <div className="course-add-form__input__group">
            <label htmlFor="quizName" className="course-add-form__input__label">
              Event Name <span>*</span>
            </label>
            <input
              type="text"
              value={quizName}
              className="course-add-form__input"
              placeholder="Title"
              //  onChange={(e) => setEnteredTitle(e.target.value)}
              onChange={handleTitleChange}
            />
          </div>

          <div className="course-add-form__input__group">
            <label
              htmlFor="descrition"
              className="course-add-form__input__label"
            >
              Event Description <span>*</span>
            </label>
            <textarea
              className="course-add-form__input textarea"
              placeholder="Descrition"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>

          <div className="course-add-form__input__group">
            <label htmlFor="level" className="course-add-form__input__label">
              Level <span>*</span>
            </label>
            <input
              type="text"
              className="course-add-form__input"
              value={level}
              onChange={handlePriceChange}
            />
          </div>

          <div className="course-add-form__input__group-row">
            <div className="course-add-form__input__group">
              <label
                htmlFor="nbQuestions"
                className="course-add-form__input__label"
              >
                Number of questions <span>*</span>
              </label>
              <input
                type="number"
                className="course-add-form__input course-add-form__input__label-Price"
                placeholder="nbQuestions"
                value={nbQuestions}
                onChange={handleEventChange}
              />
              {/* {errors.nbQuestions && <p>{errors.nbQuestions}</p>} */}

              {errors.nbQuestions && (
                <span className="error-message">{errors.nbQuestions}</span>
              )}
            </div>

            <div className="course-add-form__input__group">
              <label
                htmlFor="quizDuration"
                className="course-add-form__input__label"
              >
                Quiz Duration <span>*</span>
              </label>
              <input
                type="number"
                className="course-add-form__input"
                placeholder="Available Places"
                value={quizDuration}
                onChange={handleAvailablePlacesChange}
              />
              {errors.quizDuration && (
                <span className="error-message">{errors.quizDuration}</span>
              )}
            </div>
          </div>

          <div className="course-add-form__input__group">
            <label
              htmlFor="quizStartDate"
              className="course-add-form__input__label"
            >
              Quiz Start Date <span>*</span>
            </label>
            <input
              type="date"
              className="course-add-form__input"
              placeholder="quizStartDate"
              value={quizStartDate}
              onChange={handleEventPlaceChange}
            />
            {errors.quizStartDate && (
              <span className="error-message">{errors.quizStartDate}</span>
            )}
          </div>

          <div className="course-add-form__input__group">
            <label
              htmlFor="quizEndDate"
              className="course-add-form__input__label"
            >
              Quiz End Date <span>*</span>
            </label>
            <input
              type="date"
              className="course-add-form__input"
              placeholder="quizEndDate"
              value={quizEndDate}
              onChange={handleDatePlaceChange}
            />
            {errors.quizEndDate && (
              <span className="error-message">{errors.quizEndDate}</span>
            )}
          </div>

          <hr className="dash-card__hr-border hr-border-2" />

          <button onClick={handleSubmit} className="add-new-course__submit-btn">
            Update Quiz
          </button>
        </form>
      </div>
    </DashLayout>
  );
};

export default AdminDashUpdateQuizCard;
