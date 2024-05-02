import { useContext, useEffect, useReducer, useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@material-tailwind/react";
import TextField from "@mui/material/TextField";

import userService from "../../../features/users/UserService";
import UserUpdateFormAdminDash from "../pages/dash-admin-users/UserUpdateFormAdminDash";
import UserUpdateImageAdminDash from "../pages/dash-admin-users/UserUpdateImageAdminDash";
import SocketContext from "../../../features/context/SocketContext";
import Spinner from "../../../ui/Spinner";
import { Link } from "react-router-dom";
import Attestation from "./attestation";

import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { checkUserQuizzes } from "../../../quizes-management/services/apiQuiz";

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
    case "SET_USER_TO_UPDATE":
      return {
        ...state,
        userToUpdate: { ...state.userToUpdate, ...state.updateFormData },
      };
    case "SET_OPEN":
      return { ...state, openModal: action.payload };
    case "SET_AVATAR_UPLOAD":
      return { ...state, avatarUpload: action.payload };
    case "SET_UPDATE_FORM_DATA":
      return { ...state, updateFormData: action.payload };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};

const UserItem = ({ user, updateLocalUser }) => {
  const socket = useContext(SocketContext);

  const initUpdateFormData = {
    fullname: user.fullname,
    dateOfBirth: new Date(user.dateOfBirth).toISOString().split("T")[0],
    phone: user.phone,
    phone2: user.phone2,
    profession: user.profession,
    photo_url: user.photo_url,
  };

  const initFormError = {
    fullname: "",
    dateOfBirth: "",
    phone: "",
    phone2: "",
    profession: "",
  };

  const initialState = {
    openModal: false,
    avatarUpload: undefined,
    updateFormData: initUpdateFormData,
    errors: initFormError,
  };

  const [{ openModal, avatarUpload, updateFormData, errors }, dispatchReducer] =
    useReducer(reducer, initialState);

  const [openPdfModal, setOpenPdfModal] = useState(false);
  const [openBlockUserModal, setOpenBlockUserModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setUpdateFormData = (data) =>
    dispatchReducer({ type: "SET_UPDATE_FORM_DATA", payload: data });
  const setErrors = (errors) =>
    dispatchReducer({ type: "SET_ERRORS", payload: errors });

  const blockUser = async (state) => {
    try {
      setIsLoading(true);
      const updatedUser = await userService.blockUser(user._id, {
        state,
        blockReasons: blockFormData.blockReasons,
      });
      updateLocalUser(user._id, updatedUser);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const blockUserHandler = (state) => {
    if (!hasErrors() && !isFormDataEmpty()) {
      setOpenBlockUserModal(false);
      blockUser(state);
      logoutBlockedUser();
    } else {
      if (!blockFormData.blockReasons.trim()) {
        setBlockFieldError((prevErrors) => ({
          ...prevErrors,
          blockReasons: "block Reasons is required",
        }));
      } else if (blockFormData.blockReasons.length < 3) {
        setBlockFieldError((prevErrors) => ({
          ...prevErrors,
          blockReasons: "block Reasons must be at least 3 characters long",
        }));
      } else {
        setBlockFieldError((prevErrors) => ({
          ...prevErrors,
          blockReasons: "",
        }));
      }
    }
  };
  const openUpdateFormModal = () => {
    dispatchReducer({ type: "SET_OPEN", payload: true });
  };
  const closeUpdateFormModal = () => {
    dispatchReducer({ type: "SET_OPEN", payload: false });
    setUpdateFormData(initUpdateFormData);
    setErrors(initFormError);
  };

  const logoutBlockedUser = () => {
    console.log("logoutBlockedUser");
    socket.current.emit("block-user", user._id);
  };

  const closePdfModal = () => {
    setOpenPdfModal(false);
  };

  const acceptCvHandler = async () => {
    try {
      setIsLoading(true);
      const updatedUser = await userService.acceptCV(user._id);
      updateLocalUser(user._id, updatedUser);
      setOpenPdfModal(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const closeBlockUserModal = () => {
    setOpenBlockUserModal(false);
  };

  const [blockFormData, setBlockFormData] = useState({
    blockReasons: "",
  });

  const [blockFieldError, setBlockFieldError] = useState({
    blockReasons: "",
  });

  const hasErrors = () => {
    return Object.values(blockFieldError).some((error) => error !== "");
  };

  const isFormDataEmpty = () => {
    return Object.entries(blockFormData).some(([key, value]) => value === "");
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setBlockFormData({ ...blockFormData, [name]: value });

    // Validation for blockReasons
    if (name === "blockReasons") {
      if (!value.trim()) {
        setBlockFieldError((prevErrors) => ({
          ...prevErrors,
          [name]: "block Reasons is required",
        }));
      } else if (value.length < 3) {
        setBlockFieldError((prevErrors) => ({
          ...prevErrors,
          [name]: "block Reasons must be at least 3 characters long",
        }));
      } else {
        setBlockFieldError((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
  };

  /////////****nawres****/////// */
  const [hasPassedQuiz, setHasPassedQuiz] = useState(false);
  useEffect(() => {
    // Appeler la fonction pour vérifier les quiz de l'utilisateur
    checkUserQuizzes(user._id)
      .then((quizzes) => {
        // Mettre à jour le state en fonction du nombre de quiz
        setHasPassedQuiz(quizzes.length > 0);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user._id]);

  return (
    <>
      {isLoading ? <Spinner /> : ""}
      <tr className=" one-user  ">
        <td className="fullname-td">
          <div className="fullname-td__container">
            <div className="fullname-td__img-container">
              <img
                src={user?.photo_url || "/assets/img/user-1.svg"}
                alt=""
                className="fullname-td__img-container__img"
              />
            </div>
            <div className="fullname-td__fullname-username">
              <p className="fullname-td__fullname-username__fullname">
                {user.fullname}
              </p>
              <p className="fullname-td__fullname-username__username"></p>
            </div>
          </div>
        </td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.role}</td>
        <td className="stet-td">
          {user.state === true ? (
            <span className="block p-[1rem] px-[2.5rem] text-center rounded-full bg-[#CDFAD5] text-[#153462] font-bold w-[12rem] ">
              active
            </span>
          ) : (
            <span className="block p-[1rem] px-[2.5rem] text-center rounded-full bg-[#FF6D60] text-[#153462] font-bold w-[12rem] ">
              unactive
            </span>
          )}
        </td>

        <td className="btn-td gap-4">
          {user.state === true ? (
            <button
              // onClick={() => blockUserHandler(false)}
              onClick={() => setOpenBlockUserModal(true)}
              className="p-[1.75rem] w-[5.8rem] h-[5.8rem] rounded-full bg-[#F3F8FC] hover:bg-[#bed9f4] transition-all ease-in duration-75"
            >
              <img
                src="img/lock-icon.png"
                alt="lock-icon"
                className="w-full h-full object-contain"
              />
            </button>
          ) : (
            <button
              onClick={() => blockUserHandler(true)}
              className="p-[1.75rem] w-[5.8rem] h-[5.8rem] rounded-full bg-[#F3F8FC] hover:bg-[#bed9f4] transition-all ease-in duration-75"
            >
              <img
                src="img/unlock-icon.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </button>
          )}

          <button
            onClick={openUpdateFormModal}
            className="p-[1.6rem] rounded-full bg-[#F3F8FC] hover:bg-[#bed9f4] transition-all ease-in duration-75"
          >
            <img src="img/edit-icon.svg" alt="" className="w-[2.7rem] " />
          </button>

          <button
            disabled={user.role !== "teacher"}
            onClick={() => setOpenPdfModal(true)}
            className={`p-[1.6rem] rounded-full   transition-all ease-in duration-75 ${
              user.role !== "teacher"
                ? "bg-[#F3F8FC]"
                : "bg-[#F3F8FC] hover:bg-[#bed9f4]"
            }`}
          >
            {/* <img src="img/cv.svg" alt="" className="w-[2.7rem] " /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 100 100"
              xmlSpace="preserve"
              className={`w-[2.7rem] `}
            >
              <g>
                <path
                  d="M83.333 10H16.667C13.001 10 10 13.001 10 16.667v66.667C10 86.999 13.001 90 16.667 90h66.667C86.999 90 90 86.999 90 83.333V16.667C90 13.001 86.999 10 83.333 10zM26.667 36.667c0-5.521 4.479-10 10-10s10 4.479 10 10H40a3.333 3.333 0 1 0-6.666 0v13.33a3.334 3.334 0 0 0 6.666 0h6.667c0 5.524-4.479 10-10 10s-10-4.477-10-10zm46.666 36.666H26.667v-6.666h46.667v6.666zM65 60h-6.667L50 26.667h6.872l4.795 19.18 4.795-19.18h6.871z"
                  fill="#396CE8"
                  opacity="1"
                  data-original="#000000"
                  className={`${
                    user.role !== "teacher" ? "fill-[#8dadfd] " : ""
                  }`}
                ></path>
              </g>
            </svg>
          </button>
          {/* ********quiz-attestation *************/}

          <div>
            <Link to={`/attestation/${user._id}`}>
              <button
                disabled={!hasPassedQuiz}
                className={`p-[1.75rem] w-[5.8rem] h-[5.8rem] rounded-full ${
                  hasPassedQuiz
                    ? "hover:bg-[#bed9f4] bg-[#F3F8FC]"
                    : "bg-[#F3F8FC] cursor-not-allowed opacity-50"
                }  transition-all ease-in duration-75`}
              >
                <img src="img/attestation.svg" alt="" className="w-[2.7rem]" />
              </button>
            </Link>
          </div>

          {/* ********quiz-attestation *************/}
        </td>
      </tr>

      {/* block user modal */}
      <Modal
        open={openBlockUserModal}
        onClose={closeBlockUserModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            borderRadius: "2rem",
            bgcolor: "white",
            padding: "2rem",
            height: "65vh",
            // overflowY: "scroll",
          }}
        >
          <div className="flex flex-col justify-between h-full overflow-y-auto p-[2.5rem] ">
            <h1 className="text-[3rem] ">Block {user.fullname}</h1>

            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              id="blockReasons"
              label="Reasons for Blocking"
              name="blockReasons"
              minRows={10}
              multiline={true}
              onChange={changeHandler}
              onBlur={changeHandler}
              error={Boolean(blockFieldError.blockReasons)}
              helperText={blockFieldError.blockReasons}
              // value={updateFormData.fullname || ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    fontSize: `2rem`,
                    borderColor: errors.fullname ? "red" : "#DBDFEA",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.fullname ? "red" : "#7586FF",
                  },
                  "&.Mui-focused fieldset": {
                    fontSize: `2rem`,
                    borderColor: errors.fullname ? "red" : "#7586FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontSize: `2rem`,
                  "&.Mui-focused": {
                    fontSize: `2rem`,
                    color: errors.fullname ? "red" : "#7586FF",
                  },
                },

                "& .MuiInputBase-input": {
                  fontSize: `2rem`, // Adjust the font size here
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "1.6rem", // Adjust the font size here
                },
              }}
            />

            <div className="flex justify-center items-center mt-[4rem] mb-[2rem] gap-[3rem] ">
              <button
                onClick={() => blockUserHandler(false)}
                // disabled={hasErrors() || isFormDataEmpty()}
                type="button"
                className="w-fit bg-[#5fa7ff] hover:bg-[#3992ff] text-[#fff] focus:outline-none focus:bg-blue-gray-500  font-bold rounded-lg text-[1.9rem] px-8 py-3 transition-all duration-75"
              >
                Block
              </button>

              <button
                onClick={closeBlockUserModal}
                type="button"
                className="w-fit text-white bg-[#ff734c] hover:bg-[#fe4a19] focus:outline-none focus:bg-[#ff5d30]  font-bold rounded-lg text-[1.9rem] px-8 py-3 transition-all duration-75"
              >
                Cancel
              </button>

              {/* <Button
                type="submit"
                variant="text"
                // disabled={hasErrors() || isFormDataEmpty()}
                size="lg"
                className={`bg-lightBlue text-nav hover:text-[#fff] font-bold font-nunito rounded-[.8rem] hover:bg-[#5fa7ff] capitalize text-[.9rem] md:text-[1rem] my-0 md:my-[1rem]`}
              >
                Save
              </Button>

              <Button
                // onClick={cleanForm}
                variant="outlined"
                size="lg"
                className={`border-[#FA896B] text-[#FA896B] hover:text-[#ff6136] focus:ring-0 font-bold font-nunito rounded-[.8rem] hover:bg-secondaryLight capitalize text-[.9rem] md:text-[1rem] my-0 md:my-[1rem]`}
              >
                Reset
              </Button> */}
            </div>
          </div>
        </Box>
      </Modal>

      {/* pdf modal */}
      <Modal
        open={openPdfModal}
        onClose={closePdfModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            borderRadius: "2rem",
            bgcolor: "white",
            // padding: "2rem",
            width: "60vw",
            height: "92vh",
            bgcolor: "#333333",
            // overflowY: "scroll",
          }}
        >
          <div className="flex flex-col justify-between items-center h-full overflow-y-auto pb-[2.5rem] ">
            <iframe
              title="pdfViewer"
              className="w-full h-full rounded-[2rem] "
              src={user.cv_url}
            ></iframe>

            <div className="flex justify-center items-center mt-[4rem] mb-[2rem] gap-[2rem] ">
              {user.isCvAccepted ? (
                ""
              ) : (
                <>
                  <button
                    onClick={acceptCvHandler}
                    type="button"
                    className="w-fit text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:bg-blue-gray-500  font-bold rounded-lg text-[1.9rem] px-8 py-3 transition-all duration-75"
                  >
                    Accept
                  </button>

                  <div className="divider bg-[#ffffff26] w-[0.3rem] h-[4rem] rounded mx-2" />
                </>
              )}

              <button
                onClick={() => setOpenPdfModal(false)}
                type="button"
                className="w-fit text-white bg-[#ff734c] hover:bg-[#fe4a19] focus:outline-none focus:bg-[#ff5d30]  font-bold rounded-lg text-[1.9rem] px-8 py-3 transition-all duration-75"
              >
                Exit
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* update modal */}
      <Modal
        open={openModal}
        onClose={closeUpdateFormModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            borderRadius: "2rem",
            bgcolor: "white",
            padding: "2rem",
            // overflowY: "scroll",
          }}
        >
          <div className="h-full overflow-y-auto p-[2.5rem] ">
            <UserUpdateImageAdminDash
              avatarUpload={avatarUpload}
              dispatch={dispatchReducer}
              initUpdateFormData={initUpdateFormData}
              open={openModal}
              updateFormData={updateFormData}
            />
            <UserUpdateFormAdminDash
              user={user}
              initUpdateFormData={initUpdateFormData}
              initFormError={initFormError}
              updateFormData={updateFormData}
              errors={errors}
              avatarUpload={avatarUpload}
              updateLocalUser={updateLocalUser}
              dispatchReducer={dispatchReducer}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UserItem;
