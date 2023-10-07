import React from "react";
import { useState, useEffect } from "react";
import { GiGasStove } from "react-icons/gi";
import { SlChart } from "react-icons/sl";
import { Tooltip as ReactTooltip } from "react-tooltip";

import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import { PulseLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [categoria, setCategoria] = useState("residencia"); // Padrão para "Residencia"

  const handleSelectChange = (e) => {

    setCategoria(e.target.value);

  };
  
  const handleEnderecoChange = (e) => {
    const enderecoInput = e.target.value;

    // Quebra o endereço em partes: rua, número, bairro, cidade
    const [rua, numero, bairro, cidade] = enderecoInput.split("-");

    const estado = "SP";
    const pais = "Brasil";

    // Formata o endereço de acordo com o padrão esperado
    const enderecoFormatado = `${rua}-${numero}-${bairro}-${cidade}-${estado}-${pais}`;

    setEndereco(enderecoFormatado);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        nome: name,
        endereco: endereco,
        telefone: telefone,
        diasVencimento: vencimento,
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
      setName("");
      setEndereco("");
      setTelefone("");
      setVencimento("");

      setIsLoading(false); // Certifique-se de definir isLoading como falso, mesmo em caso de erro.
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <div className="text-center mb-6">
          <GiGasStove alt="Logo da Empresa" className="mx-auto w-[60px] h-16" />
          <h1 className="text-2xl font-semibold">Cadastrar cliente</h1>
          <Link
            to="/venda"
            className="text-blue-500 hover:underline"
          >
            Já existe o cliente?
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
            <label htmlFor="nome" className="block text-gray-600 font-medium">
              Nome
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="nome"
              value={name}
              name="nome"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="endereco"
              className="block text-gray-600 font-medium"
            >
              Endereço
            </label>
            <input
              type="text"
              value={endereco}
              id="endereco"
              name="endereco"
              onChange={handleEnderecoChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Rua rubens fiori 303 Jd california Sertãozinho"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="categoria"
              className="block text-gray-600 font-medium"
            >
              Categoria
            </label>
            <select
              id="categoria"
              value={categoria}
              name="categoria"
              onChange={handleSelectChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="residencia">Residencia</option>
              <option value="automatica">Automatica</option>
              <option value="estabelecimento">Estabelecimento</option>
              <option value="portaria">Portaria</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="endereco"
              className="block text-gray-600 font-medium"
            >
              Vencimento
            </label>
            <input
              type="number"
              value={vencimento}
              id="vencimento"
              name="vencimento"
              onChange={(e) => setVencimento(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Quantos dias ate o gas acabar?"
            />
          </div>
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
