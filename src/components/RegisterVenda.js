import React, { useState, useEffect } from "react";
import { FcSalesPerformance } from "react-icons/fc";
import { SlChart } from "react-icons/sl";
import { ImExit } from "react-icons/im";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Select from "react-select";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import axios from "axios";

function CustomSelect(props) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <Select {...props} />
    </div>
  );
}

export default function VendaRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  // const [selectedClientName, setSelectedClientName] = useState(null);
  // const [selectedClientTell, setSelectedClientTell] = useState(null);
  // const [selectedClientEnd, setSelectedClientEnd] = useState(null);
  // const [selectedClientRole, setSelectedClientRole] = useState(null);
  // const [selectedClientDays, setSelectedClientDays] = useState(null);
  // const dataAtual = new Date().toLocaleDateString();

  let userLoggedInObject = localStorage.getItem("userLoggedIn");
  let userLoggedIn = JSON.parse(userLoggedInObject);
  const token = userLoggedIn.token;

  const navigate = useNavigate();

  const headers = {
    Authorization: `${token}`,
  };

  useEffect(() => {
    // Função para buscar dados da API com base no valor de pesquisa
    const fetchData = async (filterValue) => {
      try {
        const response = await fetch(
          `https://gas-controller-f4c05ad03233.herokuapp.com/cliente?search=${filterValue}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchValue.trim() !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  const handleLogout = () => {
    // Limpa o localStorage
    localStorage.clear();
    
    navigate('/')
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      let selectedId = selectedOption.value[0];
      // let selectedName = selectedOption.value[1];
      // let selectedTell = selectedOption.value[2];
      // let selectedEndereco = selectedOption.value[3];
      // let selectedRole = selectedOption.value[4];
      // let selectedDiasVencimento = selectedOption.value[5];

      setSelectedClientId(selectedId);
      setSelectedOption(selectedOption);
      setSearchValue(selectedOption.label);
    }
  };

  const handleValorChange = (e) => {
    const novoValor = e.target.value.replace(/\D/g, "");
    const valorEmCentavos = parseInt(novoValor, 10);

    if (!isNaN(valorEmCentavos)) {
      // Formate o valor para ter duas casas decimais
      const valorFormatado = (valorEmCentavos / 100).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setPreco(valorFormatado);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {

      const response = await axios.post(
        "https://gas-controller-f4c05ad03233.herokuapp.com/venda",
        {
          preco: parseFloat(preco),
          quantidade: parseFloat(quantidade),
          cliente: {
            id: selectedClientId,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Sucesso! Venda feita.");
      } else {
        toast.error("Erro! Verifique se os dados estão corretos.");
      }
    } catch (error) {
      console.error("Erro ao enviar o FORM:", error);
      toast.error("Erro! Verifique sua conexão de rede.");
    } finally {
      setPreco("");
      setQuantidade("");
      // Definir isLoading para false após o término da requisição, seja sucesso ou falha.
      setIsLoading(false);
    }
  };

  const handleInputChange = (newValue) => {
    setSearchValue(newValue);
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
          className="cursor-pointer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link to="/cliente">
            <SlChart
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Pagina de Relatórios"
            />
            <ReactTooltip id="my-tooltip" />
          </Link>
          <Link onClick={handleLogout} to="/">
            <ImExit
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Sair / Logout"
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
              Contato
            </label>

            <CustomSelect
              id="telefone"
              value={selectedOption}
              onInputChange={handleInputChange}
              options={searchResults.map((result) => ({
                label: `${result.nome} - ${result.telefone}`,
                value: [
                  result.id,
                  result.nome,
                  result.telefone,
                  result.endereco,
                  result.role,
                  result.diasVencimento,
                ],
              }))}
              onChange={handleSelectChange}
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
              placeholder="00,00"
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
              placeholder="2"
            />
          </div>

          {/* <div className="mb-4">
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
          </div> */}

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
                "Vender"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
