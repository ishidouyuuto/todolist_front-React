import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import App from "./App";

export const IndexContext = createContext();
export const IdContext = createContext();
const Chose = () => {
    const navigate = useNavigate();

    const to_register = () => {
        navigate("/register");
    };

    const to_login = () => {
        navigate("/login");
    };

    return (
        <div>
            <button onClick={to_register}>新規登録</button>
            <button onClick={to_login}>ログイン</button>
        </div>
    );
};

const Register = () => {
    const navigate = useNavigate();
    const { userName, setUserName } = useContext(IndexContext);
    const {id, setId} = useContext(IndexContext);
    async function SendRegister() {
        if (!userName.trim()) {
            alert("名前を入力してください");
            return;
        }
        try {
            const response = await fetch("http://localhost:4000/register",
                {
                    method: 'POST',
                    body: JSON.stringify({ user_name: userName }),
                    headers:{
                        "Content-Type":"application/json",
                    },
                    mode:"cors"
                }
            );

            const data = await response.json();
           
            
            if (response.status === 409) {
                alert("そのユーザーはすでにそんざいしています。");
                setUserName("");
                return;
            }
            if (response.ok) {
                navigate("/home");
                setId(data.id);
            }
        } catch (error) {
            console.error("登録エラー", error);
            alert("サーバーに接続できませんでした");

        }
    }
    return (
        <div>
            <h1>新規登録ページ</h1>
            <input
                type="text"
                className="border p-2 mr-2"
                placeholder="名前を入力"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
            />
            <button onClick={SendRegister}>新規登録</button>
        </div>
    );
};

const Login = () => {
    const navigate = useNavigate();
    const { userName, setUserName ,setId} = useContext(IndexContext);

    async function SendLogin(){
        if (!userName.trim()) {
            alert("名前を入力してください");
            return;
        }
        try{
            console.log(userName);
            const response = await fetch("http://localhost:4000/login",
                {
                    method: "GET",
                    headers:{
                        "x-custom-username":encodeURIComponent(userName)
                    }                   
                });
            
            const data = await response.json();           

            if(response.ok){
                navigate("/home");
                setId(data.userid);
            }
        }catch(error){
            console.error(error);
        }
    }

    return (
        <div>
            <h1>ログインページ</h1>
            <input
                type="text"
                className="border p-2 mr-3"
                placeholder="名前を入力"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
            />
            <button onClick={SendLogin} className="p-2 bg-amber-400">ログイン</button>
        </div>
    );
};

const Index = () => {
    const [userName, setUserName] = useState("");
    const [id, setId] = useState(-1);
    return (
        <IndexContext.Provider value={{ userName, setUserName, id, setId}}>
            <Router>
                <Routes>
                    <Route path="/" element={<Chose />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<App />} />
                </Routes>
            </Router>
        </IndexContext.Provider >
    );
};
export default Index;