import React, { useContext } from "react";
import {JsonContext} from "../App";
import {AddContext} from "./Add";
const DateTimePicker = ({task}) => {
    const {tasks} = useContext(JsonContext);
    const {dateTime, setDateTime} = useContext(AddContext);
    const handleChange = (e) => {
        tasks.map((t)=>t.id ===task.id?setDateTime(e.target.value):10);
    };

    return (
        <>
            <label>日時を選択:</label>
            <input
                type="datetime-local"
                value={dateTime}
                onChange={handleChange}
            />
            <p>選択された日時: {dateTime}</p>
        </>
    );
};

export default DateTimePicker;