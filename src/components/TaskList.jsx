import TaskItem from "@/components/TaskItem";

export default function TaskList({ tasks, onDelete, onToggleCompleted }) {
  if (tasks.length === 0) {
    return <div className="text-center text-muted-foreground">No tasks found.</div>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => onDelete(task.id)}
          onToggleCompleted={() => onToggleCompleted(task.id)}
        />
      ))}
    </ul>
  );
}