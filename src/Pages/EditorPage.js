import React, { useState } from "react";
import Client from "../Components/Client";

const Editor = () => {
  //state
  const [clients, setClients] = useState([
    { socketId: 1, username: "King" },
    { socketId: 2, username: "Kohli" },
  ]);
  return (
    <div className="mainWrap">
      //left nav bar
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img src="/cclogo.png" alt="logo"></img>
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
      <div className="editorWrap"></div>
    </div>
  );
};
export default Editor;
