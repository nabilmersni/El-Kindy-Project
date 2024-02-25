import "../../public/assets/css/style.css";

const SideBarLogo = ({ isSmall }) => {
  const customStyle = `
  html {
    font-size: 0.5235vw;
  }
`;

  return (
    <div className={`dash__sidebar__logo ${isSmall ? "small" : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: customStyle }} />
      <div className="dash__sidebar__logo__svg-container">
        <img
          className="dash__sidebar__logo__svg"
          src="../../public/assets/img/logo.svg"
          alt=""
        />
      </div>
      <div className={`dash__sidebar__logo__text ${isSmall ? "small" : ""}`}>
        El Kindy <br />
        Conservatory
      </div>
    </div>
  );
};

export default SideBarLogo;
