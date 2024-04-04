import AvatarBuilder from "../../../components/avatar-builder/AvatarBuilder";
import { Button } from "@material-tailwind/react";
import Modal from "@mui/material/Modal";
import { useRef } from "react";

function ProfileImageUpload({
  avatarUpload,
  updateFormData,
  open,
  initUpdateFormData,
  dispatch,
  small,
}) {
  //
  const avatarUploadRef = useRef(null);

  const handleOpen = () => {
    dispatch({ type: "SET_OPEN", payload: true });
  };
  const handleClose = () => dispatch({ type: "SET_OPEN", payload: false });
  const setAvatarUpload = (avatarUpload) =>
    dispatch({ type: "SET_AVATAR_UPLOAD", payload: avatarUpload });
  const setUpdateFormData = (data) =>
    dispatch({ type: "SET_UPDATE_FORM_DATA", payload: data });

  const resetImage = () => {
    setAvatarUpload(undefined);
    setUpdateFormData(initUpdateFormData);
  };

  return (
    <div
      className={`flex flex-[2] flex-col w-full p-[1.5rem] shadow-custom3 rounded-[1.5rem] ${
        small ? "border-[.2rem] border-[#006cbe16]" : ""
      }`}
    >
      <h1
        className={`font-semibold ${
          small ? "text-[1.5rem] md:text-[1.65rem]" : "text-[2.7rem]"
        }`}
      >
        Change Profile Picture
      </h1>
      <p
        className={`${
          small ? "text-[.8rem] md:text-[.95rem]" : "text-[1.7rem]"
        }`}
      >
        Change your profile picture from here, then click save
      </p>
      <div
        className={`flex flex-col justify-center items-center  ${
          small ? "my-[2rem]" : "my-[4rem]"
        }`}
      >
        <div
          className={`rounded-full ${
            small
              ? "w-[9rem] h-[9rem] mb-[1rem]"
              : "w-[17rem] h-[17rem] mb-[1rem]"
          }`}
        >
          <img
            className="rounded-full w-full h-full object-cover"
            src={
              (avatarUpload && URL.createObjectURL(avatarUpload)) ||
              updateFormData?.photo_url ||
              "/assets/img/avatar2_2.png"
            }
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div
            className={`flex justify-center items-center gap-[1rem] ${
              small ? "flex-col md:flex-row mb-4 md:mb-0" : ""
            }`}
          >
            <Button
              onClick={handleOpen}
              variant="text"
              size={small ? "sm" : "md"}
              className={`bg-lightBlue text-nav hover:text-[#fff] font-bold font-nunito rounded-[.8rem] hover:bg-[#5fa7ff] capitalize ${
                small
                  ? "text-[.9rem] md:text-[1rem] my-0 md:my-[1rem]"
                  : "text-[1.9rem] my-[2rem]"
              }`}
            >
              Create Avatar
            </Button>
            <input
              type="file"
              name="avatarUpload"
              id=""
              hidden
              accept="image/*"
              ref={avatarUploadRef}
              onChange={(e) => setAvatarUpload(e.target.files[0])}
            />
            <Button
              onClick={() => avatarUploadRef.current.click()}
              variant="text"
              size={small ? "sm" : "md"}
              className={`bg-lightBlue text-nav hover:text-[#fff] font-bold font-nunito rounded-[.8rem] hover:bg-[#5fa7ff] capitalize ${
                small
                  ? "text-[.9rem] md:text-[1rem] my-0 md:my-[1rem]"
                  : "text-[1.9rem] my-[2rem]"
              }`}
            >
              Upload Image
            </Button>
          </div>
          <Button
            onClick={resetImage}
            variant="outlined"
            size={small ? "sm" : "md"}
            className={`border-[#FA896B] text-[#FA896B] focus:ring-0 font-bold font-nunito rounded-[.8rem] hover:bg-secondaryLight capitalize ${
              small
                ? "text-[.9rem] md:text-[1rem] mb-[2rem] "
                : "text-[2rem] mb-[2rem]"
            }`}
          >
            Reset
          </Button>
        </div>

        <div className="rounded-[2rem] ">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              borderRadius: "2rem",
            }}
          >
            <div className="w-[70vw] h-[90vh] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] ">
              <AvatarBuilder
                setAvatarBlop={setAvatarUpload}
                handleClose={handleClose}
                small={small}
              />
            </div>
          </Modal>
        </div>

        <p
          className={`${
            small ? "text-[1rem] mt-[.5rem]" : "text-[1.7rem] mt-[1rem]"
          }`}
        >
          Allowed JPG, GIF or PNG. Max size of 2MB
        </p>
      </div>
    </div>
  );
}

export default ProfileImageUpload;
