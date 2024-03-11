import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";
import { notAuthenticated } from "../../features/auth/AuthSlice";

export function PrivateRoute() {
  // const { user, isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loggedUser = secureLocalStorage.getItem("user");

  if (!loggedUser) {
    toast.error("You are not authenticated!");
    // dispatch(notAuthenticated("You are not authenticated!"));
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export function OnlyAdminRoute() {
  // const { user, isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loggedUser = secureLocalStorage.getItem("user");

  if (loggedUser.role !== "admin") {
    toast.error("You are not authenticated as admin!", {
      style: { fontSize: "2rem" },
    });
    // dispatch(notAuthenticated("You are not authenticated as admin!"));
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
      return <Navigate to="/user-dash" />;
    case "teacher":
      return <Navigate to="/user-dash" />;
    default:
      break;
  }
}
