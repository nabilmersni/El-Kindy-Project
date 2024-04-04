import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../auth/firebase";

import { updateMe } from "../../../../features/auth/AuthSlice";
import { useState } from "react";
import Spinner from "../../../../ui/Spinner";
import { Button } from "@material-tailwind/react";

function ProfileUpdateForm({
  initUpdateFormData,
  initFormError,
  updateFormData,
  errors,
  dispatchReducer,
  avatarUpload,
  small,
}) {
  const formInputSize = "1.9rem";
  const dispatch = useDispatch();
  const [isUploadingImg, setIsUploadingImg] = useState(false);

  //
  const setUpdateFormData = (data) =>
    dispatchReducer({ type: "SET_UPDATE_FORM_DATA", payload: data });
  const setErrors = (errors) =>
    dispatchReducer({ type: "SET_ERRORS", payload: errors });
  const setAvatarUpload = (avatarUpload) =>
    dispatchReducer({ type: "SET_AVATAR_UPLOAD", payload: avatarUpload });
  //
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
              setUpdateFormData({ ...updateFormData, photo_url: downloadURL });
              setIsUploadingImg(false);
              dispatch(updateMe({ ...updateFormData, photo_url: downloadURL }));
            });
          }
        );
      } else {
        console.log("start handleSubmit else");
        dispatch(updateMe(updateFormData));
      }
    }
  };

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
    const newErrors = { ...errors };
    setUpdateFormData({ ...updateFormData, [name]: value });

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
  };

  return (
    <div
      className={`flex flex-[3]  flex-col w-full p-[1.5rem] shadow-custom3 rounded-[1.5rem] ${
        small ? "border-[.2rem] border-[#006cbe20]" : ""
      }`}
    >
      {isUploadingImg ? <Spinner /> : ""}
      <h1
        className={`font-semibold ${
          small ? "text-[1.5rem] md:text-[1.65rem]" : "text-[2.7rem]"
        }`}
      >
        Personal Details
      </h1>
      <p
        className={`mb-[2rem] ${
          small ? "text-[.8rem] md:text-[.95rem]" : "text-[1.7rem]"
        }`}
      >
        To change your personal detail , edit and save from here
      </p>

      {small ? (
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
            value={updateFormData.dateOfBirth || ""}
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
              value={updateFormData.phone2 || ""}
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
            value={updateFormData.profession || ""}
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

          <div className="flex  justify-end items-center gap-[1rem] ">
            <Button
              type="submit"
              variant="text"
              disabled={hasErrors() || isFormDataEmpty()}
              size="md"
              className={`bg-lightBlue text-nav hover:text-[#fff] font-extrabold font-nunito rounded-[.8rem] hover:bg-[#5fa7ff] capitalize ${
                small
                  ? "text-[.9rem] md:text-[1rem] my-0 md:my-[1rem]"
                  : "text-[2rem] my-[2rem]"
              }`}
            >
              Save
            </Button>

            <Button
              onClick={cleanForm}
              variant="outlined"
              size="md"
              className={`border-[#FA896B] text-[#FA896B] hover:text-[#ff6136] focus:ring-0 font-extrabold font-nunito rounded-[.8rem] hover:bg-secondaryLight capitalize ${
                small
                  ? "text-[.9rem] md:text-[1rem] my-0 md:my-[1rem]"
                  : "text-[2rem] mb-[2rem]"
              }`}
            >
              Reset
            </Button>
          </div>
        </Box>
      ) : (
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

          <div className="flex  justify-end items-center gap-[1rem] ">
            {/* <Buttonn
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
            </Buttonn> */}

            <Button
              type="submit"
              variant="text"
              disabled={hasErrors() || isFormDataEmpty()}
              size="lg"
              className={`bg-lightBlue text-nav hover:text-[#fff] font-bold font-nunito rounded-[.8rem] hover:bg-[#5fa7ff] capitalize ${
                small
                  ? "text-[.9rem] md:text-[1rem] my-0 md:my-[1rem]"
                  : "text-[1.9rem] my-[2rem]"
              }`}
            >
              Save
            </Button>

            <Button
              onClick={cleanForm}
              variant="outlined"
              size="lg"
              className={`border-[#FA896B] text-[#FA896B] hover:text-[#ff6136] focus:ring-0 font-bold font-nunito rounded-[.8rem] hover:bg-secondaryLight capitalize ${
                small
                  ? "text-[.9rem] md:text-[1rem] my-0 md:my-[1rem]"
                  : "text-[1.9rem] "
              }`}
            >
              Reset
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
}

export default ProfileUpdateForm;
