import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, collection, addDoc } from "./firebaseConfig";
import { AiOutlineBulb } from "react-icons/ai";

function Page8() {
  const [hintused, setHintused] = useState(false);
  const [hint, setHint] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { roll, team, name, date } = location.state || {};
  let { score } = location.state;
  const [ans2, setans2] = useState("");
  const [flag, setFlag] = useState(false);

  const handleSubmit = async () => {
    if (ans2.toUpperCase() === "AA") {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const amPm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;
      const timestamp = `${hours}:${minutes}:${seconds} ${amPm}`;
      if (hintused) {
        score = score + 8;
      } else {
        score = score + 10;
      }
      alert("Correct Answer!");

      // Data to save in Firebase
      const data = { roll, team, name, score, date: timestamp };

      try {
        await addDoc(collection(db, "teamDetails_blackbox"), data);
        console.log("Data saved successfully");
        navigate("/final", {
          state: { roll, team, name, score, date: timestamp },
        });
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      setFlag(true);
      setans2("");
    }
  };
  const handleHint = () => {
    const confirmHint = window.confirm(
      "Your score will be deducted by 2. Do you want to proceed? Click 'OK' for Yes and 'Cancel' for No."
    );
    if (confirmHint) {
      setHintused(true);
      setHint(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        {/* Team Details */}
        <div className="w-full max-w-5xl p-6 font-mono rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-center text-slate-50 mb-4 border-red-100 border-2 rounded-lg">
            Team Details
          </h1>
          <div className="flex items-center justify-center pt-[20px]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center font-stretch-75%">
              <p className="text-slate-50 font-medium">
                Team Name : <span className="font-semibold">{team}</span>
              </p>
              <p className="text-slate-50 font-medium">
                Team Leader Name : <span className="font-semibold">{name}</span>
              </p>
              <p className="text-slate-50 font-medium">
                Team Leader Roll No :{" "}
                <span className="font-semibold">{roll}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center pt-[20px]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <p className="text-slate-50 font-medium">
                Question No. : <span className="font-semibold">{8}</span>
              </p>
              <p className="text-slate-50 font-medium">
                Score : <span className="font-semibold">{score}</span>
              </p>
              <p className="text-slate-50 font-medium">
                Last Submission : <span className="font-semibold">{date}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between bg-black p-6 rounded-lg shadow-md">
          {/* Image on the Left */}
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 flex flex-col items-center">
            <div className="relative group">
              <button
                onClick={handleHint}
                className="w-18 h-18 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:bg-violet-500 transition duration-300"
              >
                <AiOutlineBulb className="w-12 h-12 text-white" />
              </button>

              {/* Tooltip (Hidden by default, appears on hover) */}
              <span className="absolute w-[110px] -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs font-mono text-2xl text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click for a Hint but your marks will be deducted
              </span>
            </div>

            {hint && (
              <div className="h-full w-[300px]">
                <p className="text-lg text-red-500 mt-2 bg-gray-900 px-3 py-1 rounded-md shadow-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias ab dignissimos nobis! Placeat, facilis eveniet autem
                  ipsa nisi cupiditate molestias quasi, deserunt consectetur ex
                  fugit voluptatum inventore numquam, sunt eaque!
                </p>
              </div>
            )}
          </div>

          {/* Input and Submit Button on the Right */}
          <div className="flex-grow">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                value={ans2}
                onChange={(e) => setans2(e.target.value)}
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
    </>
  );
}

export default Page8;
