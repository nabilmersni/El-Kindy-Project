import React, { createContext, useRef, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();
import { useSelector, useDispatch } from "react-redux";
import {
  setOnlineUsers,
  logout,
  setUnseenMsgCount,
} from "../../features/auth/AuthSlice";
import authService from "../auth/AuthService";
import chatService from "../chat/ChatService";

export const SocketProvider = ({ children }) => {
  const currentSocket = useRef();
  const dispatch = useDispatch();
  const { user, unseenMsgCount } = useSelector((state) => state.auth);

  const countUnseenChats = async () => {
    const unseenChatsCount = await chatService.unseenChatsCount(user._id);
    dispatch(setUnseenMsgCount(unseenChatsCount ? unseenChatsCount : 1));
  };

  const countUnseenChatsInit = async () => {
    const unseenChatsCount = await chatService.unseenChatsCount(user._id);
    dispatch(setUnseenMsgCount(unseenChatsCount));
  };

  useEffect(() => {
    if (user) {
      currentSocket.current = io("ws://localhost:8800");
      currentSocket.current.emit("new-user-add", user._id);
      countUnseenChatsInit();
      currentSocket.current.on("get-users", (users) => {
        dispatch(setOnlineUsers(users));
      });

      currentSocket.current.on("logOutBlockedUser", (blockedUserId) => {
        if (user._id === blockedUserId) {
          console.log("heyyyy call socket");
          logoutHandler();
        }
      });

      // Clean up the socket connection when the component unmounts
      return () => {
        currentSocket.current.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      currentSocket.current.on("recieve-message", (data) => {
        countUnseenChats();
      });
    }
  }, [unseenMsgCount, user]);

  const logoutHandler = async () => {
    if (user) {
      await authService.logout();
      currentSocket.current.emit("loggedOut", user._id);
      currentSocket.current.on("get-users", (users) => {
        dispatch(setOnlineUsers([users]));
      });

      dispatch(logout("logoutBlocked"));
    }
  };

  return (
    <SocketContext.Provider value={currentSocket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
