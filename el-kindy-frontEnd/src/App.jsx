import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setOnlineUsers,
  logout,
  reset,
  getLoggedUser,
} from "./features/auth/AuthSlice";

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
import { useEffect, useContext } from "react";
import SignUp from "./users-management/auth/SignUp";
import Login from "./users-management/auth/Login";
import {
  OnlyAdminRoute,
  PrivateRoute,
  PublicRoute,
  UserSideRoutes,
} from "./users-management/routes-guard/ProtectRoute";
import UserDashboard from "./pages/UserDashboard";
import secureLocalStorage from "react-secure-storage";
import DashAdminProfile from "./users-management/dash-admin/pages/dash-admin-profile/dash-admin-profile";
import VerifyEmail from "./users-management/components/VerifyEmail";
import ForgotPasswordRequest from "./users-management/auth/forgot-password/ForgotPasswordRequest";
import ForgotPassword from "./users-management/auth/forgot-password/ForgotPassword";
import DashAdminChat from "./users-management/dash-admin/pages/dashAdminChat";
import authService from "./features/auth/AuthService";
import DashQuestionListHeader from "./quizes-management/dash/ui/dash-questions-list-header";
import DashupdateQuiz from "./quizes-management/dash/pages/DashupdateQuiz";
import UpdateQuestion from "./quizes-management/dash/ui/update-question";
import DashAddNewQuestion from "./quizes-management/dash/pages/dash-add-new-question";
import KaraokiPage from "./users-management/user-side/pages/KaraokiPage";
import ChatPage from "./users-management/user-side/pages/ChatPage";
import AccountSettingsPage from "./users-management/user-side/pages/AccountSettingsPage";
import SocketContext from "./features/context/SocketContext";
import GamesPage from "./users-management/user-side/pages/GamesPage";
import NotFound from "./ui/NotFound";
import QuizDetailsFront from "./quizes-management/front/ui/quiz-details-front";
import QuizListFront from "./quizes-management/front/ui/quiz-list-front";

function App() {
  // const { user } = useSelector((state) => state.auth);
  // const socketContext = useContext(SocketContext);
  const loggedUser = secureLocalStorage.getItem("user");
  const dispatch = useDispatch();

  const getRefreshedUser = async () => {
    if (loggedUser) {
      try {
        const refreshedUser = await authService.getLoggedUser();
        // console.log("refreshedUser", refreshedUser);
        secureLocalStorage.setItem("user", refreshedUser);
        dispatch(getLoggedUser(refreshedUser));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getRefreshedUser();
  }, []);

  // useEffect(() => {
  //   if (loggedUser && socketContext.current) {
  //     socketContext.current.on("logOutBlockedUser", (blockedUserId) => {
  //       if (loggedUser._id === blockedUserId) {
  //         console.log("heyyyy call socket");
  //         logoutHandler();
  //       }
  //     });
  //   }
  // }, [user, socketContext.current]);

  // const logoutHandler = async () => {
  //   if (loggedUser && socketContext.current) {
  //     await authService.logout();
  //     socketContext.current.emit("loggedOut", user._id);
  //     socketContext.current.on("get-users", (users) => {
  //       dispatch(setOnlineUsers([users]));
  //     });

  //     dispatch(logout("logoutBlocked"));
  //   }
  // };

  return (
    <BrowserRouter>
      <Routes>
        {/*  */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/forgotPasswordRequest"
            element={<ForgotPasswordRequest />}
          />
          <Route path="/forgotPassword/:token" element={<ForgotPassword />} />
        </Route>
        {/*  */}
        <Route element={<PrivateRoute />}>
          <Route element={<UserSideRoutes />}>
            <Route path="/user-side" element={<UserDashboard />} />

            {/* ---------------START user routes-----------------*/}
            <Route path="/user-side/karaoke" element={<KaraokiPage />} />
            <Route path="/user-side/chat" element={<ChatPage />} />
            <Route
              path="/user-side/account"
              element={<AccountSettingsPage />}
            />
            <Route path="/user-side/games" element={<GamesPage />} />
            {/* ---------------END user routes-----------------*/}
            <Route
              path="/quiz-list-front/quizzes/:userId/"
              element={<QuizListFront />}
            />
            <Route
              path="/quiz-details-front/:userId/:quizId"
              element={<QuizDetailsFront />}
            />
          </Route>

          {/*  */}
          <Route element={<OnlyAdminRoute />}>
            <Route path="/admin-dash" element={<AdminDashboard />} />

            {/* ---------------admin dash users  -----------------*/}
            <Route path="/dash-admin-users" element={<DashAdminUsers />} />
            <Route path="/dash-admin-profile" element={<DashAdminProfile />} />
            <Route path="/dash-admin-chat" element={<DashAdminChat />} />
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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
