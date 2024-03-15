import React, { useEffect, useState } from "react";
import AddNewQuestion from "../ui/add-new-question";
import DashQuestionListHeader from "../ui/dash-questions-list-header";
import { getQuestionsForQuiz } from "../../services/apiQuiz";
import { useNavigate } from "react-router-dom";

export default function DashAddNewQuestion({ data }) {
  console.log("data is", data);
  if (!isOpen) {
    return null; // Don't render anything if the modal is closed
  }
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    console.log("hjhihhihihiuhi");
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestionsForQuiz(quizId);

        setQuestions(fetchedQuestions);

        console.log("jjjjjjjjjjjjjj", questions);
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };

    fetchQuestions();

    console.log(questions);
  }, []);
  //[quizId, setQuestions]
  return (
    <DashLayout>
      <AddNewQuestion questions={questions} setQuestions={setQuestions} />
    </DashLayout>
  );
}
