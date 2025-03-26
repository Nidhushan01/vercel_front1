import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import axios from "./api/axios";
import { useNavigate } from "react-router-dom";

const OTPInput = ({ otp, setOtp }) => {
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      {otp.map((digit, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          className="w-12 h-14 text-center border rounded-lg text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={digit}
          onChange={(e) => handleChange(e, i)}
        />
      ))}
    </div>
  );
};

const OTPPage = () => {
  const { tempUser, setTempUser, setUser } = useContext(AuthContext);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(180);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleOtpVerification = async () => {
    if (!tempUser) {
      console.error("No user data found.");
      return;
    }

    try {
      const endpoint = tempUser.role === "User" ? "auth/verify-otp" : "auth/verify-trainer-otp";
      const response = await axios.post(
        endpoint,
        JSON.stringify({ email: tempUser.email, password: tempUser.password, otp: otp.join("") }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setUser(response.data.user);
      setTempUser(null);
      navigate("/dashboard");
    } catch (err) {
      console.error("Invalid OTP:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">Verify your email address</h2>
        <p className="text-lg text-gray-600 mb-2">
          6 digit One Time Password (OTP) has been sent via Email to
        </p>
        <p className="text-xl font-semibold text-gray-800 mb-4">{tempUser?.email}</p>
        <p className="text-lg text-gray-600 mb-4">Enter the OTP below to verify it.</p>
        <OTPInput otp={otp} setOtp={setOtp} />
        <p className="text-xl font-semibold text-black mt-4">{formatTime(timeLeft)}</p>
        <button
          onClick={handleOtpVerification}
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg w-full text-lg font-semibold"
        >
          Confirm
        </button>
        <p className="mt-4 text-blue-500 font-bold cursor-pointer">Resend OTP</p>
      </div>
    </div>
  );
};

export default OTPPage;
