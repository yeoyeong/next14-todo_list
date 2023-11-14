"use client";
import { createTodo } from "@/app/lib/server/actions";
import styles from "./styles.module.scss";

const TodoCreateForm = ({ userId }: { userId: number }) => {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        await createTodo(userId, formData);
        form.reset();
      }}
      className={styles.create_form_wrap}
    >
      <div>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="제목을 입력해주세요."
        />
        <input
          type="text"
          id="detail"
          name="detail"
          placeholder="내용을 입력해주세요."
        />
      </div>
      <button type="submit">완료</button>
    </form>
  );
};

export default TodoCreateForm;
