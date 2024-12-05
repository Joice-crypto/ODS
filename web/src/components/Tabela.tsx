"use client";

import dayjs from "dayjs";
import { useState, useEffect } from "react";
import ptBr from "dayjs/locale/pt-br";
import Link from "next/link";

interface Projetos {
  id: string;
  nome: string;
  data_inicio: string;
  data_termino: string;
  descricao: string;
  tipo: string;
  orientador_cpf: string;
  banca_avaliadora_convidada: string;
  apresentacoes: string;
  banca_local: string;
  banca_data: string;
  status: string;
}

interface TabelaProps {
  projetos: Projetos[];
}

const Tabela = ({ projetos }: TabelaProps) => {
  const [filtro, setFiltro] = useState("");
  const [valorFiltro, setValorFiltro] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dadosFiltrados = projetos.filter((item) => {
    if (filtro === "projeto") {
      return item.nome.toLowerCase().includes(valorFiltro.toLowerCase());
    } else if (filtro === "status") {
      return item.status.toLowerCase().includes(valorFiltro.toLowerCase());
    } else if (filtro === "orientador") {
      return item.orientador_cpf
        .toLowerCase()
        .includes(valorFiltro.toLowerCase());
    }
    return true;
  });
  if (!isClient) {
    return null;
  }
  return (
    <div className="my-10 flex flex-col items-center">
      <div className="mb-4 ml-10 w-auto max-w-4xl flex gap-4">
        <select
          className="p-2 bg-white rounded drop-shadow-md"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="">Selecione o filtro</option>
          <option value="projeto">Nome do Projeto</option>
          <option value="orientador">CPF do Orientador</option>
          <option value="status">Status</option>
        </select>
        <input
          type="text"
          className="p-2 w-40 rounded drop-shadow-md"
          placeholder={`Filtrar por ${filtro || "..."}`}
          value={valorFiltro}
          onChange={(e) => setValorFiltro(e.target.value)}
        />
      </div>
      {/* Tabela */}
      <div className="overflow-x-hidden max-w-4xl">
        <table className="table-auto bg-white mx-10 text-sm">
          <thead>
            <tr className="text-gray-600 uppercase text-left">
              <th className="px-4 py-2">Nome do Projeto</th>
              <th className="px-4 py-2">Data Início</th>
              <th className="px-4 py-2">Data Término</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Orientador (CPF)</th>
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.map((item) => (
              <tr key={item.id} className="space-y-4">
                <td className="shadow-inner text-base rounded-md px-4 py-2">
                  <Link
                    href={`http://localhost:3000/projetos/informacoes/${item.id}`}
                  >
                    {item.nome}
                  </Link>
                </td>

                <td className="shadow-inner text-base rounded-md px-4 py-2">
                  {dayjs(item.data_inicio).format("DD[/]MM[/]YY ")}
                </td>
                <td className="shadow-inner text-base rounded-md px-4 py-2">
                  {dayjs(item.data_termino).format("DD[/]MM[/]YY ")}
                </td>
                <td className="shadow-inner text-base rounded-md px-4 py-2">
                  {item.status}
                </td>
                <td className="shadow-inner text-base rounded-md px-4 py-2">
                  {item.tipo}
                </td>
                <td className="shadow-inner text-base rounded-md px-4 py-2">
                  {item.orientador_cpf}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tabela;
