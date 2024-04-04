import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import Buttonn from "@mui/material/Button";

import "./ChatBox.css";
import userService from "../../../../features/users/UserService";
import messageService from "../../../../features/chat/MessageService";
import chatService from "../../../../features/chat/ChatService";
import { setUnseenMsgCount } from "../../../../features/auth/AuthSlice";

function ChatBox({
  currentChat,
  currentUserId,
  setSendMessage,
  receiveMessage,
  online,
  setChats,
  small,
}) {
  const [userData, setUserData] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const dispatch = useDispatch();

  const checkSeenChat = (chat) => {
    return chat.members.find((member) => member.user === currentUserId).seen;
  };

  const markAsRead = async (chat) => {
    // countUnseenChats();
    try {
      const updatedChat = await chatService.updateChatSeen(currentUserId, {
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

      const unseenChatsCount = await chatService.unseenChatsCount(
        currentUserId
      );
      dispatch(setUnseenMsgCount(unseenChatsCount));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const otherMember = currentChat?.members?.find(
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
  }, [currentChat, currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await messageService.getMessages(
          currentChat._id
        );
        setMessages(fetchedMessages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    if (receiveMessage && receiveMessage.chatId === currentChat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  const handleSend = async () => {
    // e.preventDefault();
    if (newMessage) {
      const message = {
        senderId: currentUserId,
        text: newMessage,
        chatId: currentChat._id,
      };

      // save msg in db
      try {
        const addedMessage = await messageService.sendMessage(message);
        setMessages([...messages, addedMessage]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }

      // send msg in socket server
      const receiverId = currentChat.members.find(
        (member) => member.user !== currentUserId
      ).user;
      setSendMessage({ ...message, receiverId });
    }
  };

  // scroll to the last msg
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div
        className={`flex justify-start items-center ${
          small ? "gap-[1rem]" : "gap-[1.5rem]"
        } `}
      >
        <div
          className={`${
            small ? "w-[4.5rem] h-[4.5rem]" : "w-[7rem] h-[7rem]"
          } rounded-full `}
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
              small ? "text-[1.1rem] gap-[.5rem]" : "text-[2rem] gap-[1rem]"
            } font-bold flex items-center`}
          >
            {userData?.fullname}
            <span
              className={`${
                small ? "text-[.9rem]" : "text-[1.5rem]"
              } font-normal `}
            >
              {`(${userData?.role})`}
            </span>
          </p>
          <div
            className={`flex items-center ${
              small ? "gap-[.4rem]" : "gap-[.7rem]"
            } `}
          >
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
          </div>
        </div>
      </div>

      <div
        className={`dividerr self-center bg-[#006cbe1e] rounded-full ${
          small
            ? "w-[90%] h-[.3rem] my-[1rem]"
            : "w-[90%] h-[.3rem] my-[1.5rem]"
        }`}
      ></div>

      <div className="flex flex-col justify-start items-start w-full h-full overflow-y-auto pr-[2rem] ">
        {messages.map((message, index) => (
          <div
            ref={scroll}
            key={index}
            className={
              message.senderId === currentUserId
                ? small
                  ? "message-small own-small max-w-[100%] sm:max-w-[22rem] "
                  : "message own"
                : small
                ? "message-small"
                : "message"
            }
          >
            <span> {message.text} </span>
            <span> {format(message.createdAt)} </span>
          </div>
        ))}
      </div>

      <div className="flex items-center w-full mt-[2rem] ">
        <div className=" w-full max-w-[42vw] ">
          <InputEmoji
            value={newMessage}
            onChange={handleChange}
            onClick={() => markAsRead(currentChat)}
            fontFamily="nunito"
            fontSize={small ? "1.1rem" : "2rem"}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          />
        </div>
        {small ? (
          <Buttonn
            onClick={handleSend}
            size="medium"
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              width: "fit-content",
              fontSize: "1rem",
              bgcolor: "#358ff9",
              borderRadius: ".8rem",
              marginLeft: "1.5rem",
              "&:hover": {
                bgcolor: "#1072e2",
              },
              textTransform: "none",
            }}
          >
            Send
          </Buttonn>
        ) : (
          <Buttonn
            onClick={handleSend}
            size="medium"
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              width: "fit-content",
              fontSize: "1.7rem",
              bgcolor: "#358ff9",
              borderRadius: "1.2rem",
              marginLeft: "2rem",
              "&:hover": {
                bgcolor: "#1072e2",
              },
              textTransform: "none",
            }}
          >
            Send
          </Buttonn>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
