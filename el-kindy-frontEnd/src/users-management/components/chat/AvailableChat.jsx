function AvailableChat({ userData, small }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`itemm hover:bg-[#006cbe1e] w-full transition-all duration-100 ease-in cursor-pointer ${
          small ? "p-[1rem] rounded-[1.1rem]" : "p-[1.5rem] rounded-[2rem]"
        } `}
      >
        <div className="flex justify-start items-center gap-[1.5rem] ">
          <div
            className={`${
              small ? "w-[4rem] h-[4rem]" : "w-[7rem] h-[7rem]"
            } rounded-full `}
          >
            <img
              className="w-full h-full object-cover rounded-full"
              src={
                userData?.photo_url ||
                "https://firebasestorage.googleapis.com/v0/b/el-kindy-auth.appspot.com/o/1710077830929avatar.png?alt=media&token=374c123f-5bb3-44b9-96b4-3b22d1de45a4"
              }
              alt=""
            />
          </div>

          <div className="flex flex-col">
            <p
              className={`${
                small ? "text-[1.1rem]" : "text-[2rem]"
              } font-bold `}
            >
              {userData?.fullname || "Nabil Mersni"}
            </p>
            <span
              className={`${
                small ? "text-[.9rem]" : "text-[1.5rem]"
              } font-normal `}
            >
              {`(${userData?.role || "admin"})`}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`dividerr self-center bg-[#006cbe1e] rounded-full ${
          small
            ? "w-[80%] h-[.2rem] my-[.8rem]"
            : "w-[80%] h-[.3rem] my-[1.4rem]"
        }`}
      ></div>
    </div>
  );
}

export default AvailableChat;
