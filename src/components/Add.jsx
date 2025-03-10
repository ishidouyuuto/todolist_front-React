import React, { useContext,createContext, useState} from 'react'
import DateTimePicker from "./DateTimePicker";
import { InputTasks, InputCheck } from "./Input";
import { ForDelete,ForAddDB} from "./Button";
export const AddContext = createContext();
const Add = ({task}) => {
  const [dateTime, setDateTime] = useState("");
  return (
    <div className="py-1">
      <div className="mt-4 p-3 border rounded bg-pink-300 ">
        <div className="flex space-x-4">
          <InputTasks task={task}/>
          <InputCheck task={task}/>
        </div>
        <AddContext.Provider value={{dateTime, setDateTime}}>
          <DateTimePicker task={task}/>
          <ForDelete task={task}/>
          <ForAddDB task={task}/>
        </AddContext.Provider>
      </div>
    </div>
  );
};

export default Add;
