"use server";
import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const bcrypt = require("bcrypt");

//로그인
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
// const insertedUsers = await Promise.all(
//   users.map(async (user) => {
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     return client.sql`
//       INSERT INTO users (id, name, email, password)
//       VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//       ON CONFLICT (id) DO NOTHING;
//     `;
//   })
// );

//회원가입
export async function signup(
  prevState: string | undefined,
  formData: FormData
) {
  const email: FormDataEntryValue = formData.get("email") as string;
  const name: FormDataEntryValue = formData.get("name") as string;
  const password: FormDataEntryValue = formData.get("password") as string;
  const passwordCheck: FormDataEntryValue = formData.get(
    "passwordCheck"
  ) as string;

  if (password !== passwordCheck) throw "비밀번호 일치 x";
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await sql`
            INSERT INTO users (email, name, password)
            VALUES (${email},${name},${hashedPassword})
          `;
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
  redirect("/login");
}

//투두 만들기
export async function createTodo(userId: number, formData: FormData) {
  const title: FormDataEntryValue = formData.get("title") as string;
  const detail: FormDataEntryValue = formData.get("detail") as string;
  const date = new Date().toISOString().split("T")[0];

  if (!title || !detail) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  try {
    await sql`
            INSERT INTO todolist (user_id, title, detail, status, date)
            VALUES (${userId.toString()}, ${title}, ${detail}, 'pending', ${date})
          `;
    // 작업이 끝난 후 formData의 모든 값을 지웁니다.
    formData.delete("title");
    formData.delete("detail");
  } catch (error) {
    console.log(error);
    return { message: "Database Error: Failed to Update Invoice." };
  }

  // 작업이 끝난 후 formData의 모든 값을 지웁니다.
  formData = new FormData();
  revalidatePath("/dashboard/todolist");
}

//투두 내용 수정
export async function updateTodo(id: string, formData: FormData) {
  const date = new Date().toISOString().split("T")[0];
  const title: FormDataEntryValue = formData.get("title") as string;
  const detail: FormDataEntryValue = formData.get("detail") as string;

  if (!title || !detail) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  try {
    await sql`
            UPDATE todolist
            SET title = ${title}, detail = ${detail}, date=${date}
            WHERE id = ${id}
          `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/todolist");
}

//배열 상태 업데이트
export async function updateTodoState(id: string, status: string) {
  try {
    await sql`
            UPDATE todolist
            SET status = ${status}
            WHERE id = ${id}
          `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  // revalidatePath("/dashboard/todolist");
  // redirect("/dashboard/invoices");
}

//배열 삭제
export async function deleteTodoList(id: string) {
  console.log(id);
  try {
    await sql`DELETE FROM todolist WHERE id = ${id}`;
    revalidatePath("/dashboard/todolist");
    return { message: "Deleted todolist." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete todolist." };
  }
}
