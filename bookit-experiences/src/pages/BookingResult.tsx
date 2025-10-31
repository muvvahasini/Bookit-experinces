import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";


export default function Confirmation({ refId = "HUF56&SO" }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="flex flex-col items-center">
          {/* Green Check Circle */}
          <div className="rounded-full bg-green-500 flex items-center justify-center mb-6" style={{ width: 70, height: 70 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#22C55E" />
              <path d="M17 10l-4 4-3-3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Booking Confirmed Text */}
          <h2 className="text-2xl font-semibold text-center mb-2">Booking Confirmed</h2>
          {/* Ref ID */}
          <div className="text-gray-500 text-lg mb-7 text-center">Ref ID: {refId}</div>
          {/* Back to Home Button */}
          <button
            className="shadow-md
                transition-transform transition-shadow duration-200
                hover:shadow-lg hover:-translate-y-[2px] hover:border-primary
                cursor-pointer bg-gray-200 px-5 py-2 rounded text-gray-700 font-medium text-base"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
