import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api.js";
import Button from "../components/Button";
import useAutoLogout from "../hooks/useAutoLogout";
import { HiPencil } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

const Home = () => {
  const [greeting, setGreeting] = useState(""); // State to store the greeting
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
  const [isEditingIntro, setIsEditingIntro] = useState(false); // State to track if the intro is being edited
  const [introText, setIntroText] = useState(""); // State to store the intro text

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "ADMIN" || userRole === "SUPERUSER");
  }, []);

  useAutoLogout(isAdmin); // Call the custom hook for auto logout

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

  // when user saves updated bio, send the updated intro text to the backend API
  const handleSubmit = async (updatedIntro) => {
    setIsEditingIntro(false);
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ bio: updatedIntro }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  // when user cancels editing, reset the intro text to the original value
  const handleCancel = () => {
    setIsEditingIntro(false);
    fetchIntroText(); // Fetch the original intro text from the backend API to reset it
  };

  // get the intro text from the backend API
  const fetchIntroText = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile`);
      if (!response.ok) {
        throw new Error("Failed to fetch intro text");
      }
      const data = await response.json();
      console.log("Fetched intro text:", data.bio);
      setIntroText(data.bio);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIntroText();
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
      <div className="w-full mt-4 flex flex-row justify-center items-center text-center px-4">
        {isEditingIntro ? (
          <>
            <textarea
              value={introText}
              onChange={(e) => setIntroText(e.target.value)}
              className="text-base md:text-lg w-full md:w-full h-32 p-2 border rounded-xl text-brand-dark_txt dark:text-brand-light_txt bg-brand-light_bg dark:bg-brand-dark_bg"
            />
            <div className="flex justify-end items-end gap-2 mb-2">
              <span className="text-brand-github dark:text-brand-dark_txt_accent dark:hover:text-brand-mac_close hover:text-brand-mac_close transition-colors duration-100 ml-2">
                <a
                  href="#"
                  onClick={() => handleSubmit(introText)}
                  className=""
                >
                  <FaCheck className="inline mb-1" /> save
                </a>
              </span>
            </div>
          </>
        ) : (
          <p className="flex text-lg md:text-xl mb-2 mx-4 max-w-4xl leading-relaxed">
            {introText}
          </p>
        )}
        {isAdmin && (
          <div className="flex justify-end items-end gap-2 mb-2">
            <span className="text-brand-github dark:text-brand-dark_txt_accent dark:hover:text-brand-mac_close hover:text-brand-mac_close transition-colors duration-100">
              {isEditingIntro ? (
                <a href="#" onClick={() => handleCancel()}>
                  <GrClose className="inline mb-1" /> cancel
                </a>
              ) : (
                <a href="#" onClick={() => setIsEditingIntro(true)}>
                  <HiPencil className="inline mb-1" /> edit
                </a>
              )}
            </span>
          </div>
        )}
      </div>
      <div className="flex-container">
        <Button
          text="Projects"
          link="/projects"
          className="out-button w-60 inline"
        >
          Projects
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
