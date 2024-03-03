import { useSelector } from "react-redux";
import "../../public/assets/css/style.css";

const DashNavBar = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dash__content__nav">
      <div onClick={toggleSidebar} className="dash__content__nav__left-side">
        <div className="dash__content__nav__left-side__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
          >
            <g>
              <path
                d="M464.883 64.267H175.65c-25.98 0-47.117 21.137-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h289.232c25.98 0 47.117-21.137 47.117-47.117.001-26.013-21.136-47.149-47.116-47.149zM47.134 64.267C21.145 64.267 0 85.411 0 111.4s21.145 47.133 47.134 47.133 47.133-21.144 47.133-47.133-21.144-47.133-47.133-47.133zM47.134 208.867C21.145 208.867 0 230.011 0 256s21.145 47.133 47.134 47.133S94.267 281.989 94.267 256s-21.144-47.133-47.133-47.133zM47.134 353.467C21.145 353.467 0 374.611 0 400.6s21.145 47.133 47.134 47.133 47.133-21.144 47.133-47.133-21.144-47.133-47.133-47.133zM464.883 208.867H175.65c-25.98 0-47.117 21.137-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h289.232c25.98 0 47.117-21.137 47.117-47.117.001-26.013-21.136-47.149-47.116-47.149zM464.883 353.467H175.65c-25.98 0-47.117 21.137-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h289.232c25.98 0 47.117-21.137 47.117-47.117.001-26.012-21.136-47.149-47.116-47.149z"
                opacity="1"
              ></path>
            </g>
          </svg>
        </div>
        <div className="dash__content__nav__left-side__text">Dashboard</div>
      </div>
      <div className="dash__content__nav__right-side">
        <div className="dash__content__nav__right-side__icons">
          <div className="dash__content__nav__right-side__icons-logout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 512.005 512"
              xmlSpace="preserve"
              className="dash__content__nav__right-side__icons-logout-svg"
            >
              <g transform="matrix(-1,0,0,1,512.0050048828125,0)">
                <path
                  d="M320 277.336c-11.797 0-21.332 9.559-21.332 21.332v85.336c0 11.754-9.559 21.332-21.336 21.332h-64v-320c0-18.219-11.605-34.496-29.055-40.555l-6.316-2.113h99.371c11.777 0 21.336 9.578 21.336 21.336v64c0 11.773 9.535 21.332 21.332 21.332s21.332-9.559 21.332-21.332v-64c0-35.285-28.715-64-64-64H48c-.812 0-1.492.363-2.281.469-1.028-.086-2.008-.47-3.051-.47C19.137.004 0 19.138 0 42.669v384c0 18.219 11.605 34.496 29.055 40.555L157.44 510.02c4.352 1.343 8.68 1.984 13.227 1.984 23.531 0 42.664-19.137 42.664-42.668v-21.332h64c35.285 0 64-28.715 64-64v-85.336c0-11.773-9.535-21.332-21.332-21.332zm0 0"
                  opacity="1"
                ></path>
                <path
                  d="m505.75 198.254-85.336-85.332a21.33 21.33 0 0 0-23.25-4.633C389.207 111.598 384 119.383 384 128.004v64h-85.332c-11.777 0-21.336 9.555-21.336 21.332 0 11.777 9.559 21.332 21.336 21.332H384v64c0 8.621 5.207 16.406 13.164 19.715a21.335 21.335 0 0 0 23.25-4.63l85.336-85.335c8.34-8.34 8.34-21.824 0-30.164zm0 0"
                  opacity="1"
                ></path>
              </g>
            </svg>
          </div>
          <div className="dash__content__nav__right-side__icons-notif-container">
            <div className="dash__content__nav__right-side__icons-notif">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                xmlSpace="preserve"
                className="dash__content__nav__right-side__icons-notif-svg"
              >
                <g>
                  <path
                    d="M21.379 16.913A6.698 6.698 0 0 1 19 11.788V9c0-3.519-2.614-6.432-6-6.92V1a1 1 0 1 0-2 0v1.08C7.613 2.568 5 5.481 5 9v2.788a6.705 6.705 0 0 1-2.388 5.133A1.752 1.752 0 0 0 3.75 20h16.5c.965 0 1.75-.785 1.75-1.75 0-.512-.223-.996-.621-1.337zM12 24a3.756 3.756 0 0 0 3.674-3H8.326A3.756 3.756 0 0 0 12 24z"
                    opacity="1"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="dash__content__nav__right-side__icons-notif-number-container">
              13
            </div>
          </div>
        </div>
        <div className="dash__content__nav__right-side__current-user">
          <div className="dash__content__nav__right-side__current-user-fullname">
            {user?.fullname}
          </div>
          <a
            href="#"
            className="dash__content__nav__right-side__current-user-img-container"
          >
            <img
              className="dash__content__nav__right-side__current-user-img"
              src="../../public/assets/img/avatar2.png"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashNavBar;
