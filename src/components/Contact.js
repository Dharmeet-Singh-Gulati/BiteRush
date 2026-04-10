import React from "react";

const Contact = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md dark:bg-[#2A2A2A] sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">
          We'd love to hear from you
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          Reach out for collaboration, feedback, or frontend opportunities.
        </p>

        <div className="my-4 border-b dark:border-[#3A3A3A]"></div>

        <div className="flex flex-col gap-3">
          <a
            href="https://www.linkedin.com/in/dharmeet-singh-gulati-4109852b1"
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-full items-center justify-center rounded-lg border px-4 py-2 text-center transition hover:bg-gray-100 dark:border-[#3A3A3A] dark:text-white dark:hover:bg-[#1C1C1C]"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Dharmeet-Singh-Gulati"
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-full items-center justify-center rounded-lg border px-4 py-2 text-center transition hover:bg-gray-100 dark:border-[#3A3A3A] dark:text-white dark:hover:bg-[#1C1C1C]"
          >
            GitHub
          </a>
          <a
            href="https://youtube-clone-sooty-six.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-full items-center justify-center rounded-lg border px-4 py-2 text-center transition hover:bg-gray-100 dark:border-[#3A3A3A] dark:text-white dark:hover:bg-[#1C1C1C]"
          >
            YouTube Clone
          </a>
          <a
            href="https://streamgpt-80b01.web.app/"
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-full items-center justify-center rounded-lg border px-4 py-2 text-center transition hover:bg-gray-100 dark:border-[#3A3A3A] dark:text-white dark:hover:bg-[#1C1C1C]"
          >
            bingeWorthy Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
