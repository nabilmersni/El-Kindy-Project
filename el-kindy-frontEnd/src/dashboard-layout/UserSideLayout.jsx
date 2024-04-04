import { useSelector } from "react-redux";
import UserSideNavBar from "./UserSideNavBar";

import Spinner from "../ui/Spinner";

function UserSideLayout({ children }) {
  const { isLoading } = useSelector((state) => state.auth);
  const customStyle = `
  body{
    // background-color: #f1f9ff;
    background-color: #f5fbff;
    // background-color: white;
  }
  ::-webkit-scrollbar {
    width: .55rem;
    border-radius: 8rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #4090f1;
    border-radius: 8rem;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 108, 190, 0.18);
    border-radius: 8rem;

  }
`;

  return (
    <div className="p-4">
      <style dangerouslySetInnerHTML={{ __html: customStyle }} />
      {isLoading ? <Spinner /> : ""}
      <UserSideNavBar />

      <div className="container mx-auto w-auto mt-[10rem] px- osverflow-y-scroll h-full">
        {children}
      </div>
    </div>
  );
}

export default UserSideLayout;
