import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import authService from "../../features/auth/AuthService";
import Spinner from "../../ui/Spinner";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      await authService.verifyEmail({ token });
      toast.success("Email verified successfully");
    } catch (error) {
      if (error.response.data.message === "Email is already verified")
        toast.warning(error.response.data.message || "An error occurred");
      else toast.error(error.response.data.message || "An error occurred");
    }
  };
  useEffect(() => {
    verifyEmail();
    navigate("/login");
  }, []);
  return (
    <div>
      <Spinner />
    </div>
  );
}

export default VerifyEmail;
