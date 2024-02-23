import About from "../ui/About";
import Curriculum from "../ui/Curriculum";
import Event from "../ui/Event";
import Hero from "../ui/Hero";
import { Nav } from "../ui/Nav";

function LandingPage() {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Curriculum />
      <Event />
    </div>
  );
}

export default LandingPage;
