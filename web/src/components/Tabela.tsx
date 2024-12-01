"use client";
import React, { useState } from "react";

function Tabela() {
  const [filtro, setFiltro] = useState("");
  const [valorFiltro, setValorFiltro] = useState("");
  const dados = [
    {
      projeto: "Projeto A",
      orientador: "Dr. Silva",
      orientando: "Ana",
      status: "Concluído",
      tipo: "Pesquisa",
      area: "Tecnologia",
    },
    {
      projeto: "Projeto B",
      orientador: "Dra. Lima",
      orientando: "João",
      status: "Em andamento",
      tipo: "TCC",
      area: "Saúde",
    },
    {
      projeto: "Projeto C",
      orientador: "Dr. Souza",
      orientando: "Carla",
      status: "Pendente",
      tipo: "Monografia",
      area: "Educação",
    },
  ];

  const getStatusColor = (status: string): { color: string; id: string } => {
    switch (status) {
      case "Concluído":
        return {
          color:
            "shadow-inner text-base rounded-md text-red-400 border-2 border-red-400  flex items-center justify-center",
          id: "status-concluido",
        };
      case "Em andamento":
        return {
          color:
            "shadow-inner text-base rounded-md text-lime-600 border-2 border-lime-600  flex items-center justify-center ",
          id: "status-em-andamento",
        };
      case "Pendente":
        return {
          color:
            "shadow-inner text-base rounded-md text-blue-500 border-2 border-blue-500  flex items-center justify-center",
          id: "status-pendente",
        };
      default:
        return {
          color: " text-black",
          id: "status-indefinido",
        };
    }
  };

  const dadosFiltrados = dados.filter((item) => {
    if (filtro === "projeto") {
      return item.projeto.toLowerCase().includes(valorFiltro.toLowerCase());
    } else if (filtro === "orientador") {
      return item.orientador.toLowerCase().includes(valorFiltro.toLowerCase());
    } else if (filtro === "orientando") {
      return item.orientando.toLowerCase().includes(valorFiltro.toLowerCase());
    } else if (filtro == "status") {
      return item.status.toLowerCase().includes(valorFiltro.toLowerCase());
    }

    return true;
  });

  return (
    <div className="my-10 flex flex-col items-center">
      <div className="mb-4 ml-10 w-auto max-w-4xl flex gap-4">
        <select
          className="p-2 bg-white rounded drop-shadow-md "
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="">Selecione o filtro</option>
          <option value="projeto">Nome do Projeto</option>
          <option value="orientador">Orientador</option>
          <option value="orientando">Orientando</option>
          <option value="status">Status</option>
        </select>
        <input
          type="text"
          className="p-2 w-40 rounded drop-shadow-md"
          placeholder={`Filtrar por ${filtro ? filtro : "..."}`}
          value={valorFiltro}
          onChange={(e) => setValorFiltro(e.target.value)}
        />
      </div>
      <div className="overflow-x-hidden  max-w-4xl">
        <table className="table-auto -collapse bg-white mx-10 text-sm ">
          <thead>
            <tr className="text-gray-600 uppercase text-left">
              <th className="px-4 py-2">Nome do Projeto</th>
              <th className="px-4 py-2">Orientador</th>
              <th className="px-4 py-2">Orientando</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Área de Estudo</th>
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.map((item, index) => {
              const { color, id } = getStatusColor(item.status);
              return (
                <tr className="space-y-4 " key={index}>
                  <td className=" shadow-inner text-base rounded-md px-4 py-2">
                    {item.projeto}
                  </td>
                  <td className=" shadow-inner text-base rounded-md px-4  py-2">
                    {item.orientador}
                  </td>
                  <td className=" shadow-inner text-base rounded-md px-4 py-2">
                    {item.orientando}
                  </td>
                  <td className={`${color}`} id={id}>
                    {item.status}
                  </td>
                  <td className=" shadow-inner text-base rounded-md px-4 py-2">
                    {item.tipo}
                  </td>
                  <td className=" shadow-inner text-base rounded-md px-4 py-2">
                    {item.area}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tabela;
