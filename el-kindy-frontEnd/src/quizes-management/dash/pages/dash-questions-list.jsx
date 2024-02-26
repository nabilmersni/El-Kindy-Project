import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import DashQuestionListHeader from "../ui/dash-questions-list-header";
import QuestionCard from "../ui/question-card";

const DashQuestionsList = () => {
  const questions = [
    {
      id: 1,
      question: "How many black and white keys are there on a standard piano ?",
    },
    {
      id: 2,
      question: "How many black and white keys are there on a standard piano ?",
    },
    {
      id: 3,
      question: "How many black and white keys are there on a standard piano ?",
    },
    {
      id: 4,
      question: "How many black and white keys are there on a standard piano ?",
    },
  ];
  return (
    <DashLayout>
      <DashQuestionListHeader />
      <div className="dash__content__container__courses-list quiz">
        {questions.map((item, index) => (
          <QuestionCard key={index} data={item} />
        ))}
      </div>
    </DashLayout>
  );
};

export default DashQuestionsList;
