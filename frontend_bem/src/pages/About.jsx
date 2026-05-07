import React, { useState, useEffect } from "react";
import axios from "axios";

const About = () => {
  const [videos, setVideos] = useState([]);

  const getEmbedUrl = (url, isBackground = false) => {
    if (!url) return "";
    let embedUrl = url
      .replace("watch?v=", "embed/")
      .replace("youtu.be/", "youtube.com/embed/");

    if (isBackground) {
      embedUrl +=
        "?autoplay=1&mute=1&loop=1&playlist" + embedUrl.split("/embed/")[1];
    } else {
      embedUrl += "?autoplay=0";
    }

    return embedUrl;
  };

  useEffect(() => {
    // Fetch videos from the Django backend
    axios
      .get("http://localhost:8000/api-bem/videos/")
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  return (
    //   {/* About Page Content */}
    <main className="h-full flex flex-col justify-center items-center text-center px-4 text-color">
      <div className="flex-grow w-full grid grid-cols-1 md:grid-cols-4 gap-2 px-2">
        {/* Left Section */}
        <section className="p-2 text-left flex flex-col justify-center items-top">
          <h2 className="text-4xl font-bold pl-2">{videos[0]?.title}</h2>
          <br />
          <p className="text-lg pl-2">{videos[0]?.description}</p>
        </section>

        {/* middle section */}
        <section className="relative bg-transparent px-2 py-0 flex justify-center items-center col-span-2 overflow-hidden">
          {/* Foreground YouTube Video */}
          <iframe
            className="relative z-10 h-full w-5/6 rounded-lg shadow-lg border-none"
            src={getEmbedUrl(videos[0]?.url)}
            title="Main Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </section>

        {console.log(videos)}
        {/* Right Section */}
        <section className="p-2 flex justify-center items-top">
          <h2 className="text-xl font-bold ">Comments</h2>
        </section>
      </div>
    </main>
  );
};

export default About;
