import React, { useEffect, useState } from "react";

import { getQuizById } from "../../services/apiQuiz";
export default function QuizDetails({ data, isOpen, isCloseQuiz, quiz }) {
  // console.log("name quiz est", data);
  if (!isOpen) {
    return null; // Don't render anything if the modal is closed
  }

  const [quizDetails, setQuizDetails] = useState(null);

  useEffect(() => {
    getQuizById(quiz._id).then((data) => setQuizDetails(data));
  }, [quiz._id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    const months = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const dayOfMonth = date.getDate();

    return `${day} ${dayOfMonth} ${month} ${year}`;
  };

  return (
    <div
      className="manage-participants-model"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "60%", // Augmentez la largeur selon vos besoins
          maxWidth: "500px", // Définit une largeur maximale pour le modal
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          className="manage-participants-model__card--header"
          style={{
            padding: "15px",

            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="manage-participants-model__card--header-title">
            Quiz Details
          </div>
          <div
            className="manage-participants-model__card--header-exitBTn"
            onClick={isCloseQuiz}
            style={{
              cursor: "pointer",
            }}
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
        <hr
          className="model-hr"
          style={{
            margin: "0",
          }}
        />
        <div className="modal">
          <div
            className="modal-content"
            style={{
              padding: "15px",
            }}
          >
            <div>
              {quizDetails && (
                <>
                  <div
                    className="quiz-item__title"
                    style={{ marginBottom: "10px" }}
                  >
                    Quiz name is: {quizDetails.quizName}
                  </div>
                  <div
                    className="quiz-item__title"
                    style={{ marginBottom: "10px" }}
                  >
                    Description of quiz: {quizDetails.description}
                  </div>
                  <div
                    className="quiz-item__title"
                    style={{ marginBottom: "10px" }}
                  >
                    Level of quiz: {quizDetails.level}
                  </div>
                  <div
                    className="quiz-item__title"
                    style={{ marginBottom: "10px" }}
                  >
                    Number question of quiz: {quizDetails.nbQuestions}
                  </div>
                  <div
                    className="quiz-item__title"
                    style={{ marginBottom: "10px" }}
                  >
                    Duration of quiz: {quizDetails.quizDuration}
                  </div>
                  <div
                    className="quiz-item__title"
                    style={{ marginBottom: "10px" }}
                  >
                    Start date of quiz: {formatDate(quizDetails.quizStartDate)}
                  </div>
                  <div className="quiz-item__title">
                    End date of quiz: {formatDate(quizDetails.quizEndDate)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className="manage-participants-model__card--content"
          style={{
            padding: "15px",
          }}
        >
          <div
            className="model__card--addNewPToQuiz__form"
            style={{ marginTop: "20px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
