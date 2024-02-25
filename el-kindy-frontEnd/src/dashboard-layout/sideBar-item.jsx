import "../../public/assets/css/style.css";
import { Link } from "react-router-dom";

const SideBarItem = ({ data, isSmall }) => {
  const isActive = data.path === window.location.pathname;
  // console.log(data.path);

  return (
    <Link
      to={data.path}
      className={`dash__sidebar__item ${isSmall ? "small" : ""} ${
        isActive ? "active" : ""
      }`}
    >
      <div className={`dash__sidebar__item-icon ${isSmall ? "small" : ""}`}>
        {data.icon}
      </div>
      <div className={`dash__sidebar__item-text ${isSmall ? "small" : ""}`}>
        {data.name}
      </div>
    </Link>
  );
};

export default SideBarItem;
