import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { verifyJwt } from "./jwt";

export type todoType = any;
export async function fetchTodolist(id: number) {
  noStore();
  // const accessToken = request.headers.get("authorization");
  // if (!accessToken || !verifyJwt(accessToken)) {
  //   return new Response(JSON.stringify({ error: "No Authorization" }), {
  //     status: 401,
  //   });
  // }
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a reponse for demo purposes.
    // Don't do this in real life :)

    // console.log('Fetching revenue data...');

    // await new Promise((resolve) => setTimeout(resolve, 3000)); 데이터 느리게 받아오기

    const data =
      await sql<todoType>`SELECT * FROM todolist where user_id=${id}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getUser(email: string) {
  noStore();

  try {
    const user = await sql`SELECT * from USERS where email=${email}`;
    return user.rows[0] as any;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
