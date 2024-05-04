import { Task } from "@/types/tasks";
import Todo from "./Todo";

interface TodoListProps {
  tasks: Task[];
}

export default function ToDoList({ tasks }: TodoListProps) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <Todo key={task.task_id} task={task} />
      ))}
    </ul>
  );
}