import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

export default function ResultatQuiz({ isOpen, onClose, score, quizName }) {
  if (!isOpen) {
    return null;
  }

  const { userId } = useParams();
  const { user } = useSelector((state) => state.auth);
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
          className="manage-participants-model__card--header--result"
          style={{
            padding: "15px",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="manage-participants-model__card--header-title--result">
            Result of quiz
          </div>
          <NavLink
            to={`/quiz-list-front/quizzes/${userId}`}
            className="manage-participants-model__card--header-exitBTn--result"
            onClick={onClose}
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
          </NavLink>
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
            fontSize: "1.5rem",
          }}
        >
          <div className="modal-content"></div>
        </div>
        <div
          className="manage-participants-model__card--content"
          style={{
            padding: "1px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="circle-image-container">
            <img className="circle-image" src={user.photo_url} alt="Image" />
          </div>
          <div className="pt-[40px]">
            <span style={{ fontWeight: "bold" }}>Quiz name : </span>
            <span className="quiz-item-details ">{quizName}</span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Fullname : </span>
            <span className="quiz-item-details">{user.fullname}</span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Email : </span>
            <span className="quiz-item-details">{user.email}</span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Score:</span>
            <span className="quiz-item-details"> {score} points</span>
          </div>

          <div
            className="model__card--addNewPToQuiz__form"
            style={{ marginTop: "20px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
