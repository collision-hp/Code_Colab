import React, { useState } from "react";
import Client from "../Components/Client";
import Editor from "../Components/Editor";
const EditorPage = () => {
  //state
  const [clients, setClients] = useState([
    { socketId: 1, username: "King" },
    { socketId: 2, username: "Rohit" },
    { socketId: 3, username:"Gill"}
  ]);
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
