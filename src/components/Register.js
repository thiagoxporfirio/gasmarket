import React from "react";
import { useState, useEffect } from "react";
import { GiGasStove } from "react-icons/gi";

import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Register() {
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "pessoa",
    endereco: "",
    telefone: "",
    valor: "",
  });

  const formatarValor = (valor) => {
    return `R$ ${valor}`;
  };


  const handleValorChange = (e) => {
    const novoValor = e.target.value.replace(/\D/g, ""); // Remove não números
    setFormData({
      ...formData,
      valor: novoValor
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if(response.ok){
        setFormData({
          nome: "",
          categoria: "pessoa",
          endereco: "",
          telefone: "",
          valor: "",
        });
      }else{
        toast.error("Error! Verifique se os dados estao corretos.")
      }
    }catch(error){
      console.error("Error ao enviar o FORM:", error)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <div className="text-center mb-6">
          <GiGasStove alt="Logo da Empresa" className="mx-auto w-[60px] h-16" />
          <h1 className="text-2xl font-semibold">Cadastrar cliente</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-600 font-medium">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
              name="categoria"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="pessoa">Residencia</option>
              <option value="rua">Automatica</option>
              <option value="estabelecimento">Estabelecimento</option>
            </select>
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
              id="endereco"
              name="endereco"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Av presidente castelo branco, Centro 453"
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
              name="telefone"
              mask="(99) 99999-9999"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="(00) 00000-0000"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="valor" className="block text-gray-600 font-medium">
              Valor
            </label>
            <input
              type="text"
              id="valor"
              name="valor"
              // value={valor}
              onChange={handleValorChange}
              className=" w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 justify-start "
              placeholder="0.00"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
