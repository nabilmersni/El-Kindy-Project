import "../../../../public/assets/css/style.css";

const AddNewQuizCard = (props) => {
  const { quizItem, addNewQuiz, onValueChange, errors } = props;

  return (
    <div className="dash-card__container">
      <form className="dash-card">
        <div className="dash-card__header">
          <div className="dash-card__header-title">Add new Quiz</div>
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
          <label htmlFor="quizName" className="course-add-form__input__label">
            Name <span>*</span>
          </label>
          <input
            name="quizName"
            type="text"
            className="course-add-form__input"
            placeholder="Name"
            value={quizItem.quizName}
            onChange={(e) => onValueChange(e)}
          />
          {errors.quizName && (
            <span className="error-message">
              <span className="error-text">{errors.quizName}</span>
            </span>
          )}
        </div>

        <div className="course-add-form__input__group">
          <label
            htmlFor="description"
            className="course-add-form__input__label"
          >
            Description <span>*</span>
          </label>
          <textarea
            name="description"
            className="course-add-form__input textarea"
            placeholder="Description"
            value={quizItem.description}
            onChange={(e) => onValueChange(e)}
          ></textarea>
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        <div className="course-add-form__input__group-row">
          <div className="course-add-form__input__group">
            <label htmlFor="level" className="course-add-form__input__label">
              Level <span>*</span>
            </label>

            <select
              id="level"
              name="level"
              className="course-add-form__input"
              value={quizItem.level}
              onChange={(e) => onValueChange(e)}
            >
              <option value="">Select Level</option>
              <option value="Initiation">Initiation</option>
              <option value="Preparatoire">Preparatoire</option>
              <option value="1er">1er</option>
              <option value="2eme">2eme</option>
              <option value="3eme">3eme</option>
              <option value="4eme">4eme</option>
              <option value="5eme">5eme</option>
              <option value="6eme">6eme</option>
              <option value="Diplome">Diplome</option>
              <option value="1er Adulte">1er Adulte</option>
              <option value="2eme Adulte">2eme Adulte</option>
              <option value="3eme Adulte">3eme Adulte</option>
            </select>
            {errors.level && (
              <span className="error-message">{errors.level}</span>
            )}
          </div>

          <div className="course-add-form__input__group">
            <label
              htmlFor="nbQuestions"
              className="course-add-form__input__label"
            >
              Number of questions <span>*</span>
            </label>
            <input
              id="nbQuestions"
              name="nbQuestions"
              type="number"
              className="course-add-form__input"
              placeholder="10"
              value={quizItem.nbQuestions}
              onChange={(e) => onValueChange(e)}
            />
            {errors.nbQuestions && (
              <span className="error-message">{errors.nbQuestions}</span>
            )}
          </div>

          <div className="course-add-form__input__group">
            <label
              htmlFor="quizDuration"
              className="course-add-form__input__label"
            >
              Quiz duration <span>*</span>
            </label>
            <div className="input-with-unit">
              <input
                id="quizDuration"
                name="quizDuration"
                type="number"
                className="course-add-form__input input-small"
                placeholder="10"
                value={quizItem.quizDuration}
                onChange={(e) => onValueChange(e)}
              />
              {errors.quizDuration && (
                <span className="error-message">{errors.quizDuration}</span>
              )}
              <span className="course-add-form__input__label unit">
                minutes
              </span>
            </div>
          </div>
        </div>

        <hr className="dash-card__hr-border quiz" />

        <button
          type="submit"
          onClick={addNewQuiz}
          className="add-new-course__submit-btn quiz "
        >
          Add New Quiz
        </button>
      </form>
    </div>
  );
};

export default AddNewQuizCard;
