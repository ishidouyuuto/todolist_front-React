import React, { useState, createContext, useEffect, useContext } from 'react';
import Add from "./components/Add";
import { ForAdd } from "./components/Button";
import { SecondDiv } from "./components/Divs";
import { IndexContext } from "./Index";
export const JsonContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState([]);
  const { userName, id } = useContext(IndexContext);
  useEffect(() => {
    console.log(id);

    const FetchAPI = async () => {
      try {
        const response = await fetch("http://localhost:4000/", {
          headers: { 'x-custam-userid': id }

        });

        if (!response.ok || !response) {
          throw new Error(`HTTP error:{response.status}`);
        }

        const data = await response.json();
        setTasks(data);
        console.log("response from server", data);
      } catch (error) {
        console.error(" An error occurrced while sending the request");
      }
    };

    if (id) FetchAPI();
  }, []);

  return (
    <div className="bg-pink-200">
      <SecondDiv />
      <JsonContext.Provider value={{ tasks, setTasks}}>
        <ForAdd />
        {/* {jsons.map((json) => (
          <ForAddJson key={json.id} task={json} />
        ))}; */}
        {tasks.map((task) => (
          <Add key={task.id} task={task} />
        ))}
      </JsonContext.Provider>
    </div>
  );
};

export default App;
