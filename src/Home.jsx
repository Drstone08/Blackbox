import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeimg from "./assets/homeimg2.png";
import techno from "./assets/techno1.png";
import rollno from "./assets/roll.json";
import technp from "./assets/techps.png";
import blackbox from "./assets/blackbox.png";

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ roll: "", team: "", name: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.roll || !formData.team || !formData.name) {
      alert("Fill all details");
      return;
    }
    if (!rollno.includes(formData.roll)) {
      alert("Invalid Roll Number");
      return;
    }
    navigate("/page1", { state: { ...formData, score: 0 } });
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-6">
      {/* Container */}
      <div className="flex w-full max-w-5xl h-[90vh] shadow-lg rounded-lg  p-4">
        {/* Left Section */}
        <div className="flex flex-col items-center w-1/2 p-4">
          <h1 className="text-3xl font-bold text-yellow-300 mb-4 font-mono">
            Blackbox
          </h1>
          <img
            src={blackbox}
            alt="Home"
            className="rounded-lg w-full max-w-[300px] shadow-lg"
          />
          {/* Instructions */}
          <div className="bg-gray-800 p-4 rounded-lg mt-1 text-sm text-gray-300 w-full text-center">
            <h2 className="text-lg font-semibold text-white">Instructions</h2>
            <ul className="list-inside text-left space-y-2">
              <li>✔ Fill team details carefully, cannot be changed.</li>
              <li>
                ✔ Guess the logic behind the given executable files based on
                input-output patterns.
              </li>
              <li>
                ✔ Hints are available but will result in deductions:
                <ul className="ml-4 list-disc">
                  <li>-4 marks for hints in Questions 1, 2, and 3.</li>
                  <li>-3 marks for hints in Questions 4, 5, and 6.</li>
                  <li>-2 marks for hints in Questions 7 and 8.</li>
                </ul>
              </li>
              <li>✔ Unlimited attempts to find the correct logic.</li>
              <li>
                ✔ Answers are{" "}
                <span className="text-blue-400">case-insensitive</span>.
              </li>
              <li>
                ✔ Each correct answer awards{" "}
                <span className="text-green-400">10 marks</span>.
              </li>
              <li>
                ✔ Results are based on{" "}
                <span className="text-yellow-400">score & completion time</span>
                .
              </li>
            </ul>

            <h2 className="text-lg font-semibold text-green-400 mt-2">
              All the Best!
            </h2>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex flex-col items-center justify-center space-y-4">
          {/* Logos */}
          <div className="flex items-center">
            <img src={technp} alt="Techno" className="h-26 w-65" />
            <p className="text-2xl font-bold mx-2 text-pink-500">X</p>
            <img src={techno} alt="Techno" className="h-50 w-65" />
          </div>

          {/* Form */}
          <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg mt-12">
            <h2 className="text-xl font-bold text-center text-white mb-4">
              Enter Team Details
            </h2>
            <input
              type="text"
              name="team"
              value={formData.team}
              onChange={handleInputChange}
              placeholder="Team Name"
              className="w-full mb-2 px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Leader Name"
              className="w-full mb-2 px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
            />
            <input
              type="text"
              name="roll"
              value={formData.roll}
              onChange={handleInputChange}
              placeholder="Leader Roll No."
              className="w-full mb-4 px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-gradient-to-r from-blue-500 via-pink-500 to-violet-500 rounded-md text-white font-semibold hover:opacity-90"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
