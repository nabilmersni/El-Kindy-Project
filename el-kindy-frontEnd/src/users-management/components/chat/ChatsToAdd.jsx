import { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";

import AvailableChat from "./AvailableChat";
import userService from "../../../features/users/UserService";
import chatService from "../../../features/chat/ChatService";
import SocketContext from "../../../features/context/SocketContext";

const formInputSize = "2rem";

function ChatsToAdd({
  currentUserId,
  chats,
  setChats,
  closeAddChatModal,
  small,
}) {
  const [availableUsersChat, setAvailableUsersChat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const socket = useContext(SocketContext);

  const exludedUsers = [currentUserId];
  chats.map((chat) => {
    exludedUsers.push(
      chat.members.find((member) => member.user !== currentUserId).user
    );
  });

  useEffect(() => {
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

  return (
    <div className="flex flex-col h-full p-[1rem]">
      <h1
        className={`${
          small ? "text-[1.6rem] mb-[.4rem]" : "text-[3rem] mb-[.5rem]"
        }`}
      >
        Start new conversation
      </h1>

      {small ? (
        <div className="mb-[1.5rem]">
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
                  borderColor: "#DBDFEA",
                },
                "&:hover fieldset": {
                  borderColor: "#7586FF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#7586FF",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "#7586FF",
                },
              },
            }}
          />
        </div>
      ) : (
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
      )}

      <div className="flex flex-col h-full overflow-y-auto pr-[2rem] ">
        {availableUsersChat.length ? (
          filteredAvailableUsers.map((availableUser) => (
            <div
              onClick={() => addChatHandle(availableUser._id)}
              key={availableUser._id}
            >
              <AvailableChat userData={availableUser} small={small} />
            </div>
          ))
        ) : (
          <p
            className={`${
              small ? "text-[1.4rem]" : "text-[2.5rem]"
            } self-center my-auto`}
          >
            No new chats available
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatsToAdd;
