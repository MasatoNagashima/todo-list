"use client";

import { Task } from "@/types/tasks";
import { useEffect, useRef, useState } from "react";
import { deleteTodo, updateTodo } from "@/utils/supabase/toDoListController";
import { useRouter } from "next/navigation";
import { PencilAltIcon, SaveIcon, TrashIcon } from "@heroicons/react/solid";

interface TaskProps {
  task: Task;
}

export default function Todo({ task }: TaskProps) {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState(task.task_name);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = async () => {
    await updateTodo(task.task_id, editedTaskText);
    setIsEditing(false);
    router.refresh();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTaskText(event.target.value);
  };

  const handleDelete = async () => {
    await deleteTodo(task.task_id);
    router.refresh();
  };

  return (
    <li
      key={task.task_id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={editedTaskText}
          onChange={handleInputChange}
          className="mr-2 py-1 px-2 rounded border-gray-400 border"
        />
      ) : (
        <span className="text-gray-700">{task.task_name}</span>
      )}
      <div className="flex">
        {isEditing ? (
          <SaveIcon
            onClick={handleSaveButtonClick}
            className="h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer mr-3"
          />
        ) : (
          <>
            <PencilAltIcon
              onClick={handleEditButtonClick}
              className="h-5 w-5 text-green-400 hover:text-green-700 cursor-pointer mr-3"
            />
          </>
        )}
        <TrashIcon
          onClick={handleDelete}
          className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer"
        />
      </div>
    </li>
  );
}