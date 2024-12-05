"use client";
import { api } from "@/lib/api";
import { FormEvent } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export function ProjetoOrientandoadastro() {
  const router = useRouter();
  const params = useParams();

  async function handleCreateProjetoOrientando(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log(params.cadastro);

    const token = Cookie.get("token");

    //console.log(token);

    const res = await api.post(
      "/projeto/orientando",
      {
        projeto_id: params.cadastro,
        orientando_cpf: formData.get("orientando_cpf"),
        data_entrada: formData.get(" data_entrada"),
        data_saida: formData.get("data_saida"),
        situacao: formData.get("situacao"),
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
      <form
        onSubmit={handleCreateProjetoOrientando}
        className="  max-w-2xl  mx-auto mt-10"
      >
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Orientando CPF
          </label>
          <input
            type="text"
            name="orientando_cpf"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Data de Entrada
          </label>
          <input
            type="date"
            name="data_entrada"
            id="data_entrada"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Data Saída
          </label>
          <input
            type="date"
            name="data_saida"
            id="data_entrada"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Situação
          </label>
          <input
            type="text"
            name="situacao"
            id="data_entrada"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="text-white ml-64  align-middle mb-5  bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cadastrar Orientando
        </button>
      </form>
    </div>
  );
}
