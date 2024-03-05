import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import DashAdminCourses from "./courses-management/dash-admin/pages/dash-admin-courses";
import DashAdminAddNewCourse from "./courses-management/dash-admin/pages/dash-admin-add-new-course";
import DashQuizesList from "./quizes-management/dash/pages/dash-quizes-list";
import DashAdminAddNewQuiz from "./quizes-management/dash/pages/dash-add-new-quiz";
import DashQuestionsList from "./quizes-management/dash/pages/dash-questions-list";
import AdminDashAddEvent from "./Event-Management/Dash-Admin/ui/AdminDashAddEventCard";
import DashAdminEvents from "./Event-Management/Dash-Admin/pages/dashAdminEvents";
import DashAdminAddNewEvent from "./Event-Management/Dash-Admin/pages/dashAdminAddNewEvent";
import DashAdminUpdateEvent from "./Event-Management/Dash-Admin/pages/dashAdminUpdateEvent";
import EventDetailsCard from "./Event-Management/Dash-Admin/ui/eventDetails";

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
        {/*----------------End admin dash Events  ---------------*/}



        <Route
          path="/dash-admin-add-new-event"
          element={<DashAdminAddNewEvent />}
        />

        <Route
          path="/event-details/:id"
          element={<EventDetailsCard />}
        />
        <Route
          path="/dash-admin-Update-new-event/:id"
          element={<DashAdminUpdateEvent />}
        />

        <Route path="/dash-admin-events" element={<DashAdminEvents />} />



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

        {/*----------------End admin dash Quizes  ---------------*/}

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
