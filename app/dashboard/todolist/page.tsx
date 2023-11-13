import { auth } from "@/auth";
import Table from "./(ui)/Table";
import { Suspense } from "react";
import { fetchTodolist } from "@/app/lib/server/get-data";

const page = async () => {
  const user = await auth();

  if (user) {
    const todolist = await fetchTodolist(user.user.id);
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Table todolist={todolist} />
      </Suspense>
    );
  }
};

export default page;
