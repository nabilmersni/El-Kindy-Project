import { useEffect, useReducer } from "react";

import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { UserCircleIcon, LockClosedIcon } from "@heroicons/react/24/outline";

import DashLayout from "../../../../dashboard-layout/dash-layout";
import FaceIDRegistration from "../../components/FaceIDRegistration";
import ProfileImageUpload from "./ProfileImageUpload";
import ProfileUpdateForm from "./ProfileUpdateForm";
import ProfileChangePassword from "./ProfileChangePassword";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_OPEN":
      return { ...state, open: action.payload };
    case "SET_AVATAR_UPLOAD":
      return { ...state, avatarUpload: action.payload };
    case "SET_UPDATE_FORM_DATA":
      return { ...state, updateFormData: action.payload };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "SET_VALUE":
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

const DashAdminProfile = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

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
    open: false,
    avatarUpload: undefined,
    updateFormData: initUpdateFormData,
    errors: initFormError,
    value: "1",
  };

  const [
    { open, avatarUpload, updateFormData, errors, value },
    dispatchReducer,
  ] = useReducer(reducer, initialState);

  const setValue = (newValue) =>
    dispatchReducer({ type: "SET_VALUE", payload: newValue });

  //
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // ---------------------------------------------------------------------

  // useEffect(() => {
  //   if (avatarUpload) {
  //     handleFileUpload(avatarUpload);
  //   }
  // }, [avatarUpload]);

  // -------------------------------------------

  return (
    <div className="font-nunito">
      <DashLayout>
        <div className="flex flex-col justify-center items-start px-[2rem] rounded-[2rem] text-black mb-[2rem] ">
          <h1 className="text-[2.9rem] mb-[1rem] font-semibold text-blackk">
            Account Setting
          </h1>
          <div className="flex items-center gap-4 text-[1.5rem]">
            <p>Dashboard </p>
            <span className="w-[.7rem] h-[.7rem] rounded-full bg-black "></span>
            <p>Account Setting</p>
          </div>
        </div>

        <div className="rounded-[2rem] shadow-custom h-[85%]">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{ fontSize: "5rem" }} // Adjust the font size here
                >
                  <Tab
                    icon={<UserCircleIcon width={"2.7rem"} />}
                    iconPosition="start"
                    label="Account"
                    value="1"
                    sx={{
                      fontSize: "1.7rem",
                      fontFamily: "nunito",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      borderRadius: "2rem 0 0 0",
                    }}
                  />

                  <Tab
                    icon={<LockClosedIcon width={"2.4rem"} />}
                    iconPosition="start"
                    label="Security"
                    value="2"
                    sx={{
                      fontSize: "1.7rem",
                      fontFamily: "nunito",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel
                value="1"
                sx={{
                  overflowY: "scroll",
                  marginRight: "1rem",
                  marginTop: "1rem",
                  height: "59vh",
                }}
              >
                <div className="font-nunito text-blackk ">
                  <div className="flex justify-between items-start gap-[3rem] ">
                    <ProfileImageUpload
                      initUpdateFormData={initUpdateFormData}
                      avatarUpload={avatarUpload}
                      updateFormData={updateFormData}
                      open={open}
                      dispatch={dispatchReducer}
                    />

                    <ProfileUpdateForm
                      initUpdateFormData={initUpdateFormData}
                      initFormError={initFormError}
                      errors={errors}
                      updateFormData={updateFormData}
                      avatarUpload={avatarUpload}
                      dispatchReducer={dispatchReducer}
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="font-nunito text-[#2A3547] ">
                  <div className="p-[3rem] rounded-[1.4rem] shadow-custom2 flex justify-between items-start gap-[2rem] ">
                    <FaceIDRegistration />
                    <ProfileChangePassword />
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </DashLayout>
    </div>
  );
};

export default DashAdminProfile;
