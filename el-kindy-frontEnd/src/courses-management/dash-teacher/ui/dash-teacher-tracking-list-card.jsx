import "../../../../public/assets/css/style.css";
import { useEffect, useState } from "react";
import studentTrackingSheetService from "../../services/studentTrackingSheetService";
import courseService from "../../services/courseService";
import { data } from "autoprefixer";

const DashTeacherTrackingListCard = ({ data, onDelete }) => {
  console.log(data);
  const handleDelete = async () => {
    await studentTrackingSheetService.deleteStudentTrackingSheetById(data._id);
    onDelete(data._id);
  };

  const [sentiment, setSentiment] = useState("");

  useEffect(() => {
    const fetchSentiment = async () => {
      const trData = { comment: data.observation };
      const sentimentData = await courseService.getSentiment(trData);
      setSentiment(sentimentData.data);
      console.log(sentimentData.data);
    };

    fetchSentiment();
  }, [data.observation]);

  return (
    <div className="studentTrackingSheet__card">
      <div className="studentTrackingSheet__card-date">{data.date}</div>
      <div className="studentTrackingSheet__card-duration">
        {data.duration}min
      </div>
      <div className="studentTrackingSheet__card-lessonContent">
        {data.courseContent}
      </div>
      <div className="studentTrackingSheet__card-observatin">
        {data.observation}
      </div>
      <div className="studentTrackingSheet__card-sentiment">
        {sentiment.message}
      </div>
      <div className="studentTrackingSheet__card-btns">
        <div
          className="dash__courses__list__card-content-btns-list__delete"
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
  );
};

export default DashTeacherTrackingListCard;
