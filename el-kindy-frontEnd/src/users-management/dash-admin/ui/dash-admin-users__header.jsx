import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";

import DashAnimation from "../../../dashboard-layout/dash-animation";
import { useReducer } from "react";
import UserUpdateImageAdminDash from "../pages/dash-admin-users/UserUpdateImageAdminDash";
import UserAddFormAdminDash from "../pages/dash-admin-users/UserAddFormAdminDash";
import { Select, MenuItem } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "80vh",
  bgcolor: "white",
  boxShadow: 15,
  // p: 4,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_OPEN":
      return { ...state, openModal: action.payload };
    case "SET_AVATAR_UPLOAD":
      return { ...state, avatarUpload: action.payload };
    case "SET_ADD_FORM_DATA":
      return { ...state, addFormData: action.payload };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};

const DashAdminUsersHeader = ({
  addNewUser,
  setSearchTerm,
  stateFilter,
  setStateFilter,
  cvFilter,
  setCvFilter,
}) => {
  const initAddFormData = {
    fullname: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    phone2: "",
    profession: "",
    password: "",
    confirmPassword: "",
    role: "user",
    photo_url:
      "https://firebasestorage.googleapis.com/v0/b/el-kindy-auth.appspot.com/o/defaultProfileIMG.png?alt=media&token=3195bf63-8036-4290-9583-f0f4da435935",
  };

  const initFormError = {
    fullname: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    phone2: "",
    profession: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const initialState = {
    openModal: false,
    avatarUpload: undefined,
    addFormData: initAddFormData,
    errors: initFormError,
  };

  const [{ openModal, avatarUpload, addFormData, errors }, dispatchReducer] =
    useReducer(reducer, initialState);

  const setAddFormData = (data) =>
    dispatchReducer({ type: "SET_ADD_FORM_DATA", payload: data });
  const setErrors = (errors) =>
    dispatchReducer({ type: "SET_ERRORS", payload: errors });
  const setAvatarUpload = (data) =>
    dispatchReducer({ type: "SET_AVATAR_UPLOAD", payload: data });

  const openAddFormModal = () => {
    dispatchReducer({ type: "SET_OPEN", payload: true });
  };
  const closeAddFormModal = () => {
    dispatchReducer({ type: "SET_OPEN", payload: false });
    setAddFormData(initAddFormData);
    setErrors(initFormError);
    setAvatarUpload(undefined);
    console.log("closess");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    if (event.target.name === "state") {
      setStateFilter(event.target.value);
    } else {
      setCvFilter(event.target.value);
    }
  };

  return (
    <div className="dash__content__container__firstRow">
      <div className="dash__content__container__firstRow__leftSide">
        <h1 className="dash__content__container__title">Users List</h1>
        <div className="dash__content__container__input">
          <input
            onChange={handleSearchChange}
            // value={searchTerm}
            className="dash__content__container__search font-nunito text-[2rem] font-semibold min-w-[35rem] pl-[2rem] placeholder:font-normal placeholder:text-[#a9a9a9] placeholder:text-[1.8rem]"
            type="search"
            placeholder="Search by name, email, role"
          />
          <div className="dash__content__container__search-icon ">
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
        <p className="dash__content__container__filterBy">Filter by:</p>

        <div className="w-[15rem] ">
          <Select
            labelId="State"
            id="State"
            value={stateFilter}
            size="small"
            onChange={handleFilterChange}
            fullWidth
            name="state"
            sx={{
              borderRadius: "90rem",

              "& .MuiInputBase-input": {
                fontSize: `1.8rem`,
                lineHeight: "normal",
                textAlign: "center",
              },
            }}
          >
            <MenuItem value="any" sx={{ fontSize: "1.8rem" }}>
              State
            </MenuItem>
            <MenuItem value="active" sx={{ fontSize: "1.8rem" }}>
              Active
            </MenuItem>
            <MenuItem value="unactive" sx={{ fontSize: "1.8rem" }}>
              Unactive
            </MenuItem>
          </Select>
        </div>

        <div className="w-[15rem] ml-[2rem] ">
          <Select
            labelId="CV"
            id="CV"
            value={cvFilter}
            size="small"
            onChange={handleFilterChange}
            fullWidth
            name="cv"
            sx={{
              borderRadius: "90rem",

              "& .MuiInputBase-input": {
                fontSize: `1.8rem`,
                lineHeight: "normal",
                textAlign: "center",
              },
            }}
          >
            <MenuItem value="any" sx={{ fontSize: "1.8rem" }}>
              CV
            </MenuItem>
            <MenuItem value="false" sx={{ fontSize: "1.8rem" }}>
              Pending
            </MenuItem>
            <MenuItem value="true" sx={{ fontSize: "1.8rem" }}>
              Accepted
            </MenuItem>
          </Select>
        </div>
      </div>
      <div className="dash__content__container__firstRow__RightSide">
        <div className="dash__content__container__firstRow__RightSide__openCategoriesBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0"
            y="0"
            viewBox="0 0 64 64"
            xmlSpace="preserve"
          >
            <g transform="matrix(-1,0,0,1,64,0)">
              <path
                d="M29 11v14a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V11a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4zm24-4H39a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V11a4 4 0 0 0-4-4zM25 35H11a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V39a4 4 0 0 0-4-4zm21 0a11 11 0 1 0 11 11 11 11 0 0 0-11-11z"
                opacity="1"
              ></path>
            </g>
          </svg>
        </div>

        <button
          onClick={openAddFormModal}
          className="dash__content__container__firstRow__RightSide__addNewCourseBtn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className=""
          >
            <g>
              <path
                d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                opacity="1"
              ></path>
            </g>
          </svg>
        </button>
      </div>
      <div className="dash__content__container__firstRow__RightSide__dancingNote">
        <DashAnimation
          className="dancingNote-animation"
          path="../../../../public/assets/json/dancing_note.json"
        />
      </div>

      <Modal
        open={openModal}
        onClose={closeAddFormModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            borderRadius: "3rem",
            bgcolor: "white",
            padding: "2rem",
            // overflowY: "scroll",
          }}
        >
          <div className="h-full overflow-y-auto p-[2.5rem] ">
            <UserUpdateImageAdminDash
              avatarUpload={avatarUpload}
              dispatch={dispatchReducer}
              initUpdateFormData={initAddFormData}
              open={openModal}
              updateFormData={addFormData}
            />
            <UserAddFormAdminDash
              user={null}
              initUpdateFormData={initAddFormData}
              initFormError={initFormError}
              updateFormData={addFormData}
              errors={errors}
              avatarUpload={avatarUpload}
              addNewUser={addNewUser}
              closeAddFormModal={closeAddFormModal}
              dispatchReducer={dispatchReducer}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DashAdminUsersHeader;
