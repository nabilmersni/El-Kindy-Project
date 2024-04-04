import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 text-nav">
      <Typography
        as="a"
        href="#"
        variant="h6"
        className="font-nunito font-bold"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 hover:text-secondaryDark">
          Home
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="#about"
        variant="h6"
        className="font-nunito font-bold"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 hover:text-secondaryDark">
          About
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="#curriculum"
        variant="h6"
        className="font-nunito font-bold"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 hover:text-secondaryDark">
          Curriculum
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="#testimonials"
        variant="h6"
        className="font-nunito font-bold"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 hover:text-secondaryDark">
          Testimonials
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="#contact"
        variant="h6"
        className="font-nunito font-bold"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 hover:text-secondaryDark">
          Contact
        </ListItem>
      </Typography>
    </List>
  );
}

export function Nav() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto fixed top-2 left-0 right-0 z-50 w-[97%] lg:max-w-screen-xl px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
          <Link to={"/"}>
            <img
              src="/public/logo.svg"
              alt="el kindy logo"
              className="w-[1.6rem]"
            />
          </Link>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <Link to={"/login"}>
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
          </Link>
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
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
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
        </div>
      </Collapse>
    </Navbar>
  );
}
