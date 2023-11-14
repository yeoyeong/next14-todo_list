"use client";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { updateTodoState } from "@/app/lib/server/actions";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import TodoButtonWrap from "./todo-buttonWrap";
import TodoEditForm from "./todo-editForm";

type todo = {
  id: string;
  user_id: string;
  title: string;
  detail: string;
  status: string;
  date: Date;
};
export default function Table({ todolist }: { todolist: todo[] }) {
  const [editMode, setEditMode] = useState("");
  const [tasks, setTasks] = useState<todo[]>([]);
  useEffect(() => {
    setTasks(todolist);
  }, [todolist]);

  const onDragStart = (evt: any) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (evt: any) => {
    evt.currentTarget.classList.remove("dragged");
  };

  const onDragEnter = (evt: any) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };

  const onDragLeave = (evt: any) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  const onDragOver = (evt: any) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  const onDrop = (evt: any, value: string) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let updated = tasks.map((task) => {
      if (task.id == data) {
        task.status = value;
        updateTodoState(task.id, value);
      }
      return task;
    });
    setTasks(updated);
  };

  const pending = tasks.filter((item) => item.status === "pending");
  const Proceeding = tasks.filter((item) => item.status === "Proceeding");
  const complete = tasks.filter((item) => item.status === "complete");

  // const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  // useEffect(() => {
  //   updateInvoiceWithId;
  // }, [tasks]);

  return (
    <div className={styles.table_wrap}>
      <ul
        className={`${styles.todo_table} ${styles.pending_table}`}
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "pending")}
      >
        <p className={styles.todo_status}>진행 전</p>
        {pending &&
          pending.map((item) => (
            <li
              key={item.id}
              id={item.id}
              draggable
              onDragStart={(e) => onDragStart(e)}
              onDragEnd={(e) => onDragEnd(e)}
            >
              {editMode === item.id && (
                <TodoEditForm
                  id={item.id}
                  title={item.title}
                  detail={item.detail}
                />
              )}
              {editMode !== item.id && (
                <span>
                  {item.title}
                  <span className={styles.detail}>{item.detail}</span>
                </span>
              )}

              <TodoButtonWrap id={item.id} setEditMode={setEditMode} />
            </li>
          ))}
      </ul>
      <ul
        className={`${styles.todo_table}`}
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "Proceeding")}
      >
        <p className={styles.todo_status}>진행 중</p>
        {Proceeding &&
          Proceeding.map((item) => (
            <li
              key={item.id}
              id={item.id}
              draggable
              onDragStart={(e) => onDragStart(e)}
              onDragEnd={(e) => onDragEnd(e)}
            >
              {editMode === item.id && (
                <TodoEditForm
                  id={item.id}
                  title={item.title}
                  detail={item.detail}
                />
              )}
              {editMode !== item.id && (
                <span>
                  {item.title}
                  <span className={styles.detail}>{item.detail}</span>
                </span>
              )}
            </li>
          ))}
      </ul>
      <ul
        className={`${styles.todo_table} ${styles.complete_table}`}
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "complete")}
      >
        <p className={styles.todo_status}>진행 완료</p>
        {complete &&
          complete.map((item) => (
            <li
              key={item.id}
              id={item.id}
              draggable
              onDragStart={(e) => onDragStart(e)}
              onDragEnd={(e) => onDragEnd(e)}
            >
              {editMode === item.id && (
                <TodoEditForm
                  id={item.id}
                  title={item.title}
                  detail={item.detail}
                />
              )}
              {editMode !== item.id && (
                <span>
                  {item.title}
                  <span className={styles.detail}>{item.detail}</span>
                </span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
