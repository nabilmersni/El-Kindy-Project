import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthService";
import userService from "../users/UserService";
import secureLocalStorage from "react-secure-storage";

// Get user from localStorage
// const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

const loggedUser = secureLocalStorage.getItem("user");

const initialState = {
  user: loggedUser || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// get Logged User
export const getLoggedUser = createAsyncThunk(
  "auth/getLoggedUser",
  async (_, thunkAPI) => {
    try {
      return await authService.getLoggedUser();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// auth Google
export const authGoogle = createAsyncThunk(
  "auth/google",
  async (user, thunkAPI) => {
    try {
      return await authService.authGoogle(user);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// face ID Registration
export const faceIDRegistration = createAsyncThunk(
  "auth/faceIDRegistration",
  async ({ id, user }, thunkAPI) => {
    try {
      return await authService.faceIDRegistration(id, user);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// auth faceID
export const authFaceID = createAsyncThunk(
  "auth/faceID",
  async (user, thunkAPI) => {
    try {
      return await authService.authFaceID(user);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update me
export const updateMe = createAsyncThunk(
  "auth/updateMe",
  async (user, thunkAPI) => {
    try {
      return await userService.updateMe(user);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },

    logout: (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },

    notAuthenticated: (state, action) => {
      state.isError = true;
      state.message = action.payload || "You are not authenticated!";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // getLoggedUser
      .addCase(getLoggedUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoggedUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getLoggedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "";
        state.user = null;
      })
      // authGoogle
      .addCase(authGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(authGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // faceIDRegistration
      .addCase(faceIDRegistration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(faceIDRegistration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(faceIDRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // authFaceID
      .addCase(authFaceID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authFaceID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(authFaceID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // updateMe
      .addCase(updateMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, notAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;
