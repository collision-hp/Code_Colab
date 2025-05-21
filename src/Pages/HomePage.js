import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success('New Room Created');
    console.log(id);
  };

  //verficstion that all the creditals are entered
  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error('Room Id and Usermane is required');
      return;
    }
    //redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  }

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img src="/cclogo.png" alt="cclogo" className="image" />
        <h4 className="mainLabel">Enter your invitation ID here </h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Room ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}

            //enter press 
            onKeyUp={handleInputEnter} //user defined
          ></input>

          <input
            type="text"
            className="inputBox"
            placeholder="User-Name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            //enter press 
            onKeyUp={handleInputEnter} //user defined
          ></input>
          <button className="btnJoinbtn" onClick={joinRoom}>Join</button>
          <span className="createinfo">
            If you don't have an invitation then create &nbsp;
            <a onClick={createNewRoom} href="" className="createNewBtn">New Room</a>
          </span>
        </div>
      </div>
      <footer>
        Built by{" "}
        <a href="https://github.com/collision-hp">Satyabrata Champati</a>{" "}
      </footer>
    </div>
  );
};
export default Home;
