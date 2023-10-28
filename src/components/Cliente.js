import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Table, Select, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import axios from "axios";

const { Option } = Select;

export default function ClientList() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("allClients");
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const [columns, setColumns] = useState([]);

  let userLoggedInObject = localStorage.getItem("userLoggedIn");
  let userLoggedIn = JSON.parse(userLoggedInObject);
  const token = userLoggedIn.token;

  const headers = {
    Authorization: `${token}`,
  };

  useEffect(() => {
    if (dataFetched) {
      // Dados já carregados, não faz nada.
      return;
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        let response;

        if (selectedOption === "allClients") {
          response = await axios.get(
            "https://gas-controller-f4c05ad03233.herokuapp.com/cliente",
            {
              headers: headers,
            }
          );

          setColumns(columnsAllClients);
        } else if (selectedOption === "allSales") {
          response = await axios.get(
            "https://gas-controller-f4c05ad03233.herokuapp.com/venda",
            {
              headers: headers,
            }
          );

          setColumns(columnsAllSales);
        }

        if (response && Array.isArray(response.data)) {
          setData(response.data);
          setDataFetched(true); // Marca os dados como carregados
        }
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOption, headers, dataFetched]);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setDataFetched(false); // Reset da marcação de dados carregados
  };

  const handleGoBack = () => {
    window.history.goBack(); // Navega de volta para a página anterior
  };

  const showDeleteModal = (record) => {
    Modal.confirm({
      title: "Confirmação de Exclusão",
      content: `Tem certeza que deseja excluir o cliente ${record.nome}?`,
      onOk: () => handleDeleteClient(record.id), // Aqui, você deve implementar a função de exclusão do cliente
    });
  };

  const handleDeleteClient = (clienteId) => {
    console.log(clienteId)
    axios
      .delete(
        `https://gas-controller-f4c05ad03233.herokuapp.com/cliente/${clienteId}`,
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          Modal.success({
            title: "Cliente Excluído",
            content: `O cliente foi excluído com sucesso.`,
          });

        setDataFetched(false);
        } else {
          Modal.error({
            title: "Erro na Exclusão",
            content:
              "Ocorreu um erro ao excluir o cliente. Verifique sua conexão e tente novamente.",
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir cliente:", error);
        Modal.error({
          title: "Erro na Exclusão",
          content:
            "Ocorreu um erro ao excluir o cliente. Verifique sua conexão e tente novamente.",
        });
      });
  };

  const columnsAllClients = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      render: (text) => <h3 className="text-lg font-medium">{text}</h3>,
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
      render: (text) => {
        // Verifique se o número de telefone tem a quantidade correta de dígitos
        if (text && text.length === 11) {
          return `(${text.substring(0, 2)}) ${text.substring(
            2,
            7
          )}-${text.substring(7)}`;
        } else {
          return text;
        }
      },
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Tipo do Cliente",
      dataIndex: ["role"],
      key: "role",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <a onClick={() => showDeleteModal(record)}>
          {" "}
          {/* Aqui, chamamos a função para mostrar o modal */}
          <DeleteOutlined /> Excluir
        </a>
      ),
    },
  ];

  const columnsAllSales = [
    {
      title: "Nome",
      dataIndex: ["cliente", "nome"],
      key: "cliente.nome",
      render: (text) => <h3 className="text-lg font-medium">{text}</h3>,
    },
    {
      title: "Quantidade de Gas",
      dataIndex: "quantidade",
      key: "quantidade",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Preço",
      dataIndex: "preco",
      key: "preco",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Tipo do Cliente",
      dataIndex: ["cliente", "role"],
      key: "cliente.role",
      render: (text) => <p>{text}</p>,
    },
  ];

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
        <label
          htmlFor="selectOption"
          className="block text-gray-600 font-medium"
        >
          Selecione uma opção:
        </label>
        <Select
          id="selectOption"
          value={selectedOption}
          onChange={handleSelectChange}
          style={{ width: 200 }}
        >
          <Option value="allClients">Todos os Clientes</Option>
          <Option value="allSales">Todas as Vendas</Option>
        </Select>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
}
