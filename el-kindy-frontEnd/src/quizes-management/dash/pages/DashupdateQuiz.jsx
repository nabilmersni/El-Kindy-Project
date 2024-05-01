import React, { useEffect, useState } from "react";
import AdminDashUpdateQuizCard from "../ui/AdminDashUpdateQuizCard";
import { getQuizById, updateQuiz } from "../../services/apiQuiz";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function DashupdateQuiz() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [eventData, setEventData] = useState({
    selectedCategory: "",
  });
  const [errors, setErrors] = useState({});
  const [quizName, setEnteredTitle] = useState("");
  const [description, setEnteredDescription] = useState("");
  const [level, setEnteredPrice] = useState("");
  const [nbQuestions, setEventDate] = useState("");
  const [quizDuration, setAvailablePlaces] = useState(0);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventData = await getQuizById(id);
        setEnteredTitle(eventData.quizName);
        setEnteredDescription(eventData.description);
        setEnteredPrice(eventData.level);
        setEventDate(eventData.nbQuestions);
        setAvailablePlaces(eventData.quizDuration);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      quizName,
      description,
      level,
      nbQuestions,
      quizDuration,
    };
    try {
      const result = await updateQuiz(id, updatedEvent);
      navigate("/dash-admin-quizes");

      console.log("Event updated successfully:", result);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleTitleChange = (e) => {
    setEnteredTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setEnteredDescription(e.target.value);
  };
  const handlePriceChange = (e) => {
    setEnteredPrice(e.target.value);
  };
  const handleAvailablePlacesChange = (e) => {
    const value = e.target.value;

    // Vérifiez si la valeur est un nombre positif
    if (value < 0 || isNaN(value)) {
      setErrors({
        ...errors,
        quizDuration: "Quiz Duration must be a positive number.",
      });
    } else {
      setErrors({ ...errors, quizDuration: "" });
    }

    setAvailablePlaces(value);
  };
  const handleEventChange = (e) => {
    const value = e.target.value;

    // Vérifiez si la valeur est un nombre positif
    if (value < 0 || isNaN(value)) {
      setErrors({
        ...errors,
        nbQuestions: "Number of questions must be a positive number.",
      });
    } else {
      setErrors({ ...errors, nbQuestions: "" });
    }

    setEventDate(value);
  };
  return (
    <div>
      <AdminDashUpdateQuizCard
        quizName={quizName}
        description={description}
        level={level}
        nbQuestions={nbQuestions}
        quizDuration={quizDuration}
        handleTitleChange={handleTitleChange}
        handleDescriptionChange={handleDescriptionChange}
        handlePriceChange={handlePriceChange}
        handleAvailablePlacesChange={handleAvailablePlacesChange}
        handleEventChange={handleEventChange}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
}
export default DashupdateQuiz;
