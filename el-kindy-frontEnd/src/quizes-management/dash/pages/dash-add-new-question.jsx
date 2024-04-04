import React, { useEffect, useState } from "react";
import AddNewQuestion from "../ui/add-new-question";
import { getQuestionsForQuiz } from "../../services/apiQuiz";

export default function DashAddNewQuestion({ data }) {
  console.log("data is", data);
  if (!isOpen) {
    return null;
  }
  const [questions, setQuestions] = useState([]);

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

    console.log(questions);
  }, []);

  return (
    <DashLayout>
      <AddNewQuestion questions={questions} setQuestions={setQuestions} />
    </DashLayout>
  );
}
