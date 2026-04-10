import React from "react";

const About = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-0">
      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm dark:bg-[#2A2A2A] sm:p-6">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">About</h2>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
          BiteRush is a modern food ordering experience focused on quick browsing,
          clean navigation, and smooth ordering from discovery to checkout.
        </p>
      </div>

      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm dark:bg-[#2A2A2A] sm:p-6">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">Tech Stack</h2>
        <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 dark:text-gray-400 sm:grid-cols-2 sm:text-base">
          <div className="rounded-lg border border-[#E8E8E8] p-4 dark:border-[#3A3A3A]">React</div>
          <div className="rounded-lg border border-[#E8E8E8] p-4 dark:border-[#3A3A3A]">Redux Toolkit</div>
          <div className="rounded-lg border border-[#E8E8E8] p-4 dark:border-[#3A3A3A]">React Router</div>
          <div className="rounded-lg border border-[#E8E8E8] p-4 dark:border-[#3A3A3A]">Tailwind CSS</div>
          <div className="rounded-lg border border-[#E8E8E8] p-4 dark:border-[#3A3A3A]">Firebase Auth</div>
          <div className="rounded-lg border border-[#E8E8E8] p-4 dark:border-[#3A3A3A]">Local Storage</div>
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm dark:bg-[#2A2A2A] sm:p-6">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">Features</h2>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          <p>Search restaurants by name and browse menus quickly.</p>
          <p>Filter top-rated restaurants and manage cart items smoothly.</p>
          <p>Use protected checkout flow with authentication and persisted state.</p>
          <p>Track previous orders from a dedicated order history screen.</p>
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-[#2A2A2A] sm:p-6">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">Learnings</h2>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
          This project brings together reusable React UI patterns, Redux state
          organization, protected navigation, and practical persistence for a
          more production-ready frontend workflow.
        </p>
      </div>
    </div>
  );
};

export default About;
