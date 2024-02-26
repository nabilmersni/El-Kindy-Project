import "../../../../public/assets/css/style.css";
import { useState } from "react";

const AddNewQuizCard = () => {
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  //----------------------------------------
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  //-----------------------------------------
  const [shuffleQuestionsChecked, setShuffleQuestionsChecked] = useState(true);

  const handleShuffleQuestionsChange = () => {
    setShuffleQuestionsChecked((prevChecked) => !prevChecked);
  };

  //-----------------------------------------
  const [displayCorrectionChecked, setDisplayCorrectionChecked] =
    useState(true);

  const handleDisplayCorrectionChange = () => {
    setDisplayCorrectionChecked((prevChecked) => !prevChecked);
  };

  //-----------------------------------------
  const [timeLimitChecked, setTimeLimitChecked] = useState(false);

  const handleTimeLimitChange = () => {
    setTimeLimitChecked((prevChecked) => !prevChecked);
  };

  //-------------------------------------------
  // -------------
  const [enteredName, setEnteredNom] = useState("");
  const nomChangeHandle = (event) => {
    setEnteredNom(event.target.value);
  };

  // -------------
  const [enteredDescription, setEnteredDescription] = useState("");
  const descriptionChangeHandle = (event) => {
    setEnteredDescription(event.target.value);
  };

  // -------------
  const [enteredNumberOfQuestions, setEnteredNumberOfQuestions] = useState("");
  const numberOfQuestionsChangeHandle = (event) => {
    setEnteredNumberOfQuestions(event.target.value);
  };

  // -------------
  const [enteredNumberOfAttempts, setEnteredNumberOfAttempts] = useState("");
  const numberOfAttemptsChangeHandle = (event) => {
    setEnteredNumberOfAttempts(event.target.value);
  };

  // -------------
  const [enteredTimeLimit, setEnteredTimeLimit] = useState("");
  const TimeLimitChangeHandle = (event) => {
    setEnteredTimeLimit(event.target.value);
  };

  //---------------------------------------
  const submitHandler = (event) => {
    event.preventDefault();

    const quizData = {
      name: enteredName,
      description: enteredDescription,
      level: selectedLevel,
      questionsNb: enteredNumberOfQuestions,
      attemptsNb: enteredNumberOfAttempts,
      time: enteredTimeLimit,
      timeUnite: selectedTime,
      questionsShuffle: shuffleQuestionsChecked,
      displayCorrection: displayCorrectionChecked,
    };

    console.log(quizData);
  };

  return (
    <div className="dash-card__container">
      <form onSubmit={submitHandler} className="dash-card">
        <div className="dash-card__header">
          <div className="dash-card__header-title">Quiz details</div>
          <div className="dash-card__header-icon">
            <svg
              id="course-add-card__header-icon-svg"
              className="course-add-card__header-icon-svg"
              viewBox="0 0 24 24"
              fill="#006bbe"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="8"
                className="course-add-card__header-icon-svg-circle"
                stroke="none"
                strokeWidth="1.5"
              ></circle>
              <path
                fill="#fff"
                d="M14.325 9.956c0 .298-.103.605-.308.924a3.726 3.726 0 01-.68.786c-.657.566-.987.983-.987 1.252 0 .595-.233.892-.7.892a.688.688 0 01-.531-.233c-.135-.156-.202-.365-.202-.627s.064-.506.191-.732c.135-.234.294-.44.478-.616.184-.184.368-.361.552-.531.453-.41.68-.782.68-1.115a.627.627 0 00-.277-.53.957.957 0 00-.615-.213.943.943 0 00-.606.212c-.17.135-.332.273-.488.414a.738.738 0 01-.51.202.614.614 0 01-.467-.19.68.68 0 01-.18-.468c0-.333.23-.669.69-1.009a2.47 2.47 0 011.518-.52c.722 0 1.31.202 1.763.605.452.404.679.903.679 1.497zm-2.697 4.449c.248 0 .443.081.584.244.142.156.213.35.213.584a.959.959 0 01-.245.637.787.787 0 01-.615.276.721.721 0 01-.574-.244.903.903 0 01-.201-.595c0-.234.078-.442.233-.626a.776.776 0 01.605-.276z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="dash-card__description"></div>
        <hr className="dash-card__hr-border" />

        <div className="course-add-form__input__group">
          <label className="course-add-form__input__label">
            Name <span>*</span>
          </label>
          <input
            type="text"
            className="course-add-form__input"
            placeholder="Name"
            onChange={nomChangeHandle}
          />
        </div>

        <div className="course-add-form__input__group">
          <label className="course-add-form__input__label">
            Description <span>*</span>
          </label>
          <textarea
            className="course-add-form__input textarea"
            placeholder="Description"
            onChange={descriptionChangeHandle}
          ></textarea>
        </div>

        <div className="course-add-form__input__group-row">
          <div className="course-add-form__input__group">
            <label
              htmlFor="courseCategory"
              className="course-add-form__input__label"
            >
              Level <span>*</span>
            </label>
            <select
              className="course-add-form__input"
              value={selectedLevel}
              onChange={handleLevelChange}
            >
              <option value="" disabled hidden>
                Level
              </option>
              <option value="individual">1A</option>
              <option value="inGroup">2A</option>
              <option value="inGroup">3A</option>
            </select>
          </div>

          <div className="course-add-form__input__group">
            <label
              htmlFor="courseAttempts"
              className="course-add-form__input__label"
            >
              Number of questions <span>*</span>
            </label>
            <input
              id="questionsNumber"
              name="questionsNumber"
              type="number"
              className="course-add-form__input"
              placeholder="10"
              onChange={numberOfQuestionsChangeHandle}
            />
          </div>
        </div>

        <div className="course-add-form__input__group half-width">
          <label className="course-add-form__input__label">
            Number of attempts <span>*</span>
          </label>
          <input
            id="courseAttempts"
            name="courseAttempts"
            type="number"
            className="course-add-form__input"
            placeholder="Number of attempts"
            onChange={numberOfAttemptsChangeHandle}
          />
        </div>

        <div className="course-add-form__input__group switchBtn">
          <p className="course-add-form__input__label switchBtn">Time limit</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={timeLimitChecked}
              onChange={handleTimeLimitChange}
            />
            <span className="slider round"></span>
          </label>
        </div>

        {timeLimitChecked ? (
          <div className="course-add-form__input__group-row switchBtn">
            <input
              id="timeLimit"
              name="timeLimit"
              type="number"
              className="course-add-form__input"
              placeholder="1"
              onChange={TimeLimitChangeHandle}
            />
            <select
              className="course-add-form__input"
              value={selectedTime}
              onChange={handleTimeChange}
            >
              <option value="Hours">Hours</option>
              <option value="Minutes">Minutes</option>
            </select>
          </div>
        ) : null}

        <div className="course-add-form__input__group-row">
          <div className="course-add-form__input__group switchBtn">
            <p className="course-add-form__input__label switchBtn">
              Shuffle the questions
            </p>
            <label className="switch">
              <input
                type="checkbox"
                checked={shuffleQuestionsChecked}
                onChange={handleShuffleQuestionsChange}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="course-add-form__input__group switchBtn">
            <p className="course-add-form__input__label switchBtn">
              Display the correction
            </p>
            <label className="switch">
              <input
                type="checkbox"
                checked={displayCorrectionChecked}
                onChange={handleDisplayCorrectionChange}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <hr className="dash-card__hr-border quiz" />

        <button type="submit" className="add-new-course__submit-btn quiz">
          Add New Quiz
        </button>
      </form>
    </div>
  );
};

export default AddNewQuizCard;
