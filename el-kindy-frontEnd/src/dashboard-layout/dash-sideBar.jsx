import "../../public/assets/css/style.css";
import SideBarLogo from "./sideBar-logo";
import SideBarItem from "./sideBar-item";
import DashAnimation from "./dash-animation";
import { AdminDashSideBarMenuItems } from "./admin-dash-sideBar-menu-items";
import React, { useState } from "react";

const DashSideBar = () => {
  const [isSidebarSmall, setIsSidebarSmall] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarSmall((prev) => !prev);
  };
  return (
    <div className={`dash__sidebar ${isSidebarSmall ? "small" : ""}`}>
      <SideBarLogo isSmall={isSidebarSmall} />
      <div onClick={toggleSidebar}>test</div>

      <div className={`dash__sidebar__items ${isSidebarSmall ? "small" : ""}`}>
        {AdminDashSideBarMenuItems.map((item, index) => (
          <SideBarItem key={index} data={item} isSmall={isSidebarSmall} />
        ))}
      </div>

      <div
        className={`dash__sidebar__speaker ${isSidebarSmall ? "small" : ""}`}
      >
        <DashAnimation
          className="speaker-animation"
          path="../../public/assets/json/speaker.json"
        />
      </div>

      <div
        className={`dash__sidebar__notesFly ${isSidebarSmall ? "small" : ""}`}
      >
        <DashAnimation
          className="notesFly-animation"
          path="../../public/assets/json/notesFly.json"
        />
      </div>
    </div>
  );
};

export default DashSideBar;
