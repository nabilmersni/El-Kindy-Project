import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "./ButtonPrimary";

export default function ContactUsForm() {
  return (
    <form>
      <div className="grid grid-cols-1 gap-[1.5rem]">
        <div className="">
          <label
            htmlFor="first-name"
            className="text-[1.1rem] text-black font-semibold"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="first-name"
              id="first-name"
              placeholder="Your fullname..."
              autoComplete="given-name"
              className="text-[1rem] w-full rounded-md border-0 py-[.8rem] px-[1rem] text-black shadow-sm  ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-primary outline-none"
            />
          </div>
        </div>

        <div className="">
          <label
            htmlFor="first-name"
            className="text-[1.1rem] text-black font-semibold"
          >
            Subject
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="first-name"
              id="first-name"
              placeholder="Your subject..."
              autoComplete="given-name"
              className="text-[1rem] w-full rounded-md border-0 py-[.8rem] px-[1rem] text-black shadow-sm  ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-primary outline-none"
            />
          </div>
        </div>

        <div className="">
          <label
            htmlFor="about"
            className="text-[1.1rem] text-black font-semibold"
          >
            Message
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="about"
              rows={5}
              placeholder="Your message..."
              className="text-[1rem] w-full rounded-md border-0 py-[.8rem] px-[1rem] text-black shadow-sm  ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-primary outline-none"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <ButtonPrimary size={"1rem"}>Send</ButtonPrimary>
      </div>
    </form>
  );
}
