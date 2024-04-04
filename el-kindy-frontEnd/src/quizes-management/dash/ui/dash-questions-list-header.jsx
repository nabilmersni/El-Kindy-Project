import { useEffect, useState } from "react";
import "../../../../public/assets/css/style.css";
import DashAnimation from "../../../dashboard-layout/dash-animation";
import AddNewQuestion from "./add-new-question";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../services/apiQuiz";

const DashQuestionListHeader = ({ quizId, setQuestions, questions, quiz }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { id } = useParams();
  const [quizName, setQuizName] = useState("");

  useEffect(() => {
    const fetchQuizName = async () => {
      try {
        const fetchedQuiz = await getQuizById(id);
        setQuizName(fetchedQuiz.quizName);
      } catch (error) {
        console.error("Error fetching quiz name:", error.message);
      }
    };

    fetchQuizName();
  }, [id]);

  return (
    <>
      <div className="dash__content__container__firstRow quiz">
        <div className="dash__content__container__firstRow__leftSide">
          <h1 className="dash__content__container__title quiz">
            Questions List of{" "}
            <span className="quiz-item-details">{quizName}:</span>
          </h1>
        </div>

        <div className="dash__content__container__firstRow__RightSide">
          <div className="add-new-question--btn" onClick={openModal}>
            Add New Question
          </div>
        </div>
        <div className="dash__content__container__firstRow__RightSide__dancingNote">
          <DashAnimation
            classNameName="dancingNote-animation"
            path="../../../../public/assets/json/dancing_note.json"
          />
        </div>
      </div>
      <AddNewQuestion
        quizId={quizId}
        isOpen={isModalOpen}
        onClose={closeModal}
        setQuestions={setQuestions}
        questions={questions}
      />
    </>
  );
};

export default DashQuestionListHeader;
