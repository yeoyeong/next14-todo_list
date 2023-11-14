import { updateTodo } from "@/app/lib/server/actions";
import React from "react";
import styles from "./styles.module.scss";

const TodoEditForm = ({
  id,
  title,
  detail,
}: {
  id: string;
  title: string;
  detail: string;
}) => {
  const updateTodoWithId = updateTodo.bind(null, id);
  return (
    <form action={updateTodoWithId} className={styles.edit_form_wrap}>
      <input type="text" name="title" defaultValue={title} />
      <input type="text" name="detail" defaultValue={detail} />
      <button type="submit">수정</button>
    </form>
  );
};

export default TodoEditForm;
