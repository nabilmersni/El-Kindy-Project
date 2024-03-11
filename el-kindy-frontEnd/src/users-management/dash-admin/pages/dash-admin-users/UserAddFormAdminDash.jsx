import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Buttonn from "@mui/material/Button";

import FormControlLabel from "@mui/material/FormControlLabel";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Typography } from "@material-tailwind/react";

import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../auth/firebase";
import Spinner from "../../../../ui/Spinner";
import userService from "../../../../features/users/UserService";

function UserAddFormAdminDash({
  initUpdateFormData,
  initFormError,
  updateFormData,
  errors,
  avatarUpload,
  addNewUser,
  closeAddFormModal,
  dispatchReducer,
}) {
  const formInputSize = "1.9rem";
  const [isUploadingImg, setIsUploadingImg] = useState(false);

  //
  const setAddFormData = (data) =>
    dispatchReducer({ type: "SET_ADD_FORM_DATA", payload: data });
  const setErrors = (errors) =>
    dispatchReducer({ type: "SET_ERRORS", payload: errors });
  const setAvatarUpload = (avatarUpload) =>
    dispatchReducer({ type: "SET_AVATAR_UPLOAD", payload: avatarUpload });

  //

  const addUser = async (data) => {
    try {
      const response = await userService.addUser(data);
      toast.success("User added successfully", {
        style: { fontSize: "2rem" },
      });
      addNewUser(response.data.data.user);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred", {
        style: { fontSize: "2rem" },
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hasErrors() && !isFormDataEmpty()) {
      console.log("start handleSubmit");

      if (avatarUpload) {
        console.log("start avatarUpload", avatarUpload);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + avatarUpload.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, avatarUpload);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setIsUploadingImg(true);
            // const progress =
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // // setImagePercent(Math.round(progress));
          },
          (error) => {
            setAvatarUpload(undefined);
            toast.error(error);
            // setImageError(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setAddFormData({ ...updateFormData, photo_url: downloadURL });
              setIsUploadingImg(false);
              addUser({ ...updateFormData, photo_url: downloadURL });
              closeAddFormModal();
            });
          }
        );
      } else {
        addUser(updateFormData);
        closeAddFormModal();
      }
    }
  };

  const cleanForm = () => {
    setAddFormData(initUpdateFormData);
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
    const newErrors = { ...errors };
    setAddFormData({ ...updateFormData, [name]: value });

    // Validation for Fullname
    if (name === "fullname") {
      if (!value.trim()) {
        newErrors[name] = "Fullname is required";
      } else if (value.length < 3) {
        newErrors[name] = "Fullname must be at least 3 characters long";
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        newErrors[name] = "Only letters are allowed";
      } else {
        newErrors[name] = "";
      }

      setErrors(newErrors);
    }

    // Validation for Date of Birth
    if (name === "dateOfBirth") {
      if (!value.trim()) {
        newErrors[name] = "Date of birth is required";
      } else {
        const currentDate = new Date();
        const inputDate = new Date(value);
        const minDate = new Date(
          currentDate.getFullYear() - 5,
          currentDate.getMonth(),
          currentDate.getDate()
        );

        if (inputDate > currentDate || inputDate > minDate) {
          newErrors[name] =
            "Invalid date of birth. Must be at least 5 years old.";
        } else {
          newErrors[name] = "";
        }
      }

      setErrors(newErrors);
    }

    // Validation for Email
    if (name === "email") {
      if (!value.trim()) {
        newErrors[name] = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors[name] = "Invalid email format";
      } else {
        newErrors[name] = "";
      }

      setErrors(newErrors);
    }

    // Validation for Phone Number 1
    if (name === "phone") {
      if (!value.trim()) {
        newErrors[name] = "Phone number is required";
      } else if (!/^\d{8}$/.test(value)) {
        newErrors[name] = "Invalid phone number format. Must be 8 digits";
      } else {
        newErrors[name] = "";
      }

      setErrors(newErrors);
    }

    // Validation for Phone Number 2
    if (name === "phone2") {
      if (value && !/^\d{8}$/.test(value)) {
        newErrors[name] = "Invalid phone number format. Must be 8 digits";
      } else {
        newErrors[name] = "";
      }

      setErrors(newErrors);
    }

    // Validation for Profession
    if (name === "profession") {
      if (!value.trim()) {
        newErrors[name] = "Profession is required";
      } else if (value.trim().length < 3) {
        newErrors[name] = "Profession must be at least 3 characters";
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        newErrors[name] = "Only letters are allowed";
      } else {
        newErrors[name] = "";
      }

      setErrors(newErrors);
    }

    // Validation for Password
    if (name === "password") {
      if (!value.trim()) {
        newErrors[name] = "Password is required";
      } else if (value.trim().length < 8) {
        newErrors[name] = "Password must be at least 8 characters";
      } else if (
        updateFormData.confirmPassword &&
        value !== updateFormData.confirmPassword
      ) {
        newErrors[name] = "";
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        newErrors[name] = "";
        newErrors.confirmPassword = "";
      }

      setErrors(newErrors);
    }

    // Validation for Confirm Password
    if (name === "confirmPassword") {
      if (!value.trim()) {
        newErrors[name] = "Confirm Password is required";
      } else if (value !== updateFormData.password) {
        newErrors[name] = "Passwords do not match";
      } else {
        newErrors[name] = "";
      }

      setErrors(newErrors);
    }

    // Validation for Role
    if (name === "role") {
      if (!["user", "teacher"].includes(value)) {
        newErrors[name] = "Hello little hacker 👩‍💻";
      } else {
        newErrors[name] = "";
      }

      setErrors(newErrors);
    }
  };

  return (
    <div className="flex flex-col w-full   ">
      {isUploadingImg ? <Spinner /> : ""}
      <h1 className="font-semibold text-[2.7rem] ">Personal Details</h1>
      <p className="text-[1.7rem] mb-[2rem] ">
        Add your personal detail and save it from here
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
                borderColor: errors.fullname ? "red" : "#DBDFEA",
              },
              "&:hover fieldset": {
                borderColor: errors.fullname ? "red" : "#7586FF",
              },
              "&.Mui-focused fieldset": {
                fontSize: `${formInputSize}`,
                borderColor: errors.fullname ? "red" : "#7586FF",
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
          value={updateFormData.email || ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: `${formInputSize}`,

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
              fontSize: `${formInputSize}`,
              "&.Mui-focused": {
                color: errors.email ? "red" : "#7586FF",
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
            value={updateFormData.password || ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: `${formInputSize}`,

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
                fontSize: `${formInputSize}`,

                "&.Mui-focused": {
                  color: errors.password ? "red" : "#7586FF",
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
            type="password"
            id="repassword"
            label="Confirm Password"
            name="confirmPassword"
            onChange={changeHandler}
            onBlur={changeHandler}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            value={updateFormData.confirmPassword || ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: `${formInputSize}`,
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
                fontSize: `${formInputSize}`,
                "&.Mui-focused": {
                  color: errors.confirmPassword ? "red" : "#7586FF",
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

        <FormControl margin="dense" sx={{ fontSize: `${formInputSize}` }}>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            required
            sx={{
              color: "#7586FF",
              fontSize: `${formInputSize}`,
              marginBottom: ".8rem",
            }}
          >
            Role
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="role"
            onChange={changeHandler}
            defaultValue={"user"}
            value={updateFormData.role || "user"}
            sx={{ fontSize: `${formInputSize}` }}
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
                    "& .MuiSvgIcon-root": {
                      fontSize: `${formInputSize}`,
                    },
                  }}
                />
              }
              label="Student"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: `${formInputSize}`,
                },
              }}
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
                    "& .MuiSvgIcon-root": {
                      fontSize: `${formInputSize}`,
                    },
                  }}
                />
              }
              label="Teacher"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: `${formInputSize}`,
                },
              }}
            />
          </RadioGroup>
          {errors.role && (
            <Typography variant="paragraph" color="red">
              {errors.role}
            </Typography>
          )}
        </FormControl>

        <div className="flex  justify-center items-center gap-[1.5rem] ">
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
  );
}

export default UserAddFormAdminDash;
