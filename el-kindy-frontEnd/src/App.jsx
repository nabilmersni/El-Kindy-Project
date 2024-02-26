import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import DashAdminCourses from "./courses-management/dash-admin/pages/dash-admin-courses";
import DashAdminAddNewCourse from "./courses-management/dash-admin/pages/dash-admin-add-new-course";
import DashQuizesList from "./quizes-management/dash/pages/dash-quizes-list";
import DashAdminAddNewQuiz from "./quizes-management/dash/pages/dash-add-new-quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-dash" element={<AdminDashboard />} />

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

        {/*----------------End admin dash Quizes  ---------------*/}

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
