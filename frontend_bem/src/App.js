import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import JobTracker from "./pages/JobTracker.jsx";
import DottedBg from "./components/DottedBg.jsx";

const App = () => {
  return (
    <Router>
      <div className="mx-auto grid min-h-screen w-full max-w-full grid-rows-[auto_1fr_auto] overflow-x-hidden">
        <Navbar />
        <DottedBg />
        <main className="main-container min-w-0 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/about-me" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tracker" element={<JobTracker />} />
          </Routes>
        </main>
        <Footer />
        <ThemeToggle />
      </div>
    </Router>
  );
}

export default App;
