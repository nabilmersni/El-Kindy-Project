import "../../../../public/assets/css/style.css";

const AnswerItem = ({}) => {
  return (
    <div>
      <div className="question-item__reponse-item">
        <div className="question-item__reponse-item-option">
          <div className="circle-option">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 520 520"
              xmlSpace="preserve"
              className="checked-response-icon"
            >
              <g>
                <path
                  d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                  data-name="7-Check"
                  opacity="1"
                ></path>
              </g>
            </svg>
          </div>
          <label for="radioOption1" className="radioLabelItem">
            88 keys, 52 white and 36 black.
          </label>
        </div>
        <div className="question-item__reponse-buttons">
          <div className="question-item__buttons-controllers-btn edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 24 24"
              xmlSpace="preserve"
              className="edit-icon"
            >
              <g>
                <path
                  d="M19 12a1 1 0 0 0-1 1v8c0 .551-.448 1-1 1H3c-.552 0-1-.449-1-1V7c0-.551.448-1 1-1h8a1 1 0 1 0 0-2H3C1.346 4 0 5.346 0 7v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-8a1 1 0 0 0-1-1z"
                  opacity="1"
                ></path>
                <path
                  d="M9.376 11.089a.506.506 0 0 0-.137.255l-.707 3.536a.501.501 0 0 0 .589.588l3.535-.707a.497.497 0 0 0 .256-.137l7.912-7.912-3.535-3.535zM23.268.732a2.502 2.502 0 0 0-3.535 0l-1.384 1.384 3.535 3.535 1.384-1.384C23.74 3.796 24 3.168 24 2.5s-.26-1.296-.732-1.768z"
                  opacity="1"
                ></path>
              </g>
            </svg>
          </div>
          <div className="question-item__buttons-controllers-btn delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              className="delete-icon"
            >
              <g>
                <path
                  d="m62.205 150 26.569 320.735C90.678 493.865 110.38 512 133.598 512h244.805c23.218 0 42.92-18.135 44.824-41.265L449.795 150H62.205zm118.781 302c-7.852 0-14.458-6.108-14.956-14.063l-15-242c-.513-8.276 5.771-15.395 14.033-15.908 8.569-.601 15.381 5.757 15.908 14.033l15 242c.531 8.57-6.25 15.938-14.985 15.938zM271 437c0 8.291-6.709 15-15 15s-15-6.709-15-15V195c0-8.291 6.709-15 15-15s15 6.709 15 15v242zm89.97-241.062-15 242c-.493 7.874-7.056 14.436-15.908 14.033-8.262-.513-14.546-7.632-14.033-15.908l15-242c.513-8.276 7.764-14.297 15.908-14.033 8.262.513 14.546 7.632 14.033 15.908zM451 60h-90V45c0-24.814-20.186-45-45-45H196c-24.814 0-45 20.186-45 45v15H61c-16.569 0-30 13.431-30 30 0 16.567 13.431 30 30 30h390c16.569 0 30-13.433 30-30 0-16.569-13.431-30-30-30zm-120 0H181V45c0-8.276 6.724-15 15-15h120c8.276 0 15 6.724 15 15v15z"
                  opacity="1"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <hr className="question-item-hr" />
    </div>
  );
};
export default AnswerItem;
