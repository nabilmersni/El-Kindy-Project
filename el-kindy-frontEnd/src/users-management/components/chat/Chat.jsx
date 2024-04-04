import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import chatService from "../../../features/chat/ChatService";
import RecentConversation from "./RecentConversation";
import ChatBox from "./ChatBox/ChatBox";
import {
  setOnlineUsers,
  setUnseenMsgCount,
} from "../../../features/auth/AuthSlice";
import ChatsToAdd from "./ChatsToAdd";
import SocketContext from "../../../features/context/SocketContext";

function Chat({ small }) {
  const { user, onlineUsers, unseenMsgCount } = useSelector(
    (state) => state.auth
  );
  const [chats, setChats] = useState([]);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [sendMessage, setSendMessage] = useState(undefined);
  const [receiveMessage, setReceiveMessage] = useState(undefined);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: `${small ? "90vw" : "30vw"}`,

    width: "100%",
    height: "70vh",
    bgcolor: "white",
    boxShadow: 10,
  };

  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.emit("new-user-add", user._id);
  //     socket.current.on("get-users", (users) => {
  //       dispatch(setOnlineUsers(users));
  //     });
  //   }
  // }, [socket.current]);

  const countUnseenChats = async () => {
    try {
      const unseenChatsCount = await chatService.unseenChatsCount(user._id);
      console.log("unseenChatsCountunseenChatsCount", unseenChatsCount);
      dispatch(setUnseenMsgCount(unseenChatsCount));
    } catch (error) {
      console.log(error);
    }
  };

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
    if (socket.current) {
      socket.current.on("get-chats", () => {
        getChats();
      });
    }
  }, [socket.current]);

  useEffect(() => {
    if (sendMessage && socket.current) {
      socket.current.emit("send-message", sendMessage);
      // console.log("sendMessagesendMessage", sendMessage);
      updateChatSeen(sendMessage.chatId, sendMessage.receiverId);
      getChats();
    }
  }, [sendMessage, socket.current]);

  const updateChatSeen = async (chatId, receiverId) => {
    try {
      const updatedChat = await chatService.updateChatSeen(
        receiverId || user._id,
        {
          chatId,
          seen: false,
        }
      );
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat._id === updatedChat._id) {
            return updatedChat;
          }
          return chat;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("recieve-message", (data) => {
        console.log("recieve-message", data);
        // data.chatId
        setReceiveMessage(data);
        updateChatSeen(data.chatId);
        countUnseenChats();
        getChats();
      });
    }
  }, [socket.current, unseenMsgCount]);

  // const checkOnlineStatus = (chat) => {
  //   const chatMember = chat.members.find((member) => member.user !== user._id);
  //   const online = onlineUsers.find((user) => user.userId === chatMember);
  //   return online ? true : false;
  // };

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member.user !== user._id);
    if (chatMember) {
      const userId = chatMember.user;
      const online = onlineUsers.find((user) => user.userId === userId);
      return online ? true : false;
    }
    return false;
  };

  const checkSeenChat = (chat) => {
    return chat.members.find((member) => member.user === user._id).seen;
  };

  const closeAddChatModal = () => {
    setOpenModal(false);
  };

  const selectChatHandler = async (chat) => {
    setcurrentChat(chat);
    if (!checkSeenChat(chat)) {
      // countUnseenChats();
      try {
        const updatedChat = await chatService.updateChatSeen(user._id, {
          chatId: chat._id,
          seen: true,
        });

        setChats((prevChats) =>
          prevChats.map((chat) => {
            if (chat._id === updatedChat._id) {
              return updatedChat;
            }
            return chat;
          })
        );

        const unseenChatsCount = await chatService.unseenChatsCount(user._id);
        dispatch(setUnseenMsgCount(unseenChatsCount));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-[95%] ">
      <div
        className={`flex justify-between items-center gap-[3rem] px-[1rem] h-full ${
          small ? "flex-col lg:flex-row" : ""
        }`}
      >
        <div
          className={`flex bg-[#fcfeff] w-full h-full flex-1 flex-col justify-start items-start rounded-[2rem] shadow-custom2 px-[2rem] py-[1rem] ${
            small ? "border-[.2rem] border-[#006cbe27]" : ""
          }`}
        >
          <div
            className={`flex justify-between items-center w-full ${
              small ? "mb-[2.2rem]" : "mb-[4rem]"
            }`}
          >
            <h1
              className={
                small
                  ? "text-[2rem] font-semibold "
                  : "text-[4rem] font-semibold "
              }
            >
              Chats
            </h1>
            {small ? (
              <button
                onClick={() => setOpenModal(true)}
                className="p-[1rem] rounded-full bg-[#006cbe0c] hover:bg-[#DEEDF7] transition-all duration-100 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0"
                  y="0"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  className="w-[1.1rem] fill-primary"
                >
                  <g>
                    <path
                      d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                      opacity="1"
                    ></path>
                  </g>
                </svg>
              </button>
            ) : (
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
            )}
          </div>
          <p
            className={
              small
                ? "text-[1.2rem] font-semibold mb-[1.8rem] "
                : "text-[2rem] font-semibold mb-[2rem] "
            }
          >
            Recent conversation
          </p>
          <div className="flex flex-col w-full  pr-4 overflow-y-auto">
            {chats.length ? (
              chats.map((chat) => (
                <button
                  onClick={() => selectChatHandler(chat)}
                  key={chat._id}
                  className={`flex flex-col ${small ? "min-w-[17rem]" : ""}`}
                >
                  <div className="flex flex-col w-full ">
                    <div
                      className={`relative itemm border-[.1rem] border-[#006cbe1e] ${
                        chat?._id === currentChat?._id ? "bg-[#006cbe1e]" : " "
                      } hover:bg-[#006cbe1e] w-full transition-all duration-100 ease-in cursor-pointer ${
                        small
                          ? "p-[1rem] pt-[.9rem] rounded-[1.2rem]"
                          : "p-[1.5rem] rounded-[2rem] border-[.3rem]"
                      } 
                      ${
                        !checkSeenChat(chat)
                          ? "bg-[#be55000b] border-[#be550013]"
                          : ""
                      }
                      `}
                    >
                      <RecentConversation
                        chat={chat}
                        currentUserId={user._id}
                        online={checkOnlineStatus(chat)}
                        small={small}
                      />
                      {!checkSeenChat(chat) ? (
                        <div
                          className={`absolute top-1/2 bg-[#759aff] rounded-full translate-y-[-50%] ${
                            small
                              ? "right-[.5rem] w-[.6rem] h-[.6rem]"
                              : "right-[1.4rem] w-[1rem] h-[1rem]"
                          }`}
                        ></div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div
                      className={`dividerr self-center bg-[#006cbe1e] rounded-full ${
                        small
                          ? "w-[60%] h-[.2rem] my-[.9rem]"
                          : "w-[50%] h-[.4rem] my-[1.5rem]"
                      }`}
                    ></div>
                  </div>
                </button>
              ))
            ) : (
              <p
                className={`${
                  small ? "text-[1.1rem]" : "text-[1.7rem]"
                } text-nav `}
              >
                No recent conversations
              </p>
            )}
          </div>
        </div>

        <div
          className={`flex flex-[2.5] w-full h-full flex-col justify-start items-start rounded-[2rem] shadow-custom4 px-[2rem] py-[1rem] ${
            small ? "border-[.2rem] border-[#006cbe16] " : ""
          }`}
        >
          {currentChat ? (
            <ChatBox
              currentChat={currentChat}
              currentUserId={user._id}
              setSendMessage={setSendMessage}
              receiveMessage={receiveMessage}
              online={checkOnlineStatus(currentChat)}
              selectChatHandler={selectChatHandler}
              setChats={setChats}
              small={small}
            />
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <img
                className={`${small ? "w-[13%]" : "w-[30%]"} `}
                src="/img/speech-bubble.png"
                alt=""
              />
              <h1
                className={`${
                  small
                    ? "text-[1.4rem] text-primary font-semibold"
                    : "text-[3rem] text-primary"
                } `}
              >
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
        className={`${
          small ? "w-[90vw] md:w-[80vw] lg:w-[35vw]" : "w-[30vw]"
        }  mx-auto`}
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
            small={small}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default Chat;
