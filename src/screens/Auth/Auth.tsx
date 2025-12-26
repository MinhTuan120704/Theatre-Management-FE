// Màn hình gồm 2 tabs Login và Register

import { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

type AuthTab = "login" | "register";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-dark to-bg-light flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full">
        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-4 text-center font-semibold text-lg transition-colors ${
              activeTab === "login"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            ĐĂNG NHẬP
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-4 text-center font-semibold text-lg transition-colors ${
              activeTab === "register"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            ĐĂNG KÝ
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === "login" ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
