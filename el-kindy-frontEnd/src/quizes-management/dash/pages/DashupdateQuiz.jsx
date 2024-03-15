import React, { useEffect, useState } from "react";
import UpdateDuiz from "../ui/AdminDashUpdateQuizCard";
import AdminDashUpdateQuizCard from "../ui/AdminDashUpdateQuizCard";
import { getQuizById, updateQuiz } from "../../services/apiQuiz";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function DashupdateQuiz() {
  const navigate = useNavigate();
  const { id } = useParams();
  // State variables for existing event data
  const [eventData, setEventData] = useState({
    selectedCategory: "",
    // ... (other state variables for existing event data)
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    let errors = {};

    if (nbQuestions < 0) {
      errors.nbQuestions = "Must be a positive number";
    }

    if (quizDuration < 0) {
      errors.quizDuration = "Must be a positive number";
    }
    const today = new Date();

    if (new Date(quizStartDate) < today) {
      errors.quizStartDate = "Must be a future date";
    }

    if (new Date(quizEndDate) < today) {
      errors.quizEndDate = "Must be a future date";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // State variables for form data
  const [quizName, setEnteredTitle] = useState("");
  const [description, setEnteredDescription] = useState("");
  const [level, setEnteredPrice] = useState("");
  const [nbQuestions, setEventDate] = useState("");
  const [quizDuration, setAvailablePlaces] = useState(0);
  const [quizStartDate, setEventPlaceString] = useState("");
  const [quizEndDate, setEndDate] = useState("");
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventData = await getQuizById(id);
        setEnteredTitle(eventData.quizName);
        setEnteredDescription(eventData.description);
        setEnteredPrice(eventData.level);
        setEventDate(eventData.nbQuestions);
        setAvailablePlaces(eventData.quizDuration);
        setEventPlaceString(
          new Date(eventData.quizStartDate).toISOString().split("T")[0]
        );
        setEndDate(new Date(eventData.quizEndDate).toISOString().split("T")[0]);
        // Update other state variables accordingly
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Your logic to update the event with the new state values
    const updatedEvent = {
      quizName,
      description,
      level,
      nbQuestions,
      quizDuration,
      quizStartDate,
      quizEndDate,
      // ... other properties
    };
    try {
      // Call your updateEvent API here with the updatedEvent data
      const result = await updateQuiz(id, updatedEvent);
      navigate("/dash-admin-quizes");
      // Handle the result, such as showing a success message
      console.log("Event updated successfully:", result);
    } catch (error) {
      console.error("Error updating event:", error);
      // Handle the error, such as showing an error message
    }
  };
  // Event handlers for form fields
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
    setAvailablePlaces(e.target.value);
  };
  const handleEventPlaceChange = (e) => {
    setEventPlaceString(e.target.value);
  };
  const handleDatePlaceChange = (e) => {
    setEndDate(e.target.value);
  };
  const handleEventChange = (e) => {
    setEventDate(e.target.value);
  };
  return (
    <div>
      <AdminDashUpdateQuizCard
        quizName={quizName}
        description={description}
        level={level}
        nbQuestions={nbQuestions}
        quizDuration={quizDuration}
        quizStartDate={quizStartDate}
        quizEndDate={quizEndDate}
        handleTitleChange={handleTitleChange}
        handleDescriptionChange={handleDescriptionChange}
        handlePriceChange={handlePriceChange}
        handleAvailablePlacesChange={handleAvailablePlacesChange}
        handleEventPlaceChange={handleEventPlaceChange}
        handleDatePlaceChange={handleDatePlaceChange}
        handleEventChange={handleEventChange}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
}
export default DashupdateQuiz;
