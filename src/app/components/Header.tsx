export function Header() {
  return (
    <div>
      <header className="bg-inherit ml-5 h-20 grid grid-rows-1 grid-flow-col gap-x-1">
        <a className="text-dark text-xl font-sans p-9" href="/">
          SUP - UFGJW
        </a>
        <ul className=" p-9 grid grid-rows grid-flow-col">
          <li>Início</li>
          <a href="/projetos">
            <li>Projetos</li>
          </a>
          <li>Contato</li>
          <a href="#">
            <li className=" bg-black h-10 w-28 text-white rounded-full text-center pt-2">
              Login
            </li>
          </a>
        </ul>
      </header>
    </div>
  );
}
