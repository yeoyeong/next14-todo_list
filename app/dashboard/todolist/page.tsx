import { auth } from "@/auth";
import Table from "./(ui)/Table";
import { Suspense } from "react";
import { fetchTodolist } from "@/app/lib/server/get-data";
import TodoCreateForm from "./(ui)/todo-createForm";

const page = async () => {
  const user = await auth();
  if (user) {
    const todolist = await fetchTodolist(user.user.id);
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <TodoCreateForm userId={user.user.id}/>
        <Table todolist={todolist} />
      </Suspense>
    );
  }
};

export default page;
//title detail 추가
//삭제 수정시 토큰 있는 사용자만 할 수 있게 추가
