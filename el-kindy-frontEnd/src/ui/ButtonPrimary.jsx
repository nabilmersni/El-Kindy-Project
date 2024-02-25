import { Button } from "@material-tailwind/react";

function ButtonPrimary({ children, size }) {
  return (
    <Button
      variant="text"
      size="md"
      className={`bg-lightBlue text-nav text-[${size}] font-extrabold font-nunito rounded-[.8rem] hover:bg-secondaryLight capitalize my-[2rem]`}
    >
      {children}
    </Button>
  );
}

export default ButtonPrimary;
