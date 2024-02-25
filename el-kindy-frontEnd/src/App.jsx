import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import DashAdminCourses from "./courses-management/dash-admin/pages/dash-admin-courses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-dash" element={<AdminDashboard />} />
        <Route path="/dash-admin-courses" element={<DashAdminCourses />} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
