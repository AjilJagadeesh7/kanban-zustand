import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const [countdown, setCountdown] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
    }
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <h1 className="text-5xl font-bold text-red-500 mb-8">Oh No!</h1>
      <p className="text-2xl text-gray-400 mb-4">Something went wrong.</p>
      <p className="text-lg text-gray-400 mb-4">
        We apologize for the inconvenience.
      </p>
      <p className="text-lg text-gray-400 mb-4">
        Going back in <span className="text-xl">{countdown}</span>
      </p>
    </div>
  );
};

export default ErrorPage;
