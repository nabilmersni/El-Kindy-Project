import React, { useRef, useState, useEffect } from "react";
import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import {
  addImageToEvent,
  getEventById,
  updateEvent,
} from "../../Services/apiEvent";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminDashUpdateEventCard = () => {
  const { id } = useParams();
  const [EventName, setEnteredTitle] = useState("");
  const [EventDescription, setEnteredDescription] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [availablePlaces, setAvailablePlaces] = useState(0);
  const [eventPlaceString, setEventPlaceString] = useState("");
  const [EventImage, setEventImage] = useState(null);
  const [EventDate, setEventDate] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventData = await getEventById(id);
        // console.log('Event Data:', eventData);

        if (eventData && Object.keys(eventData).length > 0) {
          setEnteredTitle(eventData.EventName);
          setEnteredDescription(eventData.EventDescription);
          setEnteredPrice(eventData.PriceTicket);
          setEventDate(
            new Date(eventData.EventDate).toISOString().split("T")[0]
          );
          setAvailablePlaces(eventData.AvailablePlaces);
          setEventPlaceString(eventData.EventPlace);
          setEventImage(eventData.EventImage);
        } else {
          console.error("No event data found or invalid data format");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [id]);

  //--------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enteredPrice <= 0 || availablePlaces <= 0) {
      console.log(
        "Le prix du billet et le nombre de places disponibles doivent être des valeurs positives."
      );
      return;
    }
    const updatedEvent = {
      EventName,
      EventDescription,
      EventImage,
      PriceTicket: enteredPrice,
      EventDate,
      AvailablePlaces: availablePlaces,
      EventPlace: eventPlaceString,
    };

    try {
      const result = await updateEvent(id, updatedEvent);

      console.log("Event updated successfully:", result);
      navigate("/dash-admin-events");

      const formData = new FormData();
      formData.append("image", EventImage);
      const uploadResponse = await addImageToEvent(id, formData);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  //------------------
  const handleDescriptionChange = (e) => {
    setEnteredDescription(e.target.value);
  };

  // const handlePriceChange = (e) => {
  //   setEnteredPrice(e.target.value);
  // };
  const handlePriceChange = (e) => {
    const price = e.target.value;
    setEnteredPrice(price);
    if (price < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "Price must be positive",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "",
      }));
    }
  };

  // const handleAvailablePlacesChange = (e) => {
  //   setAvailablePlaces(e.target.value);
  // };
  const handleAvailablePlacesChange = (e) => {
    const places = e.target.value;
    setAvailablePlaces(places);
    if (places < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        availablePlaces: "Available places must be positive",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        availablePlaces: "",
      }));
    }
  };

  const handleEventPlaceChange = (e) => {
    setEventPlaceString(e.target.value);
  };

  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const selectedFile = inputRef.current.files[0];

    inputRef.current.value = null;

    setEventImage(selectedFile);
  };

  //----------
  let imageUrl;
  try {
    if (EventImage) {
      imageUrl = URL.createObjectURL(EventImage);
    }
  } catch (error) {
    imageUrl = null;
  }

  return (
    <DashLayout>
      <div className="dash-card__container">
        <form className="dash-card">
          <div className="course-add-form__input__group">
            <label
              htmlFor="EventName"
              className="course-add-form__input__label"
            >
              Event Name <span>*</span>
            </label>
            <input
              type="text"
              value={EventName}
              className="course-add-form__input"
              placeholder="Title"
              onChange={(e) => setEnteredTitle(e.target.value)}
            />
          </div>

          <div className="course-add-form__input__group">
            <label
              htmlFor="EventDescription"
              className="course-add-form__input__label"
            >
              Event Description <span>*</span>
            </label>
            <textarea
              className="course-add-form__input textarea"
              placeholder="Description"
              value={EventDescription}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>

          <div className="course-add-form__input__group">
            <label
              htmlFor="EventDate"
              className="course-add-form__input__label"
            >
              Event Date <span>*</span>
            </label>
            <input
              type="date"
              className="course-add-form__input"
              value={EventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>

          <div className="course-add-form__input__group-row">
            <div className="course-add-form__input__group">
              <label
                htmlFor="PriceTicket"
                className="course-add-form__input__label"
              >
                Price Ticket <span>*</span>
              </label>
              <input
                type="number"
                className="course-add-form__input course-add-form__input__label-Price"
                placeholder="Price"
                value={enteredPrice}
                onChange={handlePriceChange}
              />
              {errors.price && (
                <span className="error-message">{errors.price}</span>
              )}
            </div>

            <div className="course-add-form__input__group">
              <label
                htmlFor="AvailablePlaces"
                className="course-add-form__input__label"
              >
                Available Places <span>*</span>
              </label>
              <input
                type="number"
                className="course-add-form__input"
                placeholder="Available Places"
                value={availablePlaces}
                onChange={handleAvailablePlacesChange}
              />

              {errors.availablePlaces && (
                <span className="error-message">{errors.availablePlaces}</span>
              )}
            </div>
          </div>

          <div className="course-add-form__input__group">
            <label
              htmlFor="EventPlace"
              className="course-add-form__input__label"
            >
              Event Place <span>*</span>
            </label>
            <input
              type="text"
              className="course-add-form__input"
              placeholder="Event Place"
              value={eventPlaceString}
              onChange={handleEventPlaceChange}
            />
          </div>

          <div className="course-add-form__input__group">
            <label
              htmlFor="EventImage"
              className="course-add-form__input__label"
            >
              Image <span>*</span>
            </label>
            <div className="course-add-form-image">
              <div className="course-add-form-image__container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0"
                  y="0"
                  viewBox="0 0 24 24"
                  xmlSpace="preserve"
                  className="course-add-form-image__container-svg"
                >
                  <g>
                    <g fillRule="evenodd" clipRule="evenodd">
                      <path
                        d="M12 7c-1.957 0-3.584 1.197-4.167 2.807a1 1 0 0 1-.813.652C5.277 10.683 4 12.09 4 13.714 4 15.484 5.52 17 7.5 17a1 1 0 1 1 0 2C4.509 19 2 16.679 2 13.714c0-2.514 1.81-4.57 4.181-5.132C7.2 6.45 9.438 5 12 5c3.174 0 5.872 2.24 6.331 5.234 2.066.412 3.669 2.164 3.669 4.337C22 17.063 19.894 19 17.4 19a1 1 0 1 1 0-2c1.482 0 2.6-1.133 2.6-2.429 0-1.295-1.117-2.428-2.6-2.428a1 1 0 0 1-1-1C16.4 8.9 14.477 7 12 7z"
                        opacity="1"
                      ></path>
                      <path
                        d="M12 19a1 1 0 0 1-1-1v-6a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1z"
                        opacity="1"
                      ></path>
                      <path
                        d="M9.293 14.707a1 1 0 0 1 0-1.414l2-2a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1-1.414 1.414L12 13.414l-1.293 1.293a1 1 0 0 1-1.414 0z"
                        opacity="1"
                      ></path>
                    </g>
                  </g>
                </svg>
                {/* <img
                  className="course-add-form-image__img"
                  src={imageUrl}
                  alt=""
                /> */}
                <img
                  className="course-add-form-image__img"
                  src={
                    EventImage && typeof EventImage === "object"
                      ? URL.createObjectURL(EventImage)
                      : EventImage
                      ? `http://localhost:3000/upload-directory/${EventImage}`
                      : null
                  }
                  alt=""
                />
              </div>
              <div className="course-add-form-image__description">
                <div style={{ display: "flex" }}>
                  <div
                    className="course-add-form-image__add"
                    onClick={handleImageClick}
                  >
                    <label className="course-add-form-image__addBtn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0"
                        y="0"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                        className="course-add-form-image__addBtn-svg"
                      >
                        <g>
                          <path
                            d="M512 480c0 17.673-14.327 32-32 32H32c-17.673 0-32-14.327-32-32s14.327-32 32-32h448c17.673 0 32 14.326 32 32zM142.623 177.378c8.189 0 16.379-3.124 22.627-9.373l58.75-58.75v246.746c0 17.673 14.327 32 32 32s32-14.327 32-32V109.255l58.75 58.75c12.497 12.497 32.758 12.497 45.255 0s12.497-32.758 0-45.255L278.627 9.373c-12.497-12.497-32.758-12.497-45.255 0L119.995 122.75c-12.497 12.497-12.497 32.758 0 45.255 6.249 6.249 14.438 9.373 22.628 9.373z"
                            opacity="1"
                          ></path>
                        </g>
                      </svg>
                      Choose a photo
                    </label>
                    <input
                      name="course-add-form-image__file-btn"
                      type="file"
                      className="course-add-form-image__file-btn"
                      ref={inputRef}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="dash-card__hr-border hr-border-2" />

          <button onClick={handleSubmit} className="add-new-course__submit-btn">
            Update Event
          </button>
        </form>
      </div>
    </DashLayout>
  );
};

export default AdminDashUpdateEventCard;
