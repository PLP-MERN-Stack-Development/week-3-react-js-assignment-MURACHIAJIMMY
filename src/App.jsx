import { useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskItem from "@/components/TaskItem";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Search } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState("all");
  const [searchId, setSearchId] = useState("");
  const [foundTask, setFoundTask] = useState(null);

  // Add date and time automatically when adding a task
  const addTask = (task) => {
    const now = new Date();
    setTasks(prev => [
      {
        ...task,
        completed: false,
        date: now.toLocaleString(), // Adds date and time
      },
      ...prev,
    ]);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleCompleted = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Fetch a task by ID from localStorage
  const handleFetchById = () => {
    const task = tasks.find(t => String(t.id) === String(searchId));
    setFoundTask(task || null);
  };

  return (
    <>
      <header>
        <nav className="border-b">
          <div className="max-w-2xl mx-auto flex items-center justify-between p-4">
            <span className="font-bold text-xl">Task Manager</span>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="px-3 py-2 hover:underline">
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="px-3 py-2 hover:underline">
                    Tasks
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="ml-4"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
          </div>
        </nav>
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          <h1 className="text-3xl text-center font-bold">Task Manager</h1>
          {/* Pass pink color to Add Task button */}
          <TaskForm onAdd={addTask} addButtonClassName="bg-pink-500 hover:bg-pink-600 text-white" />
          {/* Search by ID */}
          <div className="flex gap-2 items-center mb-4">
            <input
              type="text"
              placeholder="Enter Task ID"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <Button onClick={handleFetchById} variant="secondary" size="sm">
              <Search className="w-4 h-4 mr-1" /> Fetch Task
            </Button>
          </div>
          {foundTask && (
            <div className="mb-4 p-3 border rounded bg-muted">
              <div className="font-semibold">Found Task:</div>
              <div>ID: {foundTask.id}</div>
              <div>Name: {foundTask.taskName}</div>
              <div>Date: {foundTask.date}</div>
              <div>Status: {foundTask.completed ? "Completed" : "Active"}</div>
            </div>
          )}
          {/* Filter Buttons */}
          <div className="flex justify-center gap-2 mb-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              onClick={() => setFilter("active")}
              className={filter === "active" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
            >
              Active
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
            >
              Completed
            </Button>
          </div>
          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggleCompleted={toggleCompleted}
          />
        </div>
      </header>
      <Separator className="my-6" />
      <footer className="w-full py-4 bg-muted text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Task Manager. Built with <span className="font-semibold">shadcn/ui</span>.
      </footer>
    </>
  );
}