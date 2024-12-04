import { getUser } from "@/lib/auth";

export async function HeaderDep() {
  const user = getUser();

  return <div></div>;
}
