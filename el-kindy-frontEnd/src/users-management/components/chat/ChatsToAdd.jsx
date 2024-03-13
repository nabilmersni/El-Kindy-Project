import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { io } from "socket.io-client";

import AvailableChat from "./AvailableChat";
import userService from "../../../features/users/UserService";
import chatService from "../../../features/chat/ChatService";

const formInputSize = "2rem";

function ChatsToAdd({
  currentUserId,
  chats,
  setChats,
  closeAddChatModal,
  socketId,
}) {
  const [availableUsersChat, setAvailableUsersChat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const socket = useRef();

  const exludedUsers = [currentUserId];
  chats.map((chat) => {
    exludedUsers.push(chat.members.find((member) => member !== currentUserId));
  });

  useEffect(() => {
    socket.current = io("ws://localhost:8800", { query: { socketId } });
    const getAvailableUsersChat = async () => {
      try {
        const availableUsersChat = await userService.getAllUsers(
          exludedUsers.join(",")
        );
        setAvailableUsersChat(availableUsersChat);
      } catch (error) {
        console.log(error);
      }
    };

    getAvailableUsersChat();
  }, []);

  const addChatHandle = async (availableUserId) => {
    try {
      const newChat = await chatService.addChat({
        senderId: currentUserId,
        receiverId: availableUserId,
      });
      setChats([...chats, newChat]);
      // socket.current.emit("new-chat", newChat);
      socket.current.emit("new-chat");
      closeAddChatModal();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredAvailableUsers = availableUsersChat.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //add new chat from socket

  // useEffect(() => {
  //   socket.current = io("ws://localhost:8800", { query: { socketId } });
  //   socket.current.emit("new-chat", user._id);
  //   socket.current.on("get-users", (users) => {
  //     dispatch(setOnlineUsers(users));
  //   });
  // }, [user]);

  return (
    <div className="flex flex-col h-full p-[1rem]">
      <h1 className="text-[3rem] mb-[.5rem] ">Start new conversation</h1>
      <div className="mb-[2rem]">
        <TextField
          margin="normal"
          fullWidth
          type="text"
          id="search"
          label="Search"
          name="search"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                fontSize: `${formInputSize}`,
                borderColor: "#DBDFEA",
              },
              "&:hover fieldset": {
                borderColor: "#7586FF",
              },
              "&.Mui-focused fieldset": {
                fontSize: `${formInputSize}`,
                borderColor: "#7586FF",
              },
            },
            "& .MuiInputLabel-root": {
              fontSize: `${formInputSize}`,
              "&.Mui-focused": {
                fontSize: `${formInputSize}`,
                color: "#7586FF",
              },
            },

            "& .MuiInputBase-input": {
              fontSize: `${formInputSize}`,
            },
            "& .MuiFormHelperText-root": {
              fontSize: "1.6rem",
            },
          }}
        />
      </div>
      <div className="flex flex-col h-full overflow-y-auto pr-[2rem] ">
        {availableUsersChat.length ? (
          filteredAvailableUsers.map((availableUser) => (
            <div
              onClick={() => addChatHandle(availableUser._id)}
              key={availableUser._id}
            >
              <AvailableChat userData={availableUser} />
            </div>
          ))
        ) : (
          <p className="text-[2.5rem] self-center my-auto">
            No new chats available
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatsToAdd;
