import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import { useEffect, useState } from "react";
import studentTrackingSheetService from "../../services/studentTrackingSheetService";
import { useSelector } from "react-redux";
import DashTeacherTrackingHeader from "../ui/dash-teacher-tracking__header";
import DashTeacherTrackingListCard from "../ui/dash-teacher-tracking-list-card";

const DashTeacherTrackingList = () => {
  const { user } = useSelector((state) => state.auth);

  const [trackingSheet, setTrackingSheet] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          await studentTrackingSheetService.getStudentTrackingSheetByTeacher(
            user._id
          );
        setTrackingSheet(response.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des tracking sheet list :",
          error
        );
      }
    };

    fetchData();
  }, []);

  const handleDelete = (deletedTrackingSheetId) => {
    // Update the list after deletion
    setTrackingSheet((trackingSheet) =>
      trackingSheet.filter(
        (studentTrackingSheet) =>
          studentTrackingSheet._id !== deletedTrackingSheetId
      )
    );
  };

  return (
    <DashLayout>
      <DashTeacherTrackingHeader />
      <div className="teacherTrackingSheetList__header">
        <div className="teacherTrackingSheetList__header-date">Date</div>
        <div className="teacherTrackingSheetList__header-duration">
          Duration
        </div>
        <div className="teacherTrackingSheetList__header-lessonContent">
          Lesson Content
        </div>
        <div className="teacherTrackingSheetList__header-observation">
          Observation
        </div>
        <div className="teacherTrackingSheetList__header-sentiment">
          Sentiment analysis
        </div>
        <div className="teacherTrackingSheetList__header-btns">#</div>
      </div>
      <div className="dash__content__container__courses-list">
        {trackingSheet.map((item, index) => (
          <DashTeacherTrackingListCard
            key={index}
            data={item}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </DashLayout>
  );
};

export default DashTeacherTrackingList;
