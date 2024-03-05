import "../../public/assets/css/style.css";
import DashNavBar from "./dash-navBar";
import DashSideBar from "./dash-sideBar";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../ui/Spinner";

const DashLayout = ({ children }) => {
  const { isLoading } = useSelector((state) => state.auth);
  const customStyle = `
  html {
    font-size: 0.5235vw;
  }
`;

  const [isSidebarSmall, setIsSidebarSmall] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarSmall((prev) => !prev);
  };

  return (
    <div className="dash">
      {isLoading ? <Spinner /> : ""}
      <DashSideBar isSidebarSmall={isSidebarSmall} />

      <div className="dash__content">
        <DashNavBar toggleSidebar={toggleSidebar} />

        <div className="dash__content__container">{children}</div>
      </div>

      {/* fix the font size style  */}
      <style dangerouslySetInnerHTML={{ __html: customStyle }} />
    </div>
  );
};

export default DashLayout;
