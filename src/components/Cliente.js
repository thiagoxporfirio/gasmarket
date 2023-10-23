import React, { useState, useEffect } from "react";
import { FaArrowLeft } from 'react-icons/fa'

export default function ClientList() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("allClients");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (selectedOption === "allClients") {
          response = await fetch("https://sua-api.com/clientes");
        } else if (selectedOption === "allSales") {
          response = await fetch("https://sua-api.com/vendas");
        }

        if (response) {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };

    fetchData();
  }, [selectedOption]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleGoBack = () => {
    window.history.goBack(); // Navega de volta para a página anterior
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <button
        onClick={handleGoBack}
        className="bg-blue-500 text-white rounded p-2"
      >
        <FaArrowLeft />
      </button>
      <h2 className="text-2xl font-semibold mb-4">
        Lista de Clientes e Vendas
      </h2>
      <div className="mb-4">
        <label htmlFor="selectOption" className="block text-gray-600 font-medium">
          Selecione uma opção:
        </label>
        <select
          id="selectOption"
          name="selectOption"
          value={selectedOption}
          onChange={handleSelectChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="allClients">Todos os Clientes</option>
          <option value="allSales">Todas as Vendas</option>
        </select>
      </div>
      <ul>
        {selectedOption === "allClients" &&
          data.map((client) => (
            <li key={client.id}>
              <h3 className="text-lg font-medium">{client.nome}</h3>
              <p>Telefone: {client.telefone}</p>
              <p>Endereço: {client.endereco}</p>
              <hr className="my-2" />
            </li>
          ))}
        {selectedOption === "allSales" &&
          data.map((sale) => (
            <li key={sale.id}>
              <h3 className="text-lg font-medium">Venda</h3>
              <p>Preço: {sale.preco}</p>
              <p>Tipo do Cliente: {sale.tipoCliente}</p>
              <hr className="my-2" />
            </li>
          ))}
      </ul>
    </div>
  );
}
