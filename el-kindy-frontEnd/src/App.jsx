import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLoggedUser, reset } from "./features/auth/AuthSlice";

import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import DashAdminCourses from "./courses-management/dash-admin/pages/dash-admin-courses";
import DashAdminAddNewCourse from "./courses-management/dash-admin/pages/dash-admin-add-new-course";
import DashQuizesList from "./quizes-management/dash/pages/dash-quizes-list";
import DashAdminAddNewQuiz from "./quizes-management/dash/pages/dash-add-new-quiz";
import DashQuestionsList from "./quizes-management/dash/pages/dash-questions-list";
import DashAdminUsers from "./users-management/dash-admin/pages/dash-admin-users";
import { useEffect } from "react";
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
import AvatarBuilder from "./users-management/components/avatar-builder/AvatarBuilder";

function App() {
  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getLoggedUser());
    // dispatch(reset());
    const loggedUser = secureLocalStorage.getItem("user");
    console.log(loggedUser);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<AvatarBuilder />} />

        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/user-dash" element={<UserDashboard />} />

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
            {/*----------------End admin dash courses  ---------------*/}

            {/* ---------------admin dash Quizes  -----------------*/}
            <Route path="/dash-admin-quizes" element={<DashQuizesList />} />
            <Route
              path="/dash-admin-add-new-quiz"
              element={<DashAdminAddNewQuiz />}
            />

            <Route
              path="/dash-admin-questions/:id"
              element={<DashQuestionsList />}
            />
            {/* </Route> */}

            {/*----------------End admin dash Quizes  ---------------*/}
          </Route>
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
