import { Button } from "@material-tailwind/react";

function ButtonPrimary({ children }) {
  return (
    <Button
      variant="text"
      size="md"
      className="bg-lightBlue text-nav text-[1.5rem] font-extrabold font-nunito rounded-full hover:bg-secondaryLight capitalize max-w-[12rem] my-[2rem]"
    >
      {children}
    </Button>
  );
}

export default ButtonPrimary;
