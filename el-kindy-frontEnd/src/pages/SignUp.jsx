import { Nav } from "../ui/Nav";
import Lottie from "react-lottie";

import loginAnimation from "../../public/lottieAnimations/login.json";

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
    await signUp(signUpFormData);
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setsignUpFormData({ ...signUpFormData, [name]: value });
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#DBDFEA", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "#7586FF", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#7586FF", // Outline color when focused
                  },
                },

                "& .MuiInputLabel-root": {
                  // color: "#DBDFEA", // Label color when focused
                  "&.Mui-focused": {
                    color: "#7586FF",
                  },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="date"
              id="date of birth"
              label="date of birth"
              name="dateOfBirth"
              onChange={changeHandler}
              InputLabelProps={{
                shrink: true, // Show label as floating when focused
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#DBDFEA", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "#7586FF", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#7586FF", // Outline color when focused
                  },
                },

                "& .MuiInputLabel-root": {
                  // color: "#DBDFEA", // Label color when focused
                  "&.Mui-focused": {
                    color: "#7586FF",
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#DBDFEA", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "#7586FF", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#7586FF", // Outline color when focused
                  },
                },

                "& .MuiInputLabel-root": {
                  // color: "#DBDFEA", // Label color when focused
                  "&.Mui-focused": {
                    color: "#7586FF",
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#DBDFEA", // Outline color when not focused
                    },
                    "&:hover fieldset": {
                      borderColor: "#7586FF", // Outline color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7586FF", // Outline color when focused
                    },
                  },

                  "& .MuiInputLabel-root": {
                    // color: "#DBDFEA", // Label color when focused
                    "&.Mui-focused": {
                      color: "#7586FF",
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#DBDFEA", // Outline color when not focused
                    },
                    "&:hover fieldset": {
                      borderColor: "#7586FF", // Outline color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7586FF", // Outline color when focused
                    },
                  },

                  "& .MuiInputLabel-root": {
                    // color: "#DBDFEA", // Label color when focused
                    "&.Mui-focused": {
                      color: "#7586FF",
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#DBDFEA", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "#7586FF", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#7586FF", // Outline color when focused
                  },
                },

                "& .MuiInputLabel-root": {
                  // color: "#DBDFEA", // Label color when focused
                  "&.Mui-focused": {
                    color: "#7586FF",
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#DBDFEA", // Outline color when not focused
                    },
                    "&:hover fieldset": {
                      borderColor: "#7586FF", // Outline color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7586FF", // Outline color when focused
                    },
                  },

                  "& .MuiInputLabel-root": {
                    // color: "#DBDFEA", // Label color when focused
                    "&.Mui-focused": {
                      color: "#7586FF",
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#DBDFEA", // Outline color when not focused
                    },
                    "&:hover fieldset": {
                      borderColor: "#7586FF", // Outline color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7586FF", // Outline color when focused
                    },
                  },

                  "& .MuiInputLabel-root": {
                    // color: "#DBDFEA", // Label color when focused
                    "&.Mui-focused": {
                      color: "#7586FF",
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
