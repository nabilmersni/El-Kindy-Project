import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "react-lottie";
import authService from "../../../features/auth/AuthService";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router";

import { Nav } from "../../../ui/Nav";
import loginAnimation from "../../../../public/lottieAnimations/login.json";
import Spinner from "../../../ui/Spinner";

function ForgotPassword() {
  const navigate = useNavigate();

  const { token } = useParams();

  const [fogotPassFormData, setFogotPassFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const forgotPasswordChange = async (data, token) => {
    await authService.forgotPasswordChange(data, token);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!hasErrors() && !isFormDataEmpty()) {
      forgotPasswordChange(fogotPassFormData, token);
      navigate("/login");
    } else {
      // Validation for Password
      if (!fogotPassFormData.password.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password is required",
        }));
      } else if (fogotPassFormData.password.trim().length < 8) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password must be at least 8 characters",
        }));
      } else if (
        fogotPassFormData.confirmPassword &&
        fogotPassFormData.password !== fogotPassFormData.confirmPassword
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match",
          password: "",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
          confirmPassword: "",
        }));
      }

      // Validation for Confirm Password

      if (!fogotPassFormData.confirmPassword.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Confirm Password is required",
        }));
      } else if (
        fogotPassFormData.confirmPassword !== fogotPassFormData.password
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "",
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

    // Validation for Password
    if (name === "password") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Password is required",
        }));
      } else if (value.trim().length < 8) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Password must be at least 8 characters",
        }));
      } else if (
        fogotPassFormData.confirmPassword &&
        value !== fogotPassFormData.confirmPassword
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match",
          [name]: "",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
          confirmPassword: "",
        }));
      }
    }

    // Validation for Confirm Password
    if (name === "confirmPassword") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Confirm Password is required",
        }));
      } else if (value !== fogotPassFormData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Passwords do not match",
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
              id="password"
              label="New Password"
              type="password"
              name="password"
              onChange={changeHandler}
              onBlur={changeHandler}
              error={Boolean(errors.password)}
              helperText={errors.password}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.password ? "red" : "#DBDFEA",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.password ? "red" : "#7586FF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.password ? "red" : "#7586FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: errors.password ? "red" : "#7586FF",
                  },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="repassword"
              label="Confirm Password"
              name="confirmPassword"
              onChange={changeHandler}
              onBlur={changeHandler}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.confirmPassword ? "red" : "#DBDFEA",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.confirmPassword ? "red" : "#7586FF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.confirmPassword ? "red" : "#7586FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: errors.confirmPassword ? "red" : "#7586FF",
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
              Change password
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

export default ForgotPassword;
