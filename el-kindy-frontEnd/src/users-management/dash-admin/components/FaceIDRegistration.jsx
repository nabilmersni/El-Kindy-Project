import { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { faceIDRegistration } from "../../../features/auth/AuthSlice";

function FaceIDRegistration() {
  const dispatch = useDispatch();

  let faceioInstance = null;
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const faceIoScript = document.createElement("script");
    faceIoScript.src = "//cdn.faceio.net/fio.js";
    faceIoScript.async = true;
    faceIoScript.onload = () => faceIoScriptLoaded();
    document.body.appendChild(faceIoScript);

    return () => {
      document.body.removeChild(faceIoScript);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const faceIoScriptLoaded = () => {
    console.log(faceIO);
    if (faceIO && !faceioInstance) {
      faceioInstance = new faceIO("fioa83da");
    }
  };

  const faceRegistration = async () => {
    try {
      const userInfo = await faceioInstance.enroll({
        locale: "auto",
        payload: {
          email: user.email,
          userId: user._id,
          fullname: user.fullname,
        },
      });
      console.log(userInfo);
      console.log("Unique Facial ID: ", userInfo.facialId);
      console.log("Enrollment Date: ", userInfo.timestamp);
      console.log("Gender: ", userInfo.details.gender);
      console.log("Age Approximation: ", userInfo.details.age);
      dispatch(
        faceIDRegistration({
          id: user._id,
          user: { faceID: userInfo.facialId },
        })
      );
    } catch (errorCode) {
      console.log(errorCode);
      handleError(errorCode);
    }
  };

  const handleError = (errCode) => {
    // Log all possible error codes during user interaction..
    // Refer to: https://faceio.net/integration-guide#error-codes
    // for a detailed overview when these errors are triggered.
    // const fioErrCode={PERMISSION_REFUSED:1,NO_FACES_DETECTED:2,UNRECOGNIZED_FACE:3,MANY_FACES:4,PAD_ATTACK:5,FACE_MISMATCH:6,NETWORK_IO:7,WRONG_PIN_CODE:8,PROCESSING_ERR:9,UNAUTHORIZED:10,TERMS_NOT_ACCEPTED:11,UI_NOT_READY:12,SESSION_EXPIRED:13,TIMEOUT:14,TOO_MANY_REQUESTS:15,EMPTY_ORIGIN:16,FORBIDDDEN_ORIGIN:17,FORBIDDDEN_COUNTRY:18,UNIQUE_PIN_REQUIRED:19,SESSION_IN_PROGRESS:20}
    switch (errCode) {
      case fioErrCode.PERMISSION_REFUSED:
        console.log("Access to the Camera stream was denied by the end user");
        break;
      case fioErrCode.NO_FACES_DETECTED:
        console.log(
          "No faces were detected during the enroll or authentication process"
        );
        break;
      case fioErrCode.UNRECOGNIZED_FACE:
        console.log("Unrecognized face on this application's Facial Index");
        break;
      case fioErrCode.MANY_FACES:
        console.log("Two or more faces were detected during the scan process");
        break;
      case fioErrCode.PAD_ATTACK:
        console.log(
          "Presentation (Spoof) Attack (PAD) detected during the scan process"
        );
        break;
      case fioErrCode.FACE_MISMATCH:
        console.log(
          "Calculated Facial Vectors of the user being enrolled do not matches"
        );
        break;
      case fioErrCode.WRONG_PIN_CODE:
        console.log("Wrong PIN code supplied by the user being authenticated");
        break;
      case fioErrCode.PROCESSING_ERR:
        console.log("Server side error");
        break;
      case fioErrCode.UNAUTHORIZED:
        console.log(
          "Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information"
        );
        break;
      case fioErrCode.TERMS_NOT_ACCEPTED:
        console.log(
          "Terms & Conditions set out by FACEIO/host application rejected by the end user"
        );
        break;
      case fioErrCode.UI_NOT_READY:
        console.log(
          "The FACEIO Widget code could not be (or is being) injected onto the client DOM"
        );
        break;
      case fioErrCode.SESSION_EXPIRED:
        console.log(
          "Client session expired. The first promise was already fulfilled but the host application failed to act accordingly"
        );
        break;
      case fioErrCode.TIMEOUT:
        console.log(
          "Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)"
        );
        break;
      case fioErrCode.TOO_MANY_REQUESTS:
        console.log(
          "Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications"
        );
        break;
      case fioErrCode.EMPTY_ORIGIN:
        console.log(
          "Origin or Referer HTTP request header is empty or missing"
        );
        break;
      case fioErrCode.FORBIDDDEN_ORIGIN:
        console.log("Domain origin is forbidden from instantiating fio.js");
        break;
      case fioErrCode.FORBIDDDEN_COUNTRY:
        console.log(
          "Country ISO-3166-1 Code is forbidden from instantiating fio.js"
        );
        break;
      case fioErrCode.SESSION_IN_PROGRESS:
        console.log(
          "Another authentication or enrollment session is in progress"
        );
        break;
      case fioErrCode.NETWORK_IO:
      default:
        console.log(
          "Error while establishing network connection with the target FACEIO processing node"
        );
        break;
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col justify-center items-start">
        <p className="text-[2.8rem] font-bold ">Face ID</p>
        <p className="text-[1.8rem]  ">Facial recognition authentication.</p>
      </div>

      <Button
        variant="text"
        disabled={user.faceIDState}
        size="lg"
        onClick={faceRegistration}
        className={`bg-[#6aadff] text-white text-[1.8rem] font-bold font-nunito rounded-[.8rem] hover:bg-[#5aa7e5] capitalize `}
      >
        {!user.faceIDState ? "Setup" : "Active"}
      </Button>
    </div>
  );
}

export default FaceIDRegistration;
