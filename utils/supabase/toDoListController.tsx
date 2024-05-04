import { createClient } from "./client";
import { v4 as uuidv4 } from "uuid";

export const getAllTodos = async () => {
    const supabase = createClient();
    const todos = await supabase.from("todo_list").select("*");
    return todos.data ?? [];
};
export const addTodo = async (task_name: string) => {
    const today = new Date()
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2)
    const day = ('0' + today.getDate()).slice(-2)
    const supabase = createClient();
    await supabase.from("todo_list").insert({
        task_name: task_name, 
        due_date: year + '-' + month + '-' + day, 
        status: "Progress" });
};

export const deleteTodo = async (task_id: number) => {
    const supabase = createClient();
    await supabase.from("todo_list").delete().eq("task_id", task_id);
};

export const updateTodo = async(task_id: number, task_name: string) => {
    const supabase = createClient();
    await supabase.from("todo_list").update({"task_name": task_name}).eq("task_id", task_id);
};