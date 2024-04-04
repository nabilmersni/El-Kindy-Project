import "../../../../public/assets/css/style.css";
import { useEffect, useState } from "react";
import AnswerItem from "./answer-item";

import {
  deleteQuestionFromQuiz,
  getAnswers,
  getQuestionsForQuiz,
} from "../../services/apiQuiz";
import { Link, useParams } from "react-router-dom";
import UpdateQuestion from "./update-question";
import AddNewAnswer from "./add-new-answer";

const QuestionCard = ({ data, quizId, setQuestions, deleteanswer, index }) => {
  const [answers, setAnswers] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnswers = async () => {
      setLoading(true);
      const response = await getAnswers(quizId, data._id);

      setAnswers(response.data);
      setLoading(false);
    };
    fetchAnswers();
  }, [quizId, data._id]);

  const toggleQuestion = () => {
    setIsOpened(!isOpened);
  };
  const fetchAnswers = async () => {
    setLoading(true);
    const response = await getAnswers(quizId, data._id);
    setAnswers(response.data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestionsForQuiz(quizId);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };

    fetchQuestions();
  }, [quizId, setQuestions]);

  const deleteQuestion = async (setQuestions) => {
    if (!quizId) {
      console.log("Pas d'ID de quiz", quizId);
      return;
    }
    try {
      await deleteQuestionFromQuiz(quizId, data._id);
      // Mettre à jour les questions après suppression
      const fetchedQuestions = await getQuestionsForQuiz(quizId);
      alert("Question deleted successfully!");
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  //**********************************

  const openDetails = () => {
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

  //********************* */

  const updateQuestions = async () => {
    try {
      const fetchedQuestions = await getQuestionsForQuiz(quizId);
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    }
  };

  //************************************ */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
    await fetchAnswers();
  };

  return (
    <div className="question--item__group">
      <div
        className={`question-item ${isOpened ? "isOpened" : ""}`}
        draggable="true"
      >
        <div className="question-item__text">
          <div className="question-item__text-icon">
            <div className="question-item__text-icon-arrow up">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0"
                y="0"
                viewBox="0 0 32 32"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M29.121 8.379C28.555 7.813 27.801 7.5 27 7.5s-1.555.313-2.121.879L16 17.258 7.121 8.379C6.555 7.813 5.801 7.5 5 7.5s-1.555.313-2.121.879C2.312 8.945 2 9.699 2 10.5s.312 1.555.879 2.121l11 11c.566.567 1.32.879 2.121.879s1.555-.313 2.121-.879l11-11c.567-.566.879-1.32.879-2.121s-.312-1.555-.879-2.121z"
                    opacity="1"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="question-item__text-icon-arrow down">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0"
                y="0"
                viewBox="0 0 32 32"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M29.121 8.379C28.555 7.813 27.801 7.5 27 7.5s-1.555.313-2.121.879L16 17.258 7.121 8.379C6.555 7.813 5.801 7.5 5 7.5s-1.555.313-2.121.879C2.312 8.945 2 9.699 2 10.5s.312 1.555.879 2.121l11 11c.566.567 1.32.879 2.121.879s1.555-.313 2.121-.879l11-11c.567-.566.879-1.32.879-2.121s-.312-1.555-.879-2.121z"
                    opacity="1"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
          <div className="question-item__text-nmuber">Q{index + 1}:</div>
          <div className="question-item__text-fullQuestion">
            {data.questionText}
          </div>
        </div>
        <div className="question-item__buttons">
          <div
            className="question-item__buttons-addNewOption-btn"
            onClick={openModal}
          >
            Add New Option
          </div>
          <div className="question-item__buttons-controllers">
            <a className="dash__courses__list__card-content-btns-list__show quizes">
              <div className="edit-icon" onClick={openDetails}>
                {showDetails && <UpdateQuestion />}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0"
                  y="0"
                  viewBox="0 0 24 24"
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      d="M19 12a1 1 0 0 0-1 1v8c0 .551-.448 1-1 1H3c-.552 0-1-.449-1-1V7c0-.551.448-1 1-1h8a1 1 0 1 0 0-2H3C1.346 4 0 5.346 0 7v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-8a1 1 0 0 0-1-1z"
                      opacity="1"
                    ></path>
                    <path
                      d="M9.376 11.089a.506.506 0 0 0-.137.255l-.707 3.536a.501.501 0 0 0 .589.588l3.535-.707a.497.497 0 0 0 .256-.137l7.912-7.912-3.535-3.535zM23.268.732a2.502 2.502 0 0 0-3.535 0l-1.384 1.384 3.535 3.535 1.384-1.384C23.74 3.796 24 3.168 24 2.5s-.26-1.296-.732-1.768z"
                      opacity="1"
                    ></path>
                  </g>
                </svg>
              </div>
            </a>

            {/* <a className="dash__courses__list__card-content-btns-list__show quizes"> */}
            <Link
              className="dash__courses__list__card-content-btns-list__show quizes question-item__buttons-controllers-btn delete"
              onClick={() => deleteQuestion(setQuestions)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                className="delete-icon"
              >
                <g>
                  <path
                    d="m62.205 150 26.569 320.735C90.678 493.865 110.38 512 133.598 512h244.805c23.218 0 42.92-18.135 44.824-41.265L449.795 150H62.205zm118.781 302c-7.852 0-14.458-6.108-14.956-14.063l-15-242c-.513-8.276 5.771-15.395 14.033-15.908 8.569-.601 15.381 5.757 15.908 14.033l15 242c.531 8.57-6.25 15.938-14.985 15.938zM271 437c0 8.291-6.709 15-15 15s-15-6.709-15-15V195c0-8.291 6.709-15 15-15s15 6.709 15 15v242zm89.97-241.062-15 242c-.493 7.874-7.056 14.436-15.908 14.033-8.262-.513-14.546-7.632-14.033-15.908l15-242c.513-8.276 7.764-14.297 15.908-14.033 8.262.513 14.546 7.632 14.033 15.908zM451 60h-90V45c0-24.814-20.186-45-45-45H196c-24.814 0-45 20.186-45 45v15H61c-16.569 0-30 13.431-30 30 0 16.567 13.431 30 30 30h390c16.569 0 30-13.433 30-30 0-16.569-13.431-30-30-30zm-120 0H181V45c0-8.276 6.724-15 15-15h120c8.276 0 15 6.724 15 15v15z"
                    opacity="1"
                  ></path>
                </g>
              </svg>
            </Link>
            {/* </a> */}
            <div
              className="question-item__buttons-controllers-btn arrow-icon"
              onClick={toggleQuestion}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0"
                y="0"
                viewBox="0 0 32 32"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M29.121 8.379C28.555 7.813 27.801 7.5 27 7.5s-1.555.313-2.121.879L16 17.258 7.121 8.379C6.555 7.813 5.801 7.5 5 7.5s-1.555.313-2.121.879C2.312 8.945 2 9.699 2 10.5s.312 1.555.879 2.121l11 11c.566.567 1.32.879 2.121.879s1.555-.313 2.121-.879l11-11c.567-.566.879-1.32.879-2.121s-.312-1.555-.879-2.121z"
                    opacity="1"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={`question-item__reponses ${isOpened ? "isOpened" : ""}`}>
        <div
          className={`question-item__reponses-list ${
            isOpened ? "isOpened" : ""
          }`}
        >
          {answers.map((item, index) => (
            <AnswerItem
              key={index}
              data={item}
              questionId={data._id}
              quizId={quizId}
              answers={answers}
              setAnswers={setAnswers}
              deleteanswer={deleteanswer}
            />
          ))}
        </div>
      </div>
      <UpdateQuestion
        isOpen={showDetails}
        isCloseQuiz={closeDetails}
        quizId={quizId}
        data={data}
        updateQuestions={updateQuestions}
      />
      <AddNewAnswer
        quizId={quizId}
        isOpen={isModalOpen}
        onClose={closeModal}
        data={data}
        setAnswers={setAnswers}
        fetchAnswers={fetchAnswers}
      />
    </div>
  );
};

export default QuestionCard;
