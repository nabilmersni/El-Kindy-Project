import React, { useEffect, useState } from "react";
import { getQuizById } from "../../services/apiQuiz";

export default function QuizDetails({ isOpen, isCloseQuiz, quiz }) {
  if (!isOpen) {
    return null;
  }

  const [quizDetails, setQuizDetails] = useState(null);

  useEffect(() => {
    getQuizById(quiz._id).then((data) => setQuizDetails(data));
  }, [quiz._id]);

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
          height: "60%",
          maxWidth: "500px",
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
        <div
          className="modal"
          style={{
            padding: "15px",
            textAlign: "center",
            fontSize: "1.5rem", // Ajustez la taille de la police ici
          }}
        >
          <div
            className="modal-content"
            style={{
              padding: "15px",
            }}
          >
            <div className="Details-quiz">
              {quizDetails && (
                <>
                  <div
                    className="quiz-item-details__title"
                    style={{ marginBottom: "10px" }}
                  >
                    {/* Quiz name is:
                    <p className="quiz-item-details"> {quizDetails.quizName}</p> */}
                    <span style={{ fontWeight: "bold" }}>Quiz name is:</span>{" "}
                    <span className="quiz-item-details">
                      {quizDetails.quizName}
                    </span>
                  </div>
                  <div
                    className="quiz-item-details__title"
                    style={{ marginBottom: "10px" }}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      Description of quiz:
                    </span>{" "}
                    <span className="quiz-item-details">
                      {quizDetails.description}
                    </span>
                  </div>
                  <div
                    className="quiz-item-details__title"
                    style={{ marginBottom: "10px" }}
                  >
                    <span style={{ fontWeight: "bold" }}> Level of quiz:</span>

                    <span className="quiz-item-details">
                      {quizDetails.level}
                    </span>
                  </div>
                  <div
                    className="quiz-item-details__title"
                    style={{ marginBottom: "10px" }}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      Number question of quiz:
                    </span>
                    <span className="quiz-item-details">
                      {quizDetails.nbQuestions}
                    </span>
                  </div>
                  <div
                    className="quiz-item-details__title"
                    style={{ marginBottom: "10px" }}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      Duration of quiz:
                    </span>{" "}
                    <span className="quiz-item-details">
                      {quizDetails.quizDuration} Minutes
                    </span>
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
