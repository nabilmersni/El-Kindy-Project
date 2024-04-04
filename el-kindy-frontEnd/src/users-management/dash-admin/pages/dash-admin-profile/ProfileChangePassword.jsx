import { useReducer, useState } from "react";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import authService from "../../../../features/auth/AuthService";
import Spinner from "../../../../ui/Spinner";

function ProfileChangePassword({ small }) {
  const formInputSize = "1.9rem";

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_FORM_DATA":
        return { ...state, formData: action.payload };
      case "SET_ERRORS":
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };

  const initFormData = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const initFormError = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const initialState = {
    formData: initFormData,
    errors: initFormError,
  };

  const [{ formData, errors }, dispatchReducer] = useReducer(
    reducer,
    initialState
  );

  const [isLoading, setIsLoading] = useState(false);

  const setFormData = (data) =>
    dispatchReducer({ type: "SET_FORM_DATA", payload: data });
  const setErrors = (errors) =>
    dispatchReducer({ type: "SET_ERRORS", payload: errors });

  const cleanForm = () => {
    setFormData(initFormData);
    setErrors(initFormError);
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  const isFormDataEmpty = () => {
    return Object.entries(formData).some(([key, value]) => value === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!hasErrors() && !isFormDataEmpty()) {
      try {
        await authService.changePassword(formData);
        small
          ? toast.success("Password changed successfully")
          : toast.success("Password changed successfully", {
              style: {
                fontSize: "2rem",
              },
            });
      } catch (error) {
        small
          ? toast.error(error.response.data.message || "An error occurred")
          : toast.error(error.response.data.message || "An error occurred", {
              style: {
                fontSize: "2rem",
              },
            });
      }
    }
    setIsLoading(false);
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };
    setFormData({ ...formData, [name]: value });

    // Validation for oldPassword
    if (name === "oldPassword") {
      if (!value.trim()) {
        newErrors[name] = "Old Password is required";
      } else if (value.length < 8) {
        newErrors[name] = "Old Password must be at least 8 characters";
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
        formData.confirmPassword &&
        value !== formData.confirmPassword
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
      } else if (value !== formData.password) {
        newErrors[name] = "Passwords do not match";
      } else {
        newErrors[name] = "";
      }

      setErrors(newErrors);
    }
  };

  return (
    <div
      className={`flex-1 p-[2rem] rounded-[2rem] shadow-custom2 border-[#006cbe16] ${
        small ? "border-[.2rem]" : "border-[.5rem]"
      }`}
    >
      {isLoading ? <Spinner /> : ""}
      <h1
        className={`font-semibold ${
          small ? "text-[1.5rem] md:text-[1.65rem]" : "text-[2.7rem]"
        }`}
      >
        Change Password
      </h1>
      <p
        className={` ${
          small
            ? "text-[.8rem] md:text-[.95rem] mb-[1rem]"
            : "text-[1.7rem] mb-[2rem]"
        }`}
      >
        Change your password and save it from here
      </p>

      {small ? (
        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          {/* <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-4"> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="oldPassword"
            label="Old Password"
            type="password"
            name="oldPassword"
            onChange={changeHandler}
            onBlur={changeHandler}
            error={Boolean(errors.oldPassword)}
            helperText={errors.oldPassword}
            value={formData.oldPassword || ""}
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
              "& .MuiInputBase-input": {
                // Adjust the font size here
              },
              "& .MuiFormHelperText-root": {
                // Adjust the font size here
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
            value={formData.password || ""}
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
              "& .MuiInputBase-input": {
                // Adjust the font size here
              },
              "& .MuiFormHelperText-root": {
                // Adjust the font size here
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
            value={formData.confirmPassword || ""}
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
              "& .MuiInputBase-input": {
                // Adjust the font size here
              },
              "& .MuiFormHelperText-root": {
                // Adjust the font size here
              },
            }}
          />
          {/* </div> */}

          <div className="flex  justify-center items-center gap-[1.5rem] ">
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
                  : "text-[2rem] "
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
          sx={{ mt: 1, overflowY: "auto", height: "37vh", pr: "2rem" }}
        >
          {/* <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-4"> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="oldPassword"
            label="Old Password"
            type="password"
            name="oldPassword"
            onChange={changeHandler}
            onBlur={changeHandler}
            error={Boolean(errors.oldPassword)}
            helperText={errors.oldPassword}
            value={formData.oldPassword || ""}
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
            id="password"
            label="Password"
            type="password"
            name="password"
            onChange={changeHandler}
            onBlur={changeHandler}
            error={Boolean(errors.password)}
            helperText={errors.password}
            value={formData.password || ""}
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
            value={formData.confirmPassword || ""}
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
          {/* </div> */}

          <div className="flex  justify-center items-center gap-[1.5rem] ">
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
                  : "text-[2rem] "
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

export default ProfileChangePassword;
