import Link from "next/link";
import { Header } from "@/components/Header";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import TabelaUserComum from "@/components/TabelaUserComum";

export default async function Home() {
  const token = (await cookies()).has("token");
  const response = await api.get("/projetos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const projetos = await response.data;
  return (
    <div className="">
      <Header></Header>
      <div className="  relative bg-[url('/universidades-publicas-o-que-sao-importancia-lista-insituicoes.jpg')] bg-no-repeat bg-cover bg-center h-screen w-screen overflow-hidden">
        <div className=" grid justify-items-center absolute inset-0 bg-black bg-opacity-70 ">
          <div className="content-center text-white text-5xl  font-bold">
            <h1>Bem-Vindo ao</h1>
            <br />
            <h1> SUP - UFGJW</h1>
          </div>
          <div>
            <p className="text-white font-light  text-xl text-center mx-60">
              O <b>SUP - UFGWF </b> é uma iniciativa criada para unificar o
              gerenciamento de projetos da universidade, além de facilitar o
              acesso da comunidade externa ao conhecimeto gerado.
            </p>
          </div>
          <Link href="/projetos">
            <button className=" h-10 w-auto px-4 font-bold text-white border-4 border-white-600 rounded-full ">
              Ver Projetos
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-zinc-900 w-screen h-auto ">
        <h1 className="text-white font-bold text-4xl text-center pt-5">
          Projetos em andamento
        </h1>
        <div className="my-10 flex justify-center">
          <div className=" h-96   rounded-md bg-white overflow-x-auto">
            <TabelaUserComum projetos={projetos}></TabelaUserComum>
          </div>
        </div>
        <hr className=" mx-16 " />
        <div className="bg-white">
          <h1 className="text-black font-bold text-4xl text-center pt-5">
            Entre em contato
          </h1>

          <div className="my-10">
            <div className=" mx-36 mb-10 drop-shadow-md border-x-2 border-b-2 border-grey-100">
              <div className="space-y-4 grid pl-10 pb-4">
                <h2 className="font-semibold underline">
                  EDUCAÇÃO A DISTÂNCIA
                </h2>
                <p className="text-black ">Email: sup@ufgwj.edu.br</p>
                <p className="text-black ">Telefone: (37) 99999-9999</p>
              </div>
            </div>
            <div className=" mx-36 mb-10  drop-shadow-md border-x-2 border-b-2 border-grey-100">
              <div className="space-y-4 grid pl-10 pb-4">
                <h2 className="font-semibold underline">
                  MATRÍCULAS E TRANSFERÊNCIAS
                </h2>
                <p className="text-black ">Email: sup@ufgwj.edu.br</p>
                <p className="text-black ">Telefone: (37) 99999-9999</p>
              </div>
            </div>
            <div className=" mx-36 mb-10  drop-shadow-md border-x-2 border-b-2 border-grey-100">
              <div className="space-y-4 grid pl-10 pb-4">
                <h2 className="font-semibold underline">REITORIA</h2>
                <p className="text-black ">Email: sup@ufgwj.edu.br</p>
                <p className="text-black ">Telefone: (37) 99999-9999</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
