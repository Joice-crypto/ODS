import { HeaderOrientador } from "@/components/HeaderOrientador";
import Link from "next/link";

export default function orientador() {
  return (
    <div>
      <HeaderOrientador></HeaderOrientador>

      <div>
        <div className="text-center mt-10 ">
          <h1 className="text-3xl font-bold">Gerencie seus projetos</h1>

          <Link href="/projetos/cadastrar">
            <button className="bg-black text-white text-center mt-10 rounded-full p-4 w-auto">
              Cadastrar Projeto
            </button>
          </Link>
        </div>
        <div className="border-2  mx-32 mt-6 shadow-lg shadow-grey-300/50">
          {/* <Tabela></Tabela> */}
        </div>
      </div>
    </div>
  );
}
