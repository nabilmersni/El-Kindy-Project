function Footer() {
  return (
    <footer className="grid grid-cols-1 relative mt-[8rem] ">
      <img
        className="col-start-1 row-start-1 "
        src="img/footer-bg.svg"
        alt=""
      />
      <div className="col-start-1 row-start-1 flex flex-col gap-[2rem] lg:gap-0 lg:flex-row justify-evenly items-center pt-[6rem] ">
        <div className="flex flex-col gap-[2rem] lg:gap-0 lg:flex-row justify-evenly items-center w-full bg-headerBG lg:bg-transparent">
          <img className="mb-[1.5rem] lg:mb-0 " src="logo.svg" alt="" />
          <div className="flex flex-col justify-center items-start ">
            <h1 className="text-primary text-[1.4rem]  font-bold">Address</h1>
            <div className="flex justify-between items-center">
              <img
                className="w-[1.6rem] mr-[1rem] "
                src="img/location-icon.svg"
                alt=""
              />
              <p className="text-black max-w-[18rem] ">
                24, Rue Manzel Mabrouk Cité Olympique, Tunis
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start mb-[6rem] lg:mb-0 ">
            <h1 className="text-primary text-[1.4rem]  font-bold">
              Opening hours
            </h1>
            <div className="flex justify-between items-center">
              <img
                className="w-[1.6rem] mr-[1rem] "
                src="img/time-icon.svg"
                alt=""
              />
              <div className="flex flex-col justify-center items-start gap-0">
                <p className="text-black">Monday - Friday: 2:00 PM - 8:00 PM</p>
                <p className="text-black">
                  Saturday - Sunday: 10:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 mx-auto flex justify-center items-center">
        <div className="bg-bodyBg p-3 px-[3rem] rounded-full rounded-b font-bold text-primary text-[1.1rem] ">
          © {new Date().getFullYear()} Conservatoire El Kindy
        </div>
      </div>
    </footer>
  );
}

export default Footer;
