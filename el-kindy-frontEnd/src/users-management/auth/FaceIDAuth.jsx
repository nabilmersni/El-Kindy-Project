import { useEffect } from "react";
import { authFaceID } from "../../features/auth/AuthSlice";
import { useDispatch } from "react-redux";

function FaceIDAuth() {
  const dispatch = useDispatch();

  let faceioInstance = null;

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
      faceioInstance = new faceIO("fioa0873");
    }
  };

  const faceSignIn = async () => {
    try {
      console.log(faceioInstance);
      const userData = await faceioInstance.authenticate({
        locale: "auto",
      });
      console.log(userData);

      console.log("Unique Facial ID: ", userData.facialId);
      console.log("PayLoad: ", userData.payload);

      dispatch(
        authFaceID({
          email: userData.payload.email,
          faceID: userData.facialId,
        })
      );
    } catch (errorCode) {
      console.log(errorCode);
    }
  };

  return (
    <button
      onClick={faceSignIn}
      type="button"
      aria-label="Sign in with Google"
      className="flex items-center gap-3 bg-google-button-blue rounded-md p-0.5 pr-3 transition-colors duration-300 hover:bg-google-button-blue-hover"
    >
      <div className="flex items-center justify-center bg-white w-9 h-9 rounded-l">
        <img className="w-[1.5rem] " src="img/faceid-icon.svg" alt="" />
      </div>
      <span className="text-sm text-white tracking-wider">
        Sign in with Face ID
      </span>
    </button>
  );
}

export default FaceIDAuth;
