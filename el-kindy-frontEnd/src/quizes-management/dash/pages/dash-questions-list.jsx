import { useEffect, useState } from "react";
import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import DashQuestionListHeader from "../ui/dash-questions-list-header";
import QuestionCard from "../ui/question-card";
import { getQuestionsForQuiz } from "../../services/apiQuiz";
import { useParams } from "react-router-dom";

const DashQuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  const { id: quizId } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestionsForQuiz(id);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };

    fetchQuestions();

    console.log("dash question list", questions);
  }, [id]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [answers, setAnswers] = useState([]);
  const deleteanswer = (deleteanswer) => {
    setAnswers((prevQuiz) =>
      prevQuiz.filter((answer) => answer._id !== deleteanswer)
    );
  };
  return (
    <DashLayout>
      <DashQuestionListHeader
        quizId={quizId}
        setQuestions={setQuestions}
        questions={questions}
      />
      <div className="dash__content__container__courses-list quiz">
        {questions.map((item, index) => (
          <QuestionCard
            key={index}
            data={item}
            quizId={quizId}
            setQuestions={setQuestions}
            questions={questions}
            deleteanswer={deleteanswer}
            index={index}
          />
        ))}
      </div>
    </DashLayout>
  );
};

export default DashQuestionsList;
