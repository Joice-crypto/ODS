// "use client";

import { HeaderOrientador } from "@/components/HeaderOrientador";
import React from "react";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import Link from "next/link";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import Tabela from "../../components/Tabela"; // Importando o componente Tabela

dayjs.locale(ptBr);

export default async function OrientadorPage() {
  // Fetching the data directly in the component
  const token = (await cookies()).has("token");
  const response = await api.get("/projetos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const projetos = await response.data;
  return (
    <div>
      <HeaderOrientador />
      <div>
        <div className="text-center mt-10 ">
          <h1 className="text-3xl font-bold">Gerencie seus projetos</h1>
          <Link href="/projetos/cadastrar">
            <button className="bg-black text-white text-center mt-10 rounded-full p-4 w-auto">
              Cadastrar Projeto
            </button>
          </Link>
        </div>
        <Tabela projetos={projetos}></Tabela>
      </div>
    </div>
  );
}
