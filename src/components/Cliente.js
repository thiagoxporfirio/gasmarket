import React, { useState, useEffect } from "react";
import { ImExit, ImEnter } from "react-icons/im";
import { Table, Select, Modal, Input, DatePicker } from "antd";
import { format } from "date-fns";
import { isBefore } from "date-fns";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FcDatabase, FcDataRecovery } from "react-icons/fc";

import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

const { Option } = Select;

export default function ClientList() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("allClients");
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTextEnd, setSearchTextEnd] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();

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
        } else if (selectedOption === "allCloseSell") {
          response = await axios.get(
            "https://gas-controller-f4c05ad03233.herokuapp.com/relatorio ",
            {
              headers: headers,
            }
          );

          setColumns(columnsAllClose);
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

  useEffect(() => {
    handleSalesPeriodChange();
  }, [startDate, endDate]);

  async function sendWpp(record) {
    const GZAPPY_URL = "https://api.gzappy.com/v1/message/send-message";
    const phoneOption = `55${record.telefone}`;
    const message = `Prezado(a) ${record.nome},
  
Aqui é do Rafa Gás, vi no seu cadastro que seu gás esta preste a acabar, verifique o seu gás. Precisando  estaremos sempre a disposição para atendê-lo!!

Atenciosamente,
[Rafa Gás]`;

    const response = await fetch(GZAPPY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user_token_id: "78294aae-25fa-4752-b560-dff5fa1e0646",
      },
      body: JSON.stringify({
        instance_id: "Y161MAZZVOUM9A0O09SJXB25",
        instance_token: "5923f09c-4c25-4fa4-b211-798841da327a",
        message: [message],
        phone: phoneOption,
      }),
    });

    const data = await response.json();

    console.log(data);
    // { msg: 'Messages sent' }
  }

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  const handleSearch = () => {
    const filteredData = data.filter((item) =>
      item.cliente.nome.toLowerCase().includes(searchText.toLowerCase())
    );

    setData(filteredData);
  };

  const handleSearchEnd = () => {
    const filteredData2 = data.filter((item) =>
      item.endereco.toLowerCase().includes(searchText.toLowerCase())
    );

    setData(filteredData2);
  };

  const handleSearchEnd2 = () => {
    const filteredData3 = data.filter((item) =>
      item.cliente.endereco.toLowerCase().includes(searchTextEnd.toLowerCase())
    );

    setData(filteredData3);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setDataFetched(false); // Reset da marcação de dados carregados
  };

  const handleSalesPeriodChange = (value) => {
    const currentDate = new Date();

    const filteredSales = data.filter((sale) => {
      const saleDate = new Date(sale.cliente?.created_at);

      return (
        isBefore(saleDate, currentDate) &&
        (startDate ? isBefore(startDate, saleDate) : true) &&
        (endDate ? isBefore(saleDate, endDate) : true)
      );
    });

    setData(filteredSales);
  };

  const handleGoBack = () => {
    navigate("/registerclients");
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const showSendModal = (record) => {
    Modal.success({
      title: "Enviar SMS",
      content: (
        <div>
          <p>
            {`Enviar menssagem para: ${record.nome}?`}
            <br />
            {`Numero: ${record.telefone}`}
          </p>
        </div>
      ),
      onOk: () => {
        sendWpp(record);
      },
    });
  };

  const showDeleteModal = (record) => {
    Modal.confirm({
      title: "Excluir Cliente",
      content: `Tem certeza que deseja excluir o cliente ${record.nome}?`,
      onOk: () => handleDeleteClient(record.id),
    });
  };

  const handleDeleteClient = (clienteId) => {
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
            title: "Erro para Excluir",
            content:
              "Ocorreu um erro ao excluir o cliente. Verifique sua conexão e tente novamente.",
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir cliente:", error);
        Modal.error({
          title: "Erro para Excluir",
          content:
            "Ocorreu um erro ao excluir o cliente. Verifique sua conexão e tente novamente.",
        });
      });
  };

  const showDeleteSell = (record) => {
    Modal.confirm({
      title: "Excluir Venda",
      content: `Tem certeza que deseja excluir a venda de ${record.cliente.nome}?`,
      onOk: () => handleDeleteSell(record.id),
    });
  };

  const handleDeleteSell = (SellId) => {
    axios
      .delete(
        `https://gas-controller-f4c05ad03233.herokuapp.com/venda/${SellId}`,
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          Modal.success({
            title: "Venda excluida",
            content: `A venda foi excluída com sucesso.`,
          });

          setDataFetched(false);
        } else {
          Modal.error({
            title: "Erro para Excluir",
            content:
              "Ocorreu um erro ao excluir a venda. Verifique sua conexão e tente novamente.",
          });
        }
      })
      .catch((error) => {
        console.error("Erro a venda do cliente:", error);
        Modal.error({
          title: "Erro para Excluir",
          content:
            "Ocorreu um erro ao excluir a venda. Verifique sua conexão e tente novamente.",
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
        <>
          <a onClick={() => showDeleteModal(record)}>
            <DeleteOutlined /> Excluir
          </a>
          <br />
          <a onClick={() => showSendModal(record)}>
            <ArrowRightOutlined /> Enviar menssagem
          </a>
        </>
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
      render: (text) => <p>{text + `,00 R$`}</p>,
    },
    {
      title: "Tipo do Cliente",
      dataIndex: ["cliente", "role"],
      key: "cliente.role",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Data da venda",
      dataIndex: ["cliente", "created_at"],
      key: "cliente.created_at",
      render: (text) => {
        const formattedDate = format(new Date(text), "dd/MM/yyyy HH:mm:ss");
        return <p>{formattedDate}</p>;
      },
    },
    {
      title: "Vencimento",
      dataIndex: ["cliente", "diasVencimento"],
      key: "cliente.diasVencimento",
      render: (text) => {
        let days = text;

        return (
          <>
            {text > 0 ? (
              <a>
                {<FcDatabase />} {text} Dias
              </a>
            ) : (
              <div>
                <a>
                  <FcDataRecovery /> Venceu!
                </a>
                <a onClick={() => showDeleteSell()}>
                  <DeleteOutlined /> Excluir
                </a>
              </div>
            )}
          </>
        );
      },
    },
  ];

  const columnsAllClose = [
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
        <>
          <a onClick={() => showDeleteSell(record)}>
            <DeleteOutlined /> Excluir
          </a>
          <br />
          <a onClick={() => showSendModal(record)}>
            <ArrowRightOutlined /> Enviar menssagem
          </a>
        </>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-start items-center justify-center gap-4">
        <Link
          onClick={handleGoBack}
          to="/registerclients"
          className="text-blue-500 flex items-center"
        >
          Voltar
          <ImEnter
            style={{ fontSize: "28px" }}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Voltar a pagina"
          />
          <ReactTooltip id="my-tooltip" />
        </Link>
        <Link
          onClick={handleLogout}
          to="/"
          className="text-blue-500 flex items-center"
        >
          <ImExit
            style={{ fontSize: "28px" }}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Sair / Logout"
          />
          Sair
          <ReactTooltip id="my-tooltip" />
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Lista de Clientes e Vendas
      </h2>
      <div className="flex gap-10">
        <div className="mb-4 flex gap-10">
          <div>
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
              <Option value="allCloseSell">Vendas a vencer</Option>
            </Select>
          </div>
          {selectedOption === "allClients" && (
            <div className="">
              <label
                htmlFor="searchInput"
                className="block text-gray-600 font-medium"
              >
                Endereco:
              </label>
              <Input
                id="searchInput"
                placeholder="Digite o endereco do cliente"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  if (e.target.value === "") {
                    // Se o campo de pesquisa estiver vazio, atualize a opção selecionada para "allClients"
                    handleSelectChange("allClients");
                  }
                }}
                style={{ width: 200 }}
              />
              <SearchOutlined
                onClick={handleSearchEnd}
                type="primary"
                className="ml-2 text-gray-600 group hover:text-blue-500 cursor-pointer"
              />
            </div>
          )}
        </div>
        {selectedOption === "allSales" && (
          <div className="mb-4 flex gap-10">
            <div className="">
              <label
                htmlFor="searchInput"
                className="block text-gray-600 font-medium"
              >
                Endereco:
              </label>
              <Input
                id="searchInput"
                placeholder="Digite o endereco do cliente"
                value={searchTextEnd}
                onChange={(e) => {
                  setSearchTextEnd(e.target.value);
                  if (e.target.value === "") {
                    // Se o campo de pesquisa estiver vazio, atualize a opção selecionada para "allClients"
                    handleSelectChange("allSales");
                  }
                }}
                style={{ width: 200 }}
              />
              <SearchOutlined
                onClick={handleSearchEnd2}
                type="primary"
                className="ml-2 text-gray-600 group hover:text-blue-500 cursor-pointer"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="salesPeriod"
                className="block text-gray-600 font-medium"
              >
                Período de vendas:
              </label>
              <DatePicker.RangePicker
                id="dateRangePicker"
                onChange={(dates) => {
                  setStartDate(dates[0]);
                  setEndDate(dates[1]);
                }}
                style={{ width: 280 }}
              />
            </div>
            <div>
              <label
                htmlFor="searchInput"
                className="block text-gray-600 font-medium"
              >
                Pesquisar por Nome:
              </label>
              <Input
                id="searchInput"
                placeholder="Digite o nome do cliente"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  if (e.target.value === "") {
                    // Se o campo de pesquisa estiver vazio, atualize a opção selecionada para "allSales"
                    handleSelectChange("allSales");
                  }
                }}
                style={{ width: 200 }}
              />
              <SearchOutlined
                onClick={handleSearch}
                type="primary"
                className="ml-2 text-gray-600 group hover:text-blue-500 cursor-pointer"
              />
            </div>
          </div>
        )}
        {selectedOption === "allCloseSell" && (
          <div className="mb-4">
            <label
              htmlFor="salesPeriod"
              className="block text-gray-600 font-medium"
            >
              Período de vendas:
            </label>
            <DatePicker.RangePicker
              id="dateRangePicker"
              onChange={(dates) => {
                setStartDate(dates[0]);
                setEndDate(dates[1]);
              }}
              style={{ width: 280 }}
            />
          </div>
        )}
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
