import { Link } from "react-router-dom";
import "../../../../public/assets/css/style.css";
import DashAnimation from "../../../dashboard-layout/dash-animation";
import { MenuItem, Select } from "@mui/material";

const DashQuizesListHeader = ({ onSearchLevelChange }) => {
  const handleSearchChange = (e) => {
    onSearchLevelChange(e.target.value);
  };

  return (
    <div className="dash__content__container__firstRow quiz">
      <div className="dash__content__container__firstRow__leftSide">
        <h1 className="dash__content__container__title quiz">Quizes List</h1>
        <div className="dash__content__container__input">
          <input
            className="dash__content__container__search font-nunito text-[2rem] font-semibold min-w-[35rem] pl-[2rem] placeholder:font-normal placeholder:text-[#a9a9a9] placeholder:text-[1.8rem]"
            type="search"
            placeholder="Search by quiz name"
            onChange={handleSearchChange}
            // style={{ fontSize: "1.9rem" }}
          />
          <div className="dash__content__container__search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 310.42 310.42"
              xmlSpace="preserve"
              className="dash__content__container__search-icon-svg"
            >
              <g>
                <path
                  d="M273.587 214.965c49.11-49.111 49.109-129.021 0-178.132-49.111-49.111-129.02-49.111-178.13 0C53.793 78.497 47.483 140.462 76.51 188.85c0 0 2.085 3.498-.731 6.312l-64.263 64.263c-12.791 12.79-15.836 30.675-4.493 42.02l1.953 1.951c11.343 11.345 29.229 8.301 42.019-4.49l64.128-64.128c2.951-2.951 6.448-.866 6.448-.866 48.387 29.026 110.352 22.717 152.016-18.947zM118.711 191.71c-36.288-36.288-36.287-95.332.001-131.62 36.288-36.287 95.332-36.288 131.619 0 36.288 36.287 36.288 95.332 0 131.62-36.288 36.286-95.331 36.286-131.62 0z"
                  opacity="1"
                ></path>
                <path
                  d="M126.75 118.424c-1.689 0-3.406-.332-5.061-1.031-6.611-2.798-9.704-10.426-6.906-17.038 17.586-41.559 65.703-61.062 107.261-43.476 6.611 2.798 9.704 10.426 6.906 17.038-2.799 6.612-10.425 9.703-17.039 6.906-28.354-11.998-61.186 1.309-73.183 29.663-2.099 4.959-6.913 7.938-11.978 7.938z"
                  opacity="1"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="dash__content__container__firstRow__RightSide">
        <Link to={"/dash-admin-add-new-quiz"} className="add-new-quiz--btn">
          Add New Quiz
        </Link>
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

export default DashQuizesListHeader;
