import { useEffect, useState } from "react";
import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import DashQuizesListHeader from "../ui/dash-quizes-list-header";
import QuizCard from "../ui/quiz-card";
import { getallQuizs } from "../../services/apiQuiz";

const DashQuizesList = () => {
  const [quizList, setQuizList] = useState([]);
  const [searchLevel, setSearchLevel] = useState("");
  useEffect(() => {
    const fetchQuizs = async () => {
      try {
        const quizResult = await getallQuizs();
        console.log("quizResult:", quizResult);
        if (Array.isArray(quizResult)) {
          setQuizList(quizResult);
        } else {
          console.error("Error: eventsResult is not an array");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchQuizs();
  }, []);

  const handleDeleteQuiz = (deleteQuizId) => {
    setQuizList((prevQuiz) =>
      prevQuiz.filter((quiz) => quiz._id !== deleteQuizId)
    );
  };

  const filteredQuizzes = quizList.filter((quiz) =>
    quiz.quizName.toLowerCase().includes(searchLevel.toLowerCase())
  );

  return (
    <DashLayout>
      <DashQuizesListHeader onSearchLevelChange={setSearchLevel} />

      <div className="dash__content__container__courses-list quiz">
        {filteredQuizzes.map((item, index) => (
          <QuizCard key={index} data={item} onDelete={handleDeleteQuiz} />
        ))}
      </div>
    </DashLayout>
  );
};

export default DashQuizesList;
