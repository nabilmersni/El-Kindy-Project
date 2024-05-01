import { Link } from "react-router-dom";
import "../../../../public/assets/css/style.css";
import DashAnimation from "../../../dashboard-layout/dash-animation";

const DashAdminSchedulesHeader = () => {
  return (
    <div className="dash__content__container__firstRow subcateg">
      <div className="dash__content__container__firstRow__leftSide">
        <h1 className="dash__content__container__title">Availabilities </h1>
      </div>

      <div className="dash__content__container__firstRow__RightSide__dancingNote">
        <DashAnimation
          className="dancingNote-animation"
          path="../../../../public/assets/json/dancing_note.json"
        />
      </div>
    </div>
  );
};

export default DashAdminSchedulesHeader;
