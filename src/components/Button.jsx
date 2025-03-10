import React, { useContext } from "react";
import { JsonContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import { IndexContext } from "../Index";
import { AddContext } from "./Add";

export const ForDelete = ({ task }) => {
    const { tasks, setTasks } = useContext(JsonContext);
    const { id } = useContext(IndexContext);
    const userId = id;

    const deleteTask = () => {
        setTasks(tasks.filter((t) => t.id !== task.id));
        DeleteTask();
    };

    async function DeleteTask() {
        try {
            const response = await fetch("http://localhost:4000", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "user_task_id": userId,
                    "id": task.id,
                }),
            });

            if (!response.ok) {
                throw new Error("HTTP Error", response.status);
            }
            console.log("delete successfully");
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <button className="bg-blue-400 border rounded mx-4 px-2"
                onClick={deleteTask}
            >
                deleteTask
            </button>
        </>
    )
}

export const ForAdd = ({ task }) => {
    const { tasks, setTasks } = useContext(JsonContext);

    const addTask = () => {
        setTasks([...tasks, { id: uuidv4(), texts: "", completed: false }]);

    };

    return (
        <div className="mt-4">
            <button
                className="bg-blue-300 text-gray-700 px-4 py-1 rounded-2xl"
                onClick={addTask}
            >
                <b>Add task</b>
            </button>
        </div>
    );
};

export const ForAddDB = ({ task }) => {
    const { tasks, setTasks } = useContext(JsonContext);
    const { id } = useContext(IndexContext);
    const { dateTime, setDatetime } = useContext(AddContext);
    const AddId = id;
    async function addDBTask() {
        try {
            const response = await fetch("http://localhost:4000",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "usertaskid": AddId,
                        "taskname": task.texts,
                        "limitsat": null,
                        "memoes": null,
                        "id": task.id,
                        "completed": false
                    })
                }
            )

            if (!response.ok) throw new Error("Http error", response.status);
            console.log("Send DB success");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={addDBTask} className="bg-amber-500 p-1">AddTASK</button>
        </div>
    );
};
