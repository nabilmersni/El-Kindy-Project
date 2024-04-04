import { useEffect, useState } from "react";

import userService from "../../../features/users/UserService";

function RecentConversation({ chat, currentUserId, online, small }) {
  const [userData, setUserData] = useState(undefined);

  // useEffect(() => {
  //   const userId = chat.members.find((id) => id !== currentUserId);
  //   const getUserData = async () => {
  //     try {
  //       const user = await userService.getUserById(userId);
  //       setUserData(user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getUserData();
  // }, []);

  useEffect(() => {
    const otherMember = chat.members.find(
      (member) => member.user !== currentUserId
    );
    if (otherMember) {
      const userId = otherMember.user;
      const getUserData = async () => {
        try {
          const user = await userService.getUserById(userId);
          setUserData(user);
        } catch (error) {
          console.log(error);
        }
      };

      getUserData();
    }
  }, [chat, currentUserId]);

  return (
    <>
      <div
        className={`flex justify-start items-center ${
          small ? "gap-[1rem] min-w-[16rem] " : "gap-[1.5rem]"
        } `}
      >
        <div
          className={
            small
              ? "w-[4rem] h-[4rem] rounded-full "
              : "w-[7rem] h-[7rem] rounded-full "
          }
        >
          <img
            className="w-full h-full object-cover rounded-full"
            src={userData?.photo_url}
            alt=""
          />
        </div>

        <div className="flex flex-col">
          <p
            className={`${
              small ? "text-[1rem] gap-[.4rem]" : "text-[2rem] gap-[1rem]"
            } font-bold flex items-center  `}
          >
            {userData?.fullname}
            <span
              className={`${
                small ? "text-[.8rem]" : "text-[1.5rem]"
              }  font-normal`}
            >
              {`(${userData?.role})`}
            </span>
          </p>
          <div className="flex items-center gap-[.7rem] ">
            <p className={`${small ? "text-[.9rem]" : "text-[1.7rem]"}`}>
              {online ? "Online" : "Offline"}
            </p>
            <span
              className={`${
                small ? "w-[.5rem] h-[.5rem]" : "w-[1rem] h-[1rem]"
              } ${
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
