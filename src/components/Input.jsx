import React, { useContext, useEffect, useState } from "react";
import { JsonContext } from "../App";
import { IndexContext } from "../Index";

export const InputTasks = ({task}) => {
    const {tasks, setTasks } = useContext(JsonContext);
    const { id } = useContext(IndexContext);
    const userId = id;
    const [text, setText] = useState(task);
    const [prevText, setPrevText] = useState(task);

    const updateTaskText = (e) => {
        const updatedTasks = tasks.map((t) =>
            t.id === task.id ? { ...t, texts: e.target.value } : t);
        console.log(e.target);
        setTasks(updatedTasks);
        setText(e.target.value);
        console.log(e.target.value);
    };

    const handleBlur = async () => {
        if (text !== prevText) {
            try {
                const response = await fetch("http://localhost:4000", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "columnName": "texts",
                        "user_task_id": userId,
                        "Value": text,
                        "id":task.id
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                console.log("Task updated successfully!");
            } catch (error) {
                console.error("Error updating task:", error);
            }
        }
    };

    return (
        <input
            type="text"
            className="border p-2 mr-2"
            placeholder="Task Name"
            value={task.texts || ""}
            onChange={updateTaskText}
            onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
            onBlur={handleBlur}
        />
    );
};

export const InputCheck = ({task}) => {
    const {tasks, setTasks } = useContext(JsonContext);
    const {id} = useContext(IndexContext);
    const userId = id;
    const toggleCompleted = () => {
        const updatedTasks = tasks.map((t) => t.id === task.id ? { ...t, completed: !t.completed } : t);
        setTasks(updatedTasks);
        SendCheck();
    };
    async function SendCheck() {
        try{
           const response = await fetch("http://localhost:4000",
            {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    "columnName":"completed",
                    "Value":!task.completed,
                    "user_task_id": userId,
                    "id":task.id
                }),
            });
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            } 
            console.log("Update successfully");
        }catch(error){
            console.error(error);
        }
    }

    return (
        <>
            <input
                type="checkbox"
                className="mr-2"
                checked={task.completed}
                onChange={toggleCompleted}
            />
            <label>Completed    </label>
        </>
    )
}
