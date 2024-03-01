import Lottie from "react-lottie";

import loginAnimation from "../../public/lottieAnimations/login.json";
import { Nav } from "../ui/Nav";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../services/userApi";
import { Typography } from "@material-tailwind/react";

function SignUp() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const initSignUpFormData = {
    fullname: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    phone2: "",
    profession: "",
    password: "",
    confirmPassword: "",
    role: "user",
  };

  const [signUpFormData, setsignUpFormData] = useState(initSignUpFormData);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hasErrors() && !isFormDataEmpty()) {
      await signUp(signUpFormData);
    }
  };

  const [errors, setErrors] = useState({
    fullname: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    phone2: "",
    profession: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  const isFormDataEmpty = () => {
    return Object.entries(signUpFormData).some(
      ([key, value]) => key !== "phone2" && value === ""
    );
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setsignUpFormData({ ...signUpFormData, [name]: value });

    // Validation for Fullname
    if (name === "fullname") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Fullname is required",
        }));
      } else if (value.length < 3) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Fullname must be at least 3 characters long",
        }));
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Only letters are allowed",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }

    // Validation for Date of Birth
    if (name === "dateOfBirth") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Date of birth is required",
        }));
      } else {
        const currentDate = new Date();
        const inputDate = new Date(value);
        const minDate = new Date(
          currentDate.getFullYear() - 5,
          currentDate.getMonth(),
          currentDate.getDate()
        );

        if (inputDate > currentDate || inputDate > minDate) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Invalid date of birth. Must be at least 5 years old.",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
      }
    }

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

    // Validation for Phone Number 1
    if (name === "phone") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Phone number is required",
        }));
      } else if (!/^\d{8}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Invalid phone number format. Must be 8 digits",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }

    // Validation for Phone Number 2
    if (name === "phone2") {
      if (value && !/^\d{8}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Invalid phone number format. Must be 8 digits",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }

    // Validation for Profession
    if (name === "profession") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Profession is required",
        }));
      } else if (value.trim().length < 3) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Profession must be at least 3 characters",
        }));
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Only letters are allowed",
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
      } else if (value.trim().length < 8) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Password must be at least 8 characters",
        }));
      } else if (
        signUpFormData.confirmPassword &&
        value !== signUpFormData.confirmPassword
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
      } else if (value !== signUpFormData.password) {
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

    // Validation for Role
    if (name === "role") {
      if (!["user", "teacher"].includes(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          role: "Hello little hacker 👩‍💻",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          role: "",
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
      <div className="flex justify-center lg:justify-between items-center mt-[10rem] mb-[2rem]  px-[2rem] relative">
        <div className="hidden lg:block max-w-[40rem] ">
          <Lottie
            isClickToPauseDisabled={true}
            options={{ animationData: loginAnimation }}
          />
        </div>

        <div className="flex flex-col justify-center items-center w-[35rem] py-[1rem] px-[1.5rem] bg-white rounded-[1rem] shadow-lg">
          <h1 className="text-[1.8rem] text-primary font-bold">Sign up</h1>
          <p className="text-black font-light my-[.5rem] ">
            Adventure starts here
          </p>

          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              id="fullname"
              label="Fullname"
              name="fullname"
              onChange={changeHandler}
              onBlur={changeHandler}
              error={Boolean(errors.fullname)}
              helperText={errors.fullname}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.fullname ? "red" : "#DBDFEA",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.fullname ? "red" : "#7586FF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.fullname ? "red" : "#7586FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: errors.fullname ? "red" : "#7586FF",
                  },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="date"
              id="dateOfBirth"
              label="Date of Birth"
              name="dateOfBirth"
              onChange={changeHandler}
              onBlur={changeHandler}
              error={Boolean(errors.dateOfBirth)}
              helperText={errors.dateOfBirth}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.dateOfBirth ? "red" : "#DBDFEA",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.dateOfBirth ? "red" : "#7586FF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.dateOfBirth ? "red" : "#7586FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: errors.dateOfBirth ? "red" : "#7586FF",
                  },
                },
              }}
            />

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

            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-4">
              <TextField
                margin="normal"
                required
                fullWidth
                type="tel"
                id="phone1"
                label="Phone N°1"
                name="phone"
                onChange={changeHandler}
                onBlur={changeHandler}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.phone ? "red" : "#DBDFEA",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.phone ? "red" : "#7586FF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.phone ? "red" : "#7586FF",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: errors.phone ? "red" : "#7586FF",
                    },
                  },
                }}
              />

              <TextField
                margin="normal"
                fullWidth
                type="tel"
                id="phone2"
                label="Phone N°2"
                name="phone2"
                onChange={changeHandler}
                onBlur={changeHandler}
                error={Boolean(errors.phone2)}
                helperText={errors.phone2}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errors.phone2 ? "red" : "#DBDFEA",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.phone2 ? "red" : "#7586FF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.phone2 ? "red" : "#7586FF",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: errors.phone2 ? "red" : "#7586FF",
                    },
                  },
                }}
              />
            </div>

            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              id="profession"
              label="Parents's Profession / Profession"
              name="profession"
              onChange={changeHandler}
              onBlur={changeHandler}
              error={Boolean(errors.profession)}
              helperText={errors.profession}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.profession ? "red" : "#DBDFEA",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.profession ? "red" : "#7586FF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.profession ? "red" : "#7586FF",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: errors.profession ? "red" : "#7586FF",
                  },
                },
              }}
            />

            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-4">
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
            </div>

            <FormControl margin="dense">
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                required
                sx={{ color: "#7586FF" }}
              >
                Role
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="role"
                onChange={changeHandler}
                defaultValue={"user"}
              >
                <FormControlLabel
                  value="user"
                  control={
                    <Radio
                      sx={{
                        color: "#7586FF",
                        "&.Mui-checked": {
                          color: "#7586FF",
                        },
                      }}
                    />
                  }
                  label="Student"
                />
                <FormControlLabel
                  value="teacher"
                  control={
                    <Radio
                      sx={{
                        color: "#7586FF",
                        "&.Mui-checked": {
                          color: "#7586FF",
                        },
                      }}
                    />
                  }
                  label="Teacher"
                />
              </RadioGroup>
              {errors.role && (
                <Typography variant="paragraph" color="red">
                  {errors.role}
                </Typography>
              )}
            </FormControl>

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

            <Button
              size="large"
              type="submit"
              fullWidth
              variant="contained"
              disabled={hasErrors() || isFormDataEmpty()}
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
              Sign Up
            </Button>
            <div className="flex justify-center items-center my-[.8rem] gap-[1rem] ">
              <p>Already have an account ?</p>
              <Link to={"/login"}>
                <p className="text-primary font-semibold">Sign in instead</p>
              </Link>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
