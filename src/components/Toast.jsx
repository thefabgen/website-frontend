// components/Toast.js
const Toast = ({ message, type }) => {
  const color = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`fixed top-6 right-6 px-4 py-3 rounded-md shadow-lg z-50 transform transition-all duration-300 ${color}`}>
      {message}
    </div>
  );
};

export default Toast;
