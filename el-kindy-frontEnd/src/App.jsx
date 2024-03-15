import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSocket, setOnlineUsers, logout } from "./features/auth/AuthSlice";

import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import DashAdminCourses from "./courses-management/dash-admin/pages/dash-admin-courses";
import DashAdminUpdateCourse from "./courses-management/dash-admin/pages/dash-admin-update-course";
import DashAdminAddNewCourse from "./courses-management/dash-admin/pages/dash-admin-add-new-course";
import DashQuizesList from "./quizes-management/dash/pages/dash-quizes-list";
import DashAdminAddNewQuiz from "./quizes-management/dash/pages/dash-add-new-quiz";
import DashQuestionsList from "./quizes-management/dash/pages/dash-questions-list";
import DashAdminUsers from "./users-management/dash-admin/pages/dash-admin-users/dash-admin-users";
import { useEffect, useRef } from "react";
import SignUp from "./users-management/auth/SignUp";
import Login from "./users-management/auth/Login";
import {
  OnlyAdminRoute,
  PrivateRoute,
  PublicRoute,
} from "./users-management/routes-guard/ProtectRoute";
import UserDashboard from "./pages/UserDashboard";
import secureLocalStorage from "react-secure-storage";
import DashAdminProfile from "./users-management/dash-admin/pages/dash-admin-profile/dash-admin-profile";
import VerifyEmail from "./users-management/components/VerifyEmail";
import ForgotPasswordRequest from "./users-management/auth/forgot-password/ForgotPasswordRequest";
import ForgotPassword from "./users-management/auth/forgot-password/ForgotPassword";
import DashAdminChat from "./users-management/dash-admin/pages/dashAdminChat";
import { io } from "socket.io-client";
import authService from "./features/auth/AuthService";
import DashQuestionListHeader from "./quizes-management/dash/ui/dash-questions-list-header";
import DashupdateQuiz from "./quizes-management/dash/pages/DashupdateQuiz";
import UpdateQuestion from "./quizes-management/dash/ui/update-question";
import DashAddNewQuestion from "./quizes-management/dash/pages/dash-add-new-question";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loggedUser = secureLocalStorage.getItem("user");
  const currentSocket = useRef();

  useEffect(() => {
    // dispatch(getLoggedUser());
    // dispatch(reset());
    console.log(loggedUser);
    // socket init
    if (loggedUser) {
      currentSocket.current = io("ws://localhost:8800");
      currentSocket.current.on("connect", () => {
        dispatch(setSocket(currentSocket.current.id));
        currentSocket.current.emit("new-user-add", loggedUser._id);
        currentSocket.current.on("get-users", (users) => {
          dispatch(setOnlineUsers(users));
        });
      });
    }
  }, [user]);

  useEffect(() => {
    if (loggedUser) {
      currentSocket.current.on("logOutBlockedUser", (blockedUserId) => {
        if (loggedUser._id === blockedUserId) {
          console.log("heyyyy call socket");
          logoutHandler();
        }
      });
    }
  }, [user]);

  const logoutHandler = async () => {
    if (loggedUser) {
      await authService.logout();
      currentSocket.current.emit("loggedOut", user._id);
      currentSocket.current.on("get-users", (users) => {
        dispatch(setOnlineUsers([users]));
      });

      dispatch(logout("logoutBlocked"));
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />

        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/forgotPasswordRequest"
            element={<ForgotPasswordRequest />}
          />
          <Route path="/forgotPassword/:token" element={<ForgotPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/user-dash" element={<UserDashboard />} />

          <Route path="/dash-admin-chat" element={<DashAdminChat />} />

          <Route element={<OnlyAdminRoute />}>
            <Route path="/admin-dash" element={<AdminDashboard />} />

            {/* ---------------admin dash users  -----------------*/}
            <Route path="/dash-admin-users" element={<DashAdminUsers />} />
            <Route path="/dash-admin-profile" element={<DashAdminProfile />} />
            {/*----------------End admin dash users  ---------------*/}

            {/* ---------------admin dash courses  -----------------*/}
            <Route path="/dash-admin-courses" element={<DashAdminCourses />} />
            <Route
              path="/dash-admin-add-new-course"
              element={<DashAdminAddNewCourse />}
            />
            <Route
              path="/dash-admin-update-course/:id"
              element={<DashAdminUpdateCourse />}
            />
            {/*----------------End admin dash courses  ---------------*/}

            {/* ---------------admin dash Quizes  -----------------*/}
            <Route path="/dash-admin-quizes" element={<DashQuizesList />} />
            <Route
              path="/dash-admin-add-new-quiz"
              element={<DashAdminAddNewQuiz />}
            />
            <Route
              path="/dash-admin-questions/:id/questions"
              element={<DashQuestionsList />}
            />
            <Route path="/dash-admin-quizes/:id" element={<DashupdateQuiz />} />

            <Route
              path="/dash-admin-questions/:quizId/questions"
              element={<DashQuestionListHeader />}
            />

            <Route
              path="/dash-add-new-question/:quizId/questions"
              element={<DashAddNewQuestion />}
            />
            <Route
              path="/dash-admin-questions/:quizId/questions"
              element={<UpdateQuestion />}
            />

            {/*----------------End admin dash Quizes  ---------------*/}
          </Route>
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
