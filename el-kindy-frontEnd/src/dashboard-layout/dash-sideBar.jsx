import "../../public/assets/css/style.css";
import SideBarLogo from "./sideBar-logo";
import SideBarItem from "./sideBar-item";
import DashAnimation from "./dash-animation";
import { AdminDashSideBarMenuItems } from "./admin-dash-sideBar-menu-items";
import { TeacherDashSideBarMenuItems } from "./teacher-dash-sideBar-menu-items";
import { useSelector } from "react-redux";

const DashSideBar = ({ isSidebarSmall }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={`dash__sidebar ${isSidebarSmall ? "small" : ""}`}>
      <SideBarLogo isSmall={isSidebarSmall} />
      {/* <div onClick={toggleSidebar}>test</div> */}

      <div className={`dash__sidebar__items ${isSidebarSmall ? "small" : ""}`}>
        {/* Render Admin sidebar items if user is admin */}
        {user.role === "admin" &&
          AdminDashSideBarMenuItems.map((item, index) => (
            <SideBarItem key={index} data={item} isSmall={isSidebarSmall} />
          ))}

        {/* Render Teacher sidebar items if user is teacher */}
        {user.role === "teacher" &&
          TeacherDashSideBarMenuItems.map((item, index) => (
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
