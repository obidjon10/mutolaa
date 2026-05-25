import { getServerIsAuthenticated } from "@/lib/server-auth";
import { Main } from "@/modules/purchased-books";

export default async function Page() {
  const initialIsAuthenticated = await getServerIsAuthenticated();

  return <Main initialIsAuthenticated={initialIsAuthenticated} />;
}
