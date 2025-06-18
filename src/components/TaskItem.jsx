import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TaskItem({ task, onDelete, onToggleCompleted }) {
  return (
    <Card className="p-4 flex justify-between items-start">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggleCompleted}
          className="accent-primary"
        />
        <div>
          <h2 className="font-semibold">{task.id}</h2>
          <p className={task.completed ? "text-sm text-gray-600 line-through" : "text-sm text-gray-600"}>
            {task.taskName}
          </p>
          <p className="text-sm font-medium mt-2">{task.date}</p>
        </div>
      </div>
      <Button variant="destructive" onClick={() => onDelete(task.id)}>
        Delete
      </Button>
    </Card>
  );
}