import React, { useEffect, useState,useRef } from "react";
import toast from "react-hot-toast";
import Client from "../Components/Client";
import Editor from "../Components/Editor";
import { initSocket } from "../socket";
import { useLocation,useNavigate,Navigate,useParams } from "react-router-dom";
import ACTIONS from "../Actions";
const EditorPage = () => {
  //state
  const socketRef=useRef(null);
  const location=useLocation();
  const {roomId}=useParams();
  const reactNavigator=useNavigate();
  useEffect(()=>{
    const init=async()=>{
      socketRef.current=await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN,{
        roomId,
        username:location.state?.username, //?-checks if username property is not there then it doesn't display an error
      }); 
      //listening for joined event
      socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{
        if(username!==location.state?.username){
          toast.success(`${username} joined the room.`);
          console.log(`${username} joined`);
        }
      });
    };
    init();
  },[]);

  const [clients, setClients] = useState([
    { socketId: 1, username: "King" },
    { socketId: 2, username: "Rohit" },
    { socketId: 3, username:"Gill"}
  ]);
  if(!location.state){
    return <Navigate to="/"/>
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/cclogo.png" alt="logo"></img>
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            )
            )}
          </div>
        </div>
        <button className="btn copyBtn">Copy Room ID</button>
        <button className="btn leaveBtn">Leave Room</button>
      </div>
      <div className="editorWrap">
        <Editor/>
      </div>
    </div>
  );
};
export default EditorPage;
