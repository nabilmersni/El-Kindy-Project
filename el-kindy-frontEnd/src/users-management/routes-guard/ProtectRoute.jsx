import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { notAuthenticated } from "../../features/auth/AuthSlice";
import secureLocalStorage from "react-secure-storage";

export function PrivateRoute() {
  // const { user, isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loggedUser = secureLocalStorage.getItem("user");

  if (!loggedUser) {
    // toast.error("You are not authenticated!");
    dispatch(notAuthenticated("You are not authenticated!"));
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export function OnlyAdminRoute() {
  // const { user, isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loggedUser = secureLocalStorage.getItem("user");

  if (loggedUser.role !== "admin") {
    // toast.error("You are not authenticated as admin!");
    dispatch(notAuthenticated("You are not authenticated as admin!"));
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
