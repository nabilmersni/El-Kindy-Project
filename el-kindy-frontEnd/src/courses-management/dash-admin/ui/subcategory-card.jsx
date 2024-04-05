import "../../../../public/assets/css/style.css";
import { useState } from "react";
import subCategoryService from "../../services/subCategoriesService";
import { Link } from "react-router-dom";
const SubCategoryCard = ({ data, onDelete }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  /************************* */
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    await subCategoryService.deleteSubCategory(data._id);
    onDelete(data._id);
  };
  console.log(data);
  return (
    <div className="dash__subcateg__card">
      <div
        className="dash__subcateg__card-video-container"
        onClick={handleOpenVideoModal}
      >
        <video
          src={`http://localhost:3000/uploads/${data.videoUrl}`}
          className="dash__subcateg__card-video"
        ></video>
        <div className="dash__subcateg__card-video-play-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0"
            y="0"
            viewBox="0 0 163.861 163.861"
            xmlSpace="preserve"
            className="dash__subcateg__card-video-play-button-svg"
          >
            <g>
              <path
                d="M34.857 3.613C20.084-4.861 8.107 2.081 8.107 19.106v125.637c0 17.042 11.977 23.975 26.75 15.509L144.67 97.275c14.778-8.477 14.778-22.211 0-30.686L34.857 3.613z"
                opacity="1"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <div className={`videoModal ${isVideoModalOpen ? "" : "isHidden"}`}>
        <div className="videoContainer">
          <div className="closeVidBtn" onClick={handleCloseVideoModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 348.333 348.334"
              xmlSpace="preserve"
              className="closeVidBtn-svg"
            >
              <g>
                <path
                  d="M336.559 68.611 231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z"
                  opacity="1"
                ></path>
              </g>
            </svg>
          </div>
          <div className="videoModal__video-container">
            <video
              src={`http://localhost:3000/uploads/${data.videoUrl}`}
              className="videoModal__video"
              controls
            ></video>
          </div>
        </div>
      </div>
      <div className="dash__subcateg__card-contents">
        <div className="dash__subcateg__card-contents__titleCategory">
          <div className="dash__subcateg__card-contents__title">
            {data.subCategoryTitle}
          </div>
          <div className="dash__subcateg__card-contents__category">
            {data.categoryId.categoryTitle}
          </div>
        </div>
        <div className="dash__subcateg__card-contents__btns-list">
          <a
            href="#"
            className="dash__courses__list__card-content-btns-list__update subcateg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 24 24"
              xmlSpace="preserve"
              className="edit-icon"
            >
              <g>
                <path
                  d="M19 12a1 1 0 0 0-1 1v8c0 .551-.448 1-1 1H3c-.552 0-1-.449-1-1V7c0-.551.448-1 1-1h8a1 1 0 1 0 0-2H3C1.346 4 0 5.346 0 7v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-8a1 1 0 0 0-1-1z"
                  opacity="1"
                ></path>
                <path
                  d="M9.376 11.089a.506.506 0 0 0-.137.255l-.707 3.536a.501.501 0 0 0 .589.588l3.535-.707a.497.497 0 0 0 .256-.137l7.912-7.912-3.535-3.535zM23.268.732a2.502 2.502 0 0 0-3.535 0l-1.384 1.384 3.535 3.535 1.384-1.384C23.74 3.796 24 3.168 24 2.5s-.26-1.296-.732-1.768z"
                  opacity="1"
                ></path>
              </g>
            </svg>
          </a>
          <div
            className="dash__courses__list__card-content-btns-list__delete subcateg"
            onClick={handleDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              className="delete-icon"
            >
              <g>
                <path
                  d="m62.205 150 26.569 320.735C90.678 493.865 110.38 512 133.598 512h244.805c23.218 0 42.92-18.135 44.824-41.265L449.795 150H62.205zm118.781 302c-7.852 0-14.458-6.108-14.956-14.063l-15-242c-.513-8.276 5.771-15.395 14.033-15.908 8.569-.601 15.381 5.757 15.908 14.033l15 242c.531 8.57-6.25 15.938-14.985 15.938zM271 437c0 8.291-6.709 15-15 15s-15-6.709-15-15V195c0-8.291 6.709-15 15-15s15 6.709 15 15v242zm89.97-241.062-15 242c-.493 7.874-7.056 14.436-15.908 14.033-8.262-.513-14.546-7.632-14.033-15.908l15-242c.513-8.276 7.764-14.297 15.908-14.033 8.262.513 14.546 7.632 14.033 15.908zM451 60h-90V45c0-24.814-20.186-45-45-45H196c-24.814 0-45 20.186-45 45v15H61c-16.569 0-30 13.431-30 30 0 16.567 13.431 30 30 30h390c16.569 0 30-13.433 30-30 0-16.569-13.431-30-30-30zm-120 0H181V45c0-8.276 6.724-15 15-15h120c8.276 0 15 6.724 15 15v15z"
                  opacity="1"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCard;
