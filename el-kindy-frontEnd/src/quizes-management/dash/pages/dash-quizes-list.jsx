import { useEffect, useState } from "react";

import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import DashQuizesListHeader from "../ui/dash-quizes-list-header";
import QuizCard from "../ui/quiz-card";
import { getallQuizs } from "../../services/apiQuiz";
import QuestionCard from "../ui/question-card";
import DashQuestionListHeader from "../ui/dash-questions-list-header";

const DashQuizesList = () => {
  // const { id } = useParams();
  // const quizes = [
  //   {
  //     id: 1,
  //     title: "Introduction to Sketching and Shading",
  //     category: "Drawing",
  //   },
  //   {
  //     id: 2,
  //     title: "Introduction to Sketching and Shading",
  //     category: "Drawing",
  //   },
  //   {
  //     id: 3,
  //     title: "Introduction to Sketching and Shading",
  //     category: "Drawing",
  //   },
  //   {
  //     id: 4,
  //     title: "Introduction to Sketching and Shading",
  //     category: "Drawing",
  //   },
  // ];

  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    const fetchQuizs = async () => {
      try {
        const quizResult = await getallQuizs();
        console.log("quizResult:", quizResult); // Log the entire response to the console

        if (Array.isArray(quizResult)) {
          setQuizList(quizResult);
        } else {
          // Handle the case where eventsResult is not an array
          console.error("Error: eventsResult is not an array");
        }
      } catch (error) {
        // Handle errors
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

  return (
    <DashLayout>
      <DashQuizesListHeader />
      <div className="dash__content__container__courses-list quiz">
        {quizList.map((item, index) => (
          <QuizCard key={index} data={item} onDelete={handleDeleteQuiz} />
        ))}
      </div>
    </DashLayout>
  );
};

export default DashQuizesList;
