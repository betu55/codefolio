import React, { useState, useEffect } from "react";
import Button from "../components/Button";

const Home = () => {
  const [greeting, setGreeting] = useState(""); // State to store the greeting

  useEffect(() => {
    const currentHour = new Date().getHours(); // Get the current hour (0-23)
    let message = "";

    if (currentHour >= 5 && currentHour < 12) {
      message = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      message = "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 24) {
      message = "Good Evening";
    } else {
      message = "Hello Midnight Maverick";
    }

    setGreeting(message); // Set the greeting message
  }, []);

  return (
    <section
      id="home"
      className="h-full flex flex-col justify-center items-center text-center px-4"
    >
      <h1 className="text-5xl md:text-6xl font-bold mx-4">
        <span className="animate-fade-in">{greeting}</span>, I'm Bemenet{" "}
        <span className="wave py-4">👋🏽</span>
      </h1>
      <p className="text-lg md:text-xl mb-6 mx-8 max-w-4xl leading-relaxed">
        Software Developer graduate from Toronto Metropolitan University.
        <br />
        Computer Science graduate with enterprise experience at Home Depot
        Canada, building maintainable user interfaces, backend service features,
        and database-driven tools.
      </p>
      <div className="flex-container">
        <Button
          text="Resume"
          external={true}
          link="https://docs.google.com/document/d/1f_LbcdsvSzF8I9h3I3cms9JxBQ9m_c3u8udh3k0WpS8/edit?usp=sharing"
          className="out-button w-60 inline"
        >
          Resume
        </Button>
        <Button
          text="Experience"
          link="/experience"
          className="out-button w-60 inline"
        >
          Experience
        </Button>
        <Button
          text="Contact Me"
          link="/contact"
          className="out-button w-60 inline"
        >
          Contact Me
        </Button>
      </div>
    </section>
  );
};

export default Home;
