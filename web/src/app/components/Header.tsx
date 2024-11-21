import Link from "next/link";

export function Header() {
  return (
    <div>
      <header className=" w-screen h-20 grid grid-rows-1   ">
        <ul className=" p-9 ">
          <div className="flex justify-between ">
            <Link className="text-dark text-xl font-sans " href="/">
              SUP - UFGJW
            </Link>
            <li className="p-2">Início</li>
            <Link href="/projetos">
              <li className="p-2">Projetos</li>
            </Link>
            <li className="p-2">Contato</li>

            <Link href="#">
              <li className=" place-self-end  ml-20 bg-black w-36 p-2 text-white rounded-full text-center ">
                Login
              </li>
            </Link>
          </div>
        </ul>
      </header>
    </div>
  );
}
