import About from "../ui/About";
import Curriculum from "../ui/Curriculum";
import Event from "../ui/Event";
import Hero from "../ui/Hero";
import Testimonials from "../ui/Testimonials";
import { Nav } from "../ui/Nav";

function LandingPage() {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Curriculum />
      <Event />
      <Testimonials />
    </div>
  );
}

export default LandingPage;
