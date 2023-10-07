import React from "react";
import { useState, useEffect } from "react";
import { FcSalesPerformance } from "react-icons/fc";
import { SlChart } from "react-icons/sl";
import { Tooltip as ReactTooltip } from "react-tooltip";

import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import { PulseLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function VendaRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const dataAtual = new Date().toLocaleDateString();

  const handleValorChange = (e) => {
    const novoValor = e.target.value.replace(/\D/g, ""); // Remove não números
    setPreco(novoValor); // Atualize o estado "valor" diretamente
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        preco: preco,
        quantidade: quantidade,
        telefone: telefone,
        created_at: dataAtual,
      };

      const response = await fetch(
        "https://gas-controller-f4c05ad03233.herokuapp.com/cliente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsLoading(true);
      } else {
        toast.error("Error! Verifique se os dados estao corretos.");
      }
    } catch (error) {
      console.error("Error ao enviar o FORM:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false); // Certifique-se de definir isLoading como falso, mesmo em caso de erro.
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <div className="text-center mb-6">
          <FcSalesPerformance
            alt="Logo da Empresa"
            className="mx-auto w-[60px] h-16"
          />
          <h1 className="text-2xl font-semibold">Cadastrar Venda</h1>
          <Link to="/registerclients" className="text-blue-500 hover:underline">
            Ele não é cliente? Voltar
          </Link>
        </div>
        <div
          className="cursor-pointer "
          style={{ display: "flex", justifyContent: "end" }}
        >
          <Link to="/cliente">
            <SlChart
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Pagina de Relatorios"
            />
            <ReactTooltip id="my-tooltip" />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="telefone"
              className="block text-gray-600 font-medium"
            >
              Telefone
            </label>
            <InputMask
              type="tel"
              id="telefone"
              value={telefone}
              name="telefone"
              mask="(99) 99999-9999"
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="preco" className="block text-gray-600 font-medium">
              Preço
            </label>
            <input
              type="text"
              value={preco}
              id="preco"
              name="preco"
              onChange={handleValorChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantidade"
              className="block text-gray-600 font-medium"
            >
              Quantidade
            </label>
            <input
              type="text"
              value={quantidade}
              id="quantidade"
              name="quantidade"
              onChange={(e) => setQuantidade(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="data" className="block text-gray-600 font-medium">
              Data de Cadastro
            </label>
            <input
              type="text"
              value={dataAtual}
              id="data"
              name="data"
              disabled
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
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
                "Cadastrar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
