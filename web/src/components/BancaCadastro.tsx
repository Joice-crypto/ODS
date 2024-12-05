"use client";
import { api } from "@/lib/api";
import { FormEvent } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export function BancaCadastro() {
  const router = useRouter();
  const params = useParams();

  async function handleCreateBanca(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log(params.cadastro);

    const token = Cookie.get("token");

    //console.log(token);

    const res = await api.post(
      "/projeto/bancaAvaliadora",
      {
        projeto_id: params.cadastro,
        tipo: formData.get("tipo"),
        nome: formData.get("nome"),
        ies: formData.get("ies"),
        membro_id: formData.get("membro_id"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log(res);
    router.push("/orientador");
  }

  return (
    <div className="mb-28 ">
      <form onSubmit={handleCreateBanca} className="  max-w-2xl  mx-auto mt-10">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nome do Membro
          </label>
          <input
            type="text"
            name="nome"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Membro faz parte da Instituição?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="membro_id"
                value="sim"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-900 dark:text-white">Sim</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="membro_id"
                value="nao"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-900 dark:text-white">Não</span>
            </label>
          </div>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Instituição Superior de Ensino
          </label>
          <input
            type="text"
            name="ies"
            id="orientador_cpf"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tipo
          </label>
          <input
            type="text"
            name="tipo"
            id="proeto"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white grid col-span-2 align-middle mb-5  bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cadastrar Banca
        </button>
      </form>
    </div>
  );
}
