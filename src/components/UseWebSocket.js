import React, {useRef, useEffect, useContext} from "react";
import {IndexContext}  from "../Index";

const UseWebSocket = (url)=>{
    const {id} = useContext(IndexContext);
    const userId = id;
    const wsRef = useRef(null);

    useEffect(()=>{
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = ()=>{
            ws.send(userId);
        };

        ws.onmessage = (event)=>{
            const data = event.data;
            alert(data);
            
        };

        ws.onclose = ()=>{
            console.log("WebSocket finished");
        };

        ws.onerror = (error)=>{
            console.error(ws.pingInterval);
        };

        return ()=>{
            ws.close();
        };
    },[url, id]);
    return wsRef;
};

export default UseWebSocket;