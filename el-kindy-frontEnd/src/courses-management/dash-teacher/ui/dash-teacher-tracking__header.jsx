import { Link } from "react-router-dom";
import "../../../../public/assets/css/style.css";
import DashAnimation from "../../../dashboard-layout/dash-animation";

const DashTeacherTrackingHeader = () => {
  return (
    <div className="dash__content__container__firstRow subcateg">
      <div className="dash__content__container__firstRow__leftSide">
        <h1 className="dash__content__container__title">
          Students tracking sheet{" "}
        </h1>
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

export default DashTeacherTrackingHeader;
