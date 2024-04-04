import { useState } from "react";
import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import AddNewQuizCard from "../ui/add-new-quiz-card";
import { addQuiz } from "../../services/apiQuiz";
import { useNavigate } from "react-router-dom";

const DashAdminAddNewQuiz = () => {
  const navigate = useNavigate();
  const [quizItem, setQuizItem] = useState({
    quizName: "",
    description: "",
    level: "",
    nbQuestions: 0,
    quizDuration: 0,
  });
  const [errors, setErrors] = useState({
    quizName: "",
    description: "",
    level: "",
    nbQuestions: "",
    quizDuration: "",
  });

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setQuizItem({
      ...quizItem,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";
    switch (fieldName) {
      case "quizName":
        errorMessage = value.trim() ? "" : "Name is required";
        break;
      case "description":
        errorMessage = value.trim() ? "" : "Description is required";
        break;
      case "level":
        errorMessage = value.trim() ? "" : "Level is required";
        break;
      case "nbQuestions":
        errorMessage = value.trim() ? "" : "Number of questions is required";
        if (value.trim() && isNaN(value)) {
          errorMessage = "Number of questions must be a valid number";
        } else if (value.trim() && parseInt(value) <= 0) {
          errorMessage = "Number of questions must be a positive number";
        }
        break;
      case "quizDuration":
        errorMessage = value.trim() ? "" : "Quiz duration is required";
        if (value.trim() && isNaN(value)) {
          errorMessage = "Quiz duration must be a valid number";
        } else if (value.trim() && parseInt(value) <= 0) {
          errorMessage = "Quiz duration must be a positive number";
        }
        break;

      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    const updatedErrors = {};
    for (const key in quizItem) {
      const value = quizItem[key];
      const errorMessage =
        typeof value === "string" && value.trim() === ""
          ? `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
          : "";
      updatedErrors[key] = errorMessage;
      if (!value || (typeof value === "string" && !value.trim())) {
        formIsValid = false;
      }
    }
    setErrors(updatedErrors);
    return formIsValid;
  };

  const addNewQuiz = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await addQuiz(quizItem);
      navigate(`/dash-admin-questions/${result._id}/questions`);
    }
  };

  return (
    <DashLayout>
      <AddNewQuizCard
        quizItem={quizItem}
        addNewQuiz={addNewQuiz}
        onValueChange={onValueChange}
        errors={errors}
      />
    </DashLayout>
  );
};

export default DashAdminAddNewQuiz;
