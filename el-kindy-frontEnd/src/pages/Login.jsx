import { Nav } from "../ui/Nav";
import Lottie from "react-lottie";

import loginAnimation from "../../public/lottieAnimations/login.json";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

import Divider from "@mui/material/Divider";
import { useState } from "react";

function Login() {
  const initLoginFormData = {
    email: "",
    password: "",
  };

  const [loginFormData, setLoginFormData] = useState(initLoginFormData);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!hasErrors() && !isFormDataEmpty()) {
      console.log({
        email: loginFormData.email,
        password: loginFormData.password,
      });
    } else {
      // Validation for Email
      if (!loginFormData.email.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required",
        }));
      } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
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

      // Validation for Password
      if (!loginFormData.password.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password is required",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
        }));
      }
    }
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  const isFormDataEmpty = () => {
    return Object.entries(loginFormData).some(([key, value]) => value === "");
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });

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

    // Validation for Password
    if (name === "password") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Password is required",
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
      <div className="flex justify-center lg:justify-between items-center mt-[10rem] mb-[2rem] px-[1rem] relative">
        <div className="hidden lg:block w-[40rem] ">
          <Lottie
            isClickToPauseDisabled={true}
            options={{ animationData: loginAnimation }}
          />
        </div>

        <div className="flex flex-col justify-center items-center w-[30rem] py-[1rem] px-[1.5rem] bg-white rounded-[1rem] shadow-lg">
          <h1 className="text-[1.8rem] text-primary font-bold">Sign in</h1>
          <p className="text-black font-light my-[.5rem] ">
            Adventure starts here
          </p>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
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

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
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

            <div className="flex justify-end pr-[1rem] ">
              <Link to={"/signup"}>
                <p className="text-primary">Forgot password?</p>
              </Link>
            </div>

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
              Login
            </Button>

            <Divider sx={{ my: 1 }}>or</Divider>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-[1rem] ">
              <button
                aria-label="Sign in with Google"
                className="flex items-center gap-3 bg-google-button-blue rounded-md p-0.5 pr-3 transition-colors duration-300 hover:bg-google-button-blue-hover"
              >
                <div className="flex items-center justify-center bg-white w-9 h-9 rounded-l">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <title>Sign in with Google</title>
                    <desc>Google G Logo</desc>
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      className="fill-google-logo-blue"
                    ></path>
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      className="fill-google-logo-green"
                    ></path>
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      className="fill-google-logo-yellow"
                    ></path>
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      className="fill-google-logo-red"
                    ></path>
                  </svg>
                </div>
                <span className="text-sm text-white tracking-wider">
                  Sign in with Google
                </span>
              </button>

              <button
                aria-label="Sign in with Google"
                className="flex items-center gap-3 bg-google-button-blue rounded-md p-0.5 pr-3 transition-colors duration-300 hover:bg-google-button-blue-hover"
              >
                <div className="flex items-center justify-center bg-white w-9 h-9 rounded-l">
                  <img
                    className="w-[1.5rem] "
                    src="img/faceid-icon.svg"
                    alt=""
                  />
                </div>
                <span className="text-sm text-white tracking-wider">
                  Sign in with Face ID
                </span>
              </button>
            </div>

            <div className="flex justify-center items-center mt-[1.2rem] my-[.8rem] gap-[1rem] ">
              <p>New on our platform ?</p>
              <Link to={"/signup"}>
                <p className="text-primary font-semibold">Create an account</p>
              </Link>
            </div>
          </Box>
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

export default Login;
