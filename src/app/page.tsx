import Tabela from "./components/Tabela";

export default function Home() {
  return (
    <div className="">
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
          <a href="/projetos">
            <button className=" h-10 w-auto px-4 font-bold text-white border-4 border-white-600 rounded-full ">
              Ver Projetos
            </button>
          </a>
        </div>
      </div>
      <div className="bg-zinc-900 h-screen">
        <h1 className="text-white font-bold text-4xl text-center pt-5">
          Projetos em andamento
        </h1>
        <div className="my-10 flex justify-center">
          <div className=" h-96   rounded-md bg-white overflow-x-auto">
            <Tabela></Tabela>
          </div>
        </div>
        <hr className=" mx-16 " />
        <div className="bg-zinc-900">
          <h1 className="text-white font-bold text-4xl text-center pt-5">
            Entre em contato
          </h1>

          <p className="text-white mt-10 ml-20">Email: sup@ufgwj.edu.br</p>
          <p className="text-white ml-20">Telefone: (37) 99946-9759</p>
          <p className="text-white ml-20 pb-10 ">&copy; 2024 UFGWJ</p>
        </div>
      </div>
    </div>
  );
}
