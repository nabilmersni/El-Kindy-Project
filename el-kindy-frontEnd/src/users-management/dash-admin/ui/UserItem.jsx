import { useReducer } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import userService from "../../../features/users/UserService";
import UserUpdateFormAdminDash from "../pages/dash-admin-users/UserUpdateFormAdminDash";
import UserUpdateImageAdminDash from "../pages/dash-admin-users/UserUpdateImageAdminDash";

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
    userToUpdate: user,
    openModal: false,
    avatarUpload: undefined,
    updateFormData: initUpdateFormData,
    errors: initFormError,
  };

  const [
    { userToUpdate, openModal, avatarUpload, updateFormData, errors },
    dispatchReducer,
  ] = useReducer(reducer, initialState);

  const setUpdateFormData = (data) =>
    dispatchReducer({ type: "SET_UPDATE_FORM_DATA", payload: data });
  const setErrors = (errors) =>
    dispatchReducer({ type: "SET_ERRORS", payload: errors });

  const blockUser = async (state) => {
    const updatedUser = await userService.blockUser(user._id, { state });
    updateLocalUser(user._id, updatedUser);
  };

  const blockUserHandler = (state) => {
    blockUser(state);
  };
  const openUpdateFormModal = () => {
    dispatchReducer({ type: "SET_OPEN", payload: true });
  };
  const closeUpdateFormModal = () => {
    dispatchReducer({ type: "SET_OPEN", payload: false });
    setUpdateFormData(initUpdateFormData);
    setErrors(initFormError);
  };

  return (
    <>
      <tr className=" one-user">
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
              onClick={() => blockUserHandler(false)}
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
        </td>
      </tr>

      <Modal
        open={openModal}
        onClose={closeUpdateFormModal}
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
