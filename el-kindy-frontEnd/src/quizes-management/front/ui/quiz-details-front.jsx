import React, { useEffect, useState } from "react";
import { getQuizWithQuestionsAndAnswers } from "../../services/apiQuiz";
import { useParams } from "react-router-dom";
import ResultatQuiz from "./resultat-quiz";
import Lottie from "react-lottie";
import guitarAnimation from "../../../../public/lottieAnimations/guitar.json";
import speakerAnimation from "../../../../public/lottieAnimations/speaker.json";
const QuizDetailsFront = ({}) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const { userId, quizId } = useParams();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizData = await getQuizWithQuestionsAndAnswers(userId, quizId);

        const shuffledQuestions = shuffleArray(quizData.questions);

        const selectedQuestions = shuffledQuestions.slice(
          0,
          quizData.nbQuestions
        );

        setQuiz({ ...quizData, questions: selectedQuestions });

        setTimeRemaining(quizData.quizDuration * 60);
        console.log(quizData);
      } catch (error) {
        console.error("Erreur lors de la récupération du quiz:", error.message);
      }
    };

    fetchQuiz();
  }, [userId, quizId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    if (timeRemaining === 0) {
      clearInterval(timer);
      calculateScore();
    }

    return () => clearInterval(timer);
  }, [timeRemaining]);
  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    console.log(
      "Index de la question actuelle après passage à la question suivante :",
      currentQuestionIndex
    );
  };
  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    console.log(
      "Index de la question actuelle après passage à la question précédente :",
      currentQuestionIndex
    );
  };

  const handleAnswerSelect = (answerIndex) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const speakQuestion = () => {
    const question = quiz.questions[currentQuestionIndex].questionText;

    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(question);
    synth.speak(utterThis);
  };

  const calculateScore = async () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      const selectedAnswerIndex = selectedAnswers[index];
      const correctAnswerIndex = question.answers.findIndex(
        (answer) => answer.isCorrect
      );

      if (selectedAnswerIndex === correctAnswerIndex) {
        score += question.nbPoint;
      }
    });
    setQuizScore(score);
    setIsModalOpen(true);

    console.log("Score final du quiz:", score);

    try {
      const response = await fetch("http://localhost:3000/quizs/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, quizId, score }),
      });

      if (response.ok) {
        console.log("Score enregistré avec succès dans la base de données !");
      } else {
        console.error(
          "Échec de l'enregistrement du score dans la base de données"
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du score:", error.message);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
    //await fetchAnswers();
  };

  return (
    <div className="quiz-container">
      <div className="max-w-[11rem] absolute pt-[8rem] top-[-3rem] left-0">
        <Lottie options={{ animationData: guitarAnimation }} />
      </div>
      <div className="max-w-[11rem] absolute top-[3rem] right-0">
        <Lottie
          isClickToPauseDisabled={true}
          options={{ animationData: speakerAnimation }}
        />
      </div>
      {/* <h4>Bienvenue, {quiz && quiz.users && quiz.users.fullname}!</h4> */}
      <h1>
        <strong className="quiz-item-details">
          Temps restant: {Math.floor(timeRemaining / 60)}:
          {timeRemaining % 60 < 10 ? "0" : ""}
          {timeRemaining % 60}
        </strong>
      </h1>
      {quiz && (
        <div className="quiz-content">
          {currentQuestionIndex < quiz.questions.length && (
            <div>
              <h4>
                Question {currentQuestionIndex + 1}:{" "}
                {quiz.questions[currentQuestionIndex].questionText} (
                {quiz.questions[currentQuestionIndex].nbPoint} points)
                <button onClick={speakQuestion} className="microphone-button">
                  <span role="img" aria-label="microphone">
                    🎤
                  </span>
                </button>
              </h4>

              {quiz.questions[currentQuestionIndex].image && (
                <img
                  className="img-quiz"
                  src={`http://localhost:3000/upload-directory/${quiz.questions[currentQuestionIndex].image}`}
                  alt={`Image de la question ${currentQuestionIndex + 1}`}
                />
              )}

              <ul className="ul-quiz">
                {quiz.questions[currentQuestionIndex].answers.map(
                  (answer, index) => (
                    <li
                      key={answer._id}
                      className={`li-quiz ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? "selected-answer"
                          : "answer-container"
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      {answer.image && (
                        <img
                          src={`http://localhost:3000/upload-directory/${answer.image}`}
                          alt={`Image de la réponse ${index}`}
                          className="img-answer"
                        />
                      )}
                      {answer.answerText}
                    </li>
                  )
                )}
              </ul>

              <div className="button-container-quiz ">
                {currentQuestionIndex > 0 && (
                  <button
                    className="button-quiz previous"
                    onClick={handlePreviousQuestion}
                  >
                    Précédent
                  </button>
                )}
                {currentQuestionIndex < quiz.questions.length - 1 && (
                  <button className="button-quiz" onClick={handleNextQuestion}>
                    Suivant
                  </button>
                )}
                {currentQuestionIndex === quiz.questions.length - 1 && (
                  <button className="button-quiz" onClick={calculateScore}>
                    Terminer le quiz et calculer le score
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {isModalOpen && (
        <ResultatQuiz
          isOpen={isModalOpen}
          onClose={closeModal}
          score={quizScore}
          quizName={quiz.quizName}
        />
      )}
    </div>
  );
};
export default QuizDetailsFront;
