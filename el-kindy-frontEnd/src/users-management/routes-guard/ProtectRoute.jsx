import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";
import { notAuthenticated } from "../../features/auth/AuthSlice";

export function PrivateRoute() {
  const { user: loggedUser, message } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // const loggedUser = secureLocalStorage.getItem("user");

  if (!loggedUser) {
    if (message === "logout") {
      toast.success("Logged out successfully", {
        toastId: "Logged successfully",
      });
    } else if (message === "logoutBlocked") {
      toast.error(
        "Your account is locked. please contact the administration.",
        {
          toastId: "account locked",
        }
      );
    } else {
      toast.error("You are not authenticated!", {
        toastId: "not authenticated",
      });
    }
    // dispatch(notAuthenticated("You are not authenticated!"));
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export function OnlyAdminRoute() {
  // const { user, isError, message } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  const loggedUser = secureLocalStorage.getItem("user");

  if (loggedUser.role !== "admin") {
    toast.error("You are not authenticated as admin!", {
      // style: { fontSize: "2rem" },
      toastId: "not authenticated as admin",
    });
    // dispatch(notAuthenticated("You are not authenticated as admin!"));
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export function OnlyTeacherRoute() {
  // const { user, isError, message } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  const loggedUser = secureLocalStorage.getItem("user");

  if (loggedUser.role !== "teacher") {
    toast.error("You are not authenticated as teacher!", {
      // style: { fontSize: "2rem" },
      toastId: "not authenticated as teacher",
    });
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export function UserSideRoutes() {
  const loggedUser = secureLocalStorage.getItem("user");

  if (loggedUser.role === "admin") {
    toast.error("You are authenticated as admin!", {
      style: { fontSize: "2rem" },
      toastId: "authenticated as admin",
    });
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export function PublicRoute() {
  const loggedUser = secureLocalStorage.getItem("user");

  if (!loggedUser) {
    return <Outlet />;
  }

  switch (loggedUser?.role) {
    case "admin":
      return <Navigate to="/admin-dash" />;
    case "user":
      return <Navigate to="/user-side" />;
    case "teacher":
      return <Navigate to="/dash-teacher-availabilities" />;
    default:
      break;
  }
}
