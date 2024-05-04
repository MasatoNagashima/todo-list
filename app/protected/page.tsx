import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddTask from "@/components/ToDoList/AddTask";
import ToDoList from "@/components/ToDoList/TodoList";
import { getAllTodos } from "@/utils/supabase/toDoListController";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const tasks = await getAllTodos();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <DeployButton />
            <AuthButton />
          </div>
        </nav>
      </div>

      <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
        <h1 className="text-4xl font-bold text-gray-700 -mt-32">
          Next 13 ToDo App
        </h1>
        <div className="w-full max-w-xl items-center justify-center mt-5">
          <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
            <AddTask />
            <ToDoList tasks={tasks} />
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
