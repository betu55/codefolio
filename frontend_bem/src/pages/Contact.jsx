import React from "react";

const Contact = () => {
  return (
    <div className="main-container main-container-center px-6 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">
        <p className="text-sm md:text-base uppercase tracking-[0.25em] text-brand-mac_close dark:text-brand-mac_minimize mb-4">
          Open to full-time software developer roles
        </p>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>

        <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
          Have a role, project, or opportunity in mind? I’d be happy to
          connect and talk about how I can contribute.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8 w-full md:w-auto justify-center items-center">
          <a
            href="mailto:bemenet.bekele@torontomu.ca"
            className="out-button w-2/3 md:w-60 inline-block text-center"
          >
            Email Me
          </a>
          <a
            href="tel:+16472935103"
            className="out-button w-2/3 md:w-60 inline-block text-center"
          >
            Call / Text
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-lg">
          <a
            href="https://www.linkedin.com/in/bemenet-bekele/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icons linkedin"
          >
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
          <a
            href="https://github.com/betu55"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icons github"
          >
            <i className="fab fa-github"></i> GitHub
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icons twitter"
          >
            <i className="fab fa-twitter"></i> Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
