import "../../public/assets/css/style.css";
import { Link } from "react-router-dom";

const SideBarItem = ({ data, isSmall }) => {
  const customStyle = `
  html {
    font-size: 0.5235vw;
  }
`;

  console.log(isSmall);
  return (
    <Link
      to={data.path}
      className={`dash__sidebar__item ${isSmall ? "small" : ""}`}
    >
      <style dangerouslySetInnerHTML={{ __html: customStyle }} />
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
