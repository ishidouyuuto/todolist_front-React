import React, { useContext } from "react";
import {JsonContext} from "../App";
import {AddContext} from "./Add";
import {IndexContext} from "../Index";
const DateTimePicker = ({task}) => {
    const {tasks,setTasks} = useContext(JsonContext);
    const {dateTime, setDateTime} = useContext(AddContext);
    const {id} = useContext(IndexContext);
    const userId = id;

    const handleChange = (e) => {
        const newTime = e.target.value;
        const updateTasks = tasks.map((t)=>{
           return t.id ===task.id ? {...t, limits_at: newTime}:t;
        })
        setTasks(updateTasks);
        setDateTime(newTime); 
        SendTime(newTime);
    };

    const getValue =(limit)=>{
        return limit.replace(" ", "T").slice(0,16);
    }
    async function SendTime(updatedTime){
        try{
            const response = await fetch('http://localhost:4000',{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    "columnName":"limits_at",
                    "Value":updatedTime,
                    "user_task_id":userId,
                    "id":task.id
                }),
            });

            const data = await response.json();
            if(!response.ok)throw new Error(`HTTP Error: ${response.status}`);
            
            console.log(data);
        }catch(error){
            console.error(error);
        }
    }
    return (
        <>
            <label>日時を選択:</label>
            <input
                type="datetime-local"
                value={getValue(task.limits_at)}
                onChange={handleChange}
            />
            <p>選択された日時: {getValue(task.limits_at)}</p>
        </>
    );
};

export default DateTimePicker;