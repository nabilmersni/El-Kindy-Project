import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import AddNewQuizCard from "../ui/add-new-quiz-card";

const DashAdminAddNewQuiz = () => {
  return (
    <DashLayout>
      <AddNewQuizCard />
    </DashLayout>
  );
};

export default DashAdminAddNewQuiz;
