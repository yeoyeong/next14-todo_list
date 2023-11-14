import { updateTodo } from "@/app/lib/server/actions";
import React from "react";
import styles from "./styles.module.scss";

const TodoEditForm = ({
  id,
  title,
  detail,
  setEditMode,
}: {
  id: string;
  title: string;
  detail: string;
  setEditMode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const updateTodoWithId = updateTodo.bind(null, id);
  //   action={updateTodoWithId}
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        await updateTodo(id, formData);
        setEditMode("");
      }}
      className={styles.edit_form_wrap}
    >
      <input type="text" name="title" defaultValue={title} />
      <input type="text" name="detail" defaultValue={detail} />
      <button type="submit">수정</button>
    </form>
  );
};

export default TodoEditForm;
