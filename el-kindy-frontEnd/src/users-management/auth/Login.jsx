import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "react-lottie";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { Nav } from "../../ui/Nav";
import loginAnimation from "../../../public/lottieAnimations/login.json";
import { login, reset } from "../../features/auth/AuthSlice";
import Spinner from "../../ui/Spinner";
import GoogleAuth from "./GoogleAuth";
import FaceIDAuth from "./FaceIDAuth";

function Login() {
  const initLoginFormData = {
    email: "",
    password: "",
  };

  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // if (user) {
    //   naviagte("/admin-dash");
    // }
    switch (user?.role) {
      case "admin":
        naviagte("/admin-dash");
        break;
      case "user":
        naviagte("/user-side");
        break;
      case "teacher":
        naviagte("/dash-teacher-availabilities");
        break;
      default:
        break;
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, naviagte, dispatch]);

  const [loginFormData, setLoginFormData] = useState(initLoginFormData);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!hasErrors() && !isFormDataEmpty()) {
      dispatch(login(loginFormData));
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

      {isLoading ? <Spinner /> : ""}

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
              <Link to={"/forgotPasswordRequest"}>
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
              <GoogleAuth />

              <FaceIDAuth />
            </div>
          </Box>

          <div className="flex justify-center items-center mt-[1.2rem] my-[.8rem] gap-[1rem] ">
            <p>New on our platform ?</p>
            <Link to={"/signup"}>
              <p className="text-primary font-semibold">Create an account</p>
            </Link>
          </div>
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
