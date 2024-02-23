import About from "../ui/About";
import Curriculum from "../ui/Curriculum";
import Hero from "../ui/Hero";
import { Nav } from "../ui/Nav";

function LandingPage() {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Curriculum />
    </div>
  );
}

export default LandingPage;
