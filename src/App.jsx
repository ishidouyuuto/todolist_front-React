//必要なモジュールをインポート
import React, { useState, createContext, useEffect, useContext } from 'react';
import Add from "./components/Add";
import { ForAdd } from "./components/Button";
import { SecondDiv } from "./components/Divs";
import { IndexContext } from "./Index";
import UseWebSocket from "./components/UseWebSocket";

export const JsonContext = createContext();

//APIサーバーからユーザーIDをもとに情報を貰う
const App = () => {
  const [tasks, setTasks] = useState([]);
  const { userName, id } = useContext(IndexContext);
  UseWebSocket("ws://localhost:8080");
  
  useEffect(() => {
    console.log(id);

    const FetchAPI = async () => {
      try {
        const response = await fetch("http://localhost:4000/", {
          headers: { 'x-custam-userid': id }

        });

        if (!response.ok || !response) {
          throw new Error(`HTTP error:${response.status}`);
        }

        const data = await response.json();
        setTasks(data);
        console.log("response from server", data);
      } catch (error) {
        console.error(" An error occurrced while sending GET request");
      }
    };

    if (id) FetchAPI();
  }, []);

  return (
    <div className="bg-pink-200">
      <SecondDiv />
      <JsonContext.Provider value={{ tasks, setTasks}}>
        <ForAdd />
        {tasks.map((task) => (
          <Add key={task.id} task={task} />
        ))}
      </JsonContext.Provider>
    </div>
  );
};

export default App;
