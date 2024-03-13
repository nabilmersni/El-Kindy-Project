import { useEffect, useState } from "react";

import userService from "../../../features/users/UserService";

function RecentConversation({ chat, currentUserId, online }) {
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    const userId = chat.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const user = await userService.getUserById(userId);
        setUserData(user);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <div className="flex justify-start items-center gap-[1.5rem] ">
        <div className="w-[7rem] h-[7rem] rounded-full ">
          <img
            className="w-full h-full object-cover rounded-full"
            src={userData?.photo_url}
            alt=""
          />
        </div>

        <div className="flex flex-col">
          <p className="text-[2rem] font-bold flex items-center gap-[1rem] ">
            {userData?.fullname}
            <span className="text-[1.5rem] font-normal ">
              {`(${userData?.role})`}
            </span>
          </p>
          <div className="flex items-center gap-[.7rem] ">
            <p className="text-[1.7rem]  ">{online ? "Online" : "Offline"}</p>
            <span
              className={`w-[1rem] h-[1rem] ${
                online ? "bg-green-300" : "bg-red-300"
              }  rounded-full inline-block`}
            ></span>
            {/* <span className="w-[1rem] h-[1rem] bg-green-300 rounded-full inline-block"></span> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentConversation;
