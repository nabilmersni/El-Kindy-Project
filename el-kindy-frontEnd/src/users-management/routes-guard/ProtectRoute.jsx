import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { notAuthenticated } from "../../features/auth/AuthSlice";

export function PrivateRoute() {
  const { user, isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!user) {
    // toast.error("You are not authenticated!");
    dispatch(notAuthenticated("You are not authenticated!"));
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export function OnlyAdminRoute() {
  const { user, isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (user.role !== "admin") {
    // toast.error("You are not authenticated as admin!");
    dispatch(notAuthenticated("You are not authenticated as admin!"));
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
