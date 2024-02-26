import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import DashQuizesListHeader from "../ui/dash-quizes-list-header";
import QuizCard from "../ui/quiz-card";

const DashQuizesList = () => {
  const quizes = [
    {
      id: 1,
      title: "Introduction to Sketching and Shading",
      category: "Drawing",
    },
    {
      id: 2,
      title: "Introduction to Sketching and Shading",
      category: "Drawing",
    },
    {
      id: 3,
      title: "Introduction to Sketching and Shading",
      category: "Drawing",
    },
    {
      id: 4,
      title: "Introduction to Sketching and Shading",
      category: "Drawing",
    },
  ];
  return (
    <DashLayout>
      <DashQuizesListHeader />
      <div className="dash__content__container__courses-list quiz">
        {quizes.map((item, index) => (
          <QuizCard key={index} data={item} />
        ))}
      </div>
    </DashLayout>
  );
};

export default DashQuizesList;