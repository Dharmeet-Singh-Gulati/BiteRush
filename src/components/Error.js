import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-xl border border-[#E8E8E8] bg-white p-8 text-center shadow-sm dark:border-[#3A3A3A] dark:bg-[#2A2A2A]">
        <h1 className="text-3xl font-bold text-[#1C1C1C] dark:text-white">Something went wrong</h1>
        <p className="mt-3 text-sm text-[#696969] dark:text-gray-400">
          We couldn&apos;t load this page right now. Please try again or head
          back home.
        </p>
        <div className="mt-6 space-y-2 text-sm text-[#696969] dark:text-gray-400">
          <h3>This is {err.data}</h3>
          <h3>{err.status}</h3>
          <h3>{err.statusText}</h3>
        </div>
        <a
          href="/"
          className="mt-6 inline-flex rounded-xl bg-[#EF4F5F] px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-95"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Error;
