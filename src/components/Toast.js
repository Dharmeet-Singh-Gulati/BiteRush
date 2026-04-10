const Toast = ({ message, type }) => {
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed top-5 right-5 z-[9999] ${bgColor} rounded-lg px-4 py-2 text-sm text-white shadow-lg transition-all duration-300 opacity-100`}
    >
      {message}
    </div>
  );
};

export default Toast;
