import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession() {
     try {
  const session = await cookies();
  const token = session.get("access_token")?.value;
  if (!token)  return null;
   
    const result: any = await scalekit.validateToken(token);
    const user = await scalekit.user.getUser(result.sub);
    return user;
  } catch (error) {
    console.log(error);
  }
}
