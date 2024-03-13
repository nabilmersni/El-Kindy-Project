import { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import Buttonn from "@mui/material/Button";

import "./ChatBox.css";
import userService from "../../../../features/users/UserService";
import messageService from "../../../../features/chat/MessageService";

function ChatBox({
  currentChat,
  currentUserId,
  setSendMessage,
  receiveMessage,
  online,
}) {
  const [userData, setUserData] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const userId = currentChat?.members?.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const user = await userService.getUserById(userId);
        setUserData(user);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
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
      const receiverId = currentChat.members.find((id) => id !== currentUserId);
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
          </div>
        </div>
      </div>

      <div className="dividerr self-center w-[90%] h-[.3rem] bg-[#006cbe1e] my-[1.5rem] rounded-full "></div>

      <div className="flex flex-col justify-start items-start w-full h-full overflow-y-auto pr-[2rem] ">
        {messages.map((message, index) => (
          <div
            ref={scroll}
            key={index}
            className={
              message.senderId === currentUserId ? "message own" : "message"
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
            fontFamily="nunito"
            fontSize={"2rem"}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          />
        </div>
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
      </div>
    </div>
  );
}

export default ChatBox;
