import "../../public/assets/css/style.css";
import DashNavBar from "./dash-navBar";
import DashSideBar from "./dash-sideBar";
import React, { useState } from "react";

const DashLayout = ({ children }) => {
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
