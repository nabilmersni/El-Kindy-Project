import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { fetchQuizzesByUser, startQuizUpdate } from "../../services/apiQuiz";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import guitarAnimation from "../../../../public/lottieAnimations/guitar.json";
import speakerAnimation from "../../../../public/lottieAnimations/speaker.json";
import UserSideLayout from "../../../dashboard-layout/UserSideLayout";
const QuizListFront = () => {
  const { user } = useSelector((state) => state.auth);

  const [quizzes, setQuizzes] = useState([]);
  const [quizUser, setQuizUser] = useState();
  const startedQuizzes = quizzes.filter((quiz) => quiz.isStarted);
  const userId = user._id;

  useEffect(() => {
    fetchQuizzesByUser(userId, setQuizzes);
  }, [userId]);

  const startQuizUpdatee = async (userId, quizId) => {
    try {
      const updatedQuizUser = startQuizUpdate(userId, quizId);
      setQuizUser(updatedQuizUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserSideLayout>
      <div className="container mx-auto w-auto mt-8 px-8">
        <div className="max-w-[11rem] absolute pt-[8rem] top-[-3rem] left-0">
          <Lottie options={{ animationData: guitarAnimation }} />
        </div>
        <div className="max-w-[11rem] absolute top-[3rem] right-0">
          <Lottie
            isClickToPauseDisabled={true}
            options={{ animationData: speakerAnimation }}
          />
        </div>
        <div className="relative">
          <h1 className="font-extrabold text-primary text-center text-[2rem] md:text-[3rem] lg:text-[3.5rem] relative z-10">
            Quizes List
          </h1>

          <h1 className="text-2xl font-bold mb-4"></h1>
          <p className="text-black font-normal max-w-[40rem] "></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {startedQuizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="p-4 border-primary border-2 rounded-lg"
              >
                <div className="rounded-lg"></div>
                {quiz.quiz && (
                  <>
                    <h2 className="text-lg font-bold my-4">
                      {quiz.quiz.quizName}
                    </h2>
                    <div className="flex justify-evenly items-center">
                      <div className="flex justify-between items-center">
                        <img
                          src="img/location-icon.svg"
                          alt=""
                          className="w-4 mr-2"
                        />
                        <span className="w-4 h-4 bg-primary rounded-full"></span>
                        <p>Level: {quiz.quiz.level}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <img
                          src="img/calendar-icon.svg"
                          alt=""
                          className="w-4 mr-2"
                        />
                        <span className="w-4 h-4 bg-primary rounded-full"></span>
                        <p>Number of questions: {quiz.quiz.nbQuestions}</p>
                      </div>
                    </div>

                    <div className="flex justify-evenly items-center -mb-2">
                      {quiz.isCompleted ? (
                        <button
                          //onClick={() => startQuizUpdatee(userId, quiz.quiz._id)}
                          disabled={true}
                          className="bg-primary text-white rounded-lg py-2 px-4"
                        >
                          Finished
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            startQuizUpdatee(userId, quiz.quiz._id)
                          }
                          className="bg-primary text-white rounded-lg py-2 px-4"
                        >
                          {quiz.quiz._id && (
                            <Link
                              to={`/quiz-details-front/${userId}/${quiz.quiz._id}`}
                            >
                              Start
                            </Link>
                          )}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="max-w-11rem absolute top-[-3rem] left-0"></div>

            <div className="max-w-11rem absolute top-3rem right-0"></div>
          </div>
        </div>
      </div>
    </UserSideLayout>
  );
};

export default QuizListFront;
