import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import styles from "./styles.module.scss";
import React from "react";
import { deleteTodoList } from "@/app/lib/server/actions";

const TodoButtonWrap = ({
  id,
  setEditMode,
}: {
  id: string;
  setEditMode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={styles.button_wrap}>
      <button
        type="button"
        onClick={() => setEditMode((prev) => (prev === id ? "" : id))}
      >
        <PencilIcon width={16} />
      </button>
      <TodoDeleteButton id={id} />
    </div>
  );
};

export default TodoButtonWrap;

const TodoDeleteButton = ({ id }: { id: string }) => {
  const deleteTodoListWithId = deleteTodoList.bind(null, id);
  return (
    <form action={deleteTodoListWithId}>
      <button>
        <TrashIcon width={16} />
      </button>
    </form>
  );
};
