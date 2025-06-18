import { useState } from "react";
import { Input} from "@/components/ui/input";
import { Textarea}  from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Footer} from "@/components/ui/footer";
import { NavigationMenu} from "@/components/ui/navigation-menu"
import { Alert} from "@/components/ui/alert"

export default function TaskForm ({ onAdd }) {
    const [id, setId] = useState("");
    const [taskName, settaskName] = useState("");
    const [date, setDate] = useState("");

    const handlesSubmit = (e) => {
        e.preventDefault();
        if (!id.trim() || !taskName.trim() || !date.trim()) return;

        onAdd ({id, taskName, date});
        setId ("");
        settaskName ("");
        setDate("");
    };

    return (
        
        <form className="space-y4 p-4 gap-4 " onSubmit={handlesSubmit}>
            <Input 
                placeholder="Input your Task Number.." 
                value={id}
                onChange={e => setId(e.target.value)}
            />
            <Textarea
                placeholder="Type your Task here.."
                value={taskName}
                onChange={e => settaskName(e.target.value)}
            />
            <Input
                placeholder="Type the Date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <Button type="submit">Add Task</Button>
        </form>
    )

}