import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import Client from "../Components/Client";
import Editor from "../Components/Editor";
import ACTIONS from "../Actions";
import { initSocket } from "../socket";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

const EditorPage = () => {
  //state
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();

  const [clients, setClients] = useState([]);
  // const [clients, setClients] = useState([
  //   { socketId: 1, username: "King" },
  //   { socketId: 2, username: "Rohit" },
  //   { socketId: 3, username:"Gill"}
  // ]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      // Handle connection errors
      socketRef.current.on("connect_error", handleErrors);
      socketRef.current.on("connect_failed", handleErrors);

      function handleErrors(e) {
        console.log("❌ Socket error", e);
        toast.error("Socket connection failed, try again later");
        reactNavigator("/");
      }

      // Wait for actual connection before emitting JOIN and adding listeners
      socketRef.current.on("connect", () => {
        console.log("✅ Socket connected:", socketRef.current.id);

        // Listen for new user joined
        socketRef.current.on(
          ACTIONS.JOINED,
          ({ clients, username, socketId }) => {
            console.log("JOINED event received:", clients, username, socketId);
            if (username !== location.state?.username) {
              toast.success(`${username} joined the room.`);
              console.log(`${username} joined`);
            }
            setClients(clients);
          }
        );
        console.log("Emitting ACTIONS.JOIN", {
          roomId,
          username: location.state?.username,
          eventName: ACTIONS.JOIN,
        });
        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,
        });
        console.log(
          "🔍 Username from location.state:",
          location.state?.username
        );

        // Listen for user disconnected
        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.success(`${username} left the room.`);
          setClients((prev) =>
            prev.filter((client) => client.socketId !== socketId)
          );
        });
      });
    };

    init();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off("connect_error");
        socketRef.current.off("connect_failed");
        socketRef.current.off("connect");
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, [roomId, location.state?.username, reactNavigator]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  console.log("ACTIONS loaded on client:", ACTIONS);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/cclogo.png" alt="logo"></img>
          </div>
          <h3>Connected Clients -</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy Room ID</button>
        <button className="btn leaveBtn">Leave Room</button>
      </div>
      <div className="editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};
export default EditorPage;
