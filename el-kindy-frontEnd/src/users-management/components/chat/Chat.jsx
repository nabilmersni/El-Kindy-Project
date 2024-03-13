import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import chatService from "../../../features/chat/ChatService";
import RecentConversation from "./RecentConversation";
import ChatBox from "./ChatBox/ChatBox";
import { io } from "socket.io-client";
import { setOnlineUsers } from "../../../features/auth/AuthSlice";
import ChatsToAdd from "./ChatsToAdd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  height: "70vh",
  bgcolor: "white",
  boxShadow: 10,
};

function Chat() {
  const { user, onlineUsers, socketId } = useSelector((state) => state.auth);
  const [chats, setChats] = useState([]);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [sendMessage, setSendMessage] = useState(undefined);
  const [receiveMessage, setReceiveMessage] = useState(undefined);

  const dispatch = useDispatch();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8800", { query: { socketId } });
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      dispatch(setOnlineUsers(users));
    });
  }, [user]);

  const getChats = async () => {
    try {
      const chatsFetched = await chatService.userChats(user._id);
      setChats(chatsFetched);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    socket.current.on("get-chats", () => {
      getChats();
    });
  }, []);

  useEffect(() => {
    if (sendMessage) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log("recieve-message", data);
      setReceiveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const closeAddChatModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="h-[95%] ">
      <div className="flex justify-between items-center gap-[3rem] px-[1rem] h-full ">
        <div className="flex bg-[#fcfeff] h-full flex-1 flex-col justify-start items-start rounded-[2rem] shadow-custom2 px-[2rem] py-[1rem] ">
          <div className="flex justify-between items-center mb-[4rem] w-full">
            <h1 className="text-[4rem] font-semibold ">Chats</h1>
            <button
              onClick={() => setOpenModal(true)}
              className="dash__content__container__firstRow__RightSide__addNewCourseBtn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                className="w-3"
              >
                <g>
                  <path
                    d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                    opacity="1"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
          <p className="text-[2rem] font-semibold mb-[2rem] ">
            Recent conversation
          </p>
          <div className="flex flex-col w-full  pr-4 overflow-y-auto">
            {chats.length ? (
              chats.map((chat) => (
                <button
                  onClick={() => setcurrentChat(chat)}
                  key={chat._id}
                  className="flex flex-col"
                >
                  <div className="flex flex-col w-full">
                    <div
                      className={`itemm rounded-[2rem] ${
                        chat?._id === currentChat?._id ? "bg-[#006cbe1e]" : ""
                      } hover:bg-[#006cbe1e] w-full transition-all duration-100 ease-in cursor-pointer p-[1.5rem] `}
                    >
                      <RecentConversation
                        chat={chat}
                        currentUserId={user._id}
                        online={checkOnlineStatus(chat)}
                      />
                    </div>

                    <div className="dividerr self-center w-[50%] h-[.4rem] bg-[#006cbe1e] my-[1.5rem] rounded-full "></div>
                  </div>
                </button>
              ))
            ) : (
              <p className="text-[1.7rem] text-nav  ">
                No recent conversations
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-[2.5] h-full flex-col justify-start items-start rounded-[2rem] shadow-custom4 px-[2rem] py-[2rem] ">
          {currentChat ? (
            <ChatBox
              currentChat={currentChat}
              currentUserId={user._id}
              setSendMessage={setSendMessage}
              receiveMessage={receiveMessage}
              online={checkOnlineStatus(currentChat)}
            />
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <img className="w-[30%] " src="img/speech-bubble.png" alt="" />
              <h1 className="text-[3rem] text-primary">
                Select a converstaion
              </h1>
            </div>
          )}
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={closeAddChatModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            borderRadius: "3rem",
            bgcolor: "white",
            padding: "2rem",
            // overflowY: "scroll",
          }}
        >
          <ChatsToAdd
            currentUserId={user._id}
            chats={chats}
            setChats={setChats}
            closeAddChatModal={closeAddChatModal}
            socketId={socketId}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default Chat;
