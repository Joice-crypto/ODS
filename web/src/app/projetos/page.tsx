import Tabela from "../../components/Tabela";

export default function Projetos() {
  return (
    <div>
      <div className="text-center mt-10 ">
        <h1 className="text-3xl font-bold">Gerencie seus projetos</h1>
        <a href="projetos/cadastrar/">
          <button className="bg-black text-white text-center mt-10 rounded-full p-4 w-auto">
            Cadastrar Projeto
          </button>
        </a>
      </div>
      <div className="border-2  mx-32 mt-6 shadow-lg shadow-grey-300/50">
        <Tabela></Tabela>
      </div>
    </div>
  );
}
