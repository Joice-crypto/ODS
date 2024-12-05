// components/InformacoesContent.js
"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";

export default function InformacoesContent() {
  const [projeto, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    async function fetchProject() {
      const token = Cookies.get("token");

      try {
        const response = await api.get(`/projeto/${params.info}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          throw new Error("Erro ao buscar projeto");
        }

        const data = response.data;
        console.log(data);
        setProject(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (params.info) {
      fetchProject();
    }
  }, [params.info]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!projeto) {
    return <p>Projeto não encontrado.</p>;
  }

  return (
    <div className="flex m-14 space-x-4">
      <div className="flex-1 shadow-lg p-5 rounded-lg">
        <h1 className="text-xl font-semibold mb-2">Resumo do Projeto</h1>
        <p className="py-3">Nome do projeto: {projeto.nome}</p>
        <p className="py-3">
          Orientador: {projeto.Orientador?.usuarioComum?.nome}
        </p>
        <div className="py-3 flex items-center">
          <span>Orientando:</span>
          <button className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500 hover:text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <button className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500 hover:text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
        </div>
        <p className="py-3">Tipo: {projeto.tipo}</p>
        <p className="py-3">Data Início: {projeto.data_inicio}</p>
        <p className="py-3">Data de Termino: {projeto.data_termino}</p>
        <p className="py-3">Local da Banca: {projeto.banca_local}</p>
        <div className="py-3 flex items-center">
          <span className="py-3">
            Banca Avaliadora : {projeto.BancaAvaliadora[0]?.nome}
          </span>
          <a href={`/bancaAvaliadora/cadastrar/${projeto.id}`}>
            <button className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500 hover:text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </a>
          <button className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500 hover:text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
        </div>

        <p className="py-3">Status: {projeto.status}</p>
        <p className="py-3">Descrição: {projeto.descricao}</p>

        <button className="bg-red-700 ml-48 mt-4 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full">
          Apagar Projeto
        </button>
      </div>
      <div className="flex-1 shadow-lg p-4 rounded-lg">
        <h1 className="text-xl font-semibold mb-2">Certificados</h1>
      </div>
    </div>
  );
}
