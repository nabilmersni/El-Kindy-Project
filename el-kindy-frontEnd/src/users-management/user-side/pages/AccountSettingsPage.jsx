import { useReducer } from "react";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { UserCircleIcon, LockClosedIcon } from "@heroicons/react/24/outline";

import profileAnimation from "../../../../public/lottieAnimations/profile.json";
import UserSideLayout from "../../../dashboard-layout/UserSideLayout";

import FaceIDRegistration from "../../dash-admin/components/FaceIDRegistration";
import ProfileImageUpload from "../../dash-admin/pages/dash-admin-profile/ProfileImageUpload";
import ProfileUpdateForm from "../../dash-admin/pages/dash-admin-profile/ProfileUpdateForm";
import ProfileChangePassword from "../../dash-admin/pages/dash-admin-profile/ProfileChangePassword";

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

const AccountSettingsPage = () => {
  const { user } = useSelector((state) => state.auth);

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

  return (
    <UserSideLayout>
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between items-center rounded-[2rem] bg-[#d8e8ff] py-[1rem] px-[3rem] w-full ">
          <div className="flex flex-col">
            <h1 className="text-[1.7rem] md:text-[2rem] lg:text-[2.7rem] mb-[.35rem] text-primary font-bold">
              Account Settings
            </h1>
            <p className="text-[.8rem] md:text-[1.1rem] lg:text-[1.2rem] ">
              Personalize Your Profile and Manage Your Preferences
            </p>
          </div>
          <div className="w-[7rem] lg:w-[7.6rem] mt-4 md:mt-0">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: profileAnimation }}
            />
          </div>
        </div>

        <div className="mt-[3rem] w-full">
          <div className="rounded-[2rem] shadow-custom ">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      icon={<UserCircleIcon width={"1.5rem"} />}
                      iconPosition="start"
                      label="Account"
                      value="1"
                      sx={{
                        fontSize: "1rem",
                        fontFamily: "nunito",
                        fontWeight: "600",
                        textTransform: "capitalize",
                        borderRadius: "2rem 0 0 0",
                      }}
                    />

                    <Tab
                      icon={<LockClosedIcon width={"1.2rem"} />}
                      iconPosition="start"
                      label="Security"
                      value="2"
                      sx={{
                        fontSize: "1rem",
                        fontFamily: "nunito",
                        fontWeight: "600",
                        textTransform: "capitalize",
                      }}
                    />
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  sx={{
                    // overflowY: "scroll",
                    marginRight: "1rem",
                    marginTop: "1rem",
                    // height: "59vh",
                  }}
                >
                  <div className="font-nunito text-blackk ">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-[3rem] ">
                      <ProfileImageUpload
                        initUpdateFormData={initUpdateFormData}
                        avatarUpload={avatarUpload}
                        updateFormData={updateFormData}
                        open={open}
                        dispatch={dispatchReducer}
                        small={true}
                      />

                      <ProfileUpdateForm
                        initUpdateFormData={initUpdateFormData}
                        initFormError={initFormError}
                        errors={errors}
                        updateFormData={updateFormData}
                        avatarUpload={avatarUpload}
                        dispatchReducer={dispatchReducer}
                        small={true}
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="font-nunito text-[#2A3547] ">
                    <div className="p-[2rem] rounded-[1.4rem] shadow-custom2 flex justify-between items-start gap-[2rem]">
                      <FaceIDRegistration small={true} />
                      <ProfileChangePassword small={true} />
                    </div>
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </UserSideLayout>
  );
};

export default AccountSettingsPage;
