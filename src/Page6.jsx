import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./firebaseConfig"; 
import { collection, addDoc } from "firebase/firestore"; 
import { AiOutlineBulb } from "react-icons/ai";

function Page6() {
  const [hintused, setHintused] = useState(false);
  const [hint, setHint] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { roll, team, name, date } = location.state || {};
  const [score, setScore] = useState(location.state?.score || 0);
  const [ans2, setAns2] = useState("");
  const [flag, setFlag] = useState(false);
  const hnt= import.meta.env.VITE_HINT6;

  const handleSubmit = async () => {
    if (ans2.toLowerCase() === import.meta.env.VITE_ANS6) {
      const now = new Date();
      const formattedHours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const amPm = now.getHours() >= 12 ? "PM" : "AM";
      const timestamp = `${formattedHours}:${minutes}:${seconds} ${amPm}`;

      const newScore = hintused ? score + 7 : score + 10;
      setScore(newScore);
      alert("Correct Answer!");

      const data = { roll, team, name, score: newScore, date: timestamp };

      try {
        await addDoc(collection(db, "teamDetails_blackbox"), data);
        console.log("Data saved successfully");
        navigate("/page7", { state: { roll, team, name, score: newScore, date: timestamp } });
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      setFlag(true);
      setAns2("");
    }
  };

  const handleHint = () => {
    if (window.confirm("Your score will be deducted by 3. Do you want to proceed?")) {
      setHintused(true);
      setHint(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Team Details */}
      <div className="w-full max-w-5xl p-6 font-mono rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-center text-slate-50 mb-4 border-red-100 border-2 rounded-lg">
          Team Details
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <p className="text-slate-50 font-medium">Team Name: <span className="font-semibold">{team}</span></p>
          <p className="text-slate-50 font-medium">Team Leader Name: <span className="font-semibold">{name}</span></p>
          <p className="text-slate-50 font-medium">Team Leader Roll No: <span className="font-semibold">{roll}</span></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center pt-4">
          <p className="text-slate-50 font-medium">Question No.: <span className="font-semibold">6</span></p>
          <p className="text-slate-50 font-medium">Score: <span className="font-semibold">{score}</span></p>
          <p className="text-slate-50 font-medium">Last Submission: <span className="font-semibold">{date}</span></p>
        </div>
      </div>

      {/* Main Section */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between bg-black p-6 rounded-lg shadow-md">
        {/* Hint Button */}
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 flex flex-col items-center">
          <div className="relative group">
            <button
              onClick={handleHint}
              className="w-18 h-18 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:bg-violet-500 transition duration-300"
            >
              <AiOutlineBulb className="w-12 h-12 text-white" />
            </button>
            <span className="absolute w-[110px] -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Click for a Hint but your marks will be deducted
            </span>
          </div>

          {hint && (
            <div className="h-full w-[300px] mt-2 bg-gray-900 px-3 py-1 rounded-md shadow-md">
              <p className="text-lg text-red-500">{hnt}</p>
            </div>
          )}
        </div>

        {/* Input & Submit */}
        <div className="flex-grow">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              value={ans2}
              onChange={(e) => setAns2(e.target.value)}
              className="w-full px-4 py-2 border text-white font-mono border-violet-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={flag ? "Wrong answer" : "Enter your answer"}
            />
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 via-pink-500 to-violet-500 rounded-md hover:opacity-90 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page6;
