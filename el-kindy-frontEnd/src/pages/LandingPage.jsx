import About from "../ui/About";
import Curriculum from "../ui/Curriculum";
import Event from "../ui/Event";
import Hero from "../ui/Hero";
import Testimonials from "../ui/Testimonials";
import { Nav } from "../ui/Nav";
import ContactUs from "../ui/ContactUs";
import Footer from "../ui/Footer";

function LandingPage() {
  const customStyle = `
  ::-webkit-scrollbar {
    width: .8rem;
    border-radius: 8rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #7586FF;
    border-radius: 8rem;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 108, 190, 0.18);
    border-radius: 8rem;
  }
`;
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: customStyle }} />
      <Nav />
      <Hero />
      <About />
      <Curriculum />
      <Event />
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default LandingPage;
