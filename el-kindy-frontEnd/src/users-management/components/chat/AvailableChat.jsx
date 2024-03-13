function AvailableChat({ userData }) {
  return (
    <div className="flex flex-col items-center">
      <div className="itemm rounded-[2rem] hover:bg-[#006cbe1e] w-full transition-all duration-100 ease-in cursor-pointer p-[1.5rem] ">
        <div className="flex justify-start items-center gap-[1.5rem] ">
          <div className="w-[7rem] h-[7rem] rounded-full ">
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
            <p className="text-[2rem] font-bold ">
              {userData?.fullname || "Nabil Mersni"}
            </p>
            <span className="text-[1.5rem] font-normal ">
              {`(${userData?.role || "admin"})`}
            </span>
          </div>
        </div>
      </div>

      <div className="dividerr self-center w-[80%] h-[.3rem] bg-[#006cbe1e] my-[1.4rem] rounded-full "></div>
    </div>
  );
}

export default AvailableChat;
