import { getServerIsAuthenticated } from "@/lib/server-auth";
import { Main } from "@/modules/my-library";

export default async function Page() {
  const [initialIsAuthenticated] = await Promise.all([
    getServerIsAuthenticated(),
  ]);

  return <Main initialIsAuthenticated={initialIsAuthenticated} />;
}
