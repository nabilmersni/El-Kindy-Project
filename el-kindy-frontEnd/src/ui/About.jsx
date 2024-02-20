import ButtonPrimary from "./ButtonPrimary";
import Title1 from "./Title1";
import Title2 from "./Title2";

function About() {
  return (
    <div className="container mx-auto w-auto lg:mt-[16rem] mt-[8rem] px-8">
      <div>
        <Title1>About us</Title1>
        <div className="flex lg:flex-row flex-col justify-evenly items-center mt-[4rem] mb-[4rem] ">
          <img
            className="flex self-center  w-1/2 mb-12 lg:w-1/3 lg:mb-0"
            src="img/about-us-image.png"
            alt=""
          />
          <div className="hidden lg:flex justify-center items-center">
            <img
              className="max-w-[4rem]"
              src="img/about-us-divider.svg"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center items-center lg:items-start lg:w-1/3 w-full">
            <p className=" font-semibold text-center lg:text-left">
              Since 1999, Conservatoire El Kindy has supported generations of
              musical artists thanks to rich and demanding teaching and the
              rigor of a team of specialists and experienced teachers who
              continue to supervise and guide the seeds of artists over the
              years. Students from the conservatory have excelled during
              national competitions: the amateur soloists of Megrine, the
              Néapolis days, etc. Their apprenticeship course is often crowned
              by obtaining the Arabic music diploma recognized by the Tunisian
              Ministry of Culture.
            </p>
            <ButtonPrimary size={"1rem"}>Testimonials</ButtonPrimary>
          </div>
        </div>

        <Title2>Conservatoire El Kindy</Title2>
        <div className="flex justify-center items-center mt-5 mb-8">
          <p className="text-black font-normal text-center max-w-[28rem] ">
            We have talented and very experienced instructors who teach
            different instruments.
          </p>
        </div>

        {/* <div className="relative p-8 flex justify-center items-center gap-8  "> */}
        <div className="relative p-8 grid grid-cols-1 gap-8  ">
          <img
            // className="absolute top-0 left-0 right-0"
            className="row-start-1 col-start-1 hidden lg:block"
            src="img/stat-container.svg"
            alt=""
          />

          <div className="flex flex-col lg:flex-row justify-center items-center gap-7 row-start-1 col-start-1 -mt-0 lg:-mt-16">
            <div className="flex justify-evenly items-center gap-6 w-[16rem] lg:w-1/4 bg-headerBG border-primary border-[.25rem] rounded-[1rem] px-[1rem] py-[2rem]">
              <img
                className="max-w-[5rem] "
                src="img/teacher-icon.svg"
                alt=""
              />
              <div className="flex flex-col justify-center items-center text-black">
                <h1 className="font-extrabold text-[1.5rem] lg:text-[2rem] ">
                  18
                </h1>
                <p className="font-semibold text-[1rem]">Instructors</p>
              </div>
            </div>

            <div className="flex justify-evenly items-center gap-6 w-[16rem] lg:w-1/4  bg-headerBG border-primary border-[.25rem] rounded-[1rem] px-[1rem] py-[2rem]">
              <img className="max-w-[5rem] " src="img/prize-icon.svg" alt="" />
              <div className="flex flex-col justify-center items-center text-black">
                <h1 className="font-extrabold text-[1.5rem] lg:text-[2rem] ">
                  30
                </h1>
                <p className="font-semibold text-[1rem]">Prize</p>
              </div>
            </div>

            <div className="flex justify-between items-center gap-6 w-[16rem] lg:w-1/4 bg-headerBG border-primary border-[.25rem] rounded-[1rem] px-[1rem] py-[2rem]">
              <img
                className="w-[5rem] "
                src="img/instruments-icon.svg"
                alt=""
              />
              <div className="flex flex-col justify-center items-center text-black">
                <h1 className="font-extrabold text-[1.5rem] lg:text-[2rem] ">
                  16
                </h1>
                <p className="font-semibold text-[1rem]">Instruments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
