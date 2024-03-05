import React, { useEffect, useState } from "react";
// import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";
import userService from "../../../features/users/UserService";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { UserCircleIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import ButtonPrimary from "../../../ui/ButtonPrimary";
import FaceIDRegistration from "../components/FaceIDRegistration";

const DashAdminProfile = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const [users, setUsers] = useState([{}]);

  // const getAllUsers = async () => {
  //   const data = await userService.getAllUsers();
  //   setUsers(data);
  // };

  // useEffect(() => {
  //   getAllUsers();
  // }, [users]);
  return (
    <div className="font-nunito">
      <DashLayout>
        {/* <div className="flex flex-col justify-center items-start px-[2rem] py-[3rem] bg-[#ECF2FF] rounded-[2rem] text-black">
          <h1 className="text-[2.5rem] mb-[1rem] font-semibold ">
            Account Setting
          </h1>
          <div className="flex items-center gap-4 text-[1.5rem]">
            <p>Dashboard </p>
            <span className="w-[1rem] h-[1rem] rounded-full bg-black "></span>
            <p>Account Setting</p>
          </div>
        </div> */}

        <div className="flex flex-col justify-center items-start px-[2rem] rounded-[2rem] text-black mb-[2rem] ">
          <h1 className="text-[2.5rem] mb-[1rem] font-semibold ">
            Account Setting
          </h1>
          <div className="flex items-center gap-4 text-[1.5rem]">
            <p>Dashboard </p>
            <span className="w-[1rem] h-[1rem] rounded-full bg-black "></span>
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
              <TabPanel value="1">
                <div className="font-nunito">
                  <h1 className="text-[3rem] ">hello</h1>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="font-nunito text-[#2A3547] ">
                  <div className="p-[3rem] rounded-[1.4rem] shadow-custom2 ">
                    <FaceIDRegistration />
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
