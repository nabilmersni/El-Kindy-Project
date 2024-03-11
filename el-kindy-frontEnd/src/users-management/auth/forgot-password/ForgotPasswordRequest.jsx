import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "react-lottie";
import authService from "../../../features/auth/AuthService";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { Nav } from "../../../ui/Nav";
import loginAnimation from "../../../../public/lottieAnimations/login.json";
import Spinner from "../../../ui/Spinner";

function ForgotPasswordRequest() {
  const navigate = useNavigate();

  const [fogotPassFormData, setFogotPassFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const forgotPasswordFN = async (email) => {
    await authService.forgotPasswordRequest({ email });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!hasErrors() && !isFormDataEmpty()) {
      forgotPasswordFN(fogotPassFormData.email);
      navigate("/login");
    } else {
      // Validation for Email
      if (!fogotPassFormData.email.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required",
        }));
      } else if (!/\S+@\S+\.\S+/.test(fogotPassFormData.email)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email format",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
    }
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  const isFormDataEmpty = () => {
    return Object.entries(fogotPassFormData).some(
      ([key, value]) => value === ""
    );
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFogotPassFormData({ ...fogotPassFormData, [name]: value });

    // Validation for Email
    if (name === "email") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Email is required",
        }));
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Invalid email format",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
  };

  const customStyle = `
  html {
    font-size: 100%;
  }
  body{
    background-color: #DBDFFD;
  }

  ::-webkit-scrollbar {
    width: .8rem;
    border-radius: 8rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #7586FF;
    border-radius: 8rem;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 108, 190, 0.18);
    border-radius: 8rem;
  }
`;
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: customStyle }} />
      <Nav />

      {/* {isLoading ? <Spinner /> : ""} */}

      <div className="flex justify-center lg:justify-between items-center mt-[10rem] mb-[2rem] px-[1rem] relative">
        <div className="hidden lg:block w-[40rem] ">
          <Lottie
            isClickToPauseDisabled={true}
            options={{ animationData: loginAnimation }}
          />
        </div>

        <div className="flex flex-col justify-center items-center w-[28rem] py-[1rem] px-[1.5rem] bg-white rounded-[1rem] shadow-lg">
          <h1 className="text-[1.8rem] text-primary font-bold">
            Forgot Password
          </h1>
          <p className="text-black font-light my-[.5rem] ">
            Adventure starts here
          </p>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              onChange={changeHandler}
              onBlur={changeHandler}
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.email ? "red" : "#DBDFEA",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.email ? "red" : "#7586FF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.email ? "red" : "#7586FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: errors.email ? "red" : "#7586FF",
                  },
                },
              }}
            />

            <Button
              size="large"
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#7586FF",
                "&:hover": {
                  bgcolor: "#556cd6", // Change to the desired color on hover
                },
                textTransform: "none", // Disable uppercase for text
              }}
            >
              Request
            </Button>

            <Divider sx={{ my: 1 }}>or</Divider>

            <div className="flex justify-center mt-[1rem] ">
              <Link to={"/login"}>
                <p className="text-primary">Back to login</p>
              </Link>
            </div>
          </Box>

          {/* <div className="flex justify-center items-center mt-[1.2rem] my-[.8rem] gap-[1rem] ">
            <p>New on our platform ?</p>
            <Link to={"/signup"}>
              <p className="text-primary font-semibold">Create an account</p>
            </Link>
          </div> */}
        </div>

        <div>
          {/* <div className="max-w-[13rem] absolute top-[3rem] right-0">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: speakerAnimation }}
            />
          </div> */}

          {/* <div className="max-w-[12rem] absolute top-[50vh] left-0">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: guitarAnimation }}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordRequest;
