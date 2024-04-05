import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import authService from "../features/auth/AuthService";
import { logout, setOnlineUsers } from "../features/auth/AuthSlice";

//
import React from "react";

import {
  UserCircleIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  PowerIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";

import SocketContext from "../features/context/SocketContext";

function NavList() {
  const { user } = useSelector((state) => state.auth);

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 text-nav text-[1.15rem] font-semibold">
      <Link to={"/user-side"}>
        <ListItem className="flex items-center gap-2 font-nunito py-2 pr-4 hover:text-nav hover:bg-[#e8f6ff]">
          Home
        </ListItem>
      </Link>
      <Link to={"/categories"}>
        <ListItem className="flex items-center gap-2 font-nunito py-2 pr-4 hover:text-nav hover:bg-[#e8f6ff]">
          Courses
        </ListItem>
      </Link>
      <Link to={"/quiz-list-front/quizzes/" + user._id}>
        <ListItem className="flex items-center gap-2 font-nunito py-2 pr-4 hover:text-nav hover:bg-[#e8f6ff]">
          Quizs
        </ListItem>
      </Link>
      {user.role === "teacher" ? (
        <Link to={"/dash-teacher-availabilities"}>
          <ListItem className="flex items-center gap-2 font-nunito py-2 pr-4 hover:text-nav hover:bg-[#e8f6ff]">
            Availabilty
          </ListItem>
        </Link>
      ) : (
        ""
      )}

      <Link to={"/user-side/AllEvents"}>
        <ListItem className="flex items-center gap-2 font-nunito py-2 pr-4 hover:text-nav hover:bg-[#e8f6ff]">
          Events
        </ListItem>
      </Link>

      <Link to={"/user-side/karaoke"}>
        <ListItem className="flex items-center gap-2 font-nunito py-2 pr-4 hover:text-nav hover:bg-[#e8f6ff]">
          Karaoke
        </ListItem>
      </Link>

      <Link to={"/user-side/games"}>
        <ListItem className="flex items-center gap-2 font-nunito py-2 pr-4 hover:text-nav hover:bg-[#e8f6ff]">
          Games
        </ListItem>
      </Link>
    </List>
  );
}

function ProfileMenu() {
  const dispatch = useDispatch();
  const { user, unseenMsgCount } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const socket = useContext(SocketContext);

  const logoutHandler = async () => {
    await authService.logout();
    socket.current.emit("loggedOut", user._id);
    socket.current.on("get-users", (users) => {
      dispatch(setOnlineUsers([users]));
    });
    setIsMenuOpen(false);
    dispatch(logout());
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <div className="flex justify-center items-center gap-[1rem] ">
        <Link to={"/user-side/chat"}>
          <div className="relative w-[3rem] h-[3rem] p-[.65rem] hover:bg-[#DEEDF7] rounded-full transition-all duration-100 cursor-pointer">
            <img src="/img/chat-icon.svg" alt="" />
            {unseenMsgCount > 0 ? (
              <div className="absolute top-0 right-0 flex justify-center items-center w-[1rem] h-[1rem]  bg-[#ff955c] rounded-full p-[.6rem] ">
                <p className="text-[.7rem] font-semibold text-white ">
                  {unseenMsgCount}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <h1 className="hidden sm:block capitalize font-semibold text-nav">
          {user.fullname}
        </h1>
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full pl-2 pr-3 py-1  lg:ml-auto outline-none"
          >
            <Avatar
              variant="circular"
              size="md"
              alt="tania andrew"
              className="border-[.1rem] border-[#8d89fe] p-0.5"
              src={user?.photo_url}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
      </div>
      <MenuList className=" p-1 mt-[1rem] font-nunito min-w-[13rem]">
        <div
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col justify-center items-center p-2 outline-none"
        >
          <h1 className="text-[1.2rem] font-bold mb-1">{user.fullname}</h1>
          <p className="text-[1rem] ">{user.email}</p>
          <div className="dividerr self-center w-[70%] h-[.2rem] bg-[#006cbe1e] mt-[.7rem] mb-[.2rem] rounded-full "></div>
        </div>

        <Link to={"/user-side/chat"}>
          <MenuItem
            onClick={closeMenu}
            className={`flex items-center gap-2 rounded `}
          >
            <div className="flex items-center gap-[.5rem] ">
              {React.createElement(InboxArrowDownIcon, {
                className: "h-[1rem] w-[1rem]",
                strokeWidth: 2,
              })}
              <span className="py-[0.1rem] text-[1rem] font-semibold">
                Inbox
              </span>
            </div>
          </MenuItem>
        </Link>

        <MenuItem
          onClick={closeMenu}
          className={`flex items-center gap-2 rounded `}
        >
          <div className="flex items-center gap-[.5rem] ">
            {React.createElement(UserCircleIcon, {
              className: "h-[1rem] w-[1rem]",
              strokeWidth: 2,
            })}
            <span className="py-[0.1rem] text-[1rem] font-semibold">
              My profile
            </span>
          </div>
        </MenuItem>

        <Link to={"/user-side/account"}>
          <MenuItem
            onClick={closeMenu}
            className={`flex items-center gap-2 rounded `}
          >
            <div className="flex items-center gap-[.5rem] ">
              {React.createElement(Cog8ToothIcon, {
                className: "h-[1.05rem] w-[1.05rem]",
                strokeWidth: 2,
              })}
              <span className="py-[0.1rem] text-[1rem] font-semibold">
                Settings
              </span>
            </div>
          </MenuItem>
        </Link>

        <MenuItem
          onClick={logoutHandler}
          className={`flex items-center gap-2 rounded hover:bg-red-500/10`}
        >
          <div className="flex items-center gap-[.5rem] ">
            {React.createElement(PowerIcon, {
              className: "h-[1rem] w-[1rem] text-red-500",
              strokeWidth: 2,
            })}
            <span className="py-[0.1rem] text-red-400 text-[1rem] font-semibold">
              Sign Out
            </span>
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function UserSideNavBar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto fixed top-3 left-0 right-0 z-50 w-[97%] lg:max-w-screen-xl px-4 py-2 ">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to={"/user-side/home"}>
          <img
            src="/logo.svg"
            alt="el kindy logo"
            className="w-[1.6rem] mr-4 cursor-pointer py-1.5 lg:ml-2"
          />
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="flex gap-2 justify-end w-full mr-[1.5rem] lg:w-auto lg:mr-0">
          <ProfileMenu />

          {/* <Link to={"/login"}>
            <Button
              variant="text"
              size="sm"
              className="text-nav text-[0.9rem] capitalize"
            >
              Log In
            </Button>
          </Link>

          <Link to={"/signup"}>
            <Button
              variant="text"
              size="sm"
              className="bg-lightBlue text-nav text-[0.9rem] rounded-[.5rem] hover:bg-secondaryLight capitalize"
            >
              Sign Up
            </Button>
          </Link> */}
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        {/* <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Link to={"/login"}>
            <Button
              variant="outlined"
              size="sm"
              color="blue-gray"
              fullWidth
              className="text-nav text-[0.9rem] capitalize"
            >
              Log In
            </Button>
          </Link>

          <Link to={"/signup"}>
            <Button
              variant="text"
              size="sm"
              fullWidth
              className="bg-lightBlue text-nav text-[0.9rem]  hover:bg-secondaryLight capitalize"
            >
              Sign Up
            </Button>
          </Link>
        </div> */}
      </Collapse>
    </Navbar>
  );
}

export default UserSideNavBar;
