import React, { useEffect, useState } from "react";
// import "../../../../public/assets/css/style.css";
import DashLayout from "../../../dashboard-layout/dash-layout";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { UserCircleIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import FaceIDRegistration from "../components/FaceIDRegistration";
import { Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Buttonn from "@mui/material/Button";
import { updateMe } from "../../../features/auth/AuthSlice";

const DashAdminProfile = () => {
  const formInputSize = "1.9rem";
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const initUpdateFormData = {
    fullname: user.fullname,
    dateOfBirth: new Date(user.dateOfBirth).toISOString().split("T")[0],
    phone: user.phone,
    phone2: user.phone2,
    profession: user.profession,
  };

  const initFormError = {
    fullname: "",
    dateOfBirth: "",
    phone: "",
    phone2: "",
    profession: "",
  };

  const [updateFormData, setUpdateFormData] = useState(initUpdateFormData);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hasErrors() && !isFormDataEmpty()) {
      console.log("hhh");

      dispatch(updateMe(updateFormData));
    }
  };

  const [errors, setErrors] = useState(initFormError);

  const cleanForm = () => {
    setUpdateFormData(initUpdateFormData);
    setErrors(initFormError);
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  const isFormDataEmpty = () => {
    return Object.entries(updateFormData).some(
      ([key, value]) => key !== "phone2" && value === ""
    );
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUpdateFormData({ ...updateFormData, [name]: value });

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
  };

  return (
    <div className="font-nunito">
      <DashLayout>
        {/* <div className="flex flex-col justify-center items-start px-[2rem] py-[3rem] bg-[#ECF2FF] rounded-[2rem] text-black">
          <h1 className="text-[2.5rem] mb-[1rem] font-semibold ">
            Account Setting
          </h1>
          <div className="flex items-center gap-4 text-[1.5rem]">
            <p>Dashboard </p>
            <span className="w-[1rem] h-[1rem] rounded-full bg-black "></span>
            <p>Account Setting</p>
          </div>
        </div> */}

        <div className="flex flex-col justify-center items-start px-[2rem] rounded-[2rem] text-black mb-[2rem] ">
          <h1 className="text-[2.9rem] mb-[1rem] font-semibold text-blackk">
            Account Setting
          </h1>
          <div className="flex items-center gap-4 text-[1.5rem]">
            <p>Dashboard </p>
            <span className="w-[.7rem] h-[.7rem] rounded-full bg-black "></span>
            <p>Account Setting</p>
          </div>
        </div>

        <div className="rounded-[2rem] shadow-custom h-[85%]">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{ fontSize: "5rem" }} // Adjust the font size here
                >
                  <Tab
                    icon={<UserCircleIcon width={"2.7rem"} />}
                    iconPosition="start"
                    label="Account"
                    value="1"
                    sx={{
                      fontSize: "1.7rem",
                      fontFamily: "nunito",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      borderRadius: "2rem 0 0 0",
                    }}
                  />

                  <Tab
                    icon={<LockClosedIcon width={"2.4rem"} />}
                    iconPosition="start"
                    label="Security"
                    value="2"
                    sx={{
                      fontSize: "1.7rem",
                      fontFamily: "nunito",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel
                value="1"
                sx={{
                  overflowY: "scroll",
                  marginRight: "1rem",
                  marginTop: "1rem",
                  height: "59vh",
                }}
              >
                <div className="font-nunito text-blackk ">
                  <div className="flex justify-between items-start gap-[3rem] ">
                    <div className="flex flex-[2] flex-col w-full p-[1.5rem] shadow-custom3 rounded-[1.5rem] ">
                      <h1 className="font-semibold text-[2.7rem] ">
                        Change Profile Picture
                      </h1>
                      <p className="text-[1.7rem] ">
                        Change your profile picture from here
                      </p>
                      <div className="flex flex-col justify-center items-center my-[4rem] ">
                        <div className="rounded-full w-[17rem] h-[17rem] mb-[1rem] ">
                          <img
                            className="rounded-full w-full h-full object-cover"
                            src="../../../../public/img/avatar2.png"
                            alt=""
                          />
                        </div>

                        <div className="flex justify-center items-center gap-[1rem] ">
                          <Button
                            variant="text"
                            size="md"
                            className={`bg-lightBlue text-nav text-[2rem] font-extrabold font-nunito rounded-[.8rem] hover:bg-secondaryLight capitalize my-[2rem]`}
                          >
                            Upload
                          </Button>

                          <Button
                            variant="outlined"
                            size="md"
                            className={`border-[#FA896B] text-[#FA896B] text-[2rem] font-extrabold font-nunito rounded-[.8rem] hover:bg-secondaryLight capitalize my-[2rem]`}
                          >
                            Reset
                          </Button>
                        </div>

                        <p className="text-[1.7rem] mt-[1rem] ">
                          Allowed JPG, GIF or PNG. Max size of 1MB
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-[3]  flex-col w-full p-[1.5rem] shadow-custom3 rounded-[1.5rem] ">
                      <h1 className="font-semibold text-[2.7rem] ">
                        Personal Details
                      </h1>
                      <p className="text-[1.7rem] mb-[2rem] ">
                        To change your personal detail , edit and save from here
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
                          value={updateFormData.fullname || ""}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                fontSize: `${formInputSize}`,
                                borderColor: errors.fullname
                                  ? "red"
                                  : "#DBDFEA",
                              },
                              "&:hover fieldset": {
                                borderColor: errors.fullname
                                  ? "red"
                                  : "#7586FF",
                              },
                              "&.Mui-focused fieldset": {
                                fontSize: `${formInputSize}`,
                                borderColor: errors.fullname
                                  ? "red"
                                  : "#7586FF",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: `${formInputSize}`,
                              "&.Mui-focused": {
                                fontSize: `${formInputSize}`,
                                color: errors.fullname ? "red" : "#7586FF",
                              },
                            },

                            "& .MuiInputBase-input": {
                              fontSize: `${formInputSize}`, // Adjust the font size here
                            },
                            "& .MuiFormHelperText-root": {
                              fontSize: "1.6rem", // Adjust the font size here
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
                          value={updateFormData.dateOfBirth || ""}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              fontSize: `${formInputSize}`,
                              "& fieldset": {
                                borderColor: errors.dateOfBirth
                                  ? "red"
                                  : "#DBDFEA",
                              },
                              "&:hover fieldset": {
                                borderColor: errors.dateOfBirth
                                  ? "red"
                                  : "#7586FF",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: errors.dateOfBirth
                                  ? "red"
                                  : "#7586FF",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: `${formInputSize}`,
                              "&.Mui-focused": {
                                color: errors.dateOfBirth ? "red" : "#7586FF",
                              },
                            },
                            "& .MuiInputBase-input": {
                              fontSize: `${formInputSize}`, // Adjust the font size here
                            },
                            "& .MuiFormHelperText-root": {
                              fontSize: "1.6rem", // Adjust the font size here
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
                            value={updateFormData.phone || ""}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                fontSize: `${formInputSize}`,
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
                                fontSize: `${formInputSize}`,
                                "&.Mui-focused": {
                                  color: errors.phone ? "red" : "#7586FF",
                                },
                              },
                              "& .MuiInputBase-input": {
                                fontSize: `${formInputSize}`, // Adjust the font size here
                              },
                              "& .MuiFormHelperText-root": {
                                fontSize: "1.6rem", // Adjust the font size here
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
                            value={updateFormData.phone2 || ""}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                fontSize: `${formInputSize}`,
                                "& fieldset": {
                                  borderColor: errors.phone2
                                    ? "red"
                                    : "#DBDFEA",
                                },
                                "&:hover fieldset": {
                                  borderColor: errors.phone2
                                    ? "red"
                                    : "#7586FF",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: errors.phone2
                                    ? "red"
                                    : "#7586FF",
                                },
                              },
                              "& .MuiInputLabel-root": {
                                fontSize: `${formInputSize}`,
                                "&.Mui-focused": {
                                  color: errors.phone2 ? "red" : "#7586FF",
                                },
                              },
                              "& .MuiInputBase-input": {
                                fontSize: `${formInputSize}`, // Adjust the font size here
                              },
                              "& .MuiFormHelperText-root": {
                                fontSize: "1.6rem", // Adjust the font size here
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
                          value={updateFormData.profession || ""}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              fontSize: `${formInputSize}`,
                              "& fieldset": {
                                borderColor: errors.profession
                                  ? "red"
                                  : "#DBDFEA",
                              },
                              "&:hover fieldset": {
                                borderColor: errors.profession
                                  ? "red"
                                  : "#7586FF",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: errors.profession
                                  ? "red"
                                  : "#7586FF",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: `${formInputSize}`,
                              "&.Mui-focused": {
                                color: errors.profession ? "red" : "#7586FF",
                              },
                            },
                            "& .MuiInputBase-input": {
                              fontSize: `${formInputSize}`, // Adjust the font size here
                            },
                            "& .MuiFormHelperText-root": {
                              fontSize: "1.6rem", // Adjust the font size here
                            },
                          }}
                        />

                        <div className="flex  justify-end items-center gap-[1rem] ">
                          <Buttonn
                            size="large"
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={hasErrors() || isFormDataEmpty()}
                            sx={{
                              width: "fit-content",
                              fontSize: "1.7rem",
                              mt: 3,
                              mb: 2,
                              bgcolor: "#7586FF",
                              "&:hover": {
                                bgcolor: "#556cd6",
                              },
                              textTransform: "none",
                            }}
                          >
                            Save
                          </Buttonn>

                          <Buttonn
                            size="large"
                            type="button"
                            fullWidth
                            onClick={cleanForm}
                            variant="outlined"
                            color="error"
                            sx={{
                              width: "fit-content",
                              fontSize: "1.7rem",
                              mt: 3,
                              mb: 2,
                              textTransform: "none",
                            }}
                          >
                            Cancel
                          </Buttonn>
                        </div>
                      </Box>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="font-nunito text-[#2A3547] ">
                  <div className="p-[3rem] rounded-[1.4rem] shadow-custom2 ">
                    <FaceIDRegistration />
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </DashLayout>
    </div>
  );
};

export default DashAdminProfile;
