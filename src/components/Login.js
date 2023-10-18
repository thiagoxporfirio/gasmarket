import React, { useState, useEffect } from "react";
import { GiGasStove } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = {
      nome: user,
      senha: password,
    };
  
    const response = await fetch("https://gas-controller-f4c05ad03233.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    if (response.ok) {
      const data = await response.json(); // Converte a resposta para JSON
      const token = data.token;
  
      setIsLoading(true);
  
      setTimeout(() => {
        localStorage.setItem(
          "userLoggedIn",
          JSON.stringify({ token })
        );
        localStorage.setItem("userLoggedInOk", "true");
        navigate("/registerclients");
      }, 2000);
    } else {
      toast.error("Error! Verifique suas credenciais.");
    }
  };

  useEffect(() => {
    const userLoggedInOk = localStorage.getItem("userLoggedInOk");

    if (userLoggedInOk === "true") {
      navigate("/registerclients");
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <div className="text-center mb-6">
          <GiGasStove alt="Logo da Empresa" className="mx-auto w-[60px] h-16" />
          <h1 className="text-2xl font-semibold">Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-600 font-medium">
              User
            </label>
            <input
              type="text"
              id="user"
              name="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none ${
                isLoading ? "opacity-50 cursor-wait" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <PulseLoader color="#ffffff" size={8} />
              ) : (
                "Entrar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
