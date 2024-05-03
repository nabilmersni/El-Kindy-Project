import { Link } from "react-router-dom";
import "../../../../public/assets/css/style.css";
import DashAnimation from "../../../dashboard-layout/dash-animation";

const DashAdminSchedulesHeader = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="dash__content__container__firstRow subcateg">
      <div className="dash__content__container__firstRow__leftSide">
        <h1 className="dash__content__container__title">Schedules </h1>
        <div className="paginationSchedules">
          <div
            className={`pageBtn ${currentPage === 0 ? "disabled" : ""}`}
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
            }
            disabled={currentPage === 1}
          >
            Prev
          </div>
          <div className="pageNumber">{currentPage + 1 + "/" + totalPages}</div>
          <div
            className={`pageBtn ${
              currentPage === totalPages - 1 ? "disabled" : ""
            }`}
            onClick={() =>
              setCurrentPage((prevPage) =>
                Math.min(prevPage + 1, totalPages - 1)
              )
            }
            disabled={currentPage === totalPages}
          >
            Next
          </div>
        </div>
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
