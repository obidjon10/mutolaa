import { cookies } from "next/headers";

export const getServerToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
};

export const getServerIsAuthenticated = async (): Promise<boolean> => !!(await getServerToken());
