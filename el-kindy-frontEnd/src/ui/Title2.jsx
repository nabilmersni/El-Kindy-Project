function Title2({ children }) {
  return (
    <div className="relative flex justify-center items-center">
      <img
        src="img/title2-icon.svg"
        alt=""
        className="w-[1.4rem] lg:w-[2rem]"
      />
      <h1 className="font-extrabold text-primary text-center text-[1.5rem] md:text-[1.9rem] lg:text-[2.2rem] mx-4">
        {children}
      </h1>
      <img
        src="img/title2-icon.svg"
        alt=""
        className="w-[1.4rem] lg:w-[2rem] -scale-x-100"
      />
    </div>
  );
}

export default Title2;
