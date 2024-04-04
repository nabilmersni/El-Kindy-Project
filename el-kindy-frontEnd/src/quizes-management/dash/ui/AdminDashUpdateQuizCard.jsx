import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
const AdminDashUpdateQuizCard = (props) => {
  const {
    quizName,
    description,
    nbQuestions,
    level,
    quizDuration,
    handleTitleChange,
    handleDescriptionChange,
    handlePriceChange,
    handleAvailablePlacesChange,
    handleEventChange,
    handleSubmit,
    errors,
  } = props;
  const hasErrors = Object.values(errors).some((error) => error !== "");
  return (
    <DashLayout>
      <div className="dash-card__container">
        <form className="dash-card">
          <div className="course-add-form__input__group">
            <label htmlFor="quizName" className="course-add-form__input__label">
              Quiz Name <span>*</span>
            </label>
            <input
              type="text"
              value={quizName}
              className="course-add-form__input"
              placeholder="Title"
              onChange={handleTitleChange}
            />
          </div>

          <div className="course-add-form__input__group">
            <label
              htmlFor="descrition"
              className="course-add-form__input__label"
            >
              Quiz Description <span>*</span>
            </label>
            <textarea
              className="course-add-form__input textarea"
              placeholder="Descrition"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>

          <div className="course-add-form__input__group">
            <label htmlFor="level" className="course-add-form__input__label">
              Level <span>*</span>
            </label>

            <select
              id="level"
              name="level"
              className="course-add-form__input"
              value={level}
              onChange={handlePriceChange}
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
          </div>

          <div className="course-add-form__input__group-row">
            <div className="course-add-form__input__group">
              <label
                htmlFor="nbQuestions"
                className="course-add-form__input__label"
              >
                Number of questions <span>*</span>
              </label>
              <input
                type="number"
                className="course-add-form__input course-add-form__input__label-Price"
                placeholder="nbQuestions"
                value={nbQuestions}
                onChange={handleEventChange}
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
                Quiz Duration <span>*</span>
              </label>
              <input
                type="number"
                className="course-add-form__input"
                placeholder="Available Places"
                value={quizDuration}
                onChange={handleAvailablePlacesChange}
              />
              {errors.quizDuration && (
                <span className="error-message">{errors.quizDuration}</span>
              )}
            </div>
          </div>

          <hr className="dash-card__hr-border hr-border-2" />

          <button
            onClick={handleSubmit}
            className="add-new-course__submit-btn"
            disabled={hasErrors}
          >
            Update Quiz
          </button>
        </form>
      </div>
    </DashLayout>
  );
};

export default AdminDashUpdateQuizCard;